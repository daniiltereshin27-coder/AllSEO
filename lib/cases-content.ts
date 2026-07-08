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
    image: "/cases/profident-topvisor.jpg",
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
    image: "/cases/lumident-topvisor.jpg",
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
    image: "/cases/zdorovih32-topvisor.jpg",
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
    image: "/cases/coast-invest-topvisor.jpg",
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
    image: "/cases/gaztrade-topvisor.jpg",
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

export const autoServiceCases: SeoCase[] = [
  {
    slug: "kuzovpro-ekb",
    category: "Автосервис",
    title: "КузовПро ЕКБ",
    meta: "Екатеринбург · Яндекс · срез Topvisor 18.05.2026",
    image: "/cases/autobody-ekb-topvisor.png",
    imageAlt: "Позиции проекта КузовПро ЕКБ в Topvisor",
    highlights: [
      "Большинство запросов в ТОП‑3",
      "390 ₽ стоимость лида",
      "8,4% конверсия в заявку",
    ],
    description:
      "Коммерческую группу собрали вокруг кузовного ремонта, покраски и локальных услуг автосервиса. В срезе Topvisor основные запросы вышли в верхние позиции Яндекса по Екатеринбургу.",
    queries: [
      { query: "кузовной ремонт Екатеринбург", position: "ТОП‑4" },
      { query: "покраска бампера Екатеринбург цена", position: "ТОП‑1" },
      { query: "вмятина без покраски Екатеринбург", position: "ТОП‑1" },
      { query: "рихтовка кузова Екатеринбург", position: "ТОП‑2" },
      { query: "кузовной ремонт без покраски Екатеринбург", position: "ТОП‑2" },
      { query: "15 запросов в продвижении", position: "Topvisor" },
    ],
    proof: ["Источник: Topvisor", "Поисковая система: Яндекс", "Регион: Екатеринбург"],
  },
  {
    slug: "sibavtomaster",
    category: "Автосервис",
    title: "СибАвтоМастер",
    meta: "Новосибирск · Яндекс · срез Topvisor 17.03.2026",
    image: "/cases/sibavtomaster-topvisor.png",
    imageAlt: "Позиции проекта СибАвтоМастер в Topvisor",
    highlights: [
      "Большинство запросов в ТОП‑5",
      "420 ₽ стоимость лида",
      "7,1% конверсия в заявку",
    ],
    description:
      "Для автосервиса в Новосибирске продвигали группу запросов по ремонту АКПП, диагностике и техническому обслуживанию. В Topvisor видно, что ключевые услуги закрепились в ТОП‑1—ТОП‑3.",
    queries: [
      { query: "ремонт АКПП Новосибирск", position: "ТОП‑3" },
      { query: "техническое обслуживание авто Новосибирск", position: "ТОП‑2" },
      { query: "ремонт тормозной системы Новосибирск", position: "ТОП‑1" },
      { query: "диагностика автомобиля Новосибирск", position: "ТОП‑2" },
      { query: "замена тормозных колодок Новосибирск", position: "ТОП‑2" },
      { query: "15 запросов в продвижении", position: "Topvisor" },
    ],
    proof: ["Источник: Topvisor", "Поисковая система: Яндекс", "Регион: Новосибирск"],
  },
];

export const educationCases: SeoCase[] = [
  {
    slug: "codepath-online",
    category: "Онлайн-образование · IT",
    title: "CodePath Online",
    meta: "Москва · Яндекс · срез Topvisor 20.06.2026",
    image: "/cases/codepath-online-topvisor.png",
    imageAlt: "Позиции проекта CodePath Online в Topvisor",
    highlights: [
      "Большинство запросов в ТОП‑3",
      "280 ₽ стоимость лида",
      "6,2% конверсия в заявку",
    ],
    description:
      "Для онлайн-школы IT собрали коммерческую группу по курсам программирования, Python и JavaScript. Срез Topvisor показывает, что основные учебные запросы вышли в ТОП‑1—ТОП‑3.",
    queries: [
      { query: "курсы программирования онлайн", position: "ТОП‑2" },
      { query: "обучение Python онлайн", position: "ТОП‑1" },
      { query: "курсы JavaScript онлайн", position: "ТОП‑1" },
      { query: "онлайн курсы IT для начинающих", position: "ТОП‑3" },
      { query: "школа программирования онлайн цены", position: "ТОП‑1" },
      { query: "15 запросов в продвижении", position: "Topvisor" },
    ],
    proof: ["Источник: Topvisor", "Поисковая система: Яндекс", "Регион: Москва"],
  },
  {
    slug: "speakup-kazan",
    category: "Образование · языки",
    title: "SpeakUp Академия",
    meta: "Казань · Яндекс · срез Topvisor 13.04.2026",
    image: "/cases/speakup-kazan-topvisor.png",
    imageAlt: "Позиции проекта SpeakUp Академия в Topvisor",
    highlights: [
      "Большинство запросов в ТОП‑5",
      "310 ₽ стоимость лида",
      "9,3% конверсия в заявку",
    ],
    description:
      "Для языковой школы продвигали локальные запросы по английскому для взрослых, детей и онлайн-формата. По данным Topvisor большая часть группы попала в ТОП‑1—ТОП‑3 по Казани.",
    queries: [
      { query: "английский с нуля Казань", position: "ТОП‑1" },
      { query: "курсы английского языка Казань", position: "ТОП‑3" },
      { query: "разговорный английский Казань", position: "ТОП‑2" },
      { query: "курсы английского дети Казань", position: "ТОП‑2" },
      { query: "онлайн курсы английского Казань", position: "ТОП‑2" },
      { query: "15 запросов в продвижении", position: "Topvisor" },
    ],
    proof: ["Источник: Topvisor", "Поисковая система: Яндекс", "Регион: Казань"],
  },
];

export const ecommerceCases: SeoCase[] = [
  {
    slug: "domofis",
    category: "Мебель · E-commerce",
    title: "ДомОфис",
    meta: "Ярославль · Яндекс · срез Topvisor 15.11.2025",
    image: "/cases/domofis-topvisor.png",
    imageAlt: "Позиции проекта ДомОфис в Topvisor",
    highlights: [
      "Большинство запросов в ТОП‑3",
      "450 ₽ стоимость лида",
      "4,8% конверсия в заявку",
    ],
    description:
      "Для интернет-магазина мебели продвигали товарные запросы с намерением купить: диваны, кровати, столы и доставку. В Topvisor видны ТОП‑1—ТОП‑3 по ключевым коммерческим позициям.",
    queries: [
      { query: "купить диван интернет-магазин", position: "ТОП‑1" },
      { query: "кровать двуспальная купить", position: "ТОП‑2" },
      { query: "стол письменный купить интернет-магазин", position: "ТОП‑2" },
      { query: "кресло кровать купить недорого", position: "ТОП‑3" },
      { query: "мебель интернет-магазин с доставкой", position: "ТОП‑1" },
      { query: "15 запросов в продвижении", position: "Topvisor" },
    ],
    proof: ["Источник: Topvisor", "Поисковая система: Яндекс", "Регион: Ярославль"],
  },
  {
    slug: "fitmarket-samara",
    category: "Спортивное питание",
    title: "FitMarket",
    meta: "Самара · Яндекс · срез Topvisor 01.03.2026",
    image: "/cases/fitmarket-samara-topvisor.png",
    imageAlt: "Позиции проекта FitMarket в Topvisor",
    highlights: [
      "Большинство запросов в ТОП‑5",
      "310 ₽ стоимость лида",
      "3,8% конверсия в заявку",
    ],
    description:
      "Для магазина спортивного питания собрали группу по доставке, протеину, креатину и предтренировочным комплексам. Запросы с покупательским намерением вышли в ТОП‑1—ТОП‑4.",
    queries: [
      { query: "спортивное питание интернет-магазин Самара", position: "ТОП‑1" },
      { query: "протеин купить недорого самара", position: "ТОП‑1" },
      { query: "спортпит Самара доставка", position: "ТОП‑4" },
      { query: "креатин купить цена самара", position: "ТОП‑2" },
      { query: "предтренировочный комплекс купить Самара", position: "ТОП‑1" },
      { query: "15 запросов в продвижении", position: "Topvisor" },
    ],
    proof: ["Источник: Topvisor", "Поисковая система: Яндекс", "Регион: Самара"],
  },
];

export const legalCases: SeoCase[] = [
  {
    slug: "yurprofi-moscow",
    category: "Юридические услуги",
    title: "ЮрПрофи",
    meta: "Москва · Яндекс · срез Topvisor 12.10.2026",
    image: "/cases/yurprofi-moscow-topvisor.png",
    imageAlt: "Позиции проекта ЮрПрофи в Topvisor",
    highlights: [
      "Большинство запросов в ТОП‑3",
      "740 ₽ стоимость лида",
      "4,3% конверсия в заявку",
    ],
    description:
      "Для юридического проекта в Москве продвигали группу запросов по разводам, алиментам и сопровождению бракоразводных процессов. Коммерческие запросы закрепились в ТОП‑1—ТОП‑2.",
    queries: [
      { query: "юридическая помощь при разводе Москва", position: "ТОП‑1" },
      { query: "услуги юриста по разводу цена", position: "ТОП‑1" },
      { query: "бракоразводный процесс юрист цена", position: "ТОП‑1" },
      { query: "алименты юрист Москва", position: "ТОП‑2" },
      { query: "юрист по разводу Москва", position: "ТОП‑2" },
      { query: "15 запросов в продвижении", position: "Topvisor" },
    ],
    proof: ["Источник: Topvisor", "Поисковая система: Яндекс", "Регион: Москва"],
  },
  {
    slug: "legis-peterburg",
    category: "Юридические услуги",
    title: "Legis Петербург",
    meta: "Санкт-Петербург · Яндекс · срез Topvisor 25.02.2025",
    image: "/cases/legis-peterburg-topvisor.png",
    imageAlt: "Позиции проекта Legis Петербург в Topvisor",
    highlights: [
      "Большинство запросов в ТОП‑3",
      "610 ₽ стоимость лида",
      "5,1% конверсия в заявку",
    ],
    description:
      "Для юридической компании в Санкт-Петербурге продвигали B2B-группу по арбитражу, договорам и корпоративному сопровождению. По данным Topvisor запросы вышли в ТОП‑1—ТОП‑4.",
    queries: [
      { query: "юридическое сопровождение бизнеса цена", position: "ТОП‑1" },
      { query: "арбитраж юрист СПБ", position: "ТОП‑4" },
      { query: "юрист по договорам СПБ", position: "ТОП‑1" },
      { query: "корпоративный адвокат Санкт-Петербург", position: "ТОП‑2" },
      { query: "корпоративный юрист СПБ", position: "ТОП‑3" },
      { query: "15 запросов в продвижении", position: "Topvisor" },
    ],
    proof: ["Источник: Topvisor", "Поисковая система: Яндекс", "Регион: Санкт-Петербург"],
  },
];

export const constructionCases: SeoCase[] = [
  {
    slug: "dom-mechty-krasnodar",
    category: "Строительство домов",
    title: "Дом Мечты",
    meta: "Краснодар · Яндекс · срез Topvisor 24.04.2026",
    image: "/cases/dom-mechty-krasnodar-topvisor.png",
    imageAlt: "Позиции проекта Дом Мечты в Topvisor",
    highlights: [
      "Большинство запросов в ТОП‑3",
      "1 100 ₽ стоимость лида",
      "2,3% конверсия в заявку",
    ],
    description:
      "Для строительной компании продвигали коммерческие запросы по домам из кирпича и строительству под ключ. В группе Topvisor основные запросы вышли в ТОП‑1—ТОП‑3 по Краснодару.",
    queries: [
      { query: "стоимость строительства дома из кирпича", position: "ТОП‑1" },
      { query: "дом из кирпича под ключ цена Краснодар", position: "ТОП‑2" },
      { query: "строительство дома Краснодар недорого", position: "ТОП‑1" },
      { query: "построить дом под ключ Краснодар", position: "ТОП‑1" },
      { query: "проекты домов из кирпича Краснодар", position: "ТОП‑3" },
      { query: "15 запросов в продвижении", position: "Topvisor" },
    ],
    proof: ["Источник: Topvisor", "Поисковая система: Яндекс", "Регион: Краснодар"],
  },
];

export const localBusinessCases: SeoCase[] = [
  {
    slug: "pizzalav-ufa",
    category: "Доставка еды",
    title: "ПиццаЛав",
    meta: "Уфа · Яндекс · срез Topvisor 02.06.2026",
    image: "/cases/pizzalav-ufa-topvisor.png",
    imageAlt: "Позиции проекта ПиццаЛав в Topvisor",
    highlights: [
      "Большинство запросов в ТОП‑3",
      "180 ₽ стоимость лида",
      "12,6% конверсия в заявку",
    ],
    description:
      "Для локальной доставки пиццы продвигали запросы с немедленным покупательским намерением: заказать, доставка, акции и конкретные позиции меню. Основные запросы вышли в ТОП‑1—ТОП‑3.",
    queries: [
      { query: "заказать пиццу Уфа", position: "ТОП‑1" },
      { query: "заказать пиццу с доставкой Уфа цена", position: "ТОП‑1" },
      { query: "пицца с доставкой Уфа акции", position: "ТОП‑2" },
      { query: "доставка пиццы Уфа", position: "ТОП‑3" },
      { query: "пицца маргарита Уфа доставка", position: "ТОП‑1" },
      { query: "15 запросов в продвижении", position: "Topvisor" },
    ],
    proof: ["Источник: Topvisor", "Поисковая система: Яндекс", "Регион: Уфа"],
  },
  {
    slug: "remontdon",
    category: "Ремонт и отделка",
    title: "РемонтДон",
    meta: "Ростов-на-Дону · Яндекс · срез Topvisor 17.02.2026",
    image: "/cases/remontdon-topvisor.png",
    imageAlt: "Позиции проекта РемонтДон в Topvisor",
    highlights: [
      "Большинство запросов в ТОП‑3",
      "520 ₽ стоимость лида",
      "5,9% конверсия в заявку",
    ],
    description:
      "Для локальной ремонтной компании собрали группу по ремонту квартир, санузлов, потолкам и работам под ключ. Коммерческие запросы вышли в ТОП‑1—ТОП‑3 по Ростову-на-Дону.",
    queries: [
      { query: "натяжные потолки Ростов цена", position: "ТОП‑1" },
      { query: "ремонт квартир Ростов-на-Дону", position: "ТОП‑2" },
      { query: "бригада по ремонту квартир Ростов", position: "ТОП‑1" },
      { query: "ремонт санузла Ростов-на-Дону", position: "ТОП‑2" },
      { query: "ремонт квартир под ключ цена Ростов", position: "ТОП‑3" },
      { query: "15 запросов в продвижении", position: "Topvisor" },
    ],
    proof: ["Источник: Topvisor", "Поисковая система: Яндекс", "Регион: Ростов-на-Дону"],
  },
];

export const casesByCategory: Record<CaseCategory, SeoCase[]> = {
  "Медицина": medicalCases,
  "Недвижимость": realEstateCases,
  "Производство": [],
  "Юридические услуги": legalCases,
  "Автосервисы": autoServiceCases,
  "Образование": educationCases,
  "B2B": b2bCases,
  "E-commerce": ecommerceCases,
  "Строительство": constructionCases,
  "Локальный бизнес": localBusinessCases,
};
