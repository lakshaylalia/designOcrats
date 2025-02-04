import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { motion } from "framer-motion";
import Works from "../Works/Works";
import { useState } from "react";

function Home() {
  const [visibleCard, setVisibleCard] = useState(null);

  const toggleCard = (card) => {
    setVisibleCard(visibleCard === card ? null : card);
  };


  return (
    <>
      <section className="bg-black text-white h-[50%] md:h-screen flex items-center justify-center pt-10 px-6 md:px-8 font-[Inter]">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-40 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 text-center md:text-left"
          >
            <p className="text-blue-400 font-semibold uppercase tracking-wide text-xs md:text-lg">
              Very proud to introduce
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold">
              Design O Crats
            </h1>
            <p className="text-gray-300 leading-relaxed text-left md:text-lg font-medium text-sm">
              The Departmental Club of Architecture at the National Institute of
              Technology, Hamirpur, is a vibrant student-driven organization
              dedicated to fostering creativity, innovation, and excellence in
              architectural education and practice. The club serves as a
              platform for students to explore the diverse dimensions of
              architecture, design, and planning through interactive learning,
              collaborative projects, and professional exposure.
            </p>
            <div className="flex space-x-6 mt-4 justify-center md:justify-start">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.instagram.com/designocrats/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:opacity-80 transition-opacity"
              >
                <FaInstagram className="text-white text-3xl md:text-4xl" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.linkedin.com/company/design-o-crats-nith/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:opacity-80 transition-opacity"
              >
                <CiLinkedin className="text-white text-3xl md:text-4xl" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center relative mt-10 md:mt-0"
          >
            <div className="p-4 rounded-2xl absolute inset-0 transform scale-110 blur-lg"></div>
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/haox6qzxxtwr0y8o4d8n"
              alt="Main Visual"
              className="rounded-2xl shadow-[0px_0px_20px_rgba(255,255,255,0.5)] w-64 md:w-auto"
            />
          </motion.div>
        </div>
      </section>

      <Works />

      {/* Coordinators Section */}
      <section className="text-white py-6 md:py-10 w-full min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center font-[Inter]">
        <div className="container mx-auto text-center flex flex-col items-center justify-center gap-6 md:gap-8 px-4">
          <h2 className="text-lg md:text-3xl font-bold text-gray-200">
            Meet Your Club Coordinators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl justify-center content-center">
            
            {/* Card 1: Jaydeep Darji */}
            <div
              className={`w-72 h-60 md:w-96 md:h-72 p-2 md:p-4 
                rounded-2xl shadow-xl text-center border 
                ${visibleCard === "jaydeep" ? "border-blue-500 scale-105" : "border-gray-700 scale-100"} 
                md:hover:border-blue-500 transition duration-300 ease-in-out 
                hover:scale-105 bg-gray-900/50 backdrop-blur-md`}
                onTouchStart={() => toggleCard("jaydeep")}
            >
              <p className="text-xs md:text-md italic px-3 md:px-4 leading-relaxed text-left text-gray-300">
                “I am very happy to join as Club Coordinator of DoC. I am
                willing to bring all my past experiences and expertise for the
                benefit of the club.”
              </p>
              <div className="flex justify-center my-3 md:my-4">
                <img
                  src="https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/zce6eneotg34qsqou1m9"
                  alt="Jaydeep Darji"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-gray-500"
                />
              </div>
              <h3 className="text-md md:text-lg font-semibold text-blue-500">
                Jaydeep Darji
              </h3>
              <p className="text-xs md:text-sm text-gray-400">
                3rd Year B. Arch (Present Coordinator)
              </p>
            </div>

            {/* Card 2: Amritansh Chaubey */}
            <div
              className={`w-72 h-72 md:w-96 md:h-72 p-2 md:p-4 
                rounded-2xl shadow-xl text-center border 
                ${visibleCard === "amritansh" ? "border-blue-500 scale-105" : "border-gray-700 scale-100"} 
                md:hover:border-blue-500 transition duration-300 ease-in-out 
                hover:scale-105 bg-gray-900/50 backdrop-blur-md`}
                onTouchStart={() => toggleCard("amritansh")}
            >
              <p className="text-xs md:text-md italic px-3 md:px-4 leading-relaxed text-left text-gray-300">
                &quot;I am excited to take on the role of CC of DoC. I am eager
                to contribute my skills and experiences for the growth and
                success of the club.&quot;
              </p>
              <div className="flex justify-center my-3 md:my-4">
                <img
                  src="https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/nnhivshxxazmmr9olyvn"
                  alt="Amritansh Chaubey"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-gray-500"
                />
              </div>
              <h3 className="text-md md:text-lg font-semibold text-blue-500">
                Amritansh Chaubey
              </h3>
              <p className="text-xs md:text-sm text-gray-400">
                3rd Year B. Arch (Present Coordinator)
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
