import { motion } from "framer-motion";
import { useState } from "react";

const teamMembers = [
  {
    year: "2023",
    members: [
      {
        name: "Mirza Abdullah Beg",
        role: "Club Coordinator",
        image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/nrcxegg4d9kbp5ny417h",
        contact: "+91 90051 79742",
      },
      {
        name: "Saksham Wallia",
        role: "Club Coordinator",
        image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/x33zjlv2igdhnlmxncec",
        contact: "+91 9882384226",
      },
    ],
  },
  {
    year: "2024",
    members: [
      {
        name: "Sarthak Prashar",
        role: "Club Coordinator",
        image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/tbq4rloqyf1stcmha2iw",
        contact: "+91 9317445987",
      },
      {
        name: "Ishika Suri",
        role: "Club Coordinator",
        image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/knjtf9q6trsmhk5ddvdy",
        contact: "+91 8894424842",
      },
    ],
  },
  {
    year: "2025",
    members: [
      {
        name: "Amritansh Chaubey",
        role: "Club Coordinator",
        image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/nnhivshxxazmmr9olyvn",
        contact: "+91 8922826935",
      },
      // {
      //   name: "Jaydeep Darji",
      //   role: "Club Coordinator",
      //   image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/zce6eneotg34qsqou1m9",
      //   contact: "+91 8082775368",
      // },
    ],
  },
];

const TeamPage = () => {
  const [visibleIndex, setVisibleIndex] = useState(null); 

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6 md:px-20 flex flex-col items-center font-[Inter]">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Team
      </motion.h1>

      {teamMembers.map((yearData, yearIndex) => (
        <motion.div
          key={yearIndex}
          className="w-full max-w-4xl mb-12 font-[Inter] cursor-pointer"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-semibold text-center mb-6">
            {yearData.year}
          </h2>
          <div className="flex flex-wrap justify-center gap-8 font-[Inter]">
            {yearData.members.map((member, memberIndex) => {
              const index = `${yearIndex}-${memberIndex}`;

              return (
                <motion.div
                  key={index}
                  className="relative w-56 h-72 bg-gray-800/50 rounded-lg overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    className={`absolute inset-0 flex flex-col items-center justify-end text-center bg-black/50 bg-opacity-80 transition-opacity p-4 font-[Inter]
                      ${visibleIndex === index ? "opacity-100" : "opacity-0"} md:hover:opacity-100`}
                    onTouchStart={() =>
                      setVisibleIndex(visibleIndex === index ? null : index) 
                    }
                  >
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-300">{member.role}</p>
                    <p className="text-sm mt-2 max-w-xs">{member.contact}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TeamPage;
