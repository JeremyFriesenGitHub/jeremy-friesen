import Image from "next/image";
import { GlassCard } from "~/components/ui/glass-card";
import { aboutText } from "~/data/social-links";

export function About() {
  return (
    <section id="about" className="relative z-10 px-4 py-12 sm:px-8 sm:py-20">
      <h2 className="mb-8 text-center text-2xl font-bold text-foreground sm:mb-12 sm:text-3xl md:text-4xl">
        About
      </h2>
      <GlassCard className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <div className="relative">
            <div className="glow-breathe absolute -inset-2 rounded-full bg-foreground/10 blur-xl" />
            <Image
              src="/bliss.jpg"
              alt="Jeremy Friesen"
              width={160}
              height={160}
              className="relative h-28 w-28 rounded-full border-2 border-border object-cover sm:h-40 sm:w-40"
              priority
            />
          </div>
          <div className="text-center text-base text-foreground sm:text-lg">
            <p className="mb-3 sm:mb-4">{aboutText.intro}</p>
            <ul className="list-inside list-disc space-y-2 text-left text-sm sm:space-y-3 sm:text-base">
              {aboutText.points.map((point, i) => (
                <li key={i}>
                  {point.text} <strong className="text-foreground">{point.highlight}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
