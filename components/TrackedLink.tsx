"use client";

import { trackGoal } from "@/lib/analytics";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  goal: string;
  children: ReactNode;
};

export function TrackedLink({
  goal,
  children,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackGoal(goal, { source: props.href });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
