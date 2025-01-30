import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
const About = () => {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-6 md:px-20 flex flex-col items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-50"></div>
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center mb-10 relative z-10 font-[Inter]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Design O Crats (DOC)
      </motion.h1>

      <p className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-12 relative z-10 font-[Inter]">
        <Typewriter
          words={[
            "A dynamic platform where creativity, innovation, and design converge to inspire and foster new ideas in the field of architecture.",
          ]}
          loop={1}
          cursor
          cursorStyle="|"
          typeSpeed={50}
          deleteSpeed={50}
        />
      </p>

      <div className="relative w-full max-w-3xl z-10 flex flex-col items-center">
        <div className="absolute left-1/2 top-0 w-1 bg-gray-600 h-full transform -translate-x-1/2"></div>
        <FeatureCard
          title="Architectural Workshops"
          description="Hands-on workshops focusing on architectural software tools, equipping participants with essential practical skills."
          align="left"
        />
        <FeatureCard
          title="Expert Lectures"
          description="Lectures from renowned experts sharing industry insights, experiences, and the latest trends in architecture."
          align="right"
        />
        <FeatureCard
          title="Project Development"
          description="Opportunities to bridge theory and practice by developing real-world architectural projects."
          align="left"
        />
        <FeatureCard
          title="Fun & Engaging Events"
          description="Creative events like Crafts Alley and Braintecture that encourage exploration and networking in a relaxed atmosphere."
          align="right"
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, align }) => {
  return (
    <motion.div
      className={`font-[Inter] relative w-full md:w-1/2 mb-12 p-6 bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-lg ease-out duration-300 hover:scale-105 hover:shadow-2xl ${
        align === "left"
          ? "ml-auto mr-100 text-right"
          : "mr-auto ml-100 text-left"
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
    >
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

export default About;
