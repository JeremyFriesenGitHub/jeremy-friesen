"use client";

import { SiVercel, SiTailwindcss, SiTypescript } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import Link from "next/link";
import { MagneticElement } from "~/components/effects/magnetic-element";

const techStack = [
  { icon: <SiVercel className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />, url: "https://vercel.com", label: "Vercel" },
  { icon: <TbBrandNextjs className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />, url: "https://nextjs.org", label: "Next.js" },
  { icon: <FaReact className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />, url: "https://react.dev", label: "React" },
  { icon: <SiTailwindcss className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />, url: "https://tailwindcss.com", label: "Tailwind" },
  { icon: <SiTypescript className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />, url: "https://www.typescriptlang.org", label: "TypeScript" },
];

export function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-8 pt-12 sm:px-8 sm:pb-12 sm:pt-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 text-sm text-foreground sm:mb-6 sm:text-base">Website made with:</p>
        <div className="glass-pill mx-auto inline-flex items-center gap-2 rounded-full px-3 py-2 sm:gap-3 sm:px-4 sm:py-2.5 md:gap-4">
          {techStack.map((tech) => (
            <MagneticElement key={tech.label} distance={0.3}>
              <Link
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground transition-all duration-300 hover:scale-110 hover:text-foreground"
                aria-label={tech.label}
              >
                {tech.icon}
              </Link>
            </MagneticElement>
          ))}
        </div>
      </div>
    </footer>
  );
}
