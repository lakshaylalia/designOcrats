import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Works", path: "/works" },
  { title: "Team", path: "/team" },
  {
    title: "Gallery",
    path: "/gallery",
  },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <nav className="flex items-center justify-between lg:justify-around p-4 bg-black/50 w-full shadow-md sticky top-0 z-50 font-sans backdrop-blur-md">
      <div className="flex items-center">
        <img
          src="https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/gboyrhzs1ojgyne6vhyd"
          alt="Logo"
          className="h-10 lg:h-16 mr-2 transition-transform duration-300 transform hover:scale-110"
        />
        <div className="text-[#C2C2C2] text-3xl md:text-5xl font-semibold font-[Inter]">
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-screen w-screen bg-black/90 backdrop-blur-lg flex flex-col items-center p-8 gap-y-6 space-y-6 shadow-lg md:hidden"
          >
            <button
              className="absolute top-6 right-6 text-white text-xl"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>

            {links.map((link) => (
              <NavLink
                key={link.title}
                to={link.path}
                className={({ isActive }) =>
                  `text-white text-xl font-semibold transition-colors duration-300
                 ${isActive ? "text-blue-500" : "hover:text-blue-400"}`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </NavLink>
            ))}

            <Link
              to="mailto:designocrats.nimbus@nith.ac.in"
              className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-all duration-300 cursor-pointer text-lg lg:text-2xl font-[Inter]"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
