"use client";

import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "~/hooks/use-theme";
import { cn } from "~/lib/utils";

interface ThemeToggleProps {
  className?: string;
  size?: number;
}

/**
 * Renders both icons and lets CSS pick one via the `dark:` variant, so the
 * button is correct on the server render and never flashes after hydration.
 */
export function ThemeToggle({ className, size = 20 }: ThemeToggleProps) {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={(e) => toggleTheme({ x: e.clientX, y: e.clientY })}
      aria-label="Toggle light and dark theme"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full text-foreground/80 transition-[background-color,color,transform] duration-200 hover:bg-foreground/8 hover:text-foreground active:scale-95",
        className,
      )}
    >
      <LuMoon size={size} className="dark:hidden" aria-hidden="true" />
      <LuSun size={size} className="hidden dark:block" aria-hidden="true" />
    </button>
  );
}
