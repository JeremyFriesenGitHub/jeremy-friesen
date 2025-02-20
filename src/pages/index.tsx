import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Jeremy Friesen</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#A62B03] to-[#002244] p-4 text-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold">
          Hello, World!
        </h1>
        <Link
          href="https://github.com/JeremyFriesenGitHub/jeremy-friesen"
          className="text-white text-lg md:text-2xl font-bold underline mt-6 md:mt-12"
        >
          See the repo progress here
        </Link>
      </main>
    </>
  );
}
