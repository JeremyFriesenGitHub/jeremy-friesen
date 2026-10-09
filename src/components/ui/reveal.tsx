"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "~/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds. Use for stagger within a grid. */
  delay?: number;
  /** Starting vertical offset in px. */
  y?: number;
}

/**
 * Fades + lifts content into place the first time it scrolls into view.
 * Pure CSS transition (opacity/translate only). One IntersectionObserver flips
 * a data attribute on the element, so revealing never re-renders React. The
 * hidden state only applies when JS is running (`html.js`), so the page stays
 * fully readable without it.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.reveal === "shown") return;
    if (!("IntersectionObserver" in window)) {
      el.dataset.reveal = "shown";
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.dataset.reveal = "shown";
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal="pending"
      className={cn("reveal", className)}
      style={
        {
          "--reveal-y": `${y}px`,
          transitionDelay: delay ? `${delay}s` : undefined,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
