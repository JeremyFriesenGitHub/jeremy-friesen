import type { CSSProperties } from "react";
import { LuArrowDown, LuChevronDown } from "react-icons/lu";
import { HeroTiles } from "~/components/sections/hero-tiles";
import { RotatingWord } from "~/components/sections/rotating-word";
import { GlassButton } from "~/components/ui/glass-button";
import { PausingSection } from "~/components/ui/pausing-section";
import { copy } from "~/data/copy";
import { profile } from "~/data/social-links";

function delay(ms: number): CSSProperties {
  return { animationDelay: `${ms}ms` };
}

export function Hero() {
  return (
    <PausingSection
      id="top"
      className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 pt-28 pb-20 sm:px-6"
    >
      {/* Soft scrim so the headline stays readable when a bright blob drifts under it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(62% 58% at 50% 50%, color-mix(in oklab, var(--background) 62%, transparent), transparent 100%)",
        }}
      />

      <HeroTiles />

      {/* Display type and a solid button: the navbar frosts over while they
          pass underneath (see navbar.tsx). */}
      <div
        data-nav-frost=""
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
      >
        <h1
          className="animate-fade-up text-[clamp(3.2rem,11vw,7.5rem)] leading-[0.92] font-bold tracking-[-0.045em] text-balance"
          style={delay(0)}
        >
          {profile.firstName}{" "}
          <span className="text-liquid-animate text-liquid">
            {profile.lastName}
          </span>
        </h1>

        {(copy.hero.tagline || copy.hero.focusLead) && (
          <p
            className="mt-7 max-w-2xl animate-fade-up text-lg text-pretty text-muted-foreground sm:text-xl md:text-2xl"
            style={delay(80)}
          >
            {copy.hero.tagline}
            {copy.hero.focusLead && (
              /* Own line: the word's width can change without reflowing the sentence above. */
              <span className={copy.hero.tagline ? "mt-2 block" : "block"}>
                {copy.hero.focusLead}{" "}
                <RotatingWord
                  words={profile.focus}
                  className="font-semibold text-foreground"
                />
              </span>
            )}
          </p>
        )}

        <div className="mt-9 animate-fade-up" style={delay(160)}>
          <GlassButton href="#projects" variant="primary" size="lg">
            View projects
            <LuArrowDown size={18} aria-hidden="true" />
          </GlassButton>
        </div>
      </div>

      <a
        href="#experience"
        aria-label="Scroll to Experience"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-fade-up text-foreground/50 transition-colors hover:text-foreground"
        style={delay(600)}
      >
        <LuChevronDown className="animate-nudge" size={28} aria-hidden="true" />
      </a>
    </PausingSection>
  );
}
