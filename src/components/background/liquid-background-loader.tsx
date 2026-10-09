"use client";

import dynamic from "next/dynamic";

/** The background needs `window`, so it is client-only and loaded after hydration. */
const LiquidBackground = dynamic(
  () =>
    import("~/components/background/liquid-background").then(
      (mod) => mod.LiquidBackground,
    ),
  { ssr: false },
);

export function LiquidBackgroundLoader() {
  return <LiquidBackground />;
}
