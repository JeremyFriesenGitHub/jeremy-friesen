import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import {
  LuArrowUpRight,
  LuAward,
  LuBrainCircuit,
  LuLaptop,
  LuPlane,
  LuRocket,
  LuSatellite,
  LuShieldCheck,
  LuTimer,
  LuWaypoints,
  LuWorkflow,
} from "react-icons/lu";
import { Chip } from "~/components/ui/chip";
import { GlassButton } from "~/components/ui/glass-button";
import { GlassCard } from "~/components/ui/glass-card";
import { Reveal } from "~/components/ui/reveal";
import { Section } from "~/components/ui/section";
import { SectionHeading } from "~/components/ui/section-heading";
import { projects, type ProjectIcon } from "~/data/projects";
import { socialLinks } from "~/data/social-links";
import { cn } from "~/lib/utils";

const icons: Record<
  ProjectIcon,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  shield: LuShieldCheck,
  timer: LuTimer,
  plane: LuPlane,
  graph: LuWaypoints,
  brain: LuBrainCircuit,
  laptop: LuLaptop,
  rocket: LuRocket,
  satellite: LuSatellite,
  workflow: LuWorkflow,
};

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work."
        description="Live demos, club platforms and open-source tools, from campus utilities to AI products."
        action={
          <GlassButton href={socialLinks.github} external>
            <FaGithub size={16} aria-hidden="true" />
            All repositories
            <LuArrowUpRight size={16} aria-hidden="true" />
          </GlassButton>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => {
          const Icon = icons[project.icon];
          return (
            <Reveal
              key={project.title}
              delay={Math.min((i % 3) * 0.07, 0.2)}
              className={cn(project.colSpan === 2 && "lg:col-span-2")}
            >
              <GlassCard
                accent={project.accent}
                className="group flex h-full flex-col overflow-hidden p-3"
              >
                {project.images.length > 0 ? (
                  <div className="flex h-44 gap-2 overflow-hidden rounded-2xl sm:h-48">
                    {project.images.map((img) => (
                      <div
                        key={img.src}
                        className="relative min-w-0 flex-1 overflow-hidden rounded-2xl"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes={
                            project.colSpan === 2
                              ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
                              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          }
                          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        />
                      </div>
                    ))}
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
                    <span className="relative flex size-20 items-center justify-center rounded-3xl bg-(--item-accent)/15 text-(--item-accent) transition-transform duration-500 ease-out group-hover:scale-110">
                      <Icon size={40} />
                    </span>
                  </div>
                )}

                <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-(--item-accent)/12 text-(--item-accent)">
                        <Icon size={18} />
                      </span>
                      <h3 className="text-lg font-semibold tracking-tight">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="after:absolute after:inset-0 after:rounded-3xl"
                        >
                          {project.title}
                        </a>
                      </h3>
                    </div>
                    <LuArrowUpRight
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                      size={18}
                    />
                  </div>
                  <p className="mt-3 text-sm text-pretty text-muted-foreground">
                    {project.description}
                  </p>
                  {project.note && (
                    <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-(--item-accent)">
                      <LuAward size={15} aria-hidden="true" />
                      {project.note}
                    </p>
                  )}
                  <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-4">
                    {project.tags.map((tag) => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} source on GitHub`}
                        className="relative z-10 ml-auto inline-flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <FaGithub size={15} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
