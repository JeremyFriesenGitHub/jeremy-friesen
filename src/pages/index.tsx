"use client";

import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Navbar } from "../components/custom/navbar";
import { Boxes } from "~/components/ui/background-boxes";
import { MorphingText } from "../components/magicui/morphing-text";
import { TypingAnimation } from "../components/magicui/typing-animation";
import { VscAzure } from "react-icons/vsc";
import { TbBrandNextjs } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { SiTailwindcss, SiTypescript } from "react-icons/si";


const texts = [
  "Hello",
  "World!",
  "Welcome!",
  "Bonjour!",
];


export default function Home() {
  return (
    <>
      <Head>
        <title>Jeremy Friesen</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className="relative flex flex-col min-h-screen w-full">
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,#000000,#B11019,#000000)]">
          <Navbar />
          <Boxes />
          <MorphingText texts={texts} className="mt-8 relative flex flex-col items-center justify-center text-center p-8 text-white" />
          <Link className="mt-12 underline relative flex flex-col items-center justify-center text-center p-8 text-white" href="https://github.com/JeremyFriesenGitHub/jeremy-friesen">
            <TypingAnimation>See the repo progress here</TypingAnimation>
          </Link>
          <p className="relative mx-auto h-10 w-full text-lg sm:text-md md:text-xl lg:text-2xl leading-tight md:h-16 text-white flex flex-col items-center justify-center">Made with</p>
          <div className="flex flex-wrap justify-center items-center mt-8 md:gap-10">
            <Link className="relative mx-2 text-white flex flex-col items-center justify-center" href="https://azure.microsoft.com/en-ca">
              <VscAzure size={30} className="sm:size-10 md:size-20" />
            </Link>
            <Link className="relative mx-2 text-white flex flex-col items-center justify-center" href="https://nextjs.org">
              <TbBrandNextjs size={30} className="sm:size-10 md:size-20"/>
            </Link>
            <Link className="relative mx-2 text-white flex flex-col items-center justify-center" href="https://react.dev">
              <FaReact size={30} className="sm:size-10 md:size-20"/>
            </Link>
            <Link className="relative mx-2 text-white flex flex-col items-center justify-center" href="https://tailwindcss.com">
              <SiTailwindcss size={30} className="sm:size-10 md:size-20 "/>
            </Link>
            <Link className="relative mx-2 text-white flex flex-col items-center justify-center" href="https://www.typescriptlang.org">
              <SiTypescript size={30} className="sm:size-10 md:size-20"/>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}