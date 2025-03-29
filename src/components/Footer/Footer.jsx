import { useState } from "react";
import { Building2, Mail, MapPin, Phone, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission
    console.log("Feedback submitted:", feedback);
    setFeedback("");
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div {...fadeIn} className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/gboyrhzs1ojgyne6vhyd"
                alt="Logo"
                className="h-10 lg:h-16 mr-2 transition-transform duration-300 transform hover:scale-110"
              />
              <span className="text-2xl font-bold text-white">DoC</span>
            </Link>
            <p className="text-gray-400">
              Fostering creativity and innovation in architectural design.
            </p>
          </motion.div>

          <motion.div {...fadeIn} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/works"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Works
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Team
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div {...fadeIn} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} className="text-white" />
                NIT Hamirpur, HP
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={16} className="text-white" />
                <a href="tel:+918922826935">Call Now</a>
                +91 8922826935
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={16} className="text-white" />
                <Link to="mailto:designocrats.nimbus@nith.ac.in">
                  designocrats.nimbus@nith.ac.in
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div {...fadeIn} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Feedback</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/20"
                rows={3}
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Send size={16} />
                Send Feedback
              </button>
            </form>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400"
          >
            <p>
              &copy; {new Date().getFullYear()} DesignOCrats. All rights
              reserved.
            </p>
          </motion.div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
