import { validateLead } from "@/lib/lead-validation";
import { sendLeadEmail } from "@/lib/smtp-mailer";
import { sendLeadTelegram } from "@/lib/telegram-leads";
import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type RateEntry = {
  count: number;
  resetAt: number;
};

type LeadState = {
  rate: Map<string, RateEntry>;
  duplicates: Map<string, number>;
};

declare global {
  var __allerhandLeadState: LeadState | undefined;
}

const state =
  globalThis.__allerhandLeadState ??
  (globalThis.__allerhandLeadState = {
    rate: new Map<string, RateEntry>(),
    duplicates: new Map<string, number>(),
  });

function clientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const existing = state.rate.get(key);

  if (!existing || existing.resetAt < now) {
    state.rate.set(key, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }

  existing.count += 1;
  return existing.count > 5;
}

function pruneState() {
  const now = Date.now();
  for (const [key, value] of state.rate) {
    if (value.resetAt < now) state.rate.delete(key);
  }
  for (const [key, expiresAt] of state.duplicates) {
    if (expiresAt < now) state.duplicates.delete(key);
  }
}

export async function POST(request: NextRequest) {
  pruneState();

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 24_000) {
    return NextResponse.json(
      { message: "Слишком большой объём данных." },
      { status: 413 },
    );
  }

  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        message:
          "Слишком много попыток. Подождите несколько минут и повторите отправку.",
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Не удалось прочитать данные формы." },
      { status: 400 },
    );
  }

  const validation = validateLead(body);
  if (!validation.success) {
    return NextResponse.json(
      { message: validation.message, fields: validation.fields },
      { status: 400 },
    );
  }

  const duplicateKey = createHash("sha256")
    .update(
      `${ip}|${validation.data.leadType}|${validation.data.site.toLowerCase()}|${validation.data.contact.toLowerCase()}|${validation.data.niche.toLowerCase()}`,
    )
    .digest("hex");

  if ((state.duplicates.get(duplicateKey) ?? 0) > Date.now()) {
    return NextResponse.json(
      {
        message:
          "Такая заявка уже отправлена. Мы получили её и скоро свяжемся.",
      },
      { status: 409 },
    );
  }

  try {
    const meta = {
      ip,
      userAgent: request.headers.get("user-agent") ?? "",
      receivedAt: new Date().toISOString(),
    };
    const deliveredByEmail = await sendLeadEmail(validation.data, meta);

    if (!deliveredByEmail) {
      const webhookUrl = process.env.LEAD_WEBHOOK_URL;
      if (!webhookUrl) {
        return NextResponse.json(
          {
            message:
              "Канал приёма заявок ещё не настроен. Укажите SMTP_USER и SMTP_PASS.",
          },
          { status: 503 },
        );
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8_000);

      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(process.env.LEAD_WEBHOOK_SECRET
              ? {
                  Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}`,
                }
              : {}),
          },
          body: JSON.stringify({
            event:
              validation.data.leadType === "abandoned_phone"
                ? "allerhand_seo_abandoned_phone"
                : "allerhand_seo_demo_request",
            lead: validation.data,
            meta,
          }),
          signal: controller.signal,
          cache: "no-store",
        });

        if (!webhookResponse.ok) {
          throw new Error(`Webhook responded with ${webhookResponse.status}`);
        }
      } finally {
        clearTimeout(timeout);
      }
    }

    try {
      await sendLeadTelegram(validation.data, meta);
    } catch (error) {
      console.error("Telegram lead delivery error", error);
    }

    state.duplicates.set(duplicateKey, Date.now() + 90_000);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead delivery error", error);
    return NextResponse.json(
      {
        message:
          "Сервис временно не принял заявку. Данные сохранены в форме — попробуйте ещё раз.",
      },
      { status: 502 },
    );
  }
}
