import type { Metadata } from "next";
import { Navbar } from "~/components/navbar";
import { Backdrop } from "~/components/ui/backdrop";
import { Hero } from "~/components/sections/hero";
import { Experience } from "~/components/sections/experience";
import { Community } from "~/components/sections/community";
import { Projects } from "~/components/sections/projects";
import { Hackathons } from "~/components/sections/hackathons";
import { Skills } from "~/components/sections/skills";
import { Certifications } from "~/components/sections/certifications";
import { Footer } from "~/components/sections/footer";
import { contact, profile, socialLinks } from "~/data/social-links";
import { siteDescription, siteName, siteUrl } from "~/lib/site";

/** The canonical URL and Open Graph card are the home page's, not every route's. */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
    locale: "en_CA",
  },
};

const websiteId = `${siteUrl}/#website`;
const personId = `${siteUrl}/#person`;

/**
 * Structured data for search engines: the site (its name in results), the
 * page as a profile of one person, and the person. Facts only, from the same
 * data the page shows.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: siteName,
      inLanguage: "en-CA",
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: siteUrl,
      name: siteName,
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      givenName: profile.firstName,
      familyName: profile.lastName,
      url: siteUrl,
      email: contact.email,
      telephone: contact.phone,
      jobTitle: profile.role,
      worksFor: { "@type": "Organization", name: profile.organization },
      affiliation: { "@type": "CollegeOrUniversity", name: profile.school },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ottawa",
        addressRegion: "ON",
        addressCountry: "CA",
      },
      knowsAbout: profile.focus,
      sameAs: [socialLinks.github, socialLinks.linkedin, socialLinks.devpost],
    },
  ],
};

export default function Home() {
  return (
    <>
      <Backdrop />
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <Experience />
        <Community />
        <Projects />
        <Hackathons />
        <Skills />
        <Certifications />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
