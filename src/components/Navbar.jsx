import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const links = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Works", path: "/works" },
  {
    title: "Gallery",
    path: "https://drive.google.com/drive/folders/1775uFK2fF_-smAbRuGQF_OBzrXpf6ZcZ",
  },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between lg:justify-around p-4 bg-black w-full shadow-md sticky top-0 z-50 font-sans">
      <div className="flex items-center">
        <img
          src="/doc.png"
          alt="Logo"
          className="h-16 mr-2 transition-transform duration-300 transform hover:scale-110"
        />
        <div className="text-[#C2C2C2] text-5xl font-semibold font-[Inter]">
          DoC
        </div>
      </div>

      <div className="hidden md:flex space-x-10 items-center">
        {links.map((link) => (
          <NavLink
            key={link.title}
            to={link.path}
            className={({ isActive }) =>
              `text-[#D6D6D6] text-lg font-semibold transition-colors duration-300 font-[Inter] ${
                isActive ? "text-blue-500" : "hover:text-blue-400"
              }`
            }
          >
            {link.title}
          </NavLink>
        ))}
      </div>

      <div className="hidden md:block">
        <Link
          to="mailto:designocrats.nimbus@nith.ac.in"
          className="bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 cursor-pointer font-[Inter]"
        >
          Contact
        </Link>
      </div>

      <button
        className="md:hidden text-white text-3xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-black flex flex-col items-center space-y-6 py-6 md:hidden shadow-lg border-t border-gray-700">
          {links.map((link) => (
            <NavLink
              key={link.title}
              to={link.path}
              className={({ isActive }) =>
                `text-[#D6D6D6] text-xl font-semibold transition-colors duration-300 ${
                  isActive ? "text-blue-500" : "hover:text-blue-400"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.title}
            </NavLink>
          ))}
          <Link
            to="mailto:designocrats.nimbus@nith.ac.in"
            className="bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
