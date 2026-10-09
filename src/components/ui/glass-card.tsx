"use client";

import type { CSSProperties } from "react";
import { usePointerGlow } from "~/hooks/use-pointer-glow";
import { cn } from "~/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** Per-card accent colour, exposed to children as `--item-accent`. */
  accent?: { dark: string; light: string };
  /** Lift on hover and track the pointer with a specular highlight. */
  interactive?: boolean;
  style?: CSSProperties;
}

export function GlassCard({
  children,
  className,
  accent,
  interactive = true,
  style,
}: GlassCardProps) {
  const { ref, onPointerMove } = usePointerGlow<HTMLDivElement>();

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
      style={{ ...accentVars, ...style }}
      className={cn(
        "accent-scope glass rounded-3xl",
        interactive &&
          "transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_32px_70px_-30px_var(--glass-shadow)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
