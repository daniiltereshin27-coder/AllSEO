import { normalizeRussianPhone } from "@/lib/phone";

export type LeadPayload = {
  site: string;
  niche: string;
  contact: string;
  consent: boolean;
  leadType: "submitted" | "abandoned_phone";
  utm: Record<string, string>;
  pageUrl: string;
  submittedAt: string;
};

export type ValidationResult =
  | { success: true; data: LeadPayload }
  | { success: false; message: string; fields?: Record<string, string> };

function normalizeSite(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function fallbackSite(pageUrl: string) {
  try {
    const url = new URL(pageUrl);
    return url.origin;
  } catch {
    return "https://seoallerhand.ru";
  }
}

export function validateLead(input: unknown): ValidationResult {
  if (!input || typeof input !== "object") {
    return { success: false, message: "Некорректные данные формы." };
  }

  const candidate = input as Partial<LeadPayload>;
  const fields: Record<string, string> = {};
  const leadType =
    candidate.leadType === "abandoned_phone" ? "abandoned_phone" : "submitted";
  const pageUrl = String(candidate.pageUrl ?? "").slice(0, 1000);
  const normalizedSite = normalizeSite(
    String(candidate.site ?? "") ||
      (leadType === "abandoned_phone" ? fallbackSite(pageUrl) : ""),
  );
  const niche = String(candidate.niche ?? "").trim() || "Не указана";
  const contact = normalizeRussianPhone(String(candidate.contact ?? ""));

  try {
    const url = new URL(normalizedSite);
    if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".")) {
      fields.site = "Укажите корректный адрес сайта.";
    }
  } catch {
    fields.site = "Укажите корректный адрес сайта.";
  }

  if (niche.length > 120) {
    fields.niche = "Опишите сферу в 2–120 символах.";
  }

  if (!contact) {
    fields.contact = "Укажите телефон полностью: +7 (999) 000-00-00.";
  }

  if (leadType === "submitted" && candidate.consent !== true) {
    fields.consent = "Нужно согласие на обработку данных.";
  }

  if (Object.keys(fields).length > 0) {
    return {
      success: false,
      message: "Проверьте заполнение формы.",
      fields,
    };
  }

  const utm =
    candidate.utm && typeof candidate.utm === "object"
      ? Object.fromEntries(
          Object.entries(candidate.utm)
            .filter(
              ([key, value]) =>
                key.startsWith("utm_") &&
                typeof value === "string" &&
                value.length <= 300,
            )
            .slice(0, 10),
        )
      : {};

  return {
    success: true,
    data: {
      site: normalizedSite,
      niche,
      contact,
      consent: candidate.consent === true,
      leadType,
      utm,
      pageUrl,
      submittedAt: String(candidate.submittedAt ?? new Date().toISOString()),
    },
  };
}
