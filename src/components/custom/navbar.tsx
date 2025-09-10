import { useState } from "react";
import { LuX } from "react-icons/lu";
import { VscGithubAlt, VscThreeBars } from "react-icons/vsc";
import { CiLinkedin } from "react-icons/ci";
import { MdOutlineContactPage } from "react-icons/md";
import { LinkPreview } from "~/components/ui/link-preview";
import Link from "next/link";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-10 rounded-md bg-black/40 p-4 text-white backdrop-blur-lg">
      <div className="flex items-center justify-between">
        <a
          href="#"
          className={`hover:text-gray-500 md:block ${isOpen ? "hidden" : "block"}`}
        >
          Home
        </a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 transform space-x-6 md:flex">
          <a href="#about" className="hover:text-gray-500">
            About
          </a>
          <a href="#experience" className="hover:text-gray-500">
            Experience
          </a>
          <a href="#projects" className="hover:text-gray-500">
            Projects
          </a>
          <a href="#skills" className="hover:text-gray-500">
            Skills
          </a>
        </div>

        <div className="hidden space-x-6 md:flex">
          <LinkPreview
            url="https://drive.google.com/file/d/1AFMbuVx-Cek0TGTKfywu3PQVvQb2IYTR/view"
            className="text-white hover:text-gray-500"
          >
            <MdOutlineContactPage size={30} />
          </LinkPreview>{" "}
          <Link
            href="https://github.com/JeremyFriesenGitHub"
            className="text-white hover:text-gray-500"
          >
            <VscGithubAlt size={30} />
          </Link>{" "}
          <Link
            href="https://www.linkedin.com/in/jeremyfriesen1"
            className="text-white hover:text-gray-500"
          >
            <CiLinkedin size={30} />
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <LuX size={30} /> : <VscThreeBars size={30} />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 flex flex-col gap-2 md:hidden">
          <h1 className="p-2 text-2xl font-bold">Sections</h1>
          <a href="#" className="rounded-md bg-white/20 p-2">
            Home
          </a>
          <a href="#about" className="rounded-md bg-white/20 p-2">
            About
          </a>
          <a href="#experience" className="rounded-md bg-white/20 p-2">
            Experience
          </a>
          <a href="#projects" className="rounded-md bg-white/20 p-2">
            Projects
          </a>
          <a href="#skills" className="rounded-md bg-white/20 p-2">
            Skills
          </a>
          <h1 className="p-2 text-2xl font-bold">Resume</h1>
          <LinkPreview
            url="https://drive.google.com/file/d/1AFMbuVx-Cek0TGTKfywu3PQVvQb2IYTR/view"
            className="rounded-md bg-white/20 p-2 text-white"
          >
            <MdOutlineContactPage size={30} />
          </LinkPreview>{" "}
          <h1 className="p-2 text-2xl font-bold">Socials</h1>
          <LinkPreview
            url="https://github.com/JeremyFriesenGitHub"
            className="rounded-md bg-white/20 p-2 text-white"
          >
            <VscGithubAlt size={30} />
          </LinkPreview>{" "}
          <LinkPreview
            url="https://www.linkedin.com/in/jeremyfriesen1"
            className="rounded-md bg-white/20 p-2 text-white"
          >
            <CiLinkedin size={30} />
          </LinkPreview>{" "}
        </div>
      )}
    </nav>
  );
}
