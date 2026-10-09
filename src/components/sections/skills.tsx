import type { IconType } from "react-icons";
import { BiLogoFlask } from "react-icons/bi";
import {
  FaAws,
  FaDocker,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaJava,
  FaNode,
  FaPython,
  FaReact,
} from "react-icons/fa6";
import { IoLogoCss3, IoLogoHtml5, IoLogoJavascript } from "react-icons/io5";
import {
  SiCytoscapedotjs,
  SiDrizzle,
  SiEclipseide,
  SiExpress,
  SiFastapi,
  SiFolium,
  SiGeopandas,
  SiGithubactions,
  SiIntellijidea,
  SiJupyter,
  SiMermaid,
  SiMongodb,
  SiNetlify,
  SiNextdotjs,
  SiPandas,
  SiPostgresql,
  SiPycharm,
  SiPytorch,
  SiScikitlearn,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { VscAzure, VscVscode } from "react-icons/vsc";
import { GlassCard } from "~/components/ui/glass-card";
import { Reveal } from "~/components/ui/reveal";
import { Section } from "~/components/ui/section";
import { SectionHeading } from "~/components/ui/section-heading";
import { skillCategories, type SkillIcon } from "~/data/skills";

const icons: Record<SkillIcon, IconType> = {
  python: FaPython,
  postgresql: SiPostgresql,
  typescript: SiTypescript,
  java: FaJava,
  html: IoLogoHtml5,
  css: IoLogoCss3,
  javascript: IoLogoJavascript,
  nextjs: SiNextdotjs,
  express: SiExpress,
  flask: BiLogoFlask,
  fastapi: SiFastapi,
  tailwind: SiTailwindcss,
  node: FaNode,
  react: FaReact,
  pytorch: SiPytorch,
  drizzle: SiDrizzle,
  shadcn: SiShadcnui,
  pandas: SiPandas,
  geopandas: SiGeopandas,
  folium: SiFolium,
  mermaid: SiMermaid,
  scikit: SiScikitlearn,
  cytoscape: SiCytoscapedotjs,
  mongodb: SiMongodb,
  azure: VscAzure,
  aws: FaAws,
  netlify: SiNetlify,
  docker: FaDocker,
  githubactions: SiGithubactions,
  vercel: SiVercel,
  git: FaGitAlt,
  github: FaGithub,
  vscode: VscVscode,
  jupyter: SiJupyter,
  pycharm: SiPycharm,
  intellij: SiIntellijidea,
  eclipse: SiEclipseide,
  figma: FaFigma,
};

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="Tools I reach for."
        description="Languages, frameworks and platforms I use day to day, grouped by where they fit in the stack."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, i) => (
          <Reveal
            key={category.title}
            delay={Math.min((i % 3) * 0.07, 0.2)}
            className="h-full"
          >
            <GlassCard accent={category.accent} className="h-full p-5 sm:p-6">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-(--item-accent)"
                />
                <h3 className="font-semibold tracking-tight">
                  {category.title}
                </h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const Icon = icons[skill.icon];
                  return (
                    <li key={skill.name}>
                      <a
                        href={skill.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full py-1.5 pr-3 pl-2 text-sm text-foreground/85 glass-pill transition-[translate,color,background-color] duration-200 hover:-translate-y-0.5 hover:bg-foreground/8 hover:text-foreground"
                      >
                        <Icon
                          size={16}
                          className="shrink-0 text-(--item-accent)"
                          aria-hidden="true"
                        />
                        {skill.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
