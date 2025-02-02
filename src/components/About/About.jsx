import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const About = () => {
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        <motion.img
          src="/public/doc.png"
          alt="doc"
          className="w-full h-full object-cover absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 0.8 }}
          transition={{ duration: 5, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 md:px-20 z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 font-[Inter]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Design O Crats (DOC)
          </motion.h1>

          <p className="text-lg md:text-xl max-w-3xl">
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
        </div>
      </div>

      <div className="min-h-screen bg-black text-white py-16 px-6 md:px-20 flex flex-col items-center relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-50"></div>

        <div className="relative w-full max-w-3xl z-10 flex flex-col items-center">
          <div className="absolute left-1/2 top-0 w-1 bg-gray-600 h-full transform -translate-x-1/2"></div>

  
          {[
            {
              title: "Architectural Workshops",
              description:
                "Hands-on workshops focusing on architectural software tools, equipping participants with essential practical skills.",
              align: "left",
            },
            {
              title: "Expert Lectures",
              description:
                "Lectures from renowned experts sharing industry insights, experiences, and the latest trends in architecture.",
              align: "right",
            },
            {
              title: "Project Development",
              description:
                "Opportunities to bridge theory and practice by developing real-world architectural projects.",
              align: "left",
            },
            {
              title: "Fun & Engaging Events",
              description:
                "Creative events like Crats Alley and Braintecture that encourage exploration and networking in a relaxed atmosphere.",
              align: "right",
            },
            {
              title: "Projects",
              description:
                "DOC focuses on innovative, sustainable design solutions. Past projects include portable housing, space-efficient furniture, eco-friendly bamboo pavilions, and resonant ceiling structures for better acoustics.",
              align: "left",
            },
            {
              title: "Workshops",
              description:
                "Hands-on sessions cover Monolithic Expression, Fabrication, AutoCAD, SketchUp, and Photoshop, equipping students with essential design and technical skills.",
              align: "right",
            },
            {
              title: "Guest Lecture and Expert talk",
              description:
                "Renowned architects like Ajay Sharma and Siddharth Gautam share insights on motivation, innovation, and sustainability in architecture.",
              align: "left",
            },
            {
              title: "Events",
              description:
                "DOC hosts engaging events like Crats Alley, a gaming challenge, and Braintecture Quiz, a competitive architecture test. Junkyard Builders sparks creativity by using unconventional materials for design.",
              align: "right",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.3, ease: "easeOut" }}
            >
              <FeatureCard
                title={item.title}
                description={item.description}
                align={item.align}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

const FeatureCard = ({ title, description, align }) => {
  return (
    <motion.div
      className={`font-[Inter] relative w-full md:w-1/2 mb-12 p-6 bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-lg ease-out duration-300 group-hover:scale-105 hover:shadow-2xl cursor-pointer ${
        align === "left" ? "ml-100 text-right" : "mr-auto text-left"
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
