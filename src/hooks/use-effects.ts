"use client";

import { useCallback } from "react";

const STORAGE_KEY = "effects";
const CLASS = "reduce-effects";

/**
 * Whether the visitor has paused the background effects: the lava lamp, the
 * floating tiles and the hero shimmer. State lives on
 * <html class="reduce-effects">, applied before first paint by the inline
 * script in layout.tsx, so components render both states with CSS and
 * nothing here needs React state. The lamp watches the class itself.
 */
export function useEffects() {
  const toggleEffects = useCallback(() => {
    const reduced = document.documentElement.classList.toggle(CLASS);
    try {
      localStorage.setItem(STORAGE_KEY, reduced ? "reduced" : "full");
    } catch {
      /* private mode or storage disabled: the choice lasts for this page only */
    }
  }, []);

  return { toggleEffects };
}
