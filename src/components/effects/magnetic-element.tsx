"use client";

import { motion } from "motion/react";
import { useMagnetic } from "~/hooks/use-magnetic";

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}

export function MagneticElement({
  children,
  className,
  distance = 0.3,
}: MagneticElementProps) {
  const { ref, style, handlers } = useMagnetic(distance);

  return (
    <motion.div ref={ref} style={style} className={className} {...handlers}>
      {children}
    </motion.div>
  );
}
