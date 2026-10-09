"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiDevpost } from "react-icons/si";
import { LuFileText, LuMenu, LuX } from "react-icons/lu";
import { MagneticElement } from "~/components/effects/magnetic-element";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { navLinks, socialLinks } from "~/data/social-links";
import { useActiveSection } from "~/hooks/use-active-section";
import { cn } from "~/lib/utils";

const sectionIds = navLinks.map((l) => l.href.slice(1));

/** Tailwind `md`: the mobile menu only exists below this. */
const DESKTOP_QUERY = "(min-width: 48rem)";

const socials = [
  { href: socialLinks.github, label: "GitHub", Icon: FaGithub },
  { href: socialLinks.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
  { href: socialLinks.devpost, label: "Devpost", Icon: SiDevpost },
] as const;

const iconLinkClass =
  "inline-flex size-10 items-center justify-center rounded-full text-foreground/80 transition-[background-color,color] duration-200 hover:bg-foreground/8 hover:text-foreground";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);

  /** Closes the menu and hands focus back to the toggle if it was inside. */
  const close = useCallback(() => {
    const activeEl = document.activeElement;
    const inside =
      (menuRef.current?.contains(activeEl) ?? false) ||
      activeEl === backdropRef.current;
    setOpen(false);
    if (inside) toggleRef.current?.focus();
  }, []);

  // Slightly stronger shadow once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While open: Escape closes, body scroll is locked, and growing past the
  // desktop breakpoint (rotation, resize) closes it so the lock can't strand.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) close();
    };
    window.addEventListener("keydown", onKey);
    mql.addEventListener("change", onBreakpoint);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      mql.removeEventListener("change", onBreakpoint);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4">
      {/* Tap-outside backdrop. A sibling of the nav on purpose: the nav's
          backdrop-filter would otherwise become this element's containing block. */}
      {open && (
        <button
          ref={backdropRef}
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={close}
          className="pointer-events-auto fixed inset-0 cursor-default bg-background/40 md:hidden"
        />
      )}

      <nav
        aria-label="Primary"
        className={cn(
          "glass pointer-events-auto relative flex w-full max-w-5xl items-center justify-between gap-2 rounded-full p-1.5 pl-2 transition-shadow duration-300 glass-strong",
          scrolled && "shadow-[0_18px_50px_-20px_var(--glass-shadow)]",
        )}
      >
        <a
          href="#top"
          onClick={close}
          aria-label="Back to top"
          className="flex items-center gap-2.5 rounded-full py-1 pr-3 pl-1 font-semibold tracking-tight transition-colors hover:bg-foreground/5"
        >
          <span className="flex size-8 items-center justify-center rounded-xl bg-linear-to-br from-primary via-accent to-tertiary font-mono text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.45)]">
            JF
          </span>
          <span className="hidden sm:inline md:hidden lg:inline">
            Jeremy Friesen
          </span>
        </a>

        <DesktopLinks active={active} />

        <div className="flex items-center gap-0.5">
          <div className="hidden items-center gap-0.5 lg:flex">
            {socials.map(({ href, label, Icon }) => (
              <MagneticElement key={label} distance={0.25}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={iconLinkClass}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              </MagneticElement>
            ))}
          </div>
          <ThemeToggle />
          <a
            href={socialLinks.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hidden h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 md:inline-flex"
          >
            <LuFileText size={16} aria-hidden="true" />
            Resume
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => (open ? close() : setOpen(true))}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(iconLinkClass, "md:hidden")}
          >
            {open ? (
              <LuX size={22} aria-hidden="true" />
            ) : (
              <LuMenu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Also a sibling of the nav: a backdrop-filter element is the backdrop
          root for its descendants, so a menu nested in the glass nav would blur
          nothing but the nav itself. */}
      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="glass pointer-events-auto absolute inset-x-3 top-[calc(100%+0.5rem)] max-h-[calc(100dvh-5.5rem)] animate-menu-in overflow-y-auto overscroll-contain rounded-3xl p-2 glass-strong md:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-colors hover:bg-foreground/6",
                    active === link.href.slice(1) && "bg-foreground/6",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mx-2 my-2 h-px bg-border" />
          <div className="flex items-center justify-between px-2 pb-1">
            <div className="flex items-center gap-1">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={iconLinkClass}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
            <a
              href={socialLinks.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background"
            >
              <LuFileText size={16} aria-hidden="true" />
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/** Centre links with a highlight pill that glides to the active section. */
function DesktopLinks({ active }: { active: string | null }) {
  const listRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);

  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const el = active
      ? list.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`)
      : null;
    if (!el) {
      setPill(null);
      return;
    }
    const listRect = list.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setPill({ x: rect.left - listRect.left, w: rect.width });
  }, [active]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [measure]);

  return (
    <ul
      ref={listRef}
      className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex"
    >
      <li
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 left-0 h-9 rounded-full bg-foreground/8 transition-[transform,width,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
          pill ? "opacity-100" : "opacity-0",
        )}
        style={{
          transform: `translate3d(${pill?.x ?? 0}px, 0, 0)`,
          width: pill?.w ?? 0,
        }}
      />
      {navLinks.map((link) => {
        const isActive = active === link.href.slice(1);
        return (
          <li key={link.href} className="relative">
            <a
              href={link.href}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium transition-colors duration-200 lg:px-4",
                isActive
                  ? "text-foreground"
                  : "text-foreground/70 hover:text-foreground",
              )}
            >
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
