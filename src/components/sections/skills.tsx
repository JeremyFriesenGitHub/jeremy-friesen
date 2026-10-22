import { Icon } from "~/components/ui/icon";
import { GlassCard } from "~/components/ui/glass-card";
import { Reveal } from "~/components/ui/reveal";
import { Section } from "~/components/ui/section";
import { SectionHeading } from "~/components/ui/section-heading";
import { copy } from "~/data/copy";
import { skillCategories } from "~/data/skills";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title={copy.skills.title}
        description={copy.skills.description}
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
                  return (
                    <li key={skill.name}>
                      <a
                        href={skill.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full py-1.5 pr-3 pl-2 text-sm text-foreground/85 glass-pill transition-[translate,color,background-color] duration-200 hover:-translate-y-0.5 hover:bg-foreground/8 hover:text-foreground"
                      >
                        <Icon
                          name={skill.icon}
                          size={16}
                          className="shrink-0 text-(--item-accent)"
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
