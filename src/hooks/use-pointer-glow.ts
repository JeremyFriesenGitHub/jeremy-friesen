"use client";

import { useCallback, useRef } from "react";

/**
 * Feeds the pointer position (as percentages) into `--mx`/`--my` on the
 * element, which the `.glass` specular highlight reads. Writes a style on the
 * one element only, so it never triggers layout or React re-renders.
 */
export function usePointerGlow<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onPointerMove = useCallback((e: React.PointerEvent<T>) => {
    if (e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x.toFixed(1)}%`);
    el.style.setProperty("--my", `${y.toFixed(1)}%`);
  }, []);

  return { ref, onPointerMove };
}
