import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import Particles from "../Background/Particles.jsx";

function Works() {
  const photos = [
    {
      source:
        "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/ovdjsmsukvjmcouurrhb",
      desc: "Work image 1 showcasing a modern architectural design",
    },
    {
      source:
        "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/qenodttsdadoo5tumndj",
      desc: "Work image 2 showcasing a collaborative project",
    },
    {
      source:
        "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/gnku8fce70stvs7us3as",
      desc: "Work image 3 showcasing an innovative design",
    },
    {
      source:
        "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/xcbil9vmws2zli6sy8tm",
      desc: "Work image 4 showcasing a sustainable architecture project",
    },
    {
      source:
        "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/qdnh0yzxeyhouobin1h1",
      desc: "Work image 5 showcasing a community project",
    },
    {
      source:
        "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/ejht1khtsjjw93vfwhud",
      desc: "Work image 6 showcasing a creative design solution",
    },
  ];

  const [activeImage, setActiveImage] = useState(null);

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center md:gap-12  py-16 px-8">
      <div className="absolute inset-0 -z-10">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <motion.h2
        className="text-xl md:text-5xl font-[Inter] font-bold text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        See Our Past Works
      </motion.h2>

      <motion.p
        className="text-sm md:text-xl text-center text-gray-300 max-w-3xl mb-10 font-[Inter]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
      >
        &quot;A showcase of our past projects highlighting innovative designs,
        collaborative efforts, and impactful achievements.&quot;
      </motion.p>

      {/* Grid of images */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {photos.map((photo, index) => (
          <motion.img
            key={photo.source}
            src={photo.source}
            alt={photo.desc}
            className="object-cover h-40 w-40 md:h-48 md:w-48 lg:h-72 lg:w-72 rounded-2xl shadow-2xl cursor-pointer transition-transform duration-300"
            onClick={() => setActiveImage(photo)}
            onTouchStart={() => setActiveImage(photo)}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2, type: "spring" }}
          />
        ))}
      </motion.div>

      {activeImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          <button
            className="absolute top-5 right-5 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
            onClick={() => setActiveImage(null)}
          >
            <X size={30} />
          </button>

          <motion.img
            src={activeImage.source}
            alt={activeImage.desc}
            className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          />
        </div>
      )}
    </section>
  );
}

export default Works;
