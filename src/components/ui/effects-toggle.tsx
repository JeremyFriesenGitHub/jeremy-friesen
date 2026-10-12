"use client";

import { LuPause, LuPlay } from "react-icons/lu";
import { useEffects } from "~/hooks/use-effects";
import { cn } from "~/lib/utils";

interface EffectsToggleProps {
  className?: string;
  size?: number;
}

/**
 * Pauses or resumes the background effects, for anyone on battery or an
 * older machine. Like the theme toggle it renders both icons and both names
 * and lets CSS pick one from `html.reduce-effects`, so it is right on the
 * server render and never flashes after hydration.
 */
export function EffectsToggle({ className, size = 18 }: EffectsToggleProps) {
  const { toggleEffects } = useEffects();

  return (
    <button
      type="button"
      onClick={toggleEffects}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full text-foreground/80 transition-[background-color,color,scale] duration-200 hover:bg-foreground/8 hover:text-foreground active:scale-95",
        className,
      )}
    >
      <LuPause
        size={size}
        className="[.reduce-effects_&]:hidden"
        aria-hidden="true"
      />
      <LuPlay
        size={size}
        className="hidden [.reduce-effects_&]:block"
        aria-hidden="true"
      />
      <span className="sr-only [.reduce-effects_&]:hidden">
        Pause background effects
      </span>
      <span className="sr-only hidden [.reduce-effects_&]:inline">
        Resume background effects
      </span>
    </button>
  );
}
