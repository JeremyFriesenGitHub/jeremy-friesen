"use client";

import { motion } from "motion/react";
import { useTilt } from "~/hooks/use-tilt";
import { cn } from "~/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className, maxTilt = 10 }: TiltCardProps) {
  const { ref, style, handlers } = useTilt(maxTilt);

  return (
    <motion.div
      ref={ref}
      style={{ ...style, perspective: 800, transformStyle: "preserve-3d" }}
      className={cn("relative", className)}
      {...handlers}
    >
      {children}
      {/* Light reflection overlay — subtle in both modes */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-50 dark:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
        }}
      />
    </motion.div>
  );
}
