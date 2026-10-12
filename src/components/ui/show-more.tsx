"use client";

import { Children, useEffect, useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { SHOW_MORE_INITIAL } from "~/lib/show-more";
import { cn } from "~/lib/utils";

interface ShowMoreProps {
  children: React.ReactNode;
  /** Button text while collapsed, e.g. "Show 8 more projects". */
  moreLabel: string;
  /** Class for the element that wraps the children (the grid). */
  className?: string;
}

/**
 * Renders every child (so the full list is in the server HTML and visible
 * without JS) and, once JS runs, hides everything past the first
 * SHOW_MORE_INITIAL behind a button. Expanding moves focus to the first newly
 * revealed card so keyboard users land on what just appeared.
 */
export function ShowMore({ children, moreLabel, className }: ShowMoreProps) {
  const [expanded, setExpanded] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  // Nothing to hide: a plain grid, with no "Show 0 more" button.
  const collapsed = !expanded && Children.count(children) > SHOW_MORE_INITIAL;

  useEffect(() => {
    if (!expanded) return;
    const first = gridRef.current?.children[SHOW_MORE_INITIAL];
    const target = first?.querySelector<HTMLElement>("a, button");
    // Plain focus() scrolls the card into view, which also lets its reveal
    // observer fire; with preventScroll the ring would land on a card that is
    // still off screen and transparent.
    target?.focus();
  }, [expanded]);

  return (
    <>
      <div
        ref={gridRef}
        className={cn(className, collapsed && "collapsed-grid")}
      >
        {children}
      </div>
      {collapsed && (
        <div className="mt-8 flex justify-center print:hidden">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="glass hidden h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-0.5 [.js_&]:inline-flex"
          >
            {moreLabel}
            <LuChevronDown size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
