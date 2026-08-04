"use client";

import { trackGoal } from "@/lib/analytics";
import { useAbandonedPhoneLead } from "@/hooks/useAbandonedPhoneLead";
import { formatRussianPhone } from "@/lib/phone";
import { type FormEvent, useEffect, useRef, useState } from "react";

type LeadFormProps = {
  id: string;
  variant?: "hero" | "final";
};

type FormFields = {
  site: string;
  contact: string;
  consent: boolean;
};

const initialFields: FormFields = {
  site: "",
  contact: "",
  consent: false,
};

export function LeadForm({ id, variant = "hero" }: LeadFormProps) {
  const [fields, setFields] = useState(initialFields);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const startedRef = useRef(false);
  const viewedRef = useRef(false);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewedRef.current) {
          viewedRef.current = true;
          trackGoal("form_view", { form: id });
          observer.disconnect();
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(form);
    return () => observer.disconnect();
  }, [id]);

  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackGoal("form_start", { form: id });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitAttempted(true);
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
          ...fields,
          niche: "Не указана",
          utm,
          pageUrl: window.location.href,
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
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
      trackGoal("free", { form: id, utm });
      trackGoal("lead_success", { form: id, utm });
    } catch (error) {
      setStatus("error");
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Не удалось отправить заявку. Попробуйте ещё раз.";
      setMessage(errorMessage);
      trackGoal("form_error", { form: id, message: errorMessage });
    }
  }

  useAbandonedPhoneLead({
    phone: fields.contact,
    site: fields.site,
    source: id,
    submitted: submitAttempted || status === "loading" || status === "success",
  });

  if (status === "success") {
    return (
      <div className={`lead-success lead-success--${variant}`} role="status">
        <span className="lead-success__icon">✓</span>
        <p className="lead-form__eyebrow">Заявка принята</p>
        <h2>Проверим сайт и свяжемся для согласования группы</h2>
        <p>
          Специалист изучит сайт, согласует 10 целевых запросов и предложит день
          старта бесплатного теста.
        </p>
      </div>
    );
  }

  return (
    <form
      className={`lead-form lead-form--${variant}`}
      id={id}
      ref={formRef}
      onSubmit={handleSubmit}
      onFocus={markStarted}
      noValidate
    >
      <div className="lead-form__heading">
        <div>
          <p className="lead-form__eyebrow">Первый шаг · бесплатно</p>
          <h2>Отправить сайт на проверку</h2>
        </div>
        <span className="lead-form__price">0 ₽</span>
      </div>

      <div className="lead-form__steps" aria-label="Что произойдёт после заявки">
        <span>Проверим применимость</span>
        <span>Согласуем 10 запросов</span>
        <span>Выберем день старта</span>
      </div>

      <label className="field">
        <span>Адрес сайта</span>
        <input
          name="site"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="example.ru"
          value={fields.site}
          aria-invalid={Boolean(fieldErrors.site)}
          aria-describedby={fieldErrors.site ? `${id}-site-error` : undefined}
          onChange={(event) =>
            setFields((current) => ({ ...current, site: event.target.value }))
          }
        />
        {fieldErrors.site && (
          <small className="field__error" id={`${id}-site-error`}>
            {fieldErrors.site}
          </small>
        )}
      </label>

      <label className="field">
        <span>Телефон</span>
        <input
          name="contact"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+7 (999) 000-00-00"
          value={fields.contact}
          aria-invalid={Boolean(fieldErrors.contact)}
          aria-describedby={
            fieldErrors.contact ? `${id}-contact-error` : undefined
          }
          onChange={(event) =>
            setFields((current) => ({
              ...current,
              contact: formatRussianPhone(event.target.value),
            }))
          }
        />
        {fieldErrors.contact && (
          <small className="field__error" id={`${id}-contact-error`}>
            {fieldErrors.contact}
          </small>
        )}
      </label>

      <label className="consent">
        <input
          type="checkbox"
          name="consent"
          checked={fields.consent}
          aria-invalid={Boolean(fieldErrors.consent)}
          aria-describedby={
            fieldErrors.consent ? `${id}-consent-error` : undefined
          }
          onChange={(event) =>
            setFields((current) => ({
              ...current,
              consent: event.target.checked,
            }))
          }
        />
        <span>
          Нажимая кнопку, вы соглашаетесь на обработку{" "}
          <a href="/privacy" target="_blank" rel="noreferrer">
            персональных данных
          </a>{" "}
          в соответствии с ФЗ-152.
        </span>
      </label>
      {fieldErrors.consent && (
        <small
          className="field__error field__error--consent"
          id={`${id}-consent-error`}
        >
          {fieldErrors.consent}
        </small>
      )}

      <button
        className="button button--primary lead-form__submit"
        type="submit"
        disabled={status === "loading"}
      >
        <span>
          {status === "loading"
            ? "Отправляем…"
            : "Продвинуть запросы за 0₽"}
        </span>
        <span className="icon-arrow button__arrow" aria-hidden="true" />
      </button>

      {status === "error" && (
        <p className="lead-form__message" role="alert">
          {message}
        </p>
      )}

      <div className="lead-form__trust">
        <span>Без оплаты</span>
        <span>Ответ за 5 минут</span>
        <span>Гарантии по договору</span>
      </div>
    </form>
  );
}
