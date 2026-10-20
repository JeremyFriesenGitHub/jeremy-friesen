import { Icon } from "~/components/ui/icon";
import { Year } from "~/components/ui/year";
import { navLinks, profile, socialLinks } from "~/data/social-links";

const elsewhere = [
  { href: socialLinks.github, label: "GitHub", icon: "github" },
  { href: socialLinks.linkedin, label: "LinkedIn", icon: "linkedin" },
  { href: socialLinks.devpost, label: "Devpost", icon: "devpost" },
  { href: socialLinks.resume, label: "Resume", icon: "file-text" },
] as const;

const stack = [
  { href: "https://nextjs.org", label: "Next.js", icon: "nextjs" },
  { href: "https://react.dev", label: "React", icon: "react" },
  {
    href: "https://www.typescriptlang.org",
    label: "TypeScript",
    icon: "typescript",
  },
  { href: "https://tailwindcss.com", label: "Tailwind CSS", icon: "tailwind" },
  { href: "https://vercel.com", label: "Vercel", icon: "vercel" },
] as const;

const linkClass =
  "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground";

export function Footer() {
  const built = new Date().getFullYear();

  return (
    <footer className="relative z-10 px-4 pt-4 pb-6 sm:px-6 sm:pb-8">
      <div className="glass mx-auto max-w-6xl rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a
              href="#top"
              className="inline-flex items-center gap-2.5 font-semibold tracking-tight"
            >
              <span className="flex size-8 items-center justify-center rounded-xl bg-linear-to-br from-primary via-accent to-tertiary font-mono text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.45)]">
                JF
              </span>
              {profile.name}
            </a>
            {profile.tagline && (
              <p className="mt-3 text-sm text-pretty text-muted-foreground">
                {profile.tagline}
              </p>
            )}
            <div className="mt-5 flex items-center gap-2">
              {elsewhere.slice(0, 3).map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-10 items-center justify-center rounded-full text-foreground/80 glass-pill transition-[translate,color] hover:-translate-y-0.5 hover:text-foreground"
                >
                  <Icon name={icon} size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-12">
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Sections
              </p>
              <ul className="mt-3 space-y-2">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className={linkClass}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Elsewhere
              </p>
              <ul className="mt-3 space-y-2">
                {elsewhere.map(({ href, label, icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      <Icon name={icon} size={14} />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="font-mono text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Built with
              </p>
              <ul className="mt-3 space-y-2">
                {stack.map(({ href, label, icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      <Icon name={icon} size={14} />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <Year built={built} /> {profile.name}. {profile.location}.
          </p>
          <a
            href={socialLinks.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Source on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
