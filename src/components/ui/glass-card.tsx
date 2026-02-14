"use client";

import { cn } from "~/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        className="glow-breathe pointer-events-none absolute -inset-3 rounded-2xl bg-foreground/5"
        style={{
          boxShadow: `0 0 40px hsl(var(--foreground) / 0.08), 0 0 80px hsl(var(--foreground) / 0.04)`,
        }}
      />
      <div className={cn("glass-card glass-card-hover relative h-full rounded-xl p-4 transition-all duration-300 sm:p-6", className)}>
        {children}
      </div>
    </div>
  );
}
