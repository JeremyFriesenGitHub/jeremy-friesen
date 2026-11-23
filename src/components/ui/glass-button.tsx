"use client";

import { useRef } from "react";
import { useLiquidLens } from "~/hooks/use-liquid-lens";
import { useMagnetic } from "~/hooks/use-magnetic";
import { cn } from "~/lib/utils";

interface GlassButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "glass";
  size?: "md" | "lg";
  /** Opens in a new tab with a safe `rel`. */
  external?: boolean;
  "aria-label"?: string;
}

const variants = {
  primary:
    "bg-foreground text-background shadow-[0_14px_30px_-12px_var(--glass-shadow)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-14px_var(--glass-shadow)]",
  glass: "glass hover:-translate-y-0.5",
} as const;

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

export function GlassButton({
  href,
  children,
  className,
  variant = "glass",
  size = "md",
  external = false,
  "aria-label": ariaLabel,
}: GlassButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, 0.22);
  useLiquidLens(ref, { bezel: 10, enabled: variant === "glass" });

  return (
    <a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        // The pull follows quickly, then springs home (see useMagnetic).
        "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[translate,scale,box-shadow,background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-[0.96] data-magnet:duration-150 data-magnet:ease-out",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </a>
  );
}
