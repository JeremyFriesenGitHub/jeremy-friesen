import { cn } from "~/lib/utils";

/**
 * The "JF" tile beside the name in the navbar and the footer. Its colours are
 * the light theme's brand trio in both themes, like the favicon: the dark
 * theme's pastels left the white letters at about 1.5:1.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#1e4fe6] via-[#0e7490] to-[#6d28d9] font-mono text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.45),0_0_0_1px_rgba(255,255,255,.08)]",
        className,
      )}
    >
      JF
    </span>
  );
}
