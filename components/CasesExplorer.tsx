"use client";

import Image from "next/image";
import { trackGoal } from "@/lib/analytics";
import { useAbandonedPhoneLead } from "@/hooks/useAbandonedPhoneLead";
import { formatRussianPhone, normalizeRussianPhone } from "@/lib/phone";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  caseCategories,
  casesByCategory,
  type CaseCategory,
  type SeoCase,
} from "@/lib/cases-content";

function ProofButton({
  item,
  onOpen,
}: {
  item: SeoCase;
  onOpen: (item: SeoCase) => void;
}) {
  return (
    <button
      className="case-proof"
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`Увеличить подтверждение позиций: ${item.title}`}
    >
      <Image
        src={item.image}
        alt={item.imageAlt}
        fill
        sizes="(max-width: 820px) 100vw, 50vw"
      />
      <span>
        Открыть данные Topvisor <i className="icon-arrow icon-arrow--inline" aria-hidden="true" />
      </span>
    </button>
  );
}

function QueryList({ item }: { item: SeoCase }) {
  return (
    <ul className="case-queries" aria-label={`Запросы кейса ${item.title}`}>
      {item.queries.map((query) => (
        <li key={query.query}>
          <span>{query.query}</span>
          <strong>{query.position}</strong>
        </li>
      ))}
    </ul>
  );
}

export function CasesExplorer() {
  const [activeCategory, setActiveCategory] =
    useState<CaseCategory>("Медицина");
  const [selectedCase, setSelectedCase] = useState<SeoCase | null>(null);
  const [leadCase, setLeadCase] = useState<SeoCase | null>(null);
  const [leadPhone, setLeadPhone] = useState("");
  const [leadStatus, setLeadStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [leadSubmitAttempted, setLeadSubmitAttempted] = useState(false);
  const [leadMessage, setLeadMessage] = useState("");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    active: false,
    moved: false,
    startX: 0,
    scrollLeft: 0,
  });

  const updateScrollControls = useCallback(() => {
    const element = categoriesRef.current;
    if (!element) return;
    const maxScroll = element.scrollWidth - element.clientWidth;
    setCanScrollLeft(element.scrollLeft > 2);
    setCanScrollRight(element.scrollLeft < maxScroll - 2);
  }, []);

  useEffect(() => {
    const element = categoriesRef.current;
    if (!element) return;

    updateScrollControls();
    element.addEventListener("scroll", updateScrollControls, { passive: true });
    window.addEventListener("resize", updateScrollControls);

    return () => {
      element.removeEventListener("scroll", updateScrollControls);
      window.removeEventListener("resize", updateScrollControls);
    };
  }, [updateScrollControls]);

  useEffect(() => {
    if (!selectedCase && !leadCase) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCase(null);
        setLeadCase(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedCase, leadCase]);

  const openLeadModal = (item: SeoCase) => {
    setLeadCase(item);
    setLeadPhone("");
    setLeadStatus("idle");
    setLeadMessage("");
    setLeadSubmitAttempted(false);
    trackGoal("case_cta_click", { case: item.slug });
  };

  const submitCaseLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!leadCase) return;
    setLeadSubmitAttempted(true);

    const contact = normalizeRussianPhone(leadPhone);
    if (!contact) {
      setLeadStatus("error");
      setLeadMessage("Укажите телефон полностью: +7 (999) 000-00-00.");
      return;
    }

    setLeadStatus("loading");
    setLeadMessage("");

    const params = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries(
      Array.from(params.entries()).filter(([key]) => key.startsWith("utm_")),
    );

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site: window.location.origin,
          niche: `Хочу также — кейс ${leadCase.title}`,
          contact,
          consent: true,
          utm,
          pageUrl: window.location.href,
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(
          result.message ?? "Не удалось отправить заявку. Попробуйте ещё раз.",
        );
      }

      setLeadStatus("success");
      trackGoal("same", {
        form: "case_modal",
        case: leadCase.slug,
        utm,
      });
      trackGoal("lead_success", {
        form: "case_modal",
        case: leadCase.slug,
        utm,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Не удалось отправить заявку. Попробуйте ещё раз.";
      setLeadStatus("error");
      setLeadMessage(message);
      trackGoal("form_error", {
        form: "case_modal",
        case: leadCase.slug,
        message,
      });
    }
  };

  useAbandonedPhoneLead({
    phone: leadPhone,
    source: leadCase
      ? `Хочу также — кейс ${leadCase.title}`
      : "Хочу также — кейс",
    enabled: Boolean(leadCase),
    submitted:
      leadSubmitAttempted ||
      leadStatus === "loading" ||
      leadStatus === "success",
  });

  const scrollCategories = (direction: -1 | 1) => {
    const element = categoriesRef.current;
    if (!element) return;
    element.scrollBy({
      left: direction * Math.min(element.clientWidth * 0.72, 520),
      behavior: "smooth",
    });
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const element = categoriesRef.current;
    if (!element) return;

    dragState.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      scrollLeft: element.scrollLeft,
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = categoriesRef.current;
    if (!element || !dragState.current.active) return;

    const distance = event.clientX - dragState.current.startX;
    if (!dragState.current.moved && Math.abs(distance) > 6) {
      dragState.current.moved = true;
      element.setPointerCapture(event.pointerId);
      element.classList.add("is-dragging");
    }
    if (!dragState.current.moved) return;

    event.preventDefault();
    element.scrollLeft = dragState.current.scrollLeft - distance;
  };

  const stopDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = categoriesRef.current;
    if (!element || !dragState.current.active) return;
    dragState.current.active = false;
    element.classList.remove("is-dragging");
    if (element.hasPointerCapture(event.pointerId)) {
      element.releasePointerCapture(event.pointerId);
    }
  };

  const visibleCases = casesByCategory[activeCategory] ?? [];

  return (
    <section className="section section--case-explorer" id="cases">
      <div className="container">
        <div className="case-explorer__heading">
          <p className="eyebrow">Кейсы</p>
          <h2>Результаты наших клиентов</h2>
          <p>
            Позиции фиксируем в Topvisor. Открывайте скриншоты — в кейсах
            показываем поисковую систему, регион и дату проверки.
          </p>
        </div>

        <div className="case-categories-shell">
          <div
            ref={categoriesRef}
            className="case-categories"
            role="toolbar"
            aria-label="Категории кейсов"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
          >
            {caseCategories.map((category) => (
              <button
                type="button"
                key={category}
                className={activeCategory === category ? "is-active" : ""}
                aria-pressed={activeCategory === category}
                onClick={(event) => {
                  if (dragState.current.moved) {
                    event.preventDefault();
                    dragState.current.moved = false;
                    return;
                  }
                  setActiveCategory(category);
                }}
              >
                {category}
                <span className="icon-arrow icon-arrow--inline" aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className="case-categories__controls">
            <button
              type="button"
              onClick={() => scrollCategories(-1)}
              disabled={!canScrollLeft}
              aria-label="Прокрутить категории влево"
            >
              <span className="case-categories__arrow-glyph" aria-hidden="true">
                ‹
              </span>
            </button>
            <button
              type="button"
              onClick={() => scrollCategories(1)}
              disabled={!canScrollRight}
              aria-label="Прокрутить категории вправо"
            >
              <span className="case-categories__arrow-glyph" aria-hidden="true">
                ›
              </span>
            </button>
          </div>
        </div>

        {visibleCases.length > 0 ? (
          <div className="case-results" key={activeCategory}>
            <div className="case-grid">
              {visibleCases.map((item) => (
                <article className="case-result-card" key={item.slug}>
                  <ProofButton item={item} onOpen={setSelectedCase} />
                  <div className="case-result-card__body">
                    <div className="case-card__meta">
                      <span>{item.category}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p className="case-card__location">{item.meta}</p>
                    {item.description && (
                      <p className="case-featured__description">
                        {item.description}
                      </p>
                    )}
                    <div className="case-highlights">
                      {item.highlights.map((highlight) => (
                        <strong key={highlight}>{highlight}</strong>
                      ))}
                    </div>
                    <QueryList item={item} />
                    <button
                      className="case-card__cta"
                      type="button"
                      onClick={() => openLeadModal(item)}
                    >
                      <span>Хочу также</span>
                      <i className="icon-arrow" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="case-empty" key={activeCategory}>
            <span>Материалы готовятся</span>
            <h3>Кейсы категории «{activeCategory}» скоро появятся</h3>
            <p>
              Добавим сюда только результаты с подтверждением позиций, региона
              и даты проверки в Topvisor.
            </p>
          </div>
        )}
      </div>

      {selectedCase && (
        <div
          className="case-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Данные Topvisor: ${selectedCase.title}`}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSelectedCase(null);
          }}
        >
          <div className="case-modal__window">
            <div className="case-modal__header">
              <div>
                <span>Данные Topvisor</span>
                <strong>{selectedCase.title}</strong>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>
            <div className="case-modal__image">
              <Image
                src={selectedCase.image}
                alt={selectedCase.imageAlt}
                width={1800}
                height={1200}
                sizes="95vw"
                priority
              />
            </div>
            <p>{selectedCase.meta}</p>
          </div>
        </div>
      )}

      {leadCase && (
        <div
          className="case-lead-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-lead-title"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setLeadCase(null);
          }}
        >
          <div className="case-lead-modal__window">
            <button
              className="case-lead-modal__close"
              type="button"
              onClick={() => setLeadCase(null)}
              aria-label="Закрыть"
            >
              ×
            </button>

            {leadStatus === "success" ? (
              <div className="case-lead-modal__success" role="status">
                <span>✓</span>
                <p>Заявка принята</p>
                <h3>Свяжемся и обсудим похожий результат для вашего сайта</h3>
                <button type="button" onClick={() => setLeadCase(null)}>
                  Закрыть
                </button>
              </div>
            ) : (
              <>
                <p className="case-lead-modal__eyebrow">Кейс · {leadCase.title}</p>
                <h3 id="case-lead-title">Хотите похожий результат?</h3>
                <p className="case-lead-modal__description">
                  Оставьте телефон — менеджер свяжется в течение 5 минут и
                  расскажет, подойдёт ли такой формат вашему сайту.
                </p>
                <form onSubmit={submitCaseLead} noValidate>
                  <label>
                    <span>Телефон</span>
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+7 (999) 000-00-00"
                      value={leadPhone}
                      aria-invalid={leadStatus === "error"}
                      onChange={(event) => {
                        setLeadPhone(formatRussianPhone(event.target.value));
                        if (leadStatus === "error") {
                          setLeadStatus("idle");
                          setLeadMessage("");
                        }
                      }}
                    />
                  </label>
                  {leadMessage && (
                    <p className="case-lead-modal__error" role="alert">
                      {leadMessage}
                    </p>
                  )}
                  <button
                    className="case-lead-modal__submit"
                    type="submit"
                    disabled={leadStatus === "loading"}
                  >
                    <span>
                      {leadStatus === "loading"
                        ? "Отправляем…"
                        : "Хочу такой результат"}
                    </span>
                    <i className="icon-arrow" aria-hidden="true" />
                  </button>
                  <small>
                    Нажимая кнопку, вы соглашаетесь на обработку{" "}
                    <a href="/privacy" target="_blank" rel="noreferrer">
                      персональных данных
                    </a>{" "}
                    в соответствии с ФЗ-152.
                  </small>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
