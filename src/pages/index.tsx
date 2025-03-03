"use client";

import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Navbar } from "../components/custom/navbar";
import { Boxes } from "~/components/ui/background-boxes";

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
          <h1 className="text-3xl md:text-5xl font-bold mt-8">
            Hello, World!
          </h1>
          <Link className="text-2xl md:text-3xl underline font-bold mt-12" href="https://github.com/JeremyFriesenGitHub/jeremy-friesen">
            See the repo progress here
          </Link>
      </div> 
      </main>


        
    </>
  );  
}