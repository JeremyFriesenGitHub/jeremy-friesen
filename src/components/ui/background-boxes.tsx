"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  const colors = [
    "#FFFFFF",
    "#ec722e",
    "#7dc343",
    "#64a2d8",
    "#eed842",
  ];

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
    const updateGridSize = () => {
      const boxSize = Math.min(window.innerWidth, window.innerHeight) * 0.025;
      setCols(Math.floor(window.innerWidth / boxSize));
      setRows(Math.floor(window.innerHeight / boxSize));
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
