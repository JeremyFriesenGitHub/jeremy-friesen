import Image from "next/image";
import { Chip } from "~/components/ui/chip";
import { GlassCard } from "~/components/ui/glass-card";
import { Icon } from "~/components/ui/icon";
import { Reveal } from "~/components/ui/reveal";
import { Section } from "~/components/ui/section";
import { SectionHeading } from "~/components/ui/section-heading";
import { copy } from "~/data/copy";
import { aboutText, profile, socialLinks } from "~/data/social-links";

const facts = [
  { icon: "briefcase", text: `${profile.role}, ${profile.organization}` },
  { icon: "graduation-cap", text: `${profile.program}, ${profile.school}` },
  { icon: "map-pin", text: profile.location },
] as const;

const socials = [
  { href: socialLinks.github, label: "GitHub", icon: "github" },
  { href: socialLinks.linkedin, label: "LinkedIn", icon: "linkedin" },
  { href: socialLinks.devpost, label: "Devpost", icon: "devpost" },
] as const;

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About"
        title={copy.about.title}
        description={copy.about.description}
      />

      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Reveal>
          <GlassCard className="flex h-full flex-col items-center p-6 text-center sm:p-8">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-full bg-linear-to-br from-primary/35 via-accent/30 to-tertiary/35 blur-2xl"
              />
              <Image
                src="/images/avatar.webp"
                alt=""
                width={160}
                height={160}
                sizes="160px"
                className="relative size-36 rounded-full border-2 border-white/60 object-cover shadow-[0_20px_40px_-20px_var(--glass-shadow)] sm:size-40 dark:border-white/20"
              />
            </div>
            <h3 className="mt-6 text-2xl font-bold tracking-tight">
              {profile.name}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {facts.map(({ icon, text }) => (
                <li
                  key={text}
                  className="flex items-center justify-center gap-2"
                >
                  <Icon
                    name={icon}
                    size={15}
                    className="shrink-0 text-primary-strong"
                  />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-10 items-center justify-center rounded-full text-foreground/80 glass-pill transition-[translate,color] hover:-translate-y-0.5 hover:text-foreground"
                >
                  <Icon name={icon} size={17} />
                </a>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.08}>
          <GlassCard className="flex h-full flex-col justify-between gap-8 p-6 sm:p-8">
            <div>
              {copy.about.intro && (
                <p className="text-lg leading-relaxed text-pretty sm:text-xl">
                  {copy.about.intro}
                </p>
              )}
              {copy.about.points.length > 0 && (
                <ul className="mt-6 space-y-3 first:mt-0">
                  {copy.about.points.map((point) => (
                    <li
                      key={point.highlight}
                      className="flex gap-3 text-base text-muted-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-linear-to-r from-primary to-accent"
                      />
                      <span>
                        {point.text}{" "}
                        <strong className="font-semibold text-foreground">
                          {point.highlight}
                        </strong>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Interests
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {aboutText.interests.map((interest) => (
                  <li key={interest}>
                    <Chip className="px-3 py-1.5 text-xs">{interest}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}
