import { FaGithub, FaLinkedinIn, FaReact } from "react-icons/fa6";
import { SiDevpost, SiNextdotjs, SiTailwindcss, SiTypescript, SiVercel } from "react-icons/si";
import { LuFileText } from "react-icons/lu";
import { navLinks, profile, socialLinks } from "~/data/social-links";

const elsewhere = [
  { href: socialLinks.github, label: "GitHub", Icon: FaGithub },
  { href: socialLinks.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
  { href: socialLinks.devpost, label: "Devpost", Icon: SiDevpost },
  { href: socialLinks.resume, label: "Resume", Icon: LuFileText },
] as const;

const stack = [
  { href: "https://nextjs.org", label: "Next.js", Icon: SiNextdotjs },
  { href: "https://react.dev", label: "React", Icon: FaReact },
  { href: "https://www.typescriptlang.org", label: "TypeScript", Icon: SiTypescript },
  { href: "https://tailwindcss.com", label: "Tailwind CSS", Icon: SiTailwindcss },
  { href: "https://vercel.com", label: "Vercel", Icon: SiVercel },
] as const;

const linkClass =
  "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 px-4 pt-4 pb-6 sm:px-6 sm:pb-8">
      <div className="glass mx-auto max-w-6xl rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#top" className="inline-flex items-center gap-2.5 font-semibold tracking-tight">
              <span className="flex size-8 items-center justify-center rounded-xl bg-linear-to-br from-primary via-accent to-tertiary font-mono text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.45)]">
                JF
              </span>
              {profile.name}
            </a>
            <p className="mt-3 text-sm text-pretty text-muted-foreground">{profile.tagline}</p>
            <div className="mt-5 flex items-center gap-2">
              {elsewhere.slice(0, 3).map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass-pill inline-flex size-10 items-center justify-center rounded-full text-foreground/80 transition-[transform,color] hover:-translate-y-0.5 hover:text-foreground"
                >
                  <Icon size={17} aria-hidden="true" />
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
                {elsewhere.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      <Icon size={14} aria-hidden="true" />
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
                {stack.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      <Icon size={14} aria-hidden="true" />
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
            © {year} {profile.name}. {profile.location}.
          </p>
          <a href={socialLinks.repo} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
            Source on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
