import { Chip } from "~/components/ui/chip";
import { GlassButton } from "~/components/ui/glass-button";
import { GlassCard } from "~/components/ui/glass-card";
import { Icon } from "~/components/ui/icon";
import { Reveal } from "~/components/ui/reveal";
import { Section } from "~/components/ui/section";
import { SectionHeading } from "~/components/ui/section-heading";
import {
  hackathonProjects,
  hackathonStats,
  judging,
  type HackathonProject,
} from "~/data/hackathons";
import { socialLinks } from "~/data/social-links";
import type { SpriteIcon } from "~/lib/icons";

const stats = [
  { value: hackathonStats.wins, label: "winning submissions" },
  { value: hackathonStats.entered, label: "hackathons entered" },
  { value: hackathonStats.devpostProjects, label: "Devpost projects" },
] as const;

interface Link {
  href: string;
  label: string;
  icon: SpriteIcon;
}

/** The card's main link: Devpost when the hackathon ran there, else the demo, else the code. */
function primaryLink(p: HackathonProject): Link {
  if (p.url) return { href: p.url, label: "Devpost", icon: "devpost" };
  if (p.site)
    return { href: p.site, label: "Live demo", icon: "external-link" };
  return {
    href: p.repo ?? socialLinks.devpost,
    label: "Source",
    icon: "github",
  };
}

const iconLinkClass =
  "relative z-10 inline-flex size-7 items-center justify-center rounded-full transition-colors hover:bg-foreground/8 hover:text-foreground";

export function Hackathons() {
  return (
    <Section id="hackathons">
      <SectionHeading
        eyebrow="Hackathons"
        title="Built in 24 to 36 hours."
        action={
          <GlassButton href={socialLinks.devpost} external>
            <Icon name="devpost" size={16} />
            View Devpost profile
            <Icon name="arrow-up-right" size={16} />
          </GlassButton>
        }
      />

      <Reveal>
        <ul className="mb-6 grid grid-cols-3 gap-3 sm:gap-5">
          {stats.map((s) => (
            <li
              key={s.label}
              className="glass rounded-3xl px-3 py-4 text-center sm:px-6 sm:py-6"
            >
              <span className="block text-liquid text-3xl font-bold tracking-tight sm:text-4xl">
                {s.value}
              </span>
              <span className="mt-1 block text-xs text-muted-foreground sm:text-sm">
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {hackathonProjects.map((p, i) => {
          const primary = primaryLink(p);
          return (
            <li key={p.title} className="h-full">
              <Reveal delay={Math.min((i % 4) * 0.06, 0.2)} className="h-full">
                <GlassCard
                  accent={p.accent}
                  className="group flex h-full flex-col p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="pt-1.5 font-mono text-[11px] leading-snug font-medium tracking-[0.14em] text-muted-foreground uppercase">
                      {p.hackathon}
                    </p>
                    {p.award && (
                      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-(--item-accent)/14 text-(--item-accent)">
                        <Icon name="trophy" size={15} />
                        <span className="sr-only">Winner</span>
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    <a
                      href={primary.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="after:absolute after:inset-0 after:rounded-3xl"
                    >
                      {p.title}
                    </a>
                  </h3>
                  {p.tagline && (
                    <p className="mt-2 text-sm text-pretty text-muted-foreground">
                      {p.tagline}
                    </p>
                  )}

                  {p.award && (
                    <p className="mt-3 flex items-start gap-1.5 text-sm font-medium text-(--item-accent)">
                      <Icon
                        name="award"
                        size={15}
                        className="mt-0.5 shrink-0"
                      />
                      <span>{p.award}</span>
                    </p>
                  )}

                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {p.builtWith.map((t) => (
                      <li key={t}>
                        <Chip>{t}</Chip>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-center gap-1.5 border-t border-border/70 pt-3 text-xs text-muted-foreground">
                    <Icon name={primary.icon} size={13} />
                    <span className="transition-colors group-hover:text-foreground">
                      {primary.label}
                    </span>
                    <Icon
                      name="arrow-up-right"
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                    <span className="ml-auto flex items-center gap-0.5">
                      {p.date && (
                        <span className="mr-1.5 font-mono font-medium">
                          {p.date}
                        </span>
                      )}
                      {p.video && (
                        <a
                          href={p.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.title} demo video`}
                          className={iconLinkClass}
                        >
                          <Icon name="youtube" size={14} />
                        </a>
                      )}
                      {p.site && p.site !== primary.href && (
                        <a
                          href={p.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.title} live site`}
                          className={iconLinkClass}
                        >
                          <Icon name="external-link" size={14} />
                        </a>
                      )}
                      {p.repo && p.repo !== primary.href && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.title} source on GitHub`}
                          className={iconLinkClass}
                        >
                          <Icon name="github" size={14} />
                        </a>
                      )}
                    </span>
                  </div>
                </GlassCard>
              </Reveal>
            </li>
          );
        })}
      </ul>

      {/* The other side of the table. */}
      <Reveal className="mt-6">
        <GlassCard
          interactive={false}
          className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:gap-8"
        >
          <div className="flex items-center gap-3 lg:w-56 lg:shrink-0">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/12 text-primary-strong">
              <Icon name="gavel" size={20} />
            </span>
            <div>
              <h3 className="font-semibold tracking-tight">Judging</h3>
              <p className="text-xs text-muted-foreground">
                On the panel, not the podium.
              </p>
            </div>
          </div>
          <ul className="grid flex-1 gap-3 md:grid-cols-2">
            {judging.map((j) => (
              <li key={j.event} className="min-w-0">
                <a
                  href={j.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 glass-pill transition-colors hover:bg-foreground/8"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">
                      Judge · {j.event}
                    </span>
                    <span className="block text-xs text-pretty text-muted-foreground">
                      {j.organizer}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-xs font-medium text-muted-foreground">
                    {j.date}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
