"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";

interface RotatingWordProps {
  words: readonly string[];
  className?: string;
  /** Milliseconds each word stays on screen. */
  interval?: number;
}

/**
 * Cycles through `words` with a short slide/fade. The container animates its
 * width to the incoming word (measured from hidden copies), so the sentence
 * around it reflows smoothly instead of reserving the longest word's space.
 */
export function RotatingWord({ words, className, interval = 2600 }: RotatingWordProps) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number | null>(null);
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (words.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  // Measure the current word; re-measure when fonts load or the viewport changes.
  useLayoutEffect(() => {
    const measure = () => {
      const el = measureRefs.current[index];
      if (el) setWidth(el.offsetWidth);
    };
    measure();
    void document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [index]);

  const word = words[index] ?? words[0] ?? "";

  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden align-bottom transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        className,
      )}
      style={width !== null ? { width } : undefined}
    >
      <span className="sr-only">{words.join(", ")}</span>
      {/* Hidden copies used only for measurement. */}
      <span aria-hidden="true" className="pointer-events-none invisible absolute top-0 left-0 whitespace-nowrap">
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
      <AnimatePresence initial={false}>
        <m.span
          key={word}
          aria-hidden="true"
          className="inline-block whitespace-nowrap"
          initial={{ y: "0.7em", opacity: 0, filter: "blur(5px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-0.7em", opacity: 0, filter: "blur(5px)", position: "absolute", left: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </m.span>
      </AnimatePresence>
    </span>
  );
}
