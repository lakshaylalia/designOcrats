import { motion } from "framer-motion";

const teamMembers = [
  {
    year: "2023",
    members: [
      {
        name: "Mirza Abdullah Beg",
        role: "Club Coordinator",
        image: "/src/assets/mirza.jpg",
        contact: "+91 90051 79742",
      },
      {
        name: "Saksham Wallia",
        role: "Club Coordinator",
        image: "/src/assets/saksham.jpg",
        contact: "+919882384226",
      },
    ],
  },
  {
    year: "2024",
    members: [
      {
        name: "Sarthak Prashar",
        role: "Club Coordinator",
        image: "",
        contact: "+91 9317445987",
      },
      {
        name: "Ishika Suri",
        role: "Club Coordinator",
        image: "",
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
        image: "/src/assets/amritansh.jpg",
        contact: "+91 8922826935",
      },
      {
        name: "Jaydeep Darji",
        role: "Club Coordinator",
        image: "/src/assets/jaydeep.jpg",
        contact: "+91 8082775368",
      },
    ],
  },
];

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-6 md:px-20 flex flex-col items-center">
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Team
      </motion.h1>

      {teamMembers.map((yearData, index) => (
        <div key={index} className="w-full max-w-4xl mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6">
            {yearData.year}
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {yearData.members.map((member, idx) => (
              <motion.div
                key={idx}
                className="relative w-56 h-72 bg-gray-800/50 rounded-lg overflow-hidden shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <motion.div className="absolute inset-0 flex flex-col items-center justify-end text-center bg-black/50 bg-opacity-80 opacity-0 hover:opacity-100 transition-opacity p-4">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-300">{member.role}</p>
                  <p className="text-sm mt-2 max-w-xs">{member.contact}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamPage;
