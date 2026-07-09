import type { LeadPayload } from "@/lib/lead-validation";

export type LeadMeta = {
  ip: string;
  userAgent: string;
  receivedAt: string;
};

const TELEGRAM_TIMEOUT_MS = 8_000;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function formatUtm(utm: Record<string, string>) {
  const entries = Object.entries(utm);
  if (!entries.length) return "нет";
  return entries.map(([key, value]) => `${key}: ${value}`).join("\n");
}

function buildTelegramMessage(lead: LeadPayload, meta: LeadMeta) {
  return [
    "<b>Новая заявка Allerhand SEO</b>",
    "",
    `🌐 <b>Сайт:</b> ${escapeHtml(lead.site)}`,
    `📞 <b>Телефон:</b> ${escapeHtml(lead.contact)}`,
    `🧩 <b>Форма/источник:</b> ${escapeHtml(lead.niche)}`,
    `📄 <b>Страница:</b> ${escapeHtml(lead.pageUrl || "не передана")}`,
    `🕒 <b>Отправлено:</b> ${escapeHtml(lead.submittedAt)}`,
    `✅ <b>Получено:</b> ${escapeHtml(meta.receivedAt)}`,
    "",
    `<b>UTM:</b>\n${escapeHtml(formatUtm(lead.utm))}`,
    "",
    `IP: ${escapeHtml(meta.ip)}`,
  ].join("\n");
}

export async function sendLeadTelegram(lead: LeadPayload, meta: LeadMeta) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return false;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: buildTelegramMessage(lead, meta),
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        signal: controller.signal,
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`Telegram responded with ${response.status}`);
    }

    return true;
  } finally {
    clearTimeout(timeout);
  }
}
