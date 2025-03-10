import { useState } from "react";
import { LuX } from "react-icons/lu";
import { VscGithubAlt, VscThreeBars } from "react-icons/vsc";
import { CiLinkedin } from "react-icons/ci";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-10 bg-black/40 backdrop-blur-lg p-4 text-white rounded-md">
      <div className="flex items-center justify-between">
  
        <a href="#" className="hover:text-gray-500 hidden md:flex space-x-6">
          Home
        </a>

        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-gray-500">Experience</a>
          <a href="#" className="hover:text-gray-500">Projects</a>
          <a href="https://github.com/JeremyFriesenGitHub" className="hover:text-gray-500">
            <VscGithubAlt size={28} />
          </a>
          <a href="https://www.linkedin.com/in/jeremyfriesen1" className="hover:text-gray-500">
            <CiLinkedin size={28} />
          </a>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <LuX size={28} /> : <VscThreeBars size={28} />}
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
          <a href="#" className="p-2 bg-white/20 rounded-md">
            Contact
          </a>

          <h1 className="text-2xl font-bold p-2">Socials</h1>
          <a href="https://github.com/JeremyFriesenGitHub" className="bg-white/20 rounded-md p-2 ">
             <VscGithubAlt size={28} />
          </a>
          <a href="https://www.linkedin.com/in/jeremyfriesen1" className="bg-white/20 rounded-md p-2">
             <CiLinkedin size={28} />
          </a>
        </div>
      )}
    </nav>
  );
}
