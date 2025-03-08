"use client";

import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Navbar } from "../components/custom/navbar";
import { Boxes } from "~/components/ui/background-boxes";
import { MorphingText } from "../components/magicui/morphing-text";
import { TypingAnimation } from "../components/magicui/typing-animation";


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
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,#000000,#B11019,#000000)]"></div>

        <Navbar />
        <Boxes />

        <div className="relative flex flex-col items-center justify-center text-center p-8 text-white">
          <MorphingText texts={texts} className="mt-8" />
          
          <Link className="mt-12 underline" href="https://github.com/JeremyFriesenGitHub/jeremy-friesen">
            <TypingAnimation>See the repo progress here</TypingAnimation>
          </Link>
        </div>
      </main>
    </>
  );
}