import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Footer() {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    if (!feedback.trim()) {
      toast.warn("Please enter your feedback before sending.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);

    const templateParams = { user_feedback: feedback };

    emailjs
      .send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS Service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS Template ID
        templateParams,
        "YOUR_PUBLIC_KEY" // Replace with your EmailJS Public Key
      )
      .then(
        () => {
          toast.success("Feedback sent successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
          setFeedback("");
        },
        () => {
          toast.error("Failed to send feedback. Try again later.", {
            position: "top-right",
            autoClose: 3000,
          });
          setFeedback("");
        }
      )
      .finally(() => setLoading(false));
  };

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Works", path: "/works" },
    { title: "Gallery", path: "/gallery" },
  ];

  return (
    <footer className="text-sm md:text-lg w-full h-auto bg-gray-900/50 text-white flex flex-col items-center justify-between py-4 font-[Inter]">
      <div className="top w-full grid grid-cols-2 md:grid-cols-3 gap-10 px-10">
        {/* Left Section (Social Media and Logo) */}
        <div className="connectWithUs flex flex-col items-start gap-4">
          <div className="logo flex items-center">
            <img
              src="https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/gboyrhzs1ojgyne6vhyd"
              alt="logo"
              className="w-12 h-12"
            />
            <p className="text-3xl ml-2">DoC</p>
          </div>
          <div className="font-semibold">
            <span className="font-serif">CONNECT</span> WITH US
          </div>
          <div className="icons flex items-center gap-4">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon className="hover:text-blue-400 transition-all" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="hover:text-blue-400 transition-all" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <XIcon className="hover:text-blue-400 transition-all" />
            </Link>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <YouTubeIcon className="hover:text-blue-400 transition-all" />
            </a>
          </div>
        </div>

        {/* Middle Section (Navigation Links) */}
        <div className="directLinks flex flex-col md:flex-row md:justify-between items-center gap-4 md:gap-10 text-left">
          {navLinks.map((link) => (
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

        {/* Right Section (Feedback Form) */}
        <div className="feedback flex flex-col items-end gap-y-4">
          <div className="text-white font-serif text-xl">Any Queries</div>
          <textarea
            placeholder="Leave your thoughts"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="bg-white text-gray-600 rounded-lg px-2 py-1 min-w-[200px] focus:outline-none"
          />
          <button
            className="border border-white px-4 py-1 rounded-xl font-serif cursor-pointer hover:bg-blue-500 transition-all"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? "Sending..." : "SEND"}
          </button>
        </div>
      </div>

      {/* Bottom Section (Copyright) */}
      <div className="bottom w-full flex flex-col items-center gap-4 mt-10">
        <div className="breakDown w-[95%] h-0.5 bg-gray-500 mx-auto"></div>
        <div className="text-center text-sm md:text-md">
          &copy; 2025{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            DoC
          </Link>
          . All rights reserved.
        </div>
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </footer>
  );
}

export default Footer;
