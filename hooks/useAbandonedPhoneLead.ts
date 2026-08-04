"use client";

import { normalizeRussianPhone } from "@/lib/phone";
import { useEffect, useRef } from "react";

type UseAbandonedPhoneLeadOptions = {
  phone: string;
  source: string;
  site?: string;
  enabled?: boolean;
  submitted?: boolean;
  delayMs?: number;
};

function getUtm() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(
    Array.from(params.entries()).filter(([key]) => key.startsWith("utm_")),
  );
}

function normalizeSiteInput(site: string | undefined) {
  const trimmed = site?.trim();
  if (trimmed) return trimmed;
  if (typeof window !== "undefined") return window.location.origin;
  return "https://seoallerhand.ru";
}

export function useAbandonedPhoneLead({
  phone,
  source,
  site,
  enabled = true,
  submitted = false,
  delayMs = 2_000,
}: UseAbandonedPhoneLeadOptions) {
  const sentKeysRef = useRef(new Set<string>());

  useEffect(() => {
    if (!enabled || submitted) return;

    const contact = normalizeRussianPhone(phone);
    if (!contact) return;

    const siteValue = normalizeSiteInput(site);
    const dedupeKey = `${source}|${siteValue}|${contact}`;
    if (sentKeysRef.current.has(dedupeKey)) return;

    const timeout = window.setTimeout(() => {
      if (sentKeysRef.current.has(dedupeKey)) return;
      sentKeysRef.current.add(dedupeKey);

      void fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "abandoned_phone",
          site: siteValue,
          niche: `Незавершённая заявка · ${source}`,
          contact,
          consent: false,
          utm: getUtm(),
          pageUrl: window.location.href,
          submittedAt: new Date().toISOString(),
        }),
        keepalive: true,
      }).catch(() => {
        sentKeysRef.current.delete(dedupeKey);
      });
    }, delayMs);

    return () => window.clearTimeout(timeout);
  }, [delayMs, enabled, phone, site, source, submitted]);
}
