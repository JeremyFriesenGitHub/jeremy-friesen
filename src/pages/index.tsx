"use client";

import Head from "next/head";
import React from "react";
import { Navbar } from "~/components/custom/navbar";
import { Boxes } from "~/components/ui/background-boxes";
import { MorphingText } from "~/components/magicui/morphing-text";
import { TypingAnimation } from "~/components/magicui/typing-animation";
import { Footer } from "~/components/custom/footer";
import { LinkPreview } from "~/components/ui/link-preview";

const texts = ["Hello", "World!", "Welcome!", "Bonjour!"];

export default function Home() {
  return (
    <>
      <Head>
        <title>Jeremy Friesen</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen flex flex-col relative">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#1353B4] to-[#4E5E1C]">
          <Navbar />
          <Boxes />
          <MorphingText texts={texts} className="mt-5 items-center justify-center text-center text-white" />
          <LinkPreview className="relative underline items-center justify-center text-center text-white" url="https://github.com/JeremyFriesenGitHub/jeremy-friesen">
            <TypingAnimation>See the repo progress here!</TypingAnimation>
          </LinkPreview>{" "}
          <Footer />
        </div>
      </main>
    </>
  );
}
