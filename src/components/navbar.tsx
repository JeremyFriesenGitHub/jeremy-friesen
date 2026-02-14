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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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
            className={`glass-pill rounded-full px-3 py-1 text-sm font-medium transition-all hover:bg-foreground/10 hover:font-bold sm:text-base md:block ${isOpen ? "hidden" : "block"}`}
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
              className="outline-none transition-colors hover:text-foreground focus:outline-none focus-visible:outline-none"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <LuSun size={22} /> : <LuMoon size={22} />}
            </button>
          </MagneticElement>
          <MagneticElement distance={0.3}>
            <Link
              href={socialLinks.resume}
              className="transition-colors hover:text-foreground"
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
              className="transition-colors hover:text-foreground"
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
              className="transition-colors hover:text-foreground"
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
            className="outline-none transition-colors hover:text-foreground focus:outline-none focus-visible:outline-none"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <LuSun size={22} /> : <LuMoon size={22} />}
          </button>
          <button
            className="relative z-10"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <LuX size={24} /> : <VscThreeBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile fullscreen overlay menu */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 top-14 z-40 flex flex-col gap-2 overflow-y-auto bg-background/95 px-5 pb-8 pt-6 backdrop-blur-xl sm:top-16 md:hidden">
          <span className="px-2 py-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Sections
          </span>
          <a
            href="#"
            className="glass-hover rounded-lg px-4 py-3.5 text-base font-medium transition-all hover:font-bold sm:text-lg"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="glass-hover rounded-lg px-4 py-3.5 text-base font-medium transition-all hover:font-bold sm:text-lg"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <span className="mt-6 px-2 py-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Links
          </span>
          <Link
            href={socialLinks.resume}
            className="glass-hover flex items-center gap-3 rounded-lg px-4 py-3.5 text-base font-medium sm:text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdOutlineContactPage size={24} /> Resume
          </Link>
          <Link
            href={socialLinks.github}
            className="glass-hover flex items-center gap-3 rounded-lg px-4 py-3.5 text-base font-medium sm:text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <VscGithubAlt size={24} /> GitHub
          </Link>
          <Link
            href={socialLinks.linkedin}
            className="glass-hover flex items-center gap-3 rounded-lg px-4 py-3.5 text-base font-medium sm:text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CiLinkedin size={24} /> LinkedIn
          </Link>
        </div>
      )}
    </nav>
  );
}
