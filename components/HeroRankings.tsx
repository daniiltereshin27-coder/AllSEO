"use client";

import { rankingQueries } from "@/lib/site-content";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export function HeroRankings() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const compactMotion = window.matchMedia("(max-width: 560px)").matches;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-rank]"));
    const counters = Array.from(
      root.querySelectorAll<HTMLElement>("[data-counter]"),
    );
    const confirmation = root.querySelector<HTMLElement>("[data-confirmation]");
    const goalCounter = root.querySelector<HTMLElement>("[data-goal-counter]");
    const glow = root.querySelector<HTMLElement>("[data-glow]");
    const growthLine = root.querySelector<SVGPathElement>("[data-growth-line]");
    const startMarker = root.querySelector<HTMLElement>("[data-start-marker]");
    const endMarker = root.querySelector<HTMLElement>("[data-end-marker]");
    if (!growthLine) return;

    const growthLength = growthLine.getTotalLength();
    growthLine.style.strokeDasharray = `${growthLength}`;
    growthLine.style.strokeDashoffset = `${growthLength}`;

    if (reduceMotion || compactMotion) {
      cards.forEach((card) => gsap.set(card, { xPercent: 0, opacity: 1 }));
      counters.forEach((counter, index) => {
        counter.textContent = String(rankingQueries[index].to);
      });
      confirmation?.classList.add("is-shown");
      if (goalCounter) goalCounter.textContent = "10";
      growthLine.style.strokeDashoffset = "0";
      gsap.set([startMarker, endMarker], { opacity: 1, scale: 1 });
      return;
    }

    const context = gsap.context(() => {
      gsap.set(cards, { x: 18, opacity: 0, scale: 0.97 });
      gsap.set(confirmation, { opacity: 0, y: 8 });
      gsap.set(glow, { opacity: 0 });
      gsap.set(growthLine, { strokeDashoffset: growthLength });
      gsap.set(startMarker, {
        opacity: 0,
        scale: 0.88,
        transformOrigin: "left center",
      });
      gsap.set(endMarker, {
        opacity: 0,
        scale: 0.88,
        transformOrigin: "right center",
      });
      if (goalCounter) goalCounter.textContent = "0";

      const timeline = gsap.timeline({
        paused: true,
      });

      timeline
        .to(startMarker, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.6)",
        })
        .to(
          growthLine,
          {
            strokeDashoffset: 0,
            duration: 2.15,
            ease: "power2.out",
          },
          ">-0.04",
        )
        .to(
          endMarker,
          {
            opacity: 1,
            scale: 1,
            duration: 0.38,
            ease: "back.out(1.8)",
          },
          ">-0.02",
        );

      [...cards].reverse().forEach((card, reverseIndex) => {
        const index = cards.indexOf(card);
        const startAt = 0.55 + reverseIndex * 0.11;

        timeline.to(
          card,
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.32,
            ease: "power2.out",
          },
          startAt,
        );
        timeline.to(
          counters[index],
          {
            textContent: rankingQueries[index].to,
            snap: { textContent: 1 },
            duration: 0.42,
            ease: "power1.out",
          },
          startAt,
        );
      });

      timeline
        .to(
          glow,
          {
            opacity: 1,
            duration: 0.4,
          },
          2.35,
        )
        .to(
          confirmation,
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          },
          2.8,
        );

      if (goalCounter) {
        const count = { value: 0 };
        timeline.to(
          count,
          {
            value: 10,
            duration: 0.75,
            ease: "power2.out",
            snap: { value: 1 },
            onUpdate: () => {
              goalCounter.textContent = String(Math.round(count.value));
            },
          },
          2.92,
        );
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            timeline.restart();
          } else {
            timeline.pause();
          }
        },
        { threshold: 0.25 },
      );
      observer.observe(root);

      const handlePointer = (event: PointerEvent) => {
        const bounds = root.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
        root.style.setProperty("--pointer-x", `${x * 1.2}deg`);
        root.style.setProperty("--pointer-y", `${y * 1}deg`);
      };
      root.addEventListener("pointermove", handlePointer);

      return () => {
        observer.disconnect();
        root.removeEventListener("pointermove", handlePointer);
      };
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div className="ranking-board" ref={rootRef} aria-label="Динамика позиций">
      <div className="ranking-board__ambient" aria-hidden="true" />
      <div className="ranking-board__header">
        <div className="ranking-board__live">
          <span className="ranking-board__live-dot" />
          LIVE
        </div>
      </div>
      <div className="ranking-board__zone" data-glow aria-hidden="true" />
      <div className="ranking-board__axis" aria-hidden="true">
        <span>ТОП‑1</span>
        <span>ТОП‑5</span>
        <span>ТОП‑10</span>
        <span>ТОП‑20</span>
        <span>ТОП‑30</span>
        <span>ТОП‑40</span>
      </div>
      <svg
        className="ranking-board__growth"
        viewBox="0 0 760 340"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          data-growth-line
          className="ranking-board__growth-line"
          d="M18 310 C88 314 106 286 168 278 C232 270 246 244 306 235 C368 226 382 198 444 184 C508 170 526 128 586 96 C646 64 682 30 742 8"
        />
      </svg>
      <div className="ranking-board__marker-layer" aria-hidden="true">
        <div
          data-start-marker
          className="ranking-board__marker ranking-board__marker--start"
        >
          <span className="ranking-board__marker-dot" />
          <span className="ranking-board__marker-label">
            <span className="ranking-board__marker-label--desktop">
              Ваш сайт сейчас
            </span>
            <span className="ranking-board__marker-label--mobile">Сейчас</span>
          </span>
        </div>
        <div
          data-end-marker
          className="ranking-board__marker ranking-board__marker--end"
        >
          <span className="ranking-board__marker-label">
            <span className="ranking-board__marker-label--desktop">
              Ваш сайт с нами
            </span>
            <span className="ranking-board__marker-label--mobile">С нами</span>
          </span>
          <span className="ranking-board__marker-dot">
            <span className="ranking-board__marker-ring" />
          </span>
        </div>
      </div>
      <div className="ranking-board__rows">
        {rankingQueries.map((item, index) => (
          <div className="ranking-row" key={item.query}>
            <div className="ranking-row__track">
              <div
                className="ranking-row__card"
                data-rank
                style={{ "--row": index } as React.CSSProperties}
              >
                <span className="ranking-row__query">{item.query}</span>
                <span className="ranking-row__position">
                  <span data-counter>{item.from}</span>
                  <small>место</small>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="ranking-board__confirmation" data-confirmation>
        <span>✓</span>
        <strong>
          Цель: <span data-goal-counter>0</span> из 10
        </strong>
        <small>ваши запросы в ТОП‑10</small>
      </div>
    </div>
  );
}
