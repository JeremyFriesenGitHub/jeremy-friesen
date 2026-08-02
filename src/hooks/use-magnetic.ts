"use client";

import { useRef, useCallback } from "react";
import { useMotionValue, useSpring } from "motion/react";

const springConfig = { stiffness: 200, damping: 20 };

export function useMagnetic(distance = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      x.set(deltaX * distance);
      y.set(deltaY * distance);
    },
    [distance, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return {
    ref,
    style: { x: springX, y: springY },
    handlers: { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave },
  };
}
