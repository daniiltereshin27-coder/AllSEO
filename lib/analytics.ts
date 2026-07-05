"use client";

declare global {
  interface Window {
    ym?: (counterId: number, action: string, goal: string, params?: object) => void;
  }
}

export function trackGoal(goal: string, params?: object) {
  const rawId = process.env.NEXT_PUBLIC_YM_ID;
  const counterId = rawId ? Number(rawId) : 0;

  if (!counterId || typeof window === "undefined" || !window.ym) {
    return;
  }

  window.ym(counterId, "reachGoal", goal, params);
}
