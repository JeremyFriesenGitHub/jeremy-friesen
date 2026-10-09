"use client";

import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "~/hooks/use-theme";
import { cn } from "~/lib/utils";

interface ThemeToggleProps {
  className?: string;
  size?: number;
}

/**
 * Renders both icons and both accessible names and lets CSS pick one via the
 * `dark:` variant, so the button is correct on the server render, never
 * flashes after hydration, and its name flips with the theme.
 */
export function ThemeToggle({ className, size = 20 }: ThemeToggleProps) {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={(e) => {
        // Measure the button rather than the pointer so keyboard activation
        // (clientX/Y = 0) still sweeps the new theme out from the control.
        const rect = e.currentTarget.getBoundingClientRect();
        toggleTheme({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full text-foreground/80 transition-[background-color,color,scale] duration-200 hover:bg-foreground/8 hover:text-foreground active:scale-95",
        className,
      )}
    >
      <LuMoon size={size} className="dark:hidden" aria-hidden="true" />
      <LuSun size={size} className="hidden dark:block" aria-hidden="true" />
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <span className="sr-only hidden dark:inline">Switch to light theme</span>
    </button>
  );
}
