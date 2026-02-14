"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollDirection(threshold = 10, locked = false) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (locked) {
      setVisible(true);
      return;
    }

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      if (scrollY < 50) {
        setVisible(true);
        lastScrollY.current = scrollY;
        ticking.current = false;
        return;
      }

      const diff = scrollY - lastScrollY.current;

      if (Math.abs(diff) < threshold) {
        ticking.current = false;
        return;
      }

      setVisible(diff < 0);
      lastScrollY.current = scrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDir);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, locked]);

  return visible;
}
