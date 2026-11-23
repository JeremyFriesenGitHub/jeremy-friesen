import Image from "next/image";
import { Chip } from "~/components/ui/chip";
import { GlassButton } from "~/components/ui/glass-button";
import { GlassCard } from "~/components/ui/glass-card";
import { Icon } from "~/components/ui/icon";
import { Reveal } from "~/components/ui/reveal";
import { Section } from "~/components/ui/section";
import { SectionHeading } from "~/components/ui/section-heading";
import { copy } from "~/data/copy";
import { ShowMore } from "~/components/ui/show-more";
import { projects } from "~/data/projects";
import { socialLinks } from "~/data/social-links";
import { formatMonth } from "~/lib/dates";
import { SHOW_MORE_INITIAL } from "~/lib/show-more";
import { cn } from "~/lib/utils";

/** A card is full width on phones, half on tablets and a third on desktop. */
const imageSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

const iconLinkClass =
  "relative z-10 inline-flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground";

/** The card's main link covers the whole card (the `after:` overlay). */
const coverLinkClass = "after:absolute after:inset-0 after:rounded-3xl";

export function Projects() {
  // Newest first; ties keep the order in the data file.
  const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date));
  const hidden = Math.max(sorted.length - SHOW_MORE_INITIAL, 0);

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title={copy.projects.title}
        description={copy.projects.description}
        action={
          <GlassButton href={socialLinks.github} external>
            <Icon name="github" size={16} />
            All repositories
            <Icon name="arrow-up-right" size={16} />
          </GlassButton>
        }
      />

      <ShowMore
        moreLabel={`Show ${hidden} more project${hidden === 1 ? "" : "s"}`}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        // Screenshots can be any colour, so the navbar frosts over them.
        navFrost
      >
        {sorted.map((project, i) => (
          <Reveal key={project.title} delay={Math.min((i % 3) * 0.07, 0.2)}>
            <GlassCard
              accent={project.accent}
              className="group flex h-full flex-col overflow-hidden p-3"
            >
              {project.image ? (
                <div className="relative h-44 overflow-hidden rounded-2xl sm:h-48">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    sizes={imageSizes}
                    className={cn(
                      "object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]",
                      project.image.position === "center"
                        ? "object-center"
                        : "object-top",
                    )}
                  />
                </div>
              ) : (
                /* Code-only work: an accent-tinted banner instead of a screenshot. */
                <div
                  aria-hidden="true"
                  className="relative flex h-44 items-center justify-center overflow-hidden rounded-2xl sm:h-48"
                  style={{
                    background:
                      "radial-gradient(90% 120% at 15% 0%, color-mix(in oklab, var(--item-accent) 38%, transparent), transparent 65%), radial-gradient(70% 90% at 100% 100%, color-mix(in oklab, var(--item-accent) 22%, transparent), transparent 60%), color-mix(in oklab, var(--item-accent) 7%, transparent)",
                  }}
                >
                  <span className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:28px_28px] opacity-60" />
                  <span className="relative flex size-20 items-center justify-center rounded-3xl bg-(--item-accent)/15 text-(--item-ink) transition-transform duration-500 ease-out group-hover:scale-110">
                    <Icon name={project.icon} size={40} />
                  </span>
                </div>
              )}

              <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-(--item-accent)/12 text-(--item-ink)">
                      <Icon name={project.icon} size={18} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg leading-tight font-semibold tracking-tight">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={coverLinkClass}
                        >
                          {project.title}
                        </a>
                      </h3>
                      <time
                        dateTime={project.date}
                        className="mt-0.5 block font-mono text-[11px] tracking-wide text-muted-foreground"
                      >
                        {formatMonth(project.date)}
                      </time>
                    </div>
                  </div>
                  <Icon
                    name="arrow-up-right"
                    className="mt-1 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                    size={18}
                  />
                </div>
                {project.description && (
                  <p className="mt-3 text-sm text-pretty text-muted-foreground">
                    {project.description}
                  </p>
                )}
                {project.note && (
                  <p
                    className={cn(
                      "mt-3 flex items-center gap-1.5 text-sm",
                      project.award
                        ? "font-medium text-(--item-ink)"
                        : "text-muted-foreground",
                    )}
                  >
                    <Icon
                      name={project.award ? "award" : "calendar"}
                      size={15}
                    />
                    {project.note}
                  </p>
                )}
                <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-4">
                  {project.tags.map((tag) => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                  <span className="ml-auto flex items-center gap-0.5">
                    {project.video && (
                      <a
                        href={project.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} demo video`}
                        className={iconLinkClass}
                      >
                        <Icon name="youtube" size={15} />
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} source on GitHub`}
                        className={iconLinkClass}
                      >
                        <Icon name="github" size={15} />
                      </a>
                    )}
                  </span>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </ShowMore>
    </Section>
  );
}
