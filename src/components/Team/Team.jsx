import { Users2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const teamMembers = [
  { name: "Mirza Abdullah Beg", role: "Club Coordinator", year: "2023", image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/nrcxegg4d9kbp5ny417h" },
  { name: "Saksham Wallia", role: "Club Coordinator", year: "2023", image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/x33zjlv2igdhnlmxncec" },
  { name: "Sarthak Prashar", role: "Club Coordinator", year: "2024", image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/tbq4rloqyf1stcmha2iw" },
  { name: "Ishika Suri", role: "Club Coordinator", year: "2024", image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/knjtf9q6trsmhk5ddvdy" },
  { name: "Amritansh Chaubey", role: "Club Coordinator", year: "2025", image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/nnhivshxxazmmr9olyvn" },
  { name: "Shimphrui Obedient", role: "Club Coordinator", year: "2025", image: "/cc2.jpg" },
];

function TeamMemberCard({ member, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 transform hover:scale-105 transition-all duration-300 w-64"
    >
      <div className="relative overflow-hidden group">
        <img src={member.image} alt={member.name} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-white">{member.name}</h3>
        <p className="text-white mt-1">{member.role}</p>
      </div>
    </motion.div>
  );
}

function YearSection({ year, members, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="mb-16 text-center"
    >
      <div className="flex justify-center items-center gap-2 mb-6">
        <ChevronRight className="text-white" />
        <h2 className="text-2xl font-bold text-white">{year}</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {members.map((member, idx) => (
          <TeamMemberCard key={idx} member={member} index={idx} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Team() {
  const membersByYear = teamMembers.reduce((acc, member) => {
    if (!acc[member.year]) acc[member.year] = [];
    acc[member.year].push(member);
    return acc;
  }, {});

  const sortedYears = Object.keys(membersByYear).sort();

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-6">
      <div className="container mx-auto py-16 relative text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex justify-center items-center gap-2 mb-12">
          <Users2 className="text-white" />
          <h2 className="text-3xl font-bold">Our Team</h2>
        </motion.div>
        {sortedYears.map((year, index) => (
          <YearSection key={year} year={year} members={membersByYear[year]} index={index} />
        ))}
      </div>
    </div>
  );
}
