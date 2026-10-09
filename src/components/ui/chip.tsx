import { cn } from "~/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  className?: string;
  /** Use the surrounding card's `--item-accent` for the text. */
  accent?: boolean;
}

export function Chip({ children, className, accent = false }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] leading-none font-medium whitespace-nowrap text-muted-foreground glass-pill",
        accent && "text-(--item-accent)",
        className,
      )}
    >
      {children}
    </span>
  );
}
