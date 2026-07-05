"use client";

import { trackGoal } from "@/lib/analytics";
import { formatRussianPhone, normalizeRussianPhone } from "@/lib/phone";
import {
  type ButtonHTMLAttributes,
  type FormEvent,
  type ReactNode,
  useEffect,
  useState,
} from "react";

const OPEN_QUICK_LEAD_EVENT = "open-quick-lead";

type QuickLeadTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  source: string;
};

export function QuickLeadTrigger({
  children,
  source,
  onClick,
  ...props
}: QuickLeadTriggerProps) {
  return (
    <button
      type="button"
      {...props}
      onClick={(event) => {
        trackGoal("cta_click", { source });
        window.dispatchEvent(
          new CustomEvent(OPEN_QUICK_LEAD_EVENT, { detail: { source } }),
        );
        onClick?.(event);
      }}
    >
      {children}
    </button>
  );
}

export function QuickLeadModal() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("quick_lead");
  const [site, setSite] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const customEvent = event as CustomEvent<{ source?: string }>;
      setSource(customEvent.detail?.source ?? "quick_lead");
      setSite("");
      setPhone("");
      setMessage("");
      setFieldErrors({});
      setStatus("idle");
      setOpen(true);
    };

    window.addEventListener(OPEN_QUICK_LEAD_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_QUICK_LEAD_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors: Record<string, string> = {};

    if (!site.trim()) errors.site = "Укажите адрес сайта.";
    if (!normalizeRussianPhone(phone)) {
      errors.contact = "Укажите телефон полностью: +7 (999) 000-00-00.";
    }

    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      setStatus("error");
      setMessage("Проверьте заполнение формы.");
      return;
    }

    setStatus("loading");
    setMessage("");
    setFieldErrors({});

    const params = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries(
      Array.from(params.entries()).filter(([key]) => key.startsWith("utm_")),
    );

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site,
          niche: `Выбор запросов · ${source}`,
          contact: normalizeRussianPhone(phone),
          consent: true,
          utm,
          pageUrl: window.location.href,
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = (await response.json()) as {
        message?: string;
        fields?: Record<string, string>;
      };

      if (!response.ok) {
        setFieldErrors(result.fields ?? {});
        throw new Error(
          result.message ?? "Не удалось отправить заявку. Попробуйте ещё раз.",
        );
      }

      setStatus("success");
      trackGoal("lead_success", { form: "quick_lead", source, utm });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Не удалось отправить заявку. Попробуйте ещё раз.";
      setStatus("error");
      setMessage(errorMessage);
      trackGoal("form_error", {
        form: "quick_lead",
        source,
        message: errorMessage,
      });
    }
  }

  if (!open) return null;

  return (
    <div
      className="case-lead-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-lead-title"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) setOpen(false);
      }}
    >
      <div className="case-lead-modal__window quick-lead-modal__window">
        <button
          className="case-lead-modal__close"
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Закрыть"
        >
          ×
        </button>

        {status === "success" ? (
          <div className="case-lead-modal__success" role="status">
            <span>✓</span>
            <p>Заявка принята</p>
            <h3>Подберём запросы и свяжемся с вами</h3>
            <button type="button" onClick={() => setOpen(false)}>
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <p className="case-lead-modal__eyebrow">Бесплатный демо-тест</p>
            <h3 id="quick-lead-title">Выберем запросы для вашего сайта</h3>
            <p className="case-lead-modal__description">
              Оставьте сайт и телефон. Менеджер свяжется в течение 5 минут и
              согласует коммерческую группу.
            </p>
            <form onSubmit={handleSubmit} noValidate>
              <label>
                <span>Адрес сайта</span>
                <input
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="example.ru"
                  value={site}
                  aria-invalid={Boolean(fieldErrors.site)}
                  onChange={(event) => {
                    setSite(event.target.value);
                    setFieldErrors((current) => ({ ...current, site: "" }));
                  }}
                />
                {fieldErrors.site && (
                  <small className="quick-lead-modal__field-error">
                    {fieldErrors.site}
                  </small>
                )}
              </label>
              <label>
                <span>Телефон</span>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+7 (999) 000-00-00"
                  value={phone}
                  aria-invalid={Boolean(fieldErrors.contact)}
                  onChange={(event) => {
                    setPhone(formatRussianPhone(event.target.value));
                    setFieldErrors((current) => ({ ...current, contact: "" }));
                  }}
                />
                {fieldErrors.contact && (
                  <small className="quick-lead-modal__field-error">
                    {fieldErrors.contact}
                  </small>
                )}
              </label>
              {message && (
                <p className="case-lead-modal__error" role="alert">
                  {message}
                </p>
              )}
              <button
                className="case-lead-modal__submit"
                type="submit"
                disabled={status === "loading"}
              >
                <span>
                  {status === "loading"
                    ? "Отправляем…"
                    : "Продвинуть запросы за 0₽"}
                </span>
                <i className="icon-arrow" aria-hidden="true" />
              </button>
              <small>
                Нажимая кнопку, вы соглашаетесь на обработку данных для связи по
                заявке.
              </small>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
