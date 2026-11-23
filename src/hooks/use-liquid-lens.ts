"use client";

import { useEffect, type RefObject } from "react";
import {
  acquireLens,
  lensId,
  lensSupported,
  releaseLens,
} from "~/lib/liquid-lens";

/**
 * Gives a glass element real edge refraction where the browser can draw it
 * (see lib/liquid-lens.ts): sets `--lens-url` on the element, which its
 * `backdrop-filter` reads, and swaps the filter when the element's size
 * changes. Elsewhere it does nothing and the glass keeps its plain blur.
 */
export function useLiquidLens<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { bezel = 14, enabled = true }: { bezel?: number; enabled?: boolean } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || !lensSupported()) return;

    let key: string | null = null;
    let raf = 0;
    const update = () => {
      raf = 0;
      // Layout size: transforms (hover lifts, tilts) don't change the map.
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w < 8 || h < 8) return;
      const style = getComputedStyle(el);
      const radius = parseFloat(style.borderTopLeftRadius) || 0;
      const r = Math.min(radius, w / 2, h / 2);
      // Never more than a third of the short side, so the middle stays clear.
      const b = Math.max(4, Math.min(bezel, Math.floor(Math.min(w, h) / 3)));
      const blur = parseFloat(style.getPropertyValue("--glass-blur")) || 24;
      const next = acquireLens(w, h, r, b, blur);
      if (key) releaseLens(key);
      key = next;
      if (key) el.style.setProperty("--lens-url", `url(#${lensId(key)})`);
      else el.style.removeProperty("--lens-url");
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      el.style.removeProperty("--lens-url");
      if (key) releaseLens(key);
    };
  }, [ref, bezel, enabled]);
}
