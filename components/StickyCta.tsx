"use client";

import { QuickLeadTrigger } from "@/components/QuickLeadModal";
import { useEffect, useState } from "react";

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroForm = document.getElementById("hero-form");
    if (!heroForm) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(heroForm);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`sticky-cta ${visible ? "is-visible" : ""}`}>
      <div className="sticky-cta__copy">
        <strong>10 запросов · 2 дня · 0 ₽</strong>
        <span>Цель теста — вся группа одновременно в ТОП‑10</span>
      </div>
      <QuickLeadTrigger
        source="sticky"
        className="button button--primary"
      >
        Выбрать запросы <span aria-hidden="true">↗</span>
      </QuickLeadTrigger>
    </div>
  );
}
