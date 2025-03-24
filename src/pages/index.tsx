"use client";

import Head from "next/head";
import React from "react";
import { Navbar } from "~/components/custom/navbar";
import Image from "next/image";
import { Boxes } from "~/components/ui/background-boxes";
import { MorphingText } from "~/components/magicui/morphing-text";
import { TypingAnimation } from "~/components/magicui/typing-animation";
import { Footer } from "~/components/custom/footer";
import { LinkPreview } from "~/components/ui/link-preview";
import { CustomVerticalTimeline } from "~/components/ui/vertical-timeline";
import { BentoGrid , BentoGridItem} from "~/components/ui/bento-grid"
import {PiGraphFill} from "react-icons/pi";
import { RiComputerLine } from "react-icons/ri";
import { GoDatabase } from "react-icons/go";
import { GiArtificialIntelligence } from "react-icons/gi";
import { Skills } from "~/components/custom/skills";

const texts = ["Jeremy", "Friesen"];
const items = [
  {
    title: (
    <LinkPreview url="https://devpost.com/software/cu-tunnels">
    <div className="text-white hover:underline">cuTunnel</div>
    </LinkPreview>
  ),
    description: (
    <LinkPreview url="https://devpost.com/software/cu-tunnels">
    <div className="text-white hover:underline">A web app that helps people navigate Carleton&apos;s underground tunnel system</div>
    </LinkPreview>
  ),
    
    header: (
  
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black text-black">
      <Image
      src="/test.png"
      width={300}
      height={300}
      alt="cuTunnel Preview"
      className="w-500 h-500 object-cover rounded-r-xl"
    />
    <Image
      src="/test6.png"
      width={300}
      height={300}
      alt="cuTunnel Slides"
      className="w-500 h-500 object-cover rounded-xl"
    />
      </div>
    ),
    className: "md:col-span-2 bg-[#A32B0A] text-white",
    icon: (
    <LinkPreview url="https://devpost.com/software/cu-tunnels">
    <PiGraphFill className="h-4 w-4 text-white" />
    </LinkPreview>
    ),
  },
  {
    title: (
      <LinkPreview url="https://cuhacking.ca">
      <div className="text-white hover:underline">cuHacking</div>
      </LinkPreview>
    ),
    description: (
      <LinkPreview url="https://cuhacking.ca">
      <div className="text-white hover:underline">Carleton&apos;s official hackathon</div>
      </LinkPreview>
    ),
    header: (
      <div className= "flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black text-black">
      <Image
          src="/test2.png" 
          width={300}
          height={300}
          alt="cuHacking Docs"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    ),
    className: "md:col-span-1 bg-[#426100] text-white",
    icon: (
    <LinkPreview url="https://cuhacking.ca">
    <RiComputerLine className="h-4 w-4 text-white" />
    </LinkPreview>

  ),
  },
  {
    title: (
      <LinkPreview url="https://github.com/JeremyFriesenGitHub/Statsbomb_DBMS">
        <div className="text-white hover:underline">Statsbomb DBMS</div>
      </LinkPreview>
    ),
    description: (
      <LinkPreview url="https://github.com/JeremyFriesenGitHub/Statsbomb_DBMS">
      <div className="text-white hover:underline">An open-source DBMS</div>
      </LinkPreview>
    ),
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black text-black">
      <Image
          src="/test3.png" 
          width={300}
          height={300}
          alt="Code from Statsbomb"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    ),

    className: "md:col-span-1 bg-[#005E8A] text-white",
    icon: (
      <LinkPreview url="https://github.com/JeremyFriesenGitHub/Statsbomb_DBMS">
        <GoDatabase className="h-4 w-4 text-white" />
      </LinkPreview>
    ),
  },
  {
    title: (
      <LinkPreview url="https://github.com/JeremyFriesenGitHub/ai-snow-day-predictor">
        <div className="text-white hover:underline">A.I. Snowday Predictor</div>
      </LinkPreview>
    ),
    description:  (
      <LinkPreview url="https://github.com/JeremyFriesenGitHub/ai-snow-day-predictor">
        <div className="text-white hover:underline">An open-source snowday predictor using live data and Aritificial Intelligence</div>
      </LinkPreview>
    ),
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black text-black">
      <Image
      src="/test4.png"
      width={300}
      height={300}
      alt="Graph 1 of weather stats"
      className="w-full h-full object-cover rounded-r-xl"
    />
    <Image
      src="/test5.png"
      width={300}
      height={300}
      alt="Graph 2 of weather stats"
      className="w-500 h-500 rounded-xl"
    />
      </div>

    ),
    className: "md:col-span-2 bg-[#705000] text-white",
    icon: (
    <LinkPreview url="https://github.com/JeremyFriesenGitHub/ai-snow-day-predictor">
      <GiArtificialIntelligence className="h-4 w-4 text-white" />
    </LinkPreview>
    ),
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Jeremy Friesen</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen flex flex-col relative">
      <div className="inset-0 w-full h-full bg-gradient-to-b from-[#1353B4] via-[#4E5E1C] to-[#1353B4]">
        <Navbar />
          <Boxes />
          <MorphingText texts={texts} className="mt-5 items-center justify-center text-center text-white" />
          <LinkPreview className="relative underline items-center justify-center text-center text-white" url="https://github.com/JeremyFriesenGitHub/jeremy-friesen">
            <TypingAnimation>See the repo progress here!</TypingAnimation>
          </LinkPreview>{" "}
          <section id="experience" className="p-16">
          <a href="#experience">
            <span className="text-white font-bold underline relative text-2xl p-16">
              Experience
            </span>
          </a>
          <CustomVerticalTimeline />
          </section>

          <section id="projects" className="p-16">
          <a href="#projects">
          <span className="text-white font-bold underline relative text-2xl p-16">
              Projects
            </span>

            </a>
            <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] relative text-white">
              {items.map((item, i) => (
               
                <BentoGridItem
                  key={i}
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  className={item.className}
                  icon={item.icon}
                />
              ))}
            </BentoGrid>
          </section>

          <section id="skills" className="p-16">
          <a href="#skills">
          <span className="text-white font-bold underline relative text-2xl p-16">
              Skills
            </span>
            </a>

            <Skills />

            </section>

          <Footer />
        </div>
      </main>
    </>
  );
}
