import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";
import { Backdrop } from "~/components/ui/backdrop";
import { Chip } from "~/components/ui/chip";
import { EffectsToggle } from "~/components/ui/effects-toggle";
import { GlassButton } from "~/components/ui/glass-button";
import { Icon } from "~/components/ui/icon";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { caseStudies } from "~/data/projects";
import { profile } from "~/data/social-links";
import { formatMonth, linkHost } from "~/lib/dates";
import { siteDescription, siteName, siteUrl } from "~/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudies.find((p) => p.slug === slug);
  if (!project) return {};
  const description = project.caseStudy.summary || siteDescription;
  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      url: `${siteUrl}/projects/${slug}`,
      siteName,
      title: `${project.title} · ${siteName}`,
      description,
      locale: "en_CA",
    },
  };
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-pretty text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

/** A project's story: problem, approach, result, with its screenshots and links. */
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = caseStudies.find((p) => p.slug === slug);
  if (!project) notFound();
  const { caseStudy } = project;
  const others = caseStudies.filter((p) => p.slug !== slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    ...(caseStudy.summary || siteDescription
      ? { description: caseStudy.summary || siteDescription }
      : {}),
    url: `${siteUrl}/projects/${slug}`,
    codeRepository: project.repo ?? project.url,
    programmingLanguage: project.tags,
    dateCreated: project.date,
    author: { "@type": "Person", name: profile.name, url: siteUrl },
    ...(project.video ? { video: project.video } : {}),
  };

  return (
    <>
      <Backdrop />
      <header className="relative z-20 mx-auto flex max-w-4xl items-center justify-between px-4 pt-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-full py-1 pr-3 font-semibold tracking-tight"
        >
          <span className="flex size-8 items-center justify-center rounded-xl bg-linear-to-br from-primary via-accent to-tertiary font-mono text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.45)]">
            JF
          </span>
          {profile.name}
        </Link>
        <div className="glass flex items-center gap-0.5 rounded-full p-1 glass-clear">
          <EffectsToggle />
          <ThemeToggle />
        </div>
      </header>

      <main
        id="main"
        className="relative z-10 mx-auto max-w-4xl px-4 pt-10 pb-20 sm:px-6 sm:pt-14"
      >
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <LuArrowLeft size={16} aria-hidden="true" />
          All projects
        </Link>

        <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs font-semibold tracking-[0.22em] text-primary-strong uppercase">
          <span>Case study</span>
          <span aria-hidden="true">·</span>
          <time dateTime={project.date}>{formatMonth(project.date)}</time>
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {project.title}
        </h1>
        {caseStudy.summary && (
          <p className="mt-4 max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">
            {caseStudy.summary}
          </p>
        )}
        {project.note && (
          <p
            className={
              project.award
                ? "mt-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm font-medium text-primary-strong"
                : "mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground"
            }
          >
            <Icon name={project.award ? "award" : "calendar"} size={15} />
            {project.note}
          </p>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          <GlassButton href={project.url} external variant="primary">
            {linkHost(project.url) === "Devpost" ? (
              <Icon name="devpost" size={16} />
            ) : (
              <Icon name="external-link" size={16} />
            )}
            View on {linkHost(project.url)}
          </GlassButton>
          {project.video && (
            <GlassButton href={project.video} external>
              <Icon name="youtube" size={16} />
              Watch the demo
            </GlassButton>
          )}
          {project.repo && (
            <GlassButton href={project.repo} external>
              <Icon name="github" size={16} />
              Source on GitHub
            </GlassButton>
          )}
        </div>

        {project.images.length > 0 && (
          <div
            className={
              project.images.length > 1
                ? "mt-10 grid gap-4 sm:grid-cols-2"
                : "mt-10"
            }
          >
            {project.images.map((img, i) => (
              <figure
                key={img.src}
                className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-card"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={i === 0}
                  sizes={
                    project.images.length > 1
                      ? "(max-width: 640px) 100vw, 448px"
                      : "(max-width: 896px) 100vw, 896px"
                  }
                  className="object-cover object-top"
                />
              </figure>
            ))}
          </div>
        )}

        <div className="glass mt-10 rounded-3xl p-6 sm:p-10">
          {caseStudy.problem.length > 0 && (
            <Block title="The problem">
              {caseStudy.problem.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Block>
          )}
          {caseStudy.approach.length > 0 && (
            <Block title="The approach">
              <ul className="list-disc space-y-2 pl-5">
                {caseStudy.approach.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </Block>
          )}
          {caseStudy.result.length > 0 && (
            <Block title="The result">
              {caseStudy.result.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Block>
          )}
          {caseStudy.role && (
            <Block title="My role">
              <p>{caseStudy.role}</p>
            </Block>
          )}
          {caseStudy.team && caseStudy.team.length > 0 && (
            <Block title="Team">
              <p>{caseStudy.team.join(", ")}</p>
            </Block>
          )}
          <Block title="Built with">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
          </Block>
        </div>

        {others.length > 0 && (
          <section className="mt-14">
            <h2 className="font-mono text-xs font-semibold tracking-[0.22em] text-primary-strong uppercase">
              More case studies
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="glass block rounded-2xl p-4 transition-[translate] duration-300 hover:-translate-y-0.5"
                  >
                    <span className="flex items-center justify-between gap-3 font-semibold">
                      {p.title}
                      <Icon
                        name="arrow-right"
                        size={16}
                        className="shrink-0 text-muted-foreground"
                      />
                    </span>
                    {p.caseStudy.summary && (
                      <span className="mt-1 block text-sm text-muted-foreground">
                        {p.caseStudy.summary}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
