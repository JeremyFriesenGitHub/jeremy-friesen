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
    <nav className="sticky top-0 z-10 bg-black/40 backdrop-blur-lg p-4 text-white rounded-md">
      <div className="flex items-center justify-between">
        
        <a href="#" className={`hover:text-gray-500 md:block ${isOpen ? "hidden" : "block"}`}>
          Home
        </a>

        <div className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
          <a href="#" className="hover:text-gray-500">Experience</a>
          <a href="#" className="hover:text-gray-500">Projects</a>
        </div>

        <div className="hidden md:flex space-x-6">
          <LinkPreview url="https://drive.google.com/file/d/1QHPFNCJJYdhbHvL9JZiD_PBiAFXNjdlW/view" className="hover:text-gray-500 text-white">
            <MdOutlineContactPage size={30} />
          </LinkPreview>{" "}
          <Link href="https://github.com/JeremyFriesenGitHub" className="hover:text-gray-500 text-white">
            <VscGithubAlt size={30} />
          </Link>{" "}
          <Link href="https://www.linkedin.com/in/jeremyfriesen1" className="hover:text-gray-500 text-white">
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
        <div className="md:hidden mt-4 flex flex-col gap-2">

        <h1 className="text-2xl font-bold p-2">Sections</h1>
          <a href="#" className="p-2 bg-white/20 rounded-md">
            Home
          </a>
          <a href="#" className="p-2 bg-white/20 rounded-md">
            Experience
          </a>
          <a href="#" className="p-2 bg-white/20 rounded-md">
            Projects
          </a>

          <h1 className="text-2xl font-bold p-2">Resume</h1>
          <LinkPreview url="https://drive.google.com/file/d/1QHPFNCJJYdhbHvL9JZiD_PBiAFXNjdlW/view" className="p-2 bg-white/20 rounded-md text-white">
            <MdOutlineContactPage size={30} />
          </LinkPreview>{" "}

          <h1 className="text-2xl font-bold p-2">Socials</h1>
          <LinkPreview url="https://github.com/JeremyFriesenGitHub" className="bg-white/20 rounded-md p-2 text-white">
             <VscGithubAlt size={30} />
          </LinkPreview>{" "}
          <LinkPreview url="https://www.linkedin.com/in/jeremyfriesen1" className="bg-white/20 rounded-md p-2 text-white">
             <CiLinkedin size={30} />
          </LinkPreview>{" "}
        </div>
      )}
    </nav>
  );
}
