import type { Metadata, Viewport } from "next";
import { YandexMetrika } from "@/components/YandexMetrika";
import "./globals.css";

export const metadata: Metadata = {
  title: "Цель теста: 10 запросов в ТОП‑10 Яндекса за 2 дня | Allerhand SEO",
  description:
    "Бесплатная проверка сайта и демо-тест с целью одновременно вывести 10 коммерческих запросов одной группы в ТОП‑10 Яндекса за 2 дня после старта.",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Бесплатный SEO-демотест Allerhand SEO",
    description:
      "Цель демо-теста — одновременно вывести в ТОП Яндекса 10 целевых запросов за 2 дня после согласования и старта.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <YandexMetrika />
        {children}
      </body>
    </html>
  );
}
