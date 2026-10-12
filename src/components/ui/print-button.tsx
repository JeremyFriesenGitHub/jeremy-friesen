"use client";

import { LuPrinter } from "react-icons/lu";
import { cn } from "~/lib/utils";

interface PrintButtonProps {
  className?: string;
  children?: React.ReactNode;
}

/** Opens the browser's print dialog, where "Save as PDF" is one option. */
export function PrintButton({ className, children }: PrintButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-transform duration-200 hover:-translate-y-0.5 active:scale-95",
        className,
      )}
    >
      <LuPrinter size={16} aria-hidden="true" />
      {children ?? "Download PDF"}
    </button>
  );
}
