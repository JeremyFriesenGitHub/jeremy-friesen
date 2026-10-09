import { LiquidBackgroundLoader } from "~/components/background/liquid-background-loader";
import { Navbar } from "~/components/navbar";
import { Hero } from "~/components/sections/hero";
import { About } from "~/components/sections/about";
import { Experience } from "~/components/sections/experience";
import { Community } from "~/components/sections/community";
import { Projects } from "~/components/sections/projects";
import { Hackathons } from "~/components/sections/hackathons";
import { Skills } from "~/components/sections/skills";
import { Footer } from "~/components/sections/footer";
import { profile, socialLinks } from "~/data/social-links";
import { siteUrl } from "~/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  jobTitle: profile.role,
  worksFor: { "@type": "Organization", name: profile.organization },
  alumniOf: { "@type": "CollegeOrUniversity", name: profile.school },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ottawa",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  sameAs: [socialLinks.github, socialLinks.linkedin, socialLinks.devpost],
};

export default function Home() {
  return (
    <>
      <LiquidBackgroundLoader />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 noise opacity-[0.035] dark:opacity-[0.045]"
      />
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Community />
        <Projects />
        <Hackathons />
        <Skills />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
