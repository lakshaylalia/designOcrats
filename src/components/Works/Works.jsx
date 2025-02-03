import { motion } from "framer-motion";
import { useState } from "react";

function Works() {
  const photos = [
    {
      source: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/ovdjsmsukvjmcouurrhb",
      desc: "Work image 1 showcasing a modern architectural design",
    },
    {
      source: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/qenodttsdadoo5tumndj",
      desc: "Work image 2 showcasing a collaborative project",
    },
    {
      source: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/gnku8fce70stvs7us3as",
      desc: "Work image 3 showcasing an innovative design",
    },
    {
      source: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/xcbil9vmws2zli6sy8tm",
      desc: "Work image 4 showcasing a sustainable architecture project",
    },
    {
      source: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/qdnh0yzxeyhouobin1h1",
      desc: "Work image 5 showcasing a community project",
    },
    {
      source: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/ejht1khtsjjw93vfwhud",
      desc: "Work image 6 showcasing a creative design solution",
    },
  ];

  const [visibleImage, setVisibleImage] = useState(null);

  const toggleImage = (image) => {
    setVisibleImage(visibleImage === image ? null : image);
  };

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center md:gap-12 bg-black py-16 px-8">
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
            className={`h-40 w-40 md:h-48 md:w-48 lg:h-72 lg:w-72 object-cover transform transition-transform duration-300 rounded-2xl shadow-2xl cursor-pointer ${
              visibleImage === photo.source ? "scale-110" : "scale-100"
            }`}
            onTouchStart={() => toggleImage(photo.source)}
            whileHover={() => ({ scale: 1.2, rotate: Math.random() * 10 })}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: Math.random() * 10 }}
            transition={{ duration: 0.5, delay: index * 0.2, type: "spring" }}
          />
        ))}
      </motion.div>
    </section>
  );
}

export default Works;
