"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  const colors = [
    "#0ea5e9", // Sky-500
    "#f97316", // Orange-500
    "#f59e0b", // Amber-500
    "#eab308", // Yellow-500
    "#ffffff", // White
    "#000000", // Black
    "#3b82f6", // Blue-500
    "#6b7280", // Gray-500
    "#92400e", // Brown-500
  ];

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
    const updateGridSize = () => {
      const boxWidth = window.innerWidth * 0.025; // 2.5vw
      const boxHeight = window.innerHeight * 0.025; // 2.5vh
      setCols(Math.floor(window.innerWidth / boxWidth));
      setRows(Math.floor(window.innerHeight / boxHeight));
    };

    updateGridSize();
    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

  return (
    <div
      className={cn("fixed inset-0 flex flex-wrap", className)}
      {...rest}
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div key={`row-${i}`} className="flex">
          {Array.from({ length: cols }).map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getRandomColor(),
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col-${j}`}
              className="w-[2.5vw] h-[2.5vh] border border-gray-400/30 relative"
            >
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
