"use client";

import { useState } from "react";
import { QuickLeadTrigger } from "@/components/QuickLeadModal";

const menuItems = [
  { href: "#cases", label: "Кейсы" },
  { href: "#process", label: "Как работает" },
  { href: "#faq", label: "Вопросы" },
];

export function HeaderActions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <QuickLeadTrigger
        source="header"
        className="button button--header header-action header-action--desktop"
      >
        Выбрать запросы{" "}
        <span className="icon-arrow button__arrow" aria-hidden="true" />
      </QuickLeadTrigger>
      <a className="site-header__phone" href="tel:+79950994557">
        +7 (995) 099-45-57
      </a>
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
    </>
  );
}
