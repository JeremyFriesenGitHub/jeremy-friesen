"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FaAws, FaDocker, FaPython } from "react-icons/fa6";
import { SiPytorch, SiTypescript } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { useLiquidLens } from "~/hooks/use-liquid-lens";
import { cn } from "~/lib/utils";

/** `depth`: how many pixels a tile drifts as the pointer crosses the hero. */
const tiles = [
  {
    Icon: FaPython,
    label: "Python",
    className: "top-[18%] left-[6%] lg:left-[10%]",
    tilt: "-7deg",
    delay: "0s",
    depth: 22,
  },
  {
    Icon: SiTypescript,
    label: "TypeScript",
    className: "top-[62%] left-[9%] lg:left-[16%]",
    tilt: "5deg",
    delay: "-3s",
    depth: 34,
  },
  {
    Icon: SiPytorch,
    label: "PyTorch",
    className: "top-[26%] right-[7%] lg:right-[12%]",
    tilt: "8deg",
    delay: "-5s",
    depth: 28,
  },
  {
    Icon: VscAzure,
    label: "Azure",
    className: "top-[68%] right-[10%] lg:right-[18%]",
    tilt: "-5deg",
    delay: "-7s",
    depth: 40,
  },
  {
    Icon: FaDocker,
    label: "Docker",
    className: "top-[88%] left-[22%]",
    tilt: "4deg",
    delay: "-2s",
    depth: 18,
  },
  {
    Icon: FaAws,
    label: "AWS",
    className: "top-[10%] right-[30%]",
    tilt: "-4deg",
    delay: "-6s",
    depth: 14,
  },
] as const;

/**
 * The hero's floating glass tiles: decorative, hidden from assistive tech,
 * and only shown from xl, where they clear the headline and the button.
 * They drift away from the mouse by their depth, so the hero reads as
 * layers, and their rims refract the lamp where the browser can draw it.
 */
export function HeroTiles() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      // A finger has no hover to follow, even on a laptop with a trackpad.
      if (e.pointerType !== "mouse") return;
      if (!fine.matches || reduceMotion.matches) return;
      if (document.documentElement.classList.contains("reduce-effects")) return;
      if (window.scrollY > window.innerHeight) return;
      x = (e.clientX / window.innerWidth - 0.5) * 2;
      y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden xl:block"
    >
      {tiles.map((tile) => (
        <Tile key={tile.label} {...tile} />
      ))}
    </div>
  );
}

function Tile({
  Icon,
  className,
  tilt,
  delay,
  depth,
}: {
  Icon: IconType;
  className: string;
  tilt: string;
  delay: string;
  depth: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useLiquidLens(ref, { bezel: 12 });

  return (
    <div
      ref={ref}
      style={
        {
          "--tilt": tilt,
          "--depth": depth,
          animationDelay: delay,
        } as CSSProperties
      }
      className={cn(
        "glass absolute flex size-16 [translate:calc(var(--px,0)*var(--depth)*-1px)_calc(var(--py,0)*var(--depth)*-1px)] animate-float items-center justify-center rounded-2xl text-3xl text-foreground/75 transition-[translate] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform glass-tile lg:size-[4.5rem] lg:text-[2.1rem]",
        className,
      )}
    >
      <Icon />
    </div>
  );
}
