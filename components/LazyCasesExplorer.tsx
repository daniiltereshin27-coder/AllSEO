"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";

type CasesExplorerComponent = ComponentType;

function CasesExplorerPlaceholder() {
  return (
    <section
      className="section section--case-explorer case-explorer-placeholder"
      id="cases"
      aria-label="Кейсы загружаются"
    >
      <div className="container">
        <div className="case-explorer__heading">
          <p className="eyebrow">Кейсы</p>
          <h2>Результаты наших клиентов</h2>
          <p>Подгружаем подтверждённые данные Topvisor.</p>
        </div>
      </div>
    </section>
  );
}

export function LazyCasesExplorer() {
  const [CasesExplorer, setCasesExplorer] =
    useState<CasesExplorerComponent | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const loadCases = useCallback(() => {
    if (loadingRef.current || CasesExplorer) return;
    loadingRef.current = true;

    void import("@/components/CasesExplorer").then((module) => {
      setCasesExplorer(() => module.CasesExplorer);
    });
  }, [CasesExplorer]);

  useEffect(() => {
    if (CasesExplorer) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    if (!("IntersectionObserver" in window)) {
      loadCases();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadCases();
          observer.disconnect();
        }
      },
      { rootMargin: "900px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [CasesExplorer, loadCases]);

  if (CasesExplorer) {
    return <CasesExplorer />;
  }

  return (
    <div ref={sentinelRef}>
      <CasesExplorerPlaceholder />
    </div>
  );
}
