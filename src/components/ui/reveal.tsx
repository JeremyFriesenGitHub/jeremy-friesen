"use client";

import { m } from "motion/react";
import { cn } from "~/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds. Use for stagger within a grid. */
  delay?: number;
  /** Starting vertical offset in px. */
  y?: number;
}

/**
 * Fades + lifts content into place the first time it scrolls into view.
 * Animates transform/opacity only, so it stays on the compositor.
 */
export function Reveal({ children, className, delay = 0, y = 22 }: RevealProps) {
  return (
    <m.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
