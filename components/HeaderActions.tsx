"use client";

import { useState } from "react";
import { QuickLeadTrigger } from "@/components/QuickLeadModal";

const phone = "+7 (995) 099-45-57";

const menuItems = [
  { href: "#cases", label: "Кейсы" },
  { href: "#process", label: "Как работает" },
  { href: "#faq", label: "Вопросы" },
];

const messengerLinks = [
  {
    href: "https://wa.me/message/2C3IEQDHIWNJK1",
    label: "WhatsApp",
    icon: "whatsapp",
  },
  {
    href: "https://t.me/allerhand_digital",
    label: "Telegram",
    icon: "telegram",
  },
  {
    href: "https://max.ru/u/f9LHodD0cOKKr1OSOqLW_N0KjdxosXHZtKdD-HlwTCoWZuLecLjuebW3ENU",
    label: "Max",
    icon: "max",
  },
] as const;

function MessengerIcon({ icon }: { icon: (typeof messengerLinks)[number]["icon"] }) {
  if (icon === "whatsapp") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.03 4C9.42 4 4.04 9.34 4.04 15.9c0 2.1.56 4.15 1.62 5.96L4 28l6.34-1.65a12.1 12.1 0 0 0 5.69 1.43c6.61 0 11.99-5.34 11.99-11.9C28.02 9.34 22.64 4 16.03 4Zm0 21.77c-1.8 0-3.56-.48-5.1-1.4l-.37-.22-3.76.98 1-3.64-.24-.38a9.77 9.77 0 0 1-1.5-5.22c0-5.45 4.48-9.88 9.98-9.88 5.5 0 9.97 4.43 9.97 9.88 0 5.45-4.47 9.88-9.97 9.88Zm5.47-7.39c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47a8.95 8.95 0 0 1-1.66-2.06c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.08-.8.37-.27.3-1.05 1.02-1.05 2.49 0 1.47 1.08 2.9 1.23 3.09.15.2 2.13 3.23 5.16 4.53.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"
        />
      </svg>
    );
  }

  if (icon === "telegram") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M26.8 6.2 22.9 24.6c-.3 1.3-1.06 1.62-2.16 1l-5.95-4.39-2.87 2.76c-.32.32-.58.58-1.2.58l.43-6.06L22.18 8.54c.48-.43-.1-.66-.74-.24L7.8 16.9l-5.87-1.84c-1.28-.4-1.3-1.28.27-1.9L25.16 4.3c1.06-.4 1.99.24 1.64 1.9Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.2 17V7h4.2l3.1 4.4L16.6 7h4.1v10h-4.1v-4.1l-2.2 3h-1.8l-2.2-3V17H6.2Zm15.8 0 4.4-10h4.3l4.4 10h-4.4l-.55-1.45h-3.35L26.25 17H22Zm5.8-4.15h1.35l-.68-1.86-.67 1.86Z"
      />
    </svg>
  );
}

export function HeaderActions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="header-actions">
      <div className="header-contacts" aria-label="Контакты">
        <a className="site-header__phone" href="tel:+79950994557">
          {phone}
        </a>
        <div className="messenger-links" aria-label="Мессенджеры">
          {messengerLinks.map((item) => (
            <a
              className={`messenger-link messenger-link--${item.label.toLowerCase()}`}
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
            >
              <MessengerIcon icon={item.icon} />
            </a>
          ))}
        </div>
      </div>
      <QuickLeadTrigger
        source="header"
        className="button button--header header-action header-action--desktop"
      >
        Выбрать запросы{" "}
        <span className="icon-arrow button__arrow" aria-hidden="true" />
      </QuickLeadTrigger>
      <button
        className={`mobile-menu-button${isMenuOpen ? " is-open" : ""}`}
        type="button"
        aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      {isMenuOpen && (
        <nav
          className="mobile-menu"
          id="mobile-navigation"
          aria-label="Мобильная навигация"
        >
          {menuItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
