# Allerhand SEO landing

Отдельный лендинг бесплатного SEO-демотеста на Next.js.

## Запуск

```bash
npm install
cp .env.example .env.local
npm run dev
```

Откройте `http://localhost:3000`.

## Интеграция заявок

Укажите в `.env.local`:

```env
LEAD_WEBHOOK_URL=https://example.com/webhook
LEAD_WEBHOOK_SECRET=optional-secret
NEXT_PUBLIC_YM_ID=12345678
```

`POST /api/leads` отправляет в webhook событие:

```json
{
  "event": "allerhand_seo_demo_request",
  "lead": {
    "site": "https://example.ru",
    "niche": "Не указана",
    "contact": "+7 (999) 000-00-00",
    "consent": true,
    "utm": {},
    "pageUrl": "https://landing.example/",
    "submittedAt": "2026-06-24T00:00:00.000Z"
  },
  "meta": {
    "ip": "127.0.0.1",
    "userAgent": "...",
    "receivedAt": "2026-06-24T00:00:01.000Z"
  }
}
```

Если задан `LEAD_WEBHOOK_SECRET`, он передаётся заголовком
`Authorization: Bearer <secret>`.

После production-сборки контракт обработчика можно проверить командой:

```bash
npm run verify:api
```

Проверяются валидация, доставка с секретом, защита от дублей, ошибка webhook,
таймаут и ограничение частоты запросов.

## Контент

Тексты, FAQ, заглушки кейсов и параметры оффера находятся в
`lib/site-content.ts`.
