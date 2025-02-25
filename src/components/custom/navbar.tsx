import { useState } from "react";
import { Menu, X } from "lucide-react"; // Lucide-React icons

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-10 bg-black/40 backdrop-blur-lg p-4 text-white rounded-md">
      <div className="flex items-center justify-between">
  
        <a href="#" className="hover:text-gray-300 hidden md:flex space-x-6">
          Home
        </a>

  
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-gray-300">Experience</a>
          <a href="#" className="hover:text-gray-300">Projects</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>


      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2">
          <a href="#" className="p-2 bg-white/20 rounded-md">
            Experience
          </a>
          <a href="#" className="p-2 bg-white/20 rounded-md">
            Projects
          </a>
          <a href="#" className="p-2 bg-white/20 rounded-md">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
