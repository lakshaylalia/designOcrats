import { motion } from "framer-motion";

function Works() {
  const photos = [
    {
      source: "/work1.png",
      desc: "Work image 1 showcasing a modern architectural design",
    },
    {
      source: "/work2.png",
      desc: "Work image 2 showcasing a collaborative project",
    },
    {
      source: "/work3.png",
      desc: "Work image 3 showcasing an innovative design",
    },
    {
      source: "/work4.png",
      desc: "Work image 4 showcasing a sustainable architecture project",
    },
    {
      source: "/work5.png",
      desc: "Work image 5 showcasing a community project",
    },
    {
      source: "/work6.png",
      desc: "Work image 6 showcasing a creative design solution",
    },
  ];

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center gap-12 bg-black py-16 px-8 ">
      <motion.h2 
        className="text-5xl font-[Inter] font-bold text-white mb-6" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, type: "spring" }}
      >
        See Our Past Works
      </motion.h2>
      <motion.p 
        className="text-xl text-center text-gray-300 max-w-3xl mb-10 font-[Inter]" 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
      >
        &quot;A showcase of our past projects highlighting innovative designs, collaborative efforts, and impactful achievements.&quot;
      </motion.p>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {photos.map((photo, index) => (
          <motion.img
            key={photo.source}
            src={photo.source}
            alt={photo.desc}
            className="h-72 w-72 object-cover transform transition-transform duration-300 hover:scale-110 rounded-2xl shadow-2xl cursor-pointer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2, type: "spring" }}
          />
        ))}
      </motion.div>
    </section>
  );
}

export default Works;
