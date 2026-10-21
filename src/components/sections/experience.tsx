import type { CSSProperties } from "react";
import { Chip } from "~/components/ui/chip";
import { GlassCard } from "~/components/ui/glass-card";
import { Icon } from "~/components/ui/icon";
import { OrgLogo } from "~/components/ui/org-logo";
import { Reveal } from "~/components/ui/reveal";
import { Section } from "~/components/ui/section";
import { SectionHeading } from "~/components/ui/section-heading";
import { copy } from "~/data/copy";
import { experiences } from "~/data/experience";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title={copy.experience.title}
        description={copy.experience.description}
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Rail: beside the list, not inside it, so the list holds only items. */}
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[19px] w-px bg-linear-to-b from-primary via-accent to-tertiary opacity-70"
        />

        <ol>
          {experiences.map((exp, i) => (
            <li
              key={`${exp.title}-${exp.date}`}
              className="relative pb-8 pl-12 last:pb-0 sm:pl-16"
            >
              {/* The employer's mark sits on the rail, in place of a dot. */}
              <span
                aria-hidden="true"
                className="accent-scope absolute top-5 left-0 block rounded-full shadow-[0_0_0_4px_var(--background)] sm:top-4 sm:rounded-xl"
                style={
                  {
                    "--accent-dark": exp.color,
                    "--accent-light": exp.colorLight,
                  } as CSSProperties
                }
              >
                <OrgLogo
                  name={exp.company}
                  logo={exp.logo}
                  fallbackIcon="maple-leaf"
                  size={40}
                  className="rounded-full sm:rounded-xl"
                />
              </span>

              <Reveal delay={Math.min(i * 0.06, 0.3)}>
                <GlassCard
                  accent={{ dark: exp.color, light: exp.colorLight }}
                  className="p-5 sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                        {exp.title}
                      </h3>
                      <p className="mt-0.5 font-medium text-(--item-accent)">
                        {exp.company}
                      </p>
                    </div>
                    <Chip className="px-3 py-1.5 text-xs">{exp.date}</Chip>
                  </div>
                  <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Icon name="map-pin" size={14} />
                    {exp.location}, {exp.country}
                  </p>
                  {exp.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1.5 border-t border-border/70 pt-3 text-sm text-muted-foreground">
                      {exp.highlights.map((h) => (
                        <li key={h} className="flex gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-(--item-accent)"
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </GlassCard>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
