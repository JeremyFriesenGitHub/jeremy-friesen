"use client";

import { motion } from "motion/react";
import { cn } from "~/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn("relative h-full", className)}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="relative h-full"
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ z: 32, scale: 1.025 }}
        transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.6 }}
      >
        <div
          className="glow-breathe pointer-events-none absolute -inset-3 rounded-[1.5rem] bg-foreground/5"
          style={{
            boxShadow: `0 0 40px hsl(var(--foreground) / 0.08), 0 0 80px hsl(var(--foreground) / 0.04)`,
          }}
        />
        <div
          className={cn(
            "glass-card glass-card-hover relative h-full rounded-xl p-4 sm:p-6",
            className,
          )}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
