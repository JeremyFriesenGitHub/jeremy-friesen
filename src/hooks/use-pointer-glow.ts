"use client";

import { useCallback, useRef } from "react";

/** Motion is off for reduced-motion visitors and while effects are paused. */
function motionAllowed() {
  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !document.documentElement.classList.contains("reduce-effects")
  );
}

/**
 * Feeds the pointer position (as percentages) into `--mx`/`--my` on the
 * element, which the `.glass` glow and rim glint read (and children can,
 * such as a card's screenshot panning inside its frame). With `shift`
 * (pixels) it also sets `--tx`/`--ty`, which `.glass-follow` turns into a
 * small drift toward the pointer, and marks the element `data-following`
 * meanwhile so the drift is quick, then springy on the way back. A 2D
 * drift rather than a 3D tilt: Chrome rasterises a tilted card once and
 * resamples it, which blurs its text. Writes styles on the one element
 * only, so it never triggers layout or React re-renders. Touch pointers
 * are ignored: a finger has no hover to follow.
 */
export function usePointerGlow<T extends HTMLElement>({
  shift = 0,
}: { shift?: number } = {}) {
  const ref = useRef<T>(null);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      if (e.pointerType === "touch") return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
      if (!shift || e.pointerType !== "mouse" || !motionAllowed()) return;
      const clamp = (v: number) => Math.min(Math.max(v, 0), 1) - 0.5;
      el.style.setProperty("--tx", `${(clamp(x) * 2 * shift).toFixed(2)}px`);
      el.style.setProperty("--ty", `${(clamp(y) * 2 * shift).toFixed(2)}px`);
      el.dataset.following = "";
    },
    [shift],
  );

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el || !shift) return;
    delete el.dataset.following;
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
  }, [shift]);

  return { ref, onPointerMove, onPointerLeave };
}
