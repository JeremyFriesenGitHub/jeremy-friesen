"use client";

import { useCallback, useEffect } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/** Keep in sync with `viewport.themeColor` in app/layout.tsx and the tokens in globals.css. */
const THEME_COLOR: Record<Theme, string> = {
  light: "#f7f7fa",
  dark: "#08080d",
};

function currentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/**
 * Applies a theme to the document: the `dark` class plus the browser-chrome
 * colour. Both theme-color metas are updated so the chosen theme wins over
 * the OS preference their media queries encode.
 */
function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document
    .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute("content", THEME_COLOR[theme]));
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

/**
 * Theme state lives on <html class="dark">, applied before first paint by the
 * inline script in layout.tsx. Components render both theme variants with
 * `dark:` classes, so nothing here needs to be in React state.
 */
export function useTheme() {
  useEffect(() => {
    // The inline script only sets the class; align the browser chrome colour too.
    applyTheme(currentTheme());

    // Follow OS changes while the visitor has not picked a theme explicitly.
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch {
        /* storage blocked: still follow the OS */
      }
      applyTheme(e.matches ? "dark" : "light");
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((theme: Theme) => {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* private mode or storage disabled: the choice lasts for this page only */
    }
  }, []);

  /**
   * Toggles the theme. When the browser supports view transitions (and the
   * visitor has not asked for reduced motion) the new theme sweeps in as a
   * circle expanding from `origin` (the toggle button).
   */
  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = currentTheme() === "dark" ? "light" : "dark";
      const doc = document as ViewTransitionDocument;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (!doc.startViewTransition || reduce) {
        setTheme(next);
        return;
      }
      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? 0;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );
      const transition = doc.startViewTransition(() => setTheme(next));
      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 550,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        })
        .catch(() => {
          /* transition skipped by the browser; the theme is already applied */
        });
    },
    [setTheme],
  );

  return { setTheme, toggleTheme };
}
