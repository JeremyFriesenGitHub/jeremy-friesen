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
      
      <main className="flex flex-col min-h-screen w-full">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#1353B4] to-[#4E5E1C]">
          <Navbar />
          <Boxes />
          <MorphingText texts={texts} className="mt-5 items-center justify-center text-center text-white" />
          <Link className="relative underline items-center justify-center text-center text-white" href="https://github.com/JeremyFriesenGitHub/jeremy-friesen">
            <TypingAnimation >See the repo progress here</TypingAnimation>
          </Link>
          <p className="mt-20 items-center justify-center text-center text-white">Made with</p>
          <div className="mt-20 flex flex-wrap justify-center items-center md:gap-10">
            <Link className="relative mx-2 text-white items-center justify-center" href="https://azure.microsoft.com/en-ca">
              <VscAzure size={30} className="sm:size-10 md:size-20" />
            </Link>
            <Link className="relative mx-2 text-white items-center justify-center" href="https://nextjs.org">
              <TbBrandNextjs size={30} className="sm:size-10 md:size-20"/>
            </Link>
            <Link className="relative mx-2 text-white items-center justify-center" href="https://react.dev">
              <FaReact size={30} className="sm:size-10 md:size-20"/>
            </Link>
            <Link className="relative mx-2 text-white items-center justify-center" href="https://tailwindcss.com">
              <SiTailwindcss size={30} className="sm:size-10 md:size-20 "/>
            </Link>
            <Link className="relative mx-2 text-white items-center justify-center" href="https://www.typescriptlang.org">
              <SiTypescript size={30} className="sm:size-10 md:size-20"/>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}