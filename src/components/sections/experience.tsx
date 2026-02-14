"use client";

import { motion } from "motion/react";
import { LiaCanadianMapleLeaf } from "react-icons/lia";
import { GlassCard } from "~/components/ui/glass-card";
import { SectionHeading } from "~/components/ui/section-heading";
import { ScrollMorph } from "~/components/effects/scroll-morph";
import { experiences } from "~/data/experience";
import { useIsDark } from "~/hooks/use-is-dark";

export function Experience() {
  const isDark = useIsDark();

  return (
    <section id="experience" className="relative z-10 px-4 py-12 sm:px-8 sm:py-20">
      <SectionHeading>Experience</SectionHeading>

      <div className="relative mx-auto max-w-3xl">
        {/* Gradient center line */}
        <div className="absolute left-4 top-0 h-full w-0.5 gradient-line md:left-1/2 md:-translate-x-px" />

        <div className="space-y-8 sm:space-y-12">
          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            const c = isDark ? exp.color : exp.colorLight;
            return (
              <ScrollMorph key={i}>
                <div
                  className={`relative flex items-start gap-4 sm:gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full sm:h-8 sm:w-8 md:left-1/2">
                    <motion.div
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground sm:h-8 sm:w-8"
                      whileHover={{ scale: 1.2 }}
                    >
                      <LiaCanadianMapleLeaf className="text-background" size={12} />
                    </motion.div>
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-8 w-full sm:ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:pr-4" : "md:pl-4"
                    }`}
                  >
                    <GlassCard glowColor={c}>
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-foreground sm:text-lg">
                          {exp.title}
                        </h3>
                        <p className="text-sm font-semibold text-foreground sm:text-base">
                          {exp.company}
                        </p>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                          {exp.location}, {exp.country}
                        </p>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                          {exp.date}
                        </p>
                      </div>
                    </GlassCard>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </div>
              </ScrollMorph>
            );
          })}
        </div>
      </div>
    </section>
  );
}
