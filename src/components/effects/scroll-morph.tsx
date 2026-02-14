"use client";

import { motion } from "motion/react";
import { useScrollMorph } from "~/hooks/use-scroll-morph";
import { cn } from "~/lib/utils";

interface ScrollMorphProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollMorph({
  children,
  className,
}: ScrollMorphProps) {
  const { ref, style } = useScrollMorph();

  return (
    <motion.div ref={ref} style={style} className={cn(className)}>
      {children}
    </motion.div>
  );
}
