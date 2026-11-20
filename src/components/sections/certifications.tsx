import { Chip } from "~/components/ui/chip";
import { GlassCard } from "~/components/ui/glass-card";
import { Icon } from "~/components/ui/icon";
import { OrgLogo } from "~/components/ui/org-logo";
import { Reveal } from "~/components/ui/reveal";
import { Section } from "~/components/ui/section";
import { SectionHeading } from "~/components/ui/section-heading";
import { certifications } from "~/data/certifications";
import { copy } from "~/data/copy";

export function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeading
        eyebrow="Certifications"
        title={copy.certifications.title}
        description={copy.certifications.description}
      />

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => {
          const dates: string[] = [];
          if (cert.issued) dates.push(`Issued ${cert.issued}`);
          if (cert.expires) dates.push(`Expires ${cert.expires}`);
          return (
            <li key={cert.name} className="h-full">
              <Reveal delay={Math.min((i % 3) * 0.07, 0.2)} className="h-full">
                <GlassCard
                  accent={cert.accent}
                  className="group flex h-full flex-col p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <OrgLogo
                      name={cert.issuer}
                      fallbackIcon={cert.icon}
                      size={48}
                      className="rounded-2xl"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold tracking-tight text-balance">
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="after:absolute after:inset-0 after:rounded-3xl"
                        >
                          {cert.name}
                        </a>
                      </h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  {dates.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {dates.map((date) => (
                        <li key={date}>
                          <Chip>{date}</Chip>
                        </li>
                      ))}
                    </ul>
                  )}

                  <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-muted-foreground">
                    <span className="transition-colors group-hover:text-foreground">
                      Show credential
                    </span>
                    <Icon
                      name="arrow-up-right"
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </p>
                </GlassCard>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
