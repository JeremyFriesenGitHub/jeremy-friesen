import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-white text-4xl font-bold">
          Hello, World!
        </h1>
        <Link href="https://github.com/JeremyFriesenGitHub/jeremy-friesen" className="text-white text-4xl font-bold underline mt-12">
        See the repo progress here
        </Link>
      </main>
    </>
  );
}
