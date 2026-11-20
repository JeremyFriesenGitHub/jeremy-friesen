"use client";

import { useEffect, useState } from "react";

/** The band's edges, in percent of the viewport height from its top. */
const BAND_TOP = 35;
const BAND_BOTTOM = 45;

/**
 * Returns the id of the section currently occupying the middle band of the
 * viewport, or null when none does (e.g. while the hero is on screen). At the
 * very bottom of the page it is the last section, unless that has already
 * scrolled above the band: on a tall display the page runs out of scroll
 * before a short last section can reach the band.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const last = elements.at(-1);
    if (!last) return;

    const visible = new Map<string, number>();
    const update = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (
        atBottom &&
        last.getBoundingClientRect().bottom >
          (window.innerHeight * BAND_TOP) / 100
      ) {
        setActive(last.id);
        return;
      }
      let best: string | null = null;
      let bestRatio = -1;
      for (const [id, ratio] of visible) {
        if (ratio > bestRatio) {
          best = id;
          bestRatio = ratio;
        }
      }
      setActive(best);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        update();
      },
      {
        rootMargin: `-${BAND_TOP}% 0px -${100 - BAND_BOTTOM}% 0px`,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids]);

  return active;
}
