import {
  LuArrowUpRight,
  LuBrainCircuit,
  LuCode,
  LuPlane,
  LuUsersRound,
} from "react-icons/lu";
import { Chip } from "~/components/ui/chip";
import { GlassCard } from "~/components/ui/glass-card";
import { Reveal } from "~/components/ui/reveal";
import { Section } from "~/components/ui/section";
import { SectionHeading } from "~/components/ui/section-heading";
import { communityRoles, type CommunityIcon } from "~/data/community";

const icons: Record<
  CommunityIcon,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  brain: LuBrainCircuit,
  plane: LuPlane,
  keyboard: LuCode,
  users: LuUsersRound,
};

export function Community() {
  return (
    <Section id="community">
      <SectionHeading
        eyebrow="Community"
        title="Clubs, teams and the people behind them."
        description="Leadership and volunteer work across Carleton's tech community: running a society, leading a drone software team, and building the tools behind a hackathon."
      />

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {communityRoles.map((role, i) => {
          const Icon = icons[role.icon];
          const current = role.roles[0];
          return (
            <li key={role.org} className="h-full">
              <Reveal delay={Math.min((i % 2) * 0.08, 0.2)} className="h-full">
                <GlassCard
                  accent={role.accent}
                  className="group flex h-full flex-col p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-(--item-accent)/14 text-(--item-accent)">
                      <Icon size={24} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                        <a
                          href={role.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 after:absolute after:inset-0 after:rounded-3xl"
                        >
                          {role.org}
                          <LuArrowUpRight
                            size={16}
                            aria-hidden="true"
                            className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                          />
                        </a>
                      </h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {role.blurb}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-4 flex flex-col gap-1.5">
                    {role.roles.map((r) => (
                      <li
                        key={`${r.title}-${r.date}`}
                        className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1"
                      >
                        <span
                          className={
                            r === current
                              ? "font-medium text-(--item-accent)"
                              : "text-sm text-foreground/80"
                          }
                        >
                          {r.title}
                        </span>
                        <Chip className="px-2.5 py-1 text-[11px]">
                          {r.date}
                        </Chip>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 space-y-2 border-t border-border/70 pt-4 text-sm text-muted-foreground">
                    {role.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-(--item-accent)"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
