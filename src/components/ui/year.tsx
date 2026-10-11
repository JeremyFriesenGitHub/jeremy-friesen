"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {
  /* nothing to unsubscribe: the year is read on render */
};

/**
 * The current year. The page is prerendered, so a plain Date would freeze
 * at the build; this shows the build's year until hydration and the
 * visitor's clock after it.
 */
export function Year({ built }: { built: number }) {
  return useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => built,
  );
}
