"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MorphingText } from "~/components/magicui/morphing-text";
import { TypingAnimation } from "~/components/magicui/typing-animation";
import { socialLinks } from "~/data/social-links";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Centered glow orb */}
      <div className="glow-breathe pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/10 blur-3xl sm:h-[450px] sm:w-[450px] md:h-[600px] md:w-[600px]" />

      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-10 flex flex-col items-center gap-4 px-4 text-center sm:gap-6"
      >
        <MorphingText
          texts={["Jeremy", "Friesen"]}
          className="items-center justify-center text-center text-foreground"
        />
        <TypingAnimation className="text-breathe text-foreground">
          See the repo here!
        </TypingAnimation>
        <a
          className="glass-pill glass-hover mt-2 rounded-full px-4 py-2 text-xs font-semibold text-foreground transition-all duration-300 sm:mt-4 sm:px-6 sm:text-sm"
          href={socialLinks.repo}
          target="_blank"
          rel="noopener noreferrer"
        >
          jeremy-friesen.com
        </a>
      </motion.div>
    </section>
  );
}
