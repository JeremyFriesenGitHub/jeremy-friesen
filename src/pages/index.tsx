"use client";

import Head from "next/head";
import Link from "next/link";
import { InteractiveGridPattern } from "../components/magicui/interactive-grid-pattern";
import { useState, useEffect } from "react";
import React from "react";
import { Navbar } from "../components/custom/navbar";

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
  
      <div className="relative min-h-screen bg-gradient-to-br from-[#A62B03] to-[#002244]">
        
        <Navbar />
  
        <InteractiveGridPattern
          squares={gridSize}
          width={40}
          height={45}
          className="w-full h-full"
          squaresClassName="stroke-gray-400/10 transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000"
        />
  

        <h1 className="text-white text-3xl md:text-5xl font-bold justify-center items-center flex h-full">
          Hello, World!
        </h1>
  
        <Link 
          href="https://github.com/JeremyFriesenGitHub/jeremy-friesen" 
          className="text-white text-lg md:text-2xl font-bold underline mt-6 md:mt-12 justify-center items-center flex h-full"
        >
          See the repo progress here
        </Link>
  
      </div>
    </>
  );  
}