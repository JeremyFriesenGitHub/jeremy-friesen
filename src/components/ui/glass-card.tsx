"use client";

import type { CSSProperties } from "react";
import { usePointerGlow } from "~/hooks/use-pointer-glow";
import { cn } from "~/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** Per-card accent colour, exposed to children as `--item-accent`. */
  accent?: { dark: string; light: string };
  /**
   * Lift and drift toward the pointer on hover, with a glow and a glint on
   * the rim that follow it.
   */
  interactive?: boolean;
  style?: CSSProperties;
}

/** Pixels a card drifts toward the pointer at its edge. */
const SHIFT = 5;

export function GlassCard({
  children,
  className,
  accent,
  interactive = true,
  style,
}: GlassCardProps) {
  const { ref, onPointerMove, onPointerLeave } = usePointerGlow<HTMLDivElement>(
    { shift: interactive ? SHIFT : 0 },
  );
  // No refraction lens on cards (see lib/liquid-lens.ts): a card only ever
  // has the smooth lamp behind its rim, where the bend changes no pixel by
  // more than about 5%, yet every lens on screen is redrawn with each lamp
  // frame and each scroll frame. The rim lighting and glint stay.

  const accentVars = accent
    ? ({
        "--accent-dark": accent.dark,
        "--accent-light": accent.light,
      } as CSSProperties)
    : undefined;

  return (
    <div
      ref={ref}
      onPointerMove={interactive ? onPointerMove : undefined}
      onPointerLeave={interactive ? onPointerLeave : undefined}
      style={{ ...accentVars, ...style }}
      className={cn(
        "accent-scope glass rounded-3xl",
        interactive &&
          "glass-follow hover:-translate-y-1 hover:[--glass-drop:0_36px_76px_-30px_var(--glass-shadow)] active:scale-[0.985]",
        className,
      )}
    >
      {children}
    </div>
  );
}
