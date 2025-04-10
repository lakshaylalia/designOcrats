import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Particles from "../Background/Particles.jsx";

function Works() {
  const photos = [
    {
      source: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/ovdjsmsukvjmcouurrhb",
      desc: "Architectural designs",
    },
    {
      source: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/qenodttsdadoo5tumndj",
      desc: "Showcasing a collaborative project",
    },
    {
      source: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/gnku8fce70stvs7us3as",
      desc: "Showcasing an innovative painting",
    },
    {
      source: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/xcbil9vmws2zli6sy8tm",
      desc: "Showcasing a clay design project",
    },
    {
      source: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/qdnh0yzxeyhouobin1h1",
      desc: "Showcasing a community project",
    },
    {
      source: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/ejht1khtsjjw93vfwhud",
      desc: "Showcasing a creative design solution",
    },
  ];

  const [activeImage, setActiveImage] = useState(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const items = gsap.utils.toArray(".work-image");
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: i % 2 === 0 ? -200 : 200 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: i * 0.2,
          ease: "power3.out",
        }
      );
    });
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center md:gap-12 py-16 px-8 relative overflow-hidden">
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
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        See Our Past Works
      </motion.h2>

      <motion.p
        className="text-sm md:text-xl text-center text-gray-300 max-w-3xl mb-10 font-[Inter]"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
      >
        &quot;A showcase of our past projects highlighting innovative designs,
        collaborative efforts, and impactful achievements.&quot;
      </motion.p>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {photos.map((photo, i) => (
          <img
            key={photo.source}
            src={photo.source}
            alt={photo.desc}
            className="work-image object-cover h-40 w-40 md:h-48 md:w-48 lg:h-72 lg:w-72 rounded-2xl shadow-2xl cursor-pointer transition-transform duration-300"
            onClick={() => setActiveImage(photo)}
            onTouchStart={() => setActiveImage(photo)}
            ref={(el) => (imagesRef.current[i] = el)}
          />
        ))}
      </div>

      {activeImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm flex flex-col justify-center items-center z-50 px-4 text-center">
          <button
            className="absolute top-5 right-5 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
            onClick={() => setActiveImage(null)}
          >
            <X size={30} />
          </button>

          <motion.img
            src={activeImage.source}
            alt={activeImage.desc}
            className="max-w-full max-h-[80vh] rounded-lg shadow-lg mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          />

          <motion.p
            className="text-white text-lg md:text-xl max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {activeImage.desc}
          </motion.p>
        </div>
      )}
    </section>
  );
}

export default Works;
