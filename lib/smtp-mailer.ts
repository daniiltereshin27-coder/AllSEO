import { connect } from "node:tls";
import type { LeadPayload } from "@/lib/lead-validation";

type LeadMeta = {
  ip: string;
  userAgent: string;
  receivedAt: string;
};

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
};

const SMTP_TIMEOUT_MS = 10_000;

function readSmtpConfig(): SmtpConfig | null {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) return null;

  return {
    host: process.env.SMTP_HOST || "smtp.beget.com",
    port: Number(process.env.SMTP_PORT || 465),
    user,
    pass,
    from: process.env.SMTP_FROM || user,
    to: process.env.SMTP_TO || "seo@allerhand.ru",
  };
}

function encodeHeader(value: string) {
  return `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function dotStuff(value: string) {
  return value.replace(/^\./gm, "..");
}

function formatUtm(utm: Record<string, string>) {
  const entries = Object.entries(utm);
  if (!entries.length) return "UTM-меток нет";
  return entries.map(([key, value]) => `${key}: ${value}`).join("\n");
}

function buildLeadEmail(lead: LeadPayload, meta: LeadMeta) {
  const subject = `Новая заявка Allerhand SEO — ${lead.contact}`;
  const plainText = [
    "Новая заявка с лендинга Allerhand SEO",
    "",
    `Сайт: ${lead.site}`,
    `Контакт: ${lead.contact}`,
    `Источник/форма: ${lead.niche}`,
    `Согласие: ${lead.consent ? "да" : "нет"}`,
    `Страница: ${lead.pageUrl || "не передана"}`,
    `Отправлено клиентом: ${lead.submittedAt}`,
    `Получено сервером: ${meta.receivedAt}`,
    "",
    "UTM:",
    formatUtm(lead.utm),
    "",
    `IP: ${meta.ip}`,
    `User-Agent: ${meta.userAgent}`,
  ].join("\n");

  const utmRows = Object.entries(lead.utm)
    .map(
      ([key, value]) =>
        `<tr><th>${escapeHtml(key)}</th><td>${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;background:#f5f5f2;font-family:Arial,sans-serif;color:#111;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f2;padding:24px;">
      <tr>
        <td>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:720px;background:#fff;border:1px solid #e1e1dc;border-radius:24px;padding:28px;">
            <tr><td>
              <p style="margin:0 0 12px;color:#fc3f1d;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Allerhand SEO</p>
              <h1 style="margin:0 0 24px;font-size:28px;line-height:1.1;">Новая заявка с лендинга</h1>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:16px;line-height:1.45;">
                <tr><th align="left" style="padding:12px;border-top:1px solid #eee;background:#ffcc00;border-radius:12px 0 0 0;">Сайт</th><td style="padding:12px;border-top:1px solid #eee;background:#fff7cc;border-radius:0 12px 0 0;">${escapeHtml(lead.site)}</td></tr>
                <tr><th align="left" style="padding:12px;border-top:1px solid #eee;">Телефон</th><td style="padding:12px;border-top:1px solid #eee;font-weight:700;">${escapeHtml(lead.contact)}</td></tr>
                <tr><th align="left" style="padding:12px;border-top:1px solid #eee;">Источник</th><td style="padding:12px;border-top:1px solid #eee;">${escapeHtml(lead.niche)}</td></tr>
                <tr><th align="left" style="padding:12px;border-top:1px solid #eee;">Страница</th><td style="padding:12px;border-top:1px solid #eee;">${escapeHtml(lead.pageUrl || "не передана")}</td></tr>
                <tr><th align="left" style="padding:12px;border-top:1px solid #eee;">Время</th><td style="padding:12px;border-top:1px solid #eee;">${escapeHtml(meta.receivedAt)}</td></tr>
                ${utmRows || `<tr><th align="left" style="padding:12px;border-top:1px solid #eee;">UTM</th><td style="padding:12px;border-top:1px solid #eee;">UTM-меток нет</td></tr>`}
              </table>
              <p style="margin:24px 0 0;color:#777;font-size:13px;">IP: ${escapeHtml(meta.ip)}<br />User-Agent: ${escapeHtml(meta.userAgent)}</p>
            </td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, plainText, html };
}

function parseSmtpCode(response: string) {
  return Number(response.slice(0, 3));
}

export async function sendLeadEmail(lead: LeadPayload, meta: LeadMeta) {
  const config = readSmtpConfig();
  if (!config) return false;

  const { subject, plainText, html } = buildLeadEmail(lead, meta);
  const boundary = `allerhand-seo-${Date.now().toString(36)}`;
  const messageId = `<${Date.now()}.${Math.random().toString(36).slice(2)}@seoallerhand.ru>`;
  const message = [
    `From: ${encodeHeader("Allerhand SEO")} <${config.from}>`,
    `To: ${config.to}`,
    `Subject: ${encodeHeader(subject)}`,
    `Message-ID: ${messageId}`,
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    plainText,
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    html,
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n");

  await new Promise<void>((resolve, reject) => {
    const socket = connect({
      host: config.host,
      port: config.port,
      servername: config.host,
    });
    socket.setEncoding("utf8");
    socket.setTimeout(SMTP_TIMEOUT_MS);

    let buffer = "";
    const responseLines: string[] = [];
    let settled = false;

    const fail = (error: Error) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      reject(error);
    };

    const succeed = () => {
      if (settled) return;
      settled = true;
      socket.end();
      resolve();
    };

    const commands = [
      { command: `EHLO seoallerhand.ru`, expect: 250 },
      { command: "AUTH LOGIN", expect: 334 },
      { command: Buffer.from(config.user).toString("base64"), expect: 334 },
      { command: Buffer.from(config.pass).toString("base64"), expect: 235 },
      { command: `MAIL FROM:<${config.from}>`, expect: 250 },
      { command: `RCPT TO:<${config.to}>`, expect: 250 },
      { command: "DATA", expect: 354 },
      { command: `${dotStuff(message)}\r\n.`, expect: 250 },
      { command: "QUIT", expect: 221 },
    ];
    let commandIndex = -1;

    const sendNext = () => {
      commandIndex += 1;
      const next = commands[commandIndex];
      if (!next) {
        succeed();
        return;
      }
      socket.write(`${next.command}\r\n`);
    };

    const handleResponse = (response: string) => {
      const code = parseSmtpCode(response);
      const expected = commandIndex < 0 ? 220 : commands[commandIndex].expect;

      if (code !== expected) {
        fail(new Error(`SMTP responded with ${code}: ${response.trim()}`));
        return;
      }

      if (commandIndex === commands.length - 1) {
        succeed();
        return;
      }

      sendNext();
    };

    socket.on("secureConnect", () => {
      commandIndex = -1;
    });

    socket.on("data", (chunk: string) => {
      buffer += chunk;
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line) continue;
        responseLines.push(line);
        if (/^\d{3} /.test(line)) {
          handleResponse(responseLines.join("\n"));
          responseLines.length = 0;
        }
      }
    });

    socket.on("timeout", () => fail(new Error("SMTP timeout")));
    socket.on("error", fail);
  });

  return true;
}
