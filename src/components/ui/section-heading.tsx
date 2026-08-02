"use client";

import { ScrollMorph } from "~/components/effects/scroll-morph";
import { cn } from "~/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function SectionHeading({ children, id, className }: SectionHeadingProps) {
  return (
    <ScrollMorph>
      <h2
        id={id}
        className={cn(
          "mb-8 text-center text-2xl font-bold text-foreground sm:mb-12 sm:text-3xl md:text-4xl",
          className,
        )}
      >
        {children}
      </h2>
    </ScrollMorph>
  );
}
