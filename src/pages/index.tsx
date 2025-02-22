"use client";

import Head from "next/head";
import Link from "next/link";
import { InteractiveGridPattern } from "../components/magicui/interactive-grid-pattern";
import { useState, useEffect } from "react";

export default function Home() {
  const [gridSize, setGridSize] = useState<[number, number]>([24, 24]); 

  useEffect(() => {
    function handleResize() {
      if (typeof window !== 'undefined') {
        setGridSize([
          Math.ceil(window.innerWidth / 40),
          Math.ceil(window.innerHeight / 40),
        ]);
      }
    }

    if (typeof window !== 'undefined') {
      handleResize();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Jeremy Friesen</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="relative flex min-h-screen flex-col items-center justify-center bg-black p-4 text-center overflow-hidden">
        <InteractiveGridPattern
          squares={gridSize} 
          width={40}
          height={45}
          className="absolute inset-0 h-full w-full"
          squaresClassName="stroke-gray-400/30 transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000"
        />
        <div className="relative z-10">
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            Hello, World!
          </h1>
          <Link href="https://github.com/JeremyFriesenGitHub/jeremy-friesen" className="text-white text-lg md:text-2xl font-bold underline mt-6 md:mt-12">
            See the repo progress here
          </Link>
        </div>
      </main>
    </>
  );
}