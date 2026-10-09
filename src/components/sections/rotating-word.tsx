"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

interface RotatingWordProps {
  words: readonly string[];
  className?: string;
  /** Milliseconds each word stays on screen. */
  interval?: number;
}

const SWAP_MS = 450;

/**
 * Cycles through `words` with a short slide/fade (CSS keyframes), then stops
 * once every word has been shown so the headline settles (WCAG 2.2.2).
 * Hovering pauses it, and it never starts for reduced-motion users. The
 * container animates its width to the incoming word, measured from hidden
 * copies and written straight to the DOM.
 */
export function RotatingWord({
  words,
  className,
  interval = 2600,
}: RotatingWordProps) {
  const [state, setState] = useState<{ index: number; leaving: number | null }>(
    {
      index: 0,
      leaving: null,
    },
  );
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const shownRef = useRef(1);
  const containerRef = useRef<HTMLSpanElement>(null);
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (words.length < 2 || paused || finished) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let clear = 0;
    const tick = window.setInterval(() => {
      shownRef.current += 1;
      setState((s) => ({
        index: (s.index + 1) % words.length,
        leaving: s.index,
      }));
      window.clearTimeout(clear);
      clear = window.setTimeout(
        () => setState((s) => ({ ...s, leaving: null })),
        SWAP_MS + 50,
      );
      // One full lap (ending back on the first word) is enough.
      if (shownRef.current > words.length) {
        window.clearInterval(tick);
        setFinished(true);
      }
    }, interval);
    const onMotionPref = (e: MediaQueryListEvent) => {
      if (e.matches) setFinished(true);
    };
    reduceMotion.addEventListener("change", onMotionPref);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(clear);
      reduceMotion.removeEventListener("change", onMotionPref);
    };
  }, [words.length, interval, paused, finished]);

  // Size the container to the current word; re-measure when fonts load or the viewport changes.
  useLayoutEffect(() => {
    const measure = () => {
      const el = measureRefs.current[state.index];
      const container = containerRef.current;
      if (el && container) container.style.width = `${el.offsetWidth}px`;
    };
    measure();
    void document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [state.index]);

  const word = words[state.index] ?? words[0] ?? "";
  const leaving = state.leaving;

  return (
    <span
      ref={containerRef}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className={cn(
        "relative inline-block overflow-hidden align-bottom transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        className,
      )}
    >
      <span className="sr-only">{words.join(", ")}</span>
      {/* Hidden copies used only for measurement. */}
      <span
        aria-hidden="true"
        className="pointer-events-none invisible absolute top-0 left-0 whitespace-nowrap"
      >
        {words.map((w, i) => (
          <span
            key={w}
            ref={(el) => {
              measureRefs.current[i] = el;
            }}
            className="inline-block"
          >
            {w}
          </span>
        ))}
      </span>
      {leaving !== null && leaving !== state.index && (
        <span
          key={`out-${leaving}`}
          aria-hidden="true"
          className="word-out pointer-events-none absolute top-0 left-0 whitespace-nowrap"
        >
          {words[leaving]}
        </span>
      )}
      <span
        key={`in-${state.index}`}
        aria-hidden="true"
        className={cn(
          "inline-block whitespace-nowrap",
          leaving !== null && "word-in",
        )}
      >
        {word}
      </span>
    </span>
  );
}
