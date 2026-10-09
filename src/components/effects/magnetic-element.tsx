"use client";

import { useCallback, useRef } from "react";
import { cn } from "~/lib/utils";

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  /** How far the element follows the pointer (0–1 of the pointer offset). */
  distance?: number;
}

/**
 * Nudges its child toward the mouse pointer and eases back on leave. Writes
 * the CSS `translate` property directly (compositor-only, no React state) and
 * does nothing for touch pointers or reduced-motion users.
 */
export function MagneticElement({
  children,
  className,
  distance = 0.3,
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el || e.pointerType !== "mouse") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * distance;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * distance;
      el.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
    },
    [distance],
  );

  const onPointerLeave = useCallback(() => {
    if (ref.current) ref.current.style.translate = "0px 0px";
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn("transition-[translate] duration-300 ease-out", className)}
    >
      {children}
    </div>
  );
}
