import { ParticleBackgroundLoader } from "~/components/effects/particle-background-loader";
import { Navbar } from "~/components/navbar";
import { Hero } from "~/components/sections/hero";
import { About } from "~/components/sections/about";
import { Experience } from "~/components/sections/experience";
import { Projects } from "~/components/sections/projects";
import { Skills } from "~/components/sections/skills";
import { Footer } from "~/components/sections/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <ParticleBackgroundLoader />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Footer />
    </main>
  );
}
