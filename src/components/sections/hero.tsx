import type { CSSProperties } from "react";
import { FaAws, FaDocker, FaGithub, FaLinkedinIn, FaPython } from "react-icons/fa6";
import { SiDevpost, SiPytorch, SiTypescript } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { LuArrowDown, LuChevronDown, LuFileText } from "react-icons/lu";
import { RotatingWord } from "~/components/sections/rotating-word";
import { GlassButton } from "~/components/ui/glass-button";
import { devpostStats } from "~/data/hackathons";
import { experiences } from "~/data/experience";
import { profile, socialLinks } from "~/data/social-links";
import { cn } from "~/lib/utils";

const tiles = [
  { Icon: FaPython, label: "Python", className: "top-[18%] left-[6%] lg:left-[10%]", tilt: "-7deg", delay: "0s" },
  { Icon: SiTypescript, label: "TypeScript", className: "top-[62%] left-[9%] lg:left-[16%]", tilt: "5deg", delay: "-3s" },
  { Icon: SiPytorch, label: "PyTorch", className: "top-[26%] right-[7%] lg:right-[12%]", tilt: "8deg", delay: "-5s" },
  { Icon: VscAzure, label: "Azure", className: "top-[68%] right-[10%] lg:right-[18%]", tilt: "-5deg", delay: "-7s" },
  { Icon: FaDocker, label: "Docker", className: "top-[82%] left-[32%] hidden lg:flex", tilt: "4deg", delay: "-2s" },
  { Icon: FaAws, label: "AWS", className: "top-[10%] right-[30%] hidden lg:flex", tilt: "-4deg", delay: "-6s" },
] as const;

const stats = [
  { value: `${devpostStats.wins}×`, label: "hackathon winner" },
  { value: String(devpostStats.hackathons), label: "hackathons" },
  { value: String(experiences.length), label: "internships" },
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
      {/* Floating glass tiles — decorative, hidden from assistive tech and on phones. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
        {tiles.map(({ Icon, label, className, tilt, delay: d }) => (
          <div
            key={label}
            style={{ "--tilt": tilt, animationDelay: d } as CSSProperties}
            className={cn(
              "glass animate-float absolute flex size-16 items-center justify-center rounded-2xl text-3xl text-foreground/75 will-change-transform lg:size-[4.5rem] lg:text-[2.1rem]",
              className,
            )}
          >
            <Icon />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <span
          className="glass glass-strong animate-fade-up inline-flex items-center gap-2 rounded-full py-1.5 pr-4 pl-3 text-xs font-medium text-foreground/85 sm:text-sm"
          style={delay(0)}
        >
          <span className="relative flex size-2.5">
            <span className="animate-pulse-dot absolute inset-0 rounded-full bg-success" />
            <span className="relative inline-flex size-2.5 rounded-full bg-success" />
          </span>
          {profile.role} · {profile.organization}
        </span>

        <h1
          className="animate-fade-up mt-7 text-[clamp(3.2rem,11vw,7.5rem)] leading-[0.92] font-bold tracking-[-0.045em] text-balance"
          style={delay(80)}
        >
          {profile.firstName} <span className="text-liquid">{profile.lastName}</span>
        </h1>

        <p
          className="animate-fade-up mt-7 max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl md:text-2xl"
          style={delay(160)}
        >
          {profile.program} student at {profile.school}, building at the
          intersection of{" "}
          <RotatingWord
            words={profile.focus}
            className="font-semibold text-foreground"
          />{" "}
          and thoughtful software.
        </p>

        <div
          className="animate-fade-up mt-9 flex flex-wrap items-center justify-center gap-3"
          style={delay(240)}
        >
          <GlassButton href="#projects" variant="primary" size="lg">
            View projects
            <LuArrowDown size={18} aria-hidden="true" />
          </GlassButton>
          <GlassButton href={socialLinks.devpost} external size="lg">
            <SiDevpost size={18} aria-hidden="true" />
            Devpost
          </GlassButton>
          <GlassButton href={socialLinks.resume} external size="lg">
            <LuFileText size={18} aria-hidden="true" />
            Resume
          </GlassButton>
          <div className="flex items-center gap-2">
            <GlassButton
              href={socialLinks.github}
              external
              size="lg"
              aria-label="GitHub"
              className="w-12 px-0"
            >
              <FaGithub size={20} aria-hidden="true" />
            </GlassButton>
            <GlassButton
              href={socialLinks.linkedin}
              external
              size="lg"
              aria-label="LinkedIn"
              className="w-12 px-0"
            >
              <FaLinkedinIn size={19} aria-hidden="true" />
            </GlassButton>
          </div>
        </div>

        <dl
          className="animate-fade-up mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          style={delay(320)}
        >
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-2xl font-bold tracking-tight sm:text-3xl">{s.value}</dd>
              <dd className="text-sm text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="animate-fade-up absolute bottom-6 left-1/2 -translate-x-1/2 text-foreground/50 transition-colors hover:text-foreground"
        style={delay(600)}
      >
        <LuChevronDown className="animate-nudge" size={28} aria-hidden="true" />
      </a>
    </section>
  );
}
