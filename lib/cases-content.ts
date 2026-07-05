export type CaseQuery = {
  query: string;
  position: string;
};

export type SeoCase = {
  slug: string;
  category: string;
  title: string;
  website?: string;
  meta: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  description?: string;
  metrics?: Array<{
    value: string;
    label: string;
  }>;
  queries: CaseQuery[];
  proof: string[];
};

export const caseCategories = [
  "Медицина",
  "Недвижимость",
  "Производство",
  "Юридические услуги",
  "Автосервисы",
  "Образование",
  "B2B",
  "E-commerce",
  "Строительство",
  "Локальный бизнес",
] as const;

export type CaseCategory = (typeof caseCategories)[number];

export const medicalCases: SeoCase[] = [
  {
    slug: "profident73",
    category: "Стоматология",
    title: "Profident73",
    website: "https://profident73.ru/",
    meta: "Ульяновск · стоматологическая клиника",
    image: "/cases/profident-topvisor.png",
    imageAlt: "Позиции сайта Profident73 в Topvisor",
    highlights: [
      "Большинство запросов в ТОП‑1",
      "507 ₽ стоимость заявки",
      "39,35% конверсия в запись",
    ],
    description:
      "Сайт profident73.ru вывели в ТОП по коммерческим запросам в Яндексе по региону Ульяновск. На срезе Topvisor от 01.05.2026 большинство запросов по услуге находились в ТОП‑1.",
    metrics: [
      { value: "155", label: "заявок из органического поиска" },
      { value: "507 ₽", label: "стоимость заявки с SEO" },
      { value: "39,35%", label: "конверсия в запись на приём" },
    ],
    queries: [
      { query: "лечение кариеса", position: "ТОП‑1" },
      { query: "имплантация зубов", position: "ТОП‑1" },
      { query: "протезирование зубов", position: "ТОП‑1" },
      { query: "удаление зубов", position: "ТОП‑1" },
      {
        query: "зубные протезы в Ульяновске цены",
        position: "ТОП‑1",
      },
      { query: "более 588 запросов в продвижении", position: "Topvisor" },
    ],
    proof: [
      "Источник: Topvisor, Яндекс, регион Ульяновск",
      "Срез: позиции проверены 01.05.2026",
      "Период: заявки считались за первый месяц",
    ],
  },
  {
    slug: "lumident",
    category: "Стоматология",
    title: "Люмидент",
    meta: "Москва · Яндекс · срез Topvisor 01.11.2025",
    image: "/cases/lumident-topvisor.png",
    imageAlt: "Позиции сайта Люмидент в Topvisor",
    highlights: ["5069 запросов в проекте", "ТОП‑1 по ключевым услугам"],
    queries: [
      { query: "лечение кариеса", position: "ТОП‑1" },
      { query: "детский стоматолог", position: "ТОП‑1" },
      { query: "протезирование зубов", position: "ТОП‑1" },
      { query: "имплантация зубов", position: "ТОП‑1" },
      { query: "отбеливание зубов", position: "ТОП‑1" },
    ],
    proof: ["Источник: Topvisor", "Поисковая система: Яндекс", "Регион: Москва"],
  },
  {
    slug: "zdorovih32",
    category: "Стоматология",
    title: "zdorovih32",
    meta: "Ульяновск · Яндекс · срез Topvisor 02.12.2024",
    image: "/cases/zdorovih32-topvisor.png",
    imageAlt: "Позиции сайта zdorovih32 в Topvisor",
    highlights: ["324 запроса в проекте", "ТОП‑5 по основным запросам"],
    queries: [
      { query: "стоматология", position: "ТОП‑1" },
      { query: "частная стоматология", position: "ТОП‑1" },
      { query: "протезирование зубов в Ульяновске", position: "ТОП‑1" },
      { query: "стоматология Ульяновск", position: "ТОП‑3" },
      { query: "стоматология цены", position: "ТОП‑4" },
    ],
    proof: [
      "Источник: Topvisor",
      "Поисковая система: Яндекс",
      "Регион: Ульяновск",
    ],
  },
  {
    slug: "dr-gauer",
    category: "Смежная медицинская тематика",
    title: "Dr. Gauer",
    meta: "Москва · Яндекс · срез Topvisor 24.03.2025",
    image: "/cases/dr-gauer-topvisor.jpg",
    imageAlt: "Позиции сайта Dr. Gauer в Topvisor",
    highlights: ["216 запросов", "+150% рост органического трафика"],
    queries: [
      { query: "пластика губ стоимость", position: "ТОП‑1" },
      { query: "хейлопластика Москва", position: "ТОП‑1" },
      { query: "пластика рубцов", position: "ТОП‑1" },
      { query: "липофилинг носогубных складок", position: "ТОП‑1" },
      { query: "лифтинг средней зоны лица", position: "ТОП‑1" },
    ],
    proof: ["Источник: Topvisor", "Поисковая система: Яндекс", "Регион: Москва"],
  },
  {
    slug: "shihirman",
    category: "Смежная медицинская тематика",
    title: "Shihirman",
    meta: "Москва · Яндекс · срез Topvisor 16.07.2024",
    image: "/cases/shihirman-topvisor.jpg",
    imageAlt: "Позиции сайта Shihirman в Topvisor",
    highlights: ["107 запросов", "ТОП‑10 по основным запросам"],
    queries: [
      { query: "ринопластика носа", position: "ТОП‑1" },
      { query: "клиника ринопластики", position: "ТОП‑1" },
      { query: "пластика носа", position: "ТОП‑2" },
      { query: "ринопластика", position: "ТОП‑5" },
      { query: "операция на нос", position: "ТОП‑6" },
    ],
    proof: ["Источник: Topvisor", "Поисковая система: Яндекс", "Регион: Москва"],
  },
];

export const realEstateCases: SeoCase[] = [
  {
    slug: "coast-invest",
    category: "Инвестиционная недвижимость",
    title: "COAST INVEST",
    meta: "Краснодар · Яндекс · срез Topvisor 01.06.2026",
    image: "/cases/coast-invest-topvisor.png",
    imageAlt: "Позиции проекта COAST INVEST в Topvisor",
    highlights: [
      "Большинство запросов в ТОП‑3",
      "320 ₽ стоимость лида",
      "7,8% конверсия в заявку",
    ],
    queries: [
      { query: "инвестиции в недвижимость Крыма", position: "ТОП‑1" },
      { query: "купить апартаменты Крым", position: "ТОП‑2" },
      { query: "инвестиции в недвижимость Таиланд", position: "ТОП‑1" },
      { query: "купить недвижимость Таиланд", position: "ТОП‑3" },
      { query: "купить квартиру у моря Крым", position: "ТОП‑2" },
      { query: "15 запросов в продвижении", position: "Topvisor" },
    ],
    proof: [
      "Источник: Topvisor",
      "Поисковая система: Яндекс",
      "Срез позиций: 01.06.2026",
    ],
  },
];

export const b2bCases: SeoCase[] = [
  {
    slug: "gaztrade",
    category: "Оптовые поставки СУГ",
    title: "GazTrade",
    meta: "Москва · Яндекс · срез Topvisor 01.06.2025",
    image: "/cases/gaztrade-topvisor.png",
    imageAlt: "Позиции проекта GazTrade в Topvisor",
    highlights: [
      "Большинство коммерческих запросов в ТОП‑3",
      "410 ₽ стоимость заявки",
      "9,4% конверсия в заявку",
    ],
    queries: [
      { query: "газ оптом Москва", position: "ТОП‑1" },
      { query: "пропан оптом Москва", position: "ТОП‑2" },
      { query: "доставка газа", position: "ТОП‑1" },
      { query: "изобутан купить", position: "ТОП‑3" },
      { query: "газовый баллон 50 литров", position: "ТОП‑2" },
      { query: "более 1024 запросов в продвижении", position: "Topvisor" },
    ],
    proof: [
      "Источник: Topvisor",
      "Поисковая система: Яндекс",
      "Регион: Москва",
      "Срез позиций: 01.06.2025",
    ],
  },
];
