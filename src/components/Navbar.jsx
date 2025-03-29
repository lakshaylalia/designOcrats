import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Works", path: "/works" },
  { title: "Events", path: "/events" },
  { title: "Team", path: "/team" },
  { title: "Gallery", path: "/gallery" },
];

export default function Navbar() {
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
    <nav className="bg-black/50 backdrop-blur-sm fixed w-full z-50 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/gboyrhzs1ojgyne6vhyd"
              alt="Logo"
              className="h-10 lg:h-16 mr-2 transition-transform duration-300 transform hover:scale-110"
            />
            <span className=" text-3xl md:text-4xl font-bold text-white">DoC</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <NavLink
                key={link.title}
                to={link.path}
                className={({ isActive }) =>
                  `text-gray-300 hover:text-white transition-colors font-semibold ${
                    isActive ? "text-blue-500 border-b-2 border-blue-500" : ""
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}
            <Link
              to="mailto:designocrats.nimbus@nith.ac.in"
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
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
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-screen w-screen bg-black/90 backdrop-blur-lg flex flex-col items-center p-8 gap-y-6 shadow-lg md:hidden"
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
                  `text-white text-xl font-semibold transition-colors duration-300 ${
                    isActive ? "text-blue-500 border-b-2 border-blue-500" : "hover:text-blue-400"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </NavLink>
            ))}

            <Link
              to="/contact"
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
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