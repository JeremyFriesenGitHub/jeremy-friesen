"use client";

import { useState, useEffect } from "react";
import { LuX, LuSun, LuMoon } from "react-icons/lu";
import { VscGithubAlt, VscThreeBars } from "react-icons/vsc";
import { CiLinkedin } from "react-icons/ci";
import { MdOutlineContactPage } from "react-icons/md";
import Link from "next/link";
import { MagneticElement } from "~/components/effects/magnetic-element";
import { socialLinks, navLinks } from "~/data/social-links";
import { useScrollDirection } from "~/hooks/use-scroll-direction";
import { useTheme } from "~/hooks/use-theme";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const visible = useScrollDirection(10, isOpen);
  const { theme, toggleTheme } = useTheme();

  // Close mobile menu on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <nav
      className={`glass sticky top-0 z-50 px-3 py-3 text-foreground transition-transform duration-300 sm:px-4 sm:py-4 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <MagneticElement distance={0.2}>
          <a
            href="#"
            className="glass-pill block rounded-full px-3 py-1 text-sm font-medium transition-all hover:bg-foreground/10 hover:font-bold sm:text-base"
          >
            Home
          </a>
        </MagneticElement>

        <div className="absolute left-1/2 hidden -translate-x-1/2 transform md:flex">
          <div className="glass-pill flex space-x-1 rounded-full px-2 py-1">
            {navLinks.map((link) => (
              <MagneticElement key={link.href} distance={0.2}>
                <a
                  href={link.href}
                  className="rounded-full px-3 py-1 text-sm transition-all hover:bg-foreground/10 hover:font-bold hover:text-foreground lg:text-base"
                >
                  {link.label}
                </a>
              </MagneticElement>
            ))}
          </div>
        </div>

        <div className="hidden items-center space-x-3 md:flex lg:space-x-4">
          <MagneticElement distance={0.3}>
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center transition-colors hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <LuSun size={22} /> : <LuMoon size={22} />}
            </button>
          </MagneticElement>
          <MagneticElement distance={0.3}>
            <Link
              href={socialLinks.resume}
              className="inline-flex items-center justify-center transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume"
            >
              <MdOutlineContactPage size={22} />
            </Link>
          </MagneticElement>
          <MagneticElement distance={0.3}>
            <Link
              href={socialLinks.github}
              className="inline-flex items-center justify-center transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <VscGithubAlt size={22} />
            </Link>
          </MagneticElement>
          <MagneticElement distance={0.3}>
            <Link
              href={socialLinks.linkedin}
              className="inline-flex items-center justify-center transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <CiLinkedin size={22} />
            </Link>
          </MagneticElement>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center transition-colors hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <LuSun size={22} /> : <LuMoon size={22} />}
          </button>
          <button
            className="relative z-10 inline-flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <LuX size={24} /> : <VscThreeBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <>
          {/* Tap-outside backdrop (below dropdown, above page content) */}
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown panel — anchored under the navbar */}
          <div
            className="absolute inset-x-3 top-full z-50 mt-2 origin-top-right overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-background/65 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl backdrop-saturate-150 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 md:hidden"
            role="menu"
          >
            <div className="flex flex-col p-2">
              <div className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Sections
              </div>
              <a
                href="#"
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.08] active:bg-foreground/[0.14]"
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                Home
              </a>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.08] active:bg-foreground/[0.14]"
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                >
                  {link.label}
                </a>
              ))}

              <div className="my-2 h-px bg-[var(--glass-border)]" />

              <div className="px-3 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Links
              </div>
              <Link
                href={socialLinks.resume}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.08] active:bg-foreground/[0.14]"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                <MdOutlineContactPage size={18} /> Resume
              </Link>
              <Link
                href={socialLinks.github}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.08] active:bg-foreground/[0.14]"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                <VscGithubAlt size={18} /> GitHub
              </Link>
              <Link
                href={socialLinks.linkedin}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.08] active:bg-foreground/[0.14]"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                role="menuitem"
              >
                <CiLinkedin size={18} /> LinkedIn
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
