"use client";

import dynamic from "next/dynamic";

const ParticleBackground = dynamic(
  () =>
    import("~/components/effects/particle-background").then(
      (mod) => mod.ParticleBackground,
    ),
  { ssr: false },
);

export function ParticleBackgroundLoader() {
  return <ParticleBackground />;
}
