import type { CSSProperties } from "react";
import { FaAws, FaDocker, FaPython } from "react-icons/fa6";
import { SiPytorch, SiTypescript } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { LuArrowDown, LuChevronDown } from "react-icons/lu";
import { RotatingWord } from "~/components/sections/rotating-word";
import { GlassButton } from "~/components/ui/glass-button";
import { copy } from "~/data/copy";
import { profile } from "~/data/social-links";
import { cn } from "~/lib/utils";

const tiles = [
  {
    Icon: FaPython,
    label: "Python",
    className: "top-[18%] left-[6%] lg:left-[10%]",
    tilt: "-7deg",
    delay: "0s",
  },
  {
    Icon: SiTypescript,
    label: "TypeScript",
    className: "top-[62%] left-[9%] lg:left-[16%]",
    tilt: "5deg",
    delay: "-3s",
  },
  {
    Icon: SiPytorch,
    label: "PyTorch",
    className: "top-[26%] right-[7%] lg:right-[12%]",
    tilt: "8deg",
    delay: "-5s",
  },
  {
    Icon: VscAzure,
    label: "Azure",
    className: "top-[68%] right-[10%] lg:right-[18%]",
    tilt: "-5deg",
    delay: "-7s",
  },
  {
    Icon: FaDocker,
    label: "Docker",
    className: "top-[88%] left-[22%]",
    tilt: "4deg",
    delay: "-2s",
  },
  {
    Icon: FaAws,
    label: "AWS",
    className: "top-[10%] right-[30%]",
    tilt: "-4deg",
    delay: "-6s",
  },
] as const;

function delay(ms: number): CSSProperties {
  return { animationDelay: `${ms}ms` };
}

export function Hero() {
  return (
    <section
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

      {/* Floating glass tiles: decorative, hidden from assistive tech, and only
          shown from xl, where they clear the headline and the button. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden xl:block"
      >
        {tiles.map(({ Icon, label, className, tilt, delay: d }) => (
          <div
            key={label}
            style={{ "--tilt": tilt, animationDelay: d } as CSSProperties}
            className={cn(
              "glass absolute flex size-16 animate-float items-center justify-center rounded-2xl text-3xl text-foreground/75 will-change-transform lg:size-[4.5rem] lg:text-[2.1rem]",
              className,
            )}
          >
            <Icon />
          </div>
        ))}
      </div>

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
    </section>
  );
}
