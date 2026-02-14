"use client";

import {
  FaPython,
  FaJava,
  FaReact,
  FaDocker,
  FaGitAlt,
  FaFigma,
} from "react-icons/fa";
import {
  SiPostgresql,
  SiTypescript,
  SiExpress,
  SiDrizzle,
  SiShadcnui,
  SiPandas,
  SiGeopandas,
  SiFolium,
  SiMermaid,
  SiScikitlearn,
  SiNetlify,
  SiGithubactions,
  SiJupyter,
  SiPycharm,
  SiIntellijidea,
  SiEclipseide,
  SiCytoscapedotjs,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { BiLogoFlask } from "react-icons/bi";
import { VscAzure, VscGithubAlt, VscVscode } from "react-icons/vsc";
import { IoLogoCss3, IoLogoHtml5, IoLogoJavascript } from "react-icons/io5";
import { FaNode } from "react-icons/fa6";
import Link from "next/link";
import { TiltCard } from "~/components/effects/tilt-card";
import { GlassCard } from "~/components/ui/glass-card";
import { SectionHeading } from "~/components/ui/section-heading";
import { ScrollMorph } from "~/components/effects/scroll-morph";
import { skillCategories, categoryColors, categoryColorsLight } from "~/data/skills";
import { useIsDark } from "~/hooks/use-is-dark";

const iconMap: Record<string, React.ReactNode> = {
  FaPython: <FaPython />,
  SiPostgresql: <SiPostgresql />,
  SiTypescript: <SiTypescript />,
  FaJava: <FaJava />,
  IoLogoHtml5: <IoLogoHtml5 />,
  IoLogoCss3: <IoLogoCss3 />,
  IoLogoJavascript: <IoLogoJavascript />,
  TbBrandNextjs: <TbBrandNextjs />,
  SiExpress: <SiExpress />,
  BiLogoFlask: <BiLogoFlask />,
  SiTailwindcss: <SiTailwindcss />,
  FaNode: <FaNode />,
  FaReact: <FaReact />,
  SiDrizzle: <SiDrizzle />,
  SiShadcnui: <SiShadcnui />,
  SiPandas: <SiPandas />,
  SiGeopandas: <SiGeopandas />,
  SiFolium: <SiFolium />,
  SiMermaid: <SiMermaid />,
  SiScikitlearn: <SiScikitlearn />,
  SiCytoscapedotjs: <SiCytoscapedotjs />,
  VscAzure: <VscAzure />,
  SiNetlify: <SiNetlify />,
  FaDocker: <FaDocker />,
  SiGithubactions: <SiGithubactions />,
  FaGitAlt: <FaGitAlt />,
  VscGithubAlt: <VscGithubAlt />,
  VscVscode: <VscVscode />,
  SiJupyter: <SiJupyter />,
  SiPycharm: <SiPycharm />,
  SiIntellijidea: <SiIntellijidea />,
  SiEclipseide: <SiEclipseide />,
  FaFigma: <FaFigma />,
  SiVercel: <SiVercel />,
};

export function Skills() {
  const isDark = useIsDark();

  return (
    <section id="skills" className="relative z-10 px-4 py-12 sm:px-8 sm:py-20">
      <SectionHeading>Skills</SectionHeading>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {skillCategories.map((category, index) => {
          const colors = isDark ? categoryColors : categoryColorsLight;
          const color = colors[index % colors.length]!;
          return (
            <ScrollMorph key={index}>
              <TiltCard className="h-full">
                <GlassCard className="group h-full transition-all duration-300 hover:border-border" glowColor={color}>
                  <h3 className="mb-3 text-center text-lg font-semibold text-foreground transition duration-200 group-hover:translate-x-1 sm:mb-4 sm:text-xl">
                    {category.title}
                  </h3>
                  <div className="grid grid-cols-3 items-center justify-center gap-3 transition duration-200 group-hover:translate-x-1 sm:gap-4">
                    {category.skills.map((skill, idx) => (
                      <Link
                        key={idx}
                        href={skill.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center text-3xl text-foreground transition-all hover:scale-110 sm:text-4xl md:text-5xl"
                      >
                        {iconMap[skill.iconName]}
                      </Link>
                    ))}
                  </div>
                </GlassCard>
              </TiltCard>
            </ScrollMorph>
          );
        })}
      </div>
    </section>
  );
}
