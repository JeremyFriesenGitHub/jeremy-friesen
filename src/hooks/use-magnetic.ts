"use client";

import { useEffect, type RefObject } from "react";

/**
 * Pulls an element toward the mouse while the pointer is over it and lets
 * it spring back on leave. Writes `transform` only (so it composes with the
 * `translate` and `scale` that hover lifts and presses use), marks the
 * element `data-magnet` while it follows, and does nothing for touch,
 * reduced motion or paused effects.
 */
export function useMagnetic<T extends HTMLElement>(
  ref: RefObject<T | null>,
  strength = 0.3,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || reduceMotion.matches) return;
      if (document.documentElement.classList.contains("reduce-effects")) return;
      // Layout box, not getBoundingClientRect: the pull itself moves the box.
      const rect = el.getBoundingClientRect();
      const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
      const cx = rect.left - m.m41 + rect.width / 2;
      const cy = rect.top - m.m42 + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.dataset.magnet = "";
      el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
    };
    const onLeave = () => {
      delete el.dataset.magnet;
      el.style.transform = "";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, [ref, strength]);
}
