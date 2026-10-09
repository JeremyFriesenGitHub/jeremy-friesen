import type { CSSProperties } from "react";
import { LiaCanadianMapleLeaf } from "react-icons/lia";
import { LuMapPin } from "react-icons/lu";
import { Chip } from "~/components/ui/chip";
import { GlassCard } from "~/components/ui/glass-card";
import { Reveal } from "~/components/ui/reveal";
import { Section } from "~/components/ui/section";
import { SectionHeading } from "~/components/ui/section-heading";
import { experiences } from "~/data/experience";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Internships across the public sector."
        description="Security, cloud, IT and data science roles with the Government of Canada, the RCMP and the National Research Council."
      />

      <ol className="relative mx-auto max-w-3xl">
        {/* Rail */}
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[15px] w-px bg-linear-to-b from-primary via-accent to-tertiary opacity-70 sm:left-[19px]"
        />

        {experiences.map((exp, i) => (
          <li
            key={`${exp.title}-${exp.date}`}
            className="relative pb-8 pl-12 last:pb-0 sm:pl-16"
          >
            {/* Dot */}
            <span
              aria-hidden="true"
              className="accent-scope absolute top-5 left-0 flex size-8 items-center justify-center rounded-full border border-(--item-accent)/40 bg-background text-(--item-accent) shadow-[0_0_0_4px_var(--background)] sm:size-10"
              style={
                {
                  "--accent-dark": exp.color,
                  "--accent-light": exp.colorLight,
                } as CSSProperties
              }
            >
              <LiaCanadianMapleLeaf size={18} />
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
                  <LuMapPin size={14} aria-hidden="true" />
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
    </Section>
  );
}
