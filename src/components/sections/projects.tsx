"use client";

import Image from "next/image";
import Link from "next/link";
import { TiltCard } from "~/components/effects/tilt-card";
import { GlassCard } from "~/components/ui/glass-card";
import { SectionHeading } from "~/components/ui/section-heading";
import { ScrollMorph } from "~/components/effects/scroll-morph";
import { projects } from "~/data/projects";
import { useIsDark } from "~/hooks/use-is-dark";
import { PiGraphFill } from "react-icons/pi";
import { RiComputerLine } from "react-icons/ri";
import { GoDatabase } from "react-icons/go";
import { GiArtificialIntelligence } from "react-icons/gi";
import { LuTimer } from "react-icons/lu";
import { SiGoogledocs } from "react-icons/si";

const iconMap: Record<string, React.ReactNode> = {
  LuTimer: <LuTimer className="h-4 w-4" />,
  SiGoogledocs: <SiGoogledocs className="h-4 w-4" />,
  PiGraphFill: <PiGraphFill className="h-4 w-4" />,
  RiComputerLine: <RiComputerLine className="h-4 w-4" />,
  GoDatabase: <GoDatabase className="h-4 w-4" />,
  GiArtificialIntelligence: <GiArtificialIntelligence className="h-4 w-4" />,
};

export function Projects() {
  const isDark = useIsDark();

  return (
    <section id="projects" className="relative z-10 px-4 py-12 sm:px-8 sm:py-20">
      <SectionHeading>Projects</SectionHeading>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:auto-rows-[20rem] md:grid-cols-3">
        {projects.map((project, i) => {
          const c = isDark ? project.color : project.colorLight;
          return (
            <ScrollMorph key={i}>
              <TiltCard
                className={`h-full ${project.colSpan === 2 ? "sm:col-span-2" : "sm:col-span-1"}`}
              >
                <GlassCard
                  className="group flex h-full flex-col justify-between overflow-hidden transition-all duration-300 hover:border-border"
                  glowColor={c}
                >
                  {/* Image header */}
                  <div className="mb-2 flex h-24 gap-2 overflow-hidden rounded-lg sm:mb-3 sm:h-28 md:h-32">
                    {project.images.map((img, idx) => (
                      <div key={idx} className="relative flex-1">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          className="rounded-lg object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Content */}
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition duration-200 group-hover:translate-x-1"
                  >
                    <span className="text-foreground">
                      {iconMap[project.iconName]}
                    </span>
                    <h3 className="mb-1 mt-2 text-sm font-bold text-foreground hover:underline sm:text-base">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground hover:underline">
                      {project.description}
                    </p>
                  </Link>
                </GlassCard>
              </TiltCard>
            </ScrollMorph>
          );
        })}
      </div>
    </section>
  );
}
