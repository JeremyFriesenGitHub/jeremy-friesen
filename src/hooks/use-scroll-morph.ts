"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";

export function useScrollMorph() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return {
    ref,
    style: { opacity, y, scale },
  };
}
