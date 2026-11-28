"use client";

import { useEffect, useRef, type ComponentProps } from "react";

/**
 * A <section> whose looping CSS animations (the floats, the shimmer, the
 * nudge) hold still while it is off screen. Browsers keep running them out
 * of view, and a repaint-only one such as the hero's shimmer costs a frame
 * of main-thread work on every display refresh for as long as the page is
 * open. It marks itself `data-offscreen`; globals.css does the pausing.
 */
export function PausingSection({
  children,
  ...props
}: Omit<ComponentProps<"section">, "ref">) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      // A late callback can carry several changes, oldest first.
      const entry = entries.at(-1);
      if (entry) el.toggleAttribute("data-offscreen", !entry.isIntersecting);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} {...props}>
      {children}
    </section>
  );
}
