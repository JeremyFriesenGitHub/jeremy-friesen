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
  "Welcome",
  "Bonjour",
];


export default function Home() {

  return (
    <>
      <Head>
        <title>Jeremy Friesen</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="relative min-h-screen bg-[linear-gradient(60deg,#001489,#A23202,#0C2340)]">
      <Navbar />
      <Boxes />
      <div className="relative flex flex-col items-center justify-center text-center p-8 text-white">
      <MorphingText texts={texts} className="text-3xl md:text-5xl font-bold mt-8" />

          <Link
            className="text-2xl md:text-3xl underline font-bold mt-12"
            href="https://github.com/JeremyFriesenGitHub/jeremy-friesen"
          >
          <TypingAnimation>See the repo progess here</TypingAnimation>
          </Link>
      </div> 
      </main>


        
    </>
  );  
}