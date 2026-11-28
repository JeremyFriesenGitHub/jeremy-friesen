import type { CSSProperties } from "react";
import Image from "next/image";
import { Icon } from "~/components/ui/icon";
import { Monogram } from "~/components/ui/monogram";
import { Year } from "~/components/ui/year";
import { copy } from "~/data/copy";
import {
  contact,
  navLinks,
  profile,
  socialLinks,
  telHref,
} from "~/data/social-links";
import { siteUrl } from "~/lib/site";
import { cn } from "~/lib/utils";

const elsewhere = [
  { href: socialLinks.github, label: "GitHub", icon: "github" },
  { href: socialLinks.linkedin, label: "LinkedIn", icon: "linkedin" },
  { href: socialLinks.x, label: "X", icon: "x" },
  { href: socialLinks.devpost, label: "Devpost", icon: "devpost" },
  { href: socialLinks.resume, label: "Resume", icon: "file-text" },
] as const;

/** The icon row under the name: every profile, without the résumé. */
const profiles = elsewhere.filter((link) => link.label !== "Resume");

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

/**
 * The 613 Webring (https://www.613webring.ca/join). Its nav page finds this
 * site in the ring by origin and sends the visitor to the neighbour. This is
 * the ring's no-JavaScript version: its widget.js would need the CSP opened
 * to a third-party script and image, and picks light or dark from the OS
 * rather than the site's theme toggle.
 */
const webring = "https://www.613webring.ca";
const hop = (dir: "prev" | "random" | "next") =>
  `${webring}/nav?dir=${dir}&site=${encodeURIComponent(new URL(siteUrl).origin)}`;

const hops = {
  prev: { icon: "arrow-left", label: "Previous site in the ring" },
  random: { icon: "shuffle", label: "Random site in the ring" },
  next: { icon: "arrow-right", label: "Next site in the ring" },
} as const;

const hopClass =
  "inline-flex size-7 items-center justify-center rounded-full transition-colors hover:bg-foreground/8 hover:text-foreground";

function HopLink({ dir }: { dir: keyof typeof hops }) {
  const { icon, label } = hops[dir];
  return (
    <a href={hop(dir)} title={label} className={hopClass}>
      <Icon name={icon} size={14} />
    </a>
  );
}

/** A glass pill on the footer's glass: `glass-pill`, with no backdrop filter of its own. */
function Webring({ className }: { className?: string }) {
  return (
    <nav
      aria-label="613 Webring"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full p-1 glass-pill",
        className,
      )}
    >
      <HopLink dir="prev" />
      {/* The ring's mark is a ghost in the text colour, like the logos in the
          sections, and shows in its own chrome while the link is hovered or
          focused. `lit:` covers hover; its focus half looks for focus inside
          the group, and here the group is the focused link itself. */}
      <a
        href={webring}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 rounded-full py-1 pr-2.5 pl-1.5 font-medium transition-colors hover:bg-foreground/8 hover:text-foreground"
      >
        <span className="relative size-4 shrink-0">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-current transition-opacity duration-350 ghost-mask group-focus-visible:opacity-0 print:hidden forced-colors:hidden lit:opacity-0"
            style={
              {
                "--ghost-mask": "url(/logos/ghost/613-webring.webp)",
              } as CSSProperties
            }
          />
          <Image
            src="/logos/613-webring.webp"
            alt=""
            width={16}
            height={16}
            className="relative size-full opacity-0 transition-opacity duration-350 group-focus-visible:opacity-100 print:opacity-100 forced-colors:opacity-100 lit:opacity-100"
          />
        </span>
        <span>
          <span className="font-mono font-semibold">613</span> Webring
        </span>
      </a>
      <HopLink dir="random" />
      <HopLink dir="next" />
    </nav>
  );
}

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
              <Monogram />
              {profile.name}
            </a>
            {copy.footer.tagline && (
              <p className="mt-3 text-sm text-pretty text-muted-foreground">
                {copy.footer.tagline}
              </p>
            )}
            <ul className="mt-4 space-y-2">
              <li>
                <a href={`mailto:${contact.email}`} className={linkClass}>
                  <Icon name="mail" size={14} />
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={telHref(contact.phone)} className={linkClass}>
                  <Icon name="phone" size={14} />
                  {contact.phone}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-2">
              {profiles.map(({ href, label, icon }) => (
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

          {/* Beside the contact block at md the columns hug their content:
              three equal ones leave "Tailwind CSS" no room at 768px. */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-[repeat(3,auto)] lg:grid-cols-3 lg:gap-12">
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

        {/* The ring sits in the middle once the line has room for it; until
            then it has a row of its own under the copyright and the source. */}
        <div className="mt-8 grid justify-items-start gap-3 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:grid-cols-[1fr_auto] sm:items-center lg:grid-cols-[1fr_auto_1fr]">
          <p>
            © <Year built={built} /> {profile.name}. {profile.location}.
          </p>
          <Webring className="sm:col-span-2 sm:row-start-2 lg:col-span-1 lg:col-start-2 lg:row-start-1" />
          <a
            href={socialLinks.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground sm:col-start-2 sm:row-start-1 sm:justify-self-end lg:col-start-3"
          >
            Source on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
