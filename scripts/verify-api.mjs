import assert from "node:assert/strict";

const route = await import("../.next/server/app/api/leads/route.js");
const { POST } = route.default.routeModule.userland;
const originalFetch = globalThis.fetch;

function request(body, ip) {
  return new Request("http://localhost/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

const validLead = {
  site: "example.ru",
  contact: "+7 (999) 000-00-01",
  consent: true,
  utm: { utm_source: "qa", ignored: "value" },
  pageUrl: "https://landing.test/?utm_source=qa",
  submittedAt: "2026-06-24T18:00:00.000Z",
};

try {
  const invalid = await POST(
    request(
      { site: "bad", contact: "x", consent: false },
      "198.51.100.1",
    ),
  );
  assert.equal(invalid.status, 400);
  const invalidBody = await invalid.json();
  assert.deepEqual(Object.keys(invalidBody.fields).sort(), [
    "consent",
    "contact",
    "site",
  ]);

  process.env.LEAD_WEBHOOK_URL = "https://webhook.test/leads";
  process.env.LEAD_WEBHOOK_SECRET = "test-secret";

  let delivered;
  globalThis.fetch = async (url, init) => {
    delivered = { url, init };
    return new Response(null, { status: 202 });
  };

  const success = await POST(request(validLead, "198.51.100.2"));
  assert.equal(success.status, 200);
  assert.equal(delivered.url, process.env.LEAD_WEBHOOK_URL);
  assert.equal(delivered.init.headers.Authorization, "Bearer test-secret");
  const webhookBody = JSON.parse(delivered.init.body);
  assert.equal(webhookBody.lead.site, "https://example.ru");
  assert.equal(webhookBody.lead.niche, "Не указана");
  assert.equal(webhookBody.lead.contact, "+7 (999) 000-00-01");
  assert.deepEqual(webhookBody.lead.utm, { utm_source: "qa" });

  delivered = undefined;
  const abandoned = await POST(
    request(
      {
        leadType: "abandoned_phone",
        contact: "+7 (999) 000-00-04",
        consent: false,
        niche: "Незавершённая заявка · qa-form",
        pageUrl: "https://landing.test/?utm_source=qa",
        submittedAt: "2026-06-24T18:01:00.000Z",
      },
      "198.51.100.22",
    ),
  );
  assert.equal(abandoned.status, 200);
  const abandonedWebhookBody = JSON.parse(delivered.init.body);
  assert.equal(abandonedWebhookBody.event, "allerhand_seo_abandoned_phone");
  assert.equal(abandonedWebhookBody.lead.leadType, "abandoned_phone");
  assert.equal(abandonedWebhookBody.lead.site, "https://landing.test");
  assert.equal(abandonedWebhookBody.lead.contact, "+7 (999) 000-00-04");

  const duplicate = await POST(request(validLead, "198.51.100.2"));
  assert.equal(duplicate.status, 409);

  globalThis.fetch = async () => new Response(null, { status: 500 });
  const webhookError = await POST(
    request({ ...validLead, contact: "+7 (999) 000-00-02" }, "198.51.100.3"),
  );
  assert.equal(webhookError.status, 502);

  globalThis.fetch = async (_url, init) =>
    new Promise((_resolve, reject) => {
      init.signal.addEventListener("abort", () => {
        reject(new DOMException("Aborted", "AbortError"));
      });
    });
  const timeout = await POST(
    request({ ...validLead, contact: "+7 (999) 000-00-03" }, "198.51.100.4"),
  );
  assert.equal(timeout.status, 502);

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await POST(
      request(
        { site: "bad", contact: "x", consent: false },
        "198.51.100.5",
      ),
    );
    assert.equal(response.status, 400);
  }
  const rateLimited = await POST(
    request(
      { site: "bad", contact: "x", consent: false },
      "198.51.100.5",
    ),
  );
  assert.equal(rateLimited.status, 429);

  console.log("API verification passed: validation, delivery, abandoned lead, duplicate, error, timeout, rate limit.");
} finally {
  globalThis.fetch = originalFetch;
  delete process.env.LEAD_WEBHOOK_URL;
  delete process.env.LEAD_WEBHOOK_SECRET;
}
