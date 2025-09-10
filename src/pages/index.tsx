"use client";

import Head from "next/head";
import React from "react";
import { Navbar } from "~/components/custom/navbar";
import Image from "next/image";
import { Boxes } from "~/components/ui/background-boxes";
import { Footer } from "~/components/custom/footer";
import { LinkPreview } from "~/components/ui/link-preview";
import { CustomVerticalTimeline } from "~/components/ui/vertical-timeline";
import { BentoGrid , BentoGridItem} from "~/components/ui/bento-grid"
import {PiGraphFill} from "react-icons/pi";
import { RiComputerLine } from "react-icons/ri";
import { GoDatabase } from "react-icons/go";
import { GiArtificialIntelligence } from "react-icons/gi";
import { Skills } from "~/components/custom/skills";
import { useScroll, useTransform } from "motion/react";
import { GoogleGeminiEffect } from "~/components/ui/google-gemini-effect";
import { LuTimer } from "react-icons/lu";
import { SiGoogledocs } from "react-icons/si";

const items = [
  {
    title: (
    <LinkPreview url="https://jeremyfriesengithub.github.io/prodly/">
    <div className="text-white hover:underline">Prodly</div>
    </LinkPreview>
  ),
    description: (
    <LinkPreview url="https://jeremyfriesengithub.github.io/prodly/">
    <div className="text-white hover:underline">An AI Productivity Platform</div>
    </LinkPreview>
  ),
    
    header: (
  
     <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-dot-black/[0.3] dark:bg-dot-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-purple-500/30 shadow-[0_0_20px_#ff00ff80] bg-gradient-to-br from-pink-600 via-fuchsia-700 to-purple-900 text-white">
      <Image
      src="/test7.png"
      width={300}
      height={300}
      alt="prodly landing page"
      className="w-500 h-500 object-cover rounded-r-xl"
    />
    <Image
      src="/test8.png"
      width={300}
      height={100}
      alt="pomodoro timer"
      className="w-500 h-500 object-cover rounded-xl"
    />
      </div>
    ),
    className: "md:col-span-2 bg-[#9E0089] text-white",
    icon: (
    <LinkPreview url="https://jeremyfriesengithub.github.io/prodly/">
    <LuTimer className="h-4 w-4 text-white" />
    </LinkPreview>
    ),
  },
    {
    title: (
      <LinkPreview url="https://carletonai.github.io/docs/">
      <div className="text-white hover:underline">CAIS</div>
      </LinkPreview>
    ),
    description: (
      <LinkPreview url="https://carletonai.github.io/docs/">
      <div className="text-white hover:underline">Carleton AI Society docs</div>
      </LinkPreview>
    ),
    header: (
      <div className= "flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black text-black">
      <Image
          src="/test9.png" 
          width={300}
          height={300}
          alt="CAIS Docs"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    ),
    className: "md:col-span-1 bg-[#B30000] text-white",
    icon: (
    <LinkPreview url="https://carletonai.github.io/docs/">
    <SiGoogledocs className="h-4 w-4 text-white" />
    </LinkPreview>

  ),
  },
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
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
 
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
  return (
    <>
      <Head>
        <title>Jeremy Friesen</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen flex flex-col relative">
        {/* Background Layer */}
        <div className="relative inset-0 w-full min-h-screen bg-gradient-to-b from-[#1353B4] via-[#4E5E1C] to-[#1353B4]">
          <Navbar />
          <Boxes />

          <div ref={ref} className="h-[300vh] overflow-clip">
            <GoogleGeminiEffect pathLengths={[pathLengthFirst, pathLengthSecond, pathLengthThird, pathLengthFourth, pathLengthFifth]} />
          </div>

          <section id="about" className="p-8 sm:p-16 text-center">
            <a href="#about">
              <span className="text-white font-bold underline relative text-2xl sm:text-3xl p-8 sm:p-16 items-center justify-center">
                About
              </span>
            </a>
            <div className="flex flex-col items-center justify-center pt-6">
              <Image
                src="/bliss.jpg"
                alt="Windows XP Bliss"
                width={200}
                height={200}
                className="rounded-full mb-4"
              />
              <div className="text-white text-lg max-w-2xl relative sm:text-xl">
              <ul className="list-disc list-inside space-y-6">
                  <p>I&apos;m a third year CS Student at Carleton University who&apos;s:</p>
                  <li>Committed to <strong>Continuous Learning & Improvement</strong></li>
                  <li>Passionate about and experienced in <strong>Data Science/Analysis</strong>, <strong>Software Development</strong>, <strong>Cloud & IT Infrastructure</strong>, <strong>DevSecOps</strong>, and <strong>AI/ML</strong></li>
                  <li>Always striving to build a solid <strong>professional network</strong></li>
                </ul>
              </div>
            </div>
          </section>

          <section id="experience" className="p-8 sm:p-16 text-center">
            <a href="#experience">
              <span className="text-white font-bold underline relative text-2xl sm:text-3xl p-8 sm:p-16 items-center justify-center">
                Experience
              </span>
            </a>
            <CustomVerticalTimeline />
          </section>

          <section id="projects" className="p-8 sm:p-16 text-center">
            <a href="#projects">
              <span className="text-white font-bold underline relative text-2xl sm:text-3xl p-8 sm:p-16 items-center justify-center">
                Projects
              </span>
            </a>
            <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] relative text-white gap-8 p-6">
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

          <section id="skills" className="p-8 sm:p-16 text-center">
            <a href="#skills">
              <span className="text-white font-bold underline relative text-2xl sm:text-3xl p-8 sm:p-16 items-center justify-center">
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
