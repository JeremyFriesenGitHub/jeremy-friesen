"use client";

import { useEffect, type RefObject } from "react";
import {
  acquireLens,
  lensId,
  lensKey,
  lensSupported,
  releaseLens,
  watchLensInputs,
} from "~/lib/liquid-lens";

/** Quiet time after the last size change before a new map is built. */
const SETTLE_MS = 150;

/**
 * Gives a glass element real edge refraction where the browser can draw it
 * (see lib/liquid-lens.ts): sets `--lens-url` on the element, which its
 * `backdrop-filter` reads. Elsewhere it does nothing and the glass keeps its
 * plain blur.
 *
 * Maps are built when the browser is idle, so a page of cards doesn't make
 * one long task. When the element's size changes the lens is dropped at
 * once (the plain blur fits any size) and rebuilt once the size has settled,
 * not on every frame of a window drag. A theme switch or crossing the small
 * screen breakpoint rebuilds it with that blur, and while effects are
 * paused it isn't built at all.
 */
export function useLiquidLens<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { bezel = 14, enabled = true }: { bezel?: number; enabled?: boolean } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || !lensSupported()) return;
    const root = document.documentElement;

    let key: string | null = null;
    let size = "";
    let made = false;
    let timer = 0;
    let idle = 0;

    const drop = () => {
      el.style.removeProperty("--lens-url");
      if (key) releaseLens(key);
      key = null;
      size = "";
    };

    const update = () => {
      idle = 0;
      if (root.classList.contains("reduce-effects")) return drop();
      // Layout size: transforms (hover lifts, drifts) don't change the map.
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (w < 8 || h < 8) return drop();
      const style = getComputedStyle(el);
      const radius = parseFloat(style.borderTopLeftRadius) || 0;
      const r = Math.min(radius, w / 2, h / 2);
      // Never more than a third of the short side, so the middle stays clear.
      const b = Math.max(4, Math.min(bezel, Math.floor(Math.min(w, h) / 3)));
      const blur = parseFloat(style.getPropertyValue("--glass-blur")) || 24;
      if (key === lensKey(w, h, r, b, blur)) return;
      const next = acquireLens(w, h, r, b, blur);
      if (key) releaseLens(key);
      key = next;
      size = key ? `${w}x${h}` : "";
      made ||= !!key;
      if (key) el.style.setProperty("--lens-url", `url(#${lensId(key)})`);
      else el.style.removeProperty("--lens-url");
    };

    const schedule = (delay: number) => {
      clearTimeout(timer);
      cancelIdleCallback(idle);
      idle = 0;
      timer = window.setTimeout(() => {
        idle = requestIdleCallback(update, { timeout: 500 });
      }, delay);
    };

    // Fires once when observing starts (or when a hidden element first gets
    // a size), which makes the first lens, and again on each size change.
    const ro = new ResizeObserver(() => {
      if (`${el.offsetWidth}x${el.offsetHeight}` === size) return;
      drop();
      schedule(made ? SETTLE_MS : 0);
    });
    ro.observe(el);
    const unwatch = watchLensInputs(() => schedule(0));

    return () => {
      ro.disconnect();
      unwatch();
      clearTimeout(timer);
      cancelIdleCallback(idle);
      drop();
    };
  }, [ref, bezel, enabled]);
}
