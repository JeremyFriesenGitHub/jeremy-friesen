import type { Metadata } from "next";
import { LuArrowLeft } from "react-icons/lu";
import { GlassButton } from "~/components/ui/glass-button";
import { PrintButton } from "~/components/ui/print-button";
import { communityRoles } from "~/data/community";
import { experiences } from "~/data/experience";
import { hackathonProjects, judging } from "~/data/hackathons";
import { projects } from "~/data/projects";
import { skillCategories } from "~/data/skills";
import { aboutText, profile, socialLinks } from "~/data/social-links";
import { formatMonth } from "~/lib/dates";
import { siteUrl } from "~/lib/site";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${profile.name}: ${profile.role} at ${profile.organization} and ${profile.program} student at ${profile.school}. Experience, leadership, projects, awards and skills.`,
  alternates: { canonical: "/resume" },
};

/** "https://www.linkedin.com/in/x" -> "linkedin.com/in/x", how a résumé prints a link. */
const pretty = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 print:mt-5">
      <h2 className="border-b border-border pb-1.5 font-mono text-[11px] font-semibold tracking-[0.2em] text-primary-strong uppercase">
        {title}
      </h2>
      <div className="mt-3 space-y-4 print:space-y-3">{children}</div>
    </section>
  );
}

function Entry({
  heading,
  meta,
  date,
  bullets,
  children,
}: {
  heading: string;
  meta?: string;
  date?: string;
  bullets?: readonly string[];
  children?: React.ReactNode;
}) {
  return (
    <div className="break-inside-avoid">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
        <h3 className="font-semibold">{heading}</h3>
        {date && (
          <p className="font-mono text-xs text-muted-foreground">{date}</p>
        )}
      </div>
      {meta && <p className="text-sm text-muted-foreground">{meta}</p>}
      {bullets && bullets.length > 0 && (
        <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
}

/**
 * The résumé, from the same data files as the rest of the site so it never
 * drifts. On screen it is a sheet on the page; on paper the print rules in
 * globals.css turn it black on white and the buttons disappear.
 */
export default function ResumePage() {
  const selected = [...projects]
    .filter((p) => p.award ?? p.note)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 8);
  const awards = hackathonProjects.filter((p) => p.award);
  const links = [
    { label: pretty(siteUrl), href: siteUrl },
    { label: pretty(socialLinks.github), href: socialLinks.github },
    { label: pretty(socialLinks.linkedin), href: socialLinks.linkedin },
    { label: pretty(socialLinks.devpost), href: socialLinks.devpost },
  ];

  return (
    <main
      id="main"
      className="relative z-10 mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 print:max-w-none print:p-0"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <GlassButton href="/">
          <LuArrowLeft size={16} aria-hidden="true" />
          Back to site
        </GlassButton>
        <PrintButton />
      </div>

      <article className="rounded-3xl border border-border bg-card/70 p-6 text-[15px] leading-relaxed backdrop-blur-xl sm:p-10 print:rounded-none print:border-0 print:bg-transparent print:p-0 print:text-[10.5pt] print:leading-snug print:backdrop-blur-none">
        <header>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl print:text-[22pt]">
            {profile.name}
          </h1>
          <p className="mt-1.5 text-lg print:text-[11pt]">
            {profile.role}, {profile.organization} ·{" "}
            {capitalize(profile.program)}, {profile.school}
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <li>{profile.location}</li>
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <Section title="Summary">
          <p>{aboutText.intro}</p>
        </Section>

        <Section title="Experience">
          {experiences.map((job) => (
            <Entry
              key={`${job.title}-${job.company}-${job.date}`}
              heading={job.title}
              meta={`${job.company} · ${job.location}`}
              date={job.date}
              bullets={job.highlights}
            />
          ))}
        </Section>

        <Section title="Education">
          <Entry heading={profile.school} meta={capitalize(profile.program)} />
        </Section>

        <Section title="Leadership and community">
          {communityRoles.map((role) => (
            <Entry
              key={role.org}
              heading={role.org}
              meta={role.roles.map((r) => `${r.title} (${r.date})`).join(" · ")}
              bullets={role.highlights}
            />
          ))}
        </Section>

        <Section title="Selected projects">
          {selected.map((project) => (
            <Entry
              key={project.slug}
              heading={project.title}
              meta={project.note}
              date={formatMonth(project.date)}
            >
              <p className="mt-1 text-sm">
                {project.description}{" "}
                <span className="text-muted-foreground">
                  {project.tags.join(", ")}.
                </span>
              </p>
            </Entry>
          ))}
        </Section>

        <Section title="Hackathon awards and judging">
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {awards.map((p) => (
              <li key={p.title}>
                <span className="font-medium">{p.award}</span>, {p.hackathon}
                {p.date ? ` (${p.date})` : ""}: {p.title}
              </li>
            ))}
            {judging.map((j) => (
              <li key={j.event}>
                Judge, {j.event} ({j.date})
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Technical skills">
          <ul className="space-y-1 text-sm">
            {skillCategories.map((cat) => (
              <li key={cat.title}>
                <span className="font-medium">{cat.title}:</span>{" "}
                {cat.skills.map((s) => s.name).join(", ")}
              </li>
            ))}
          </ul>
        </Section>
      </article>
    </main>
  );
}
