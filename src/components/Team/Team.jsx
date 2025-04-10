import { Users2, ChevronRight } from "lucide-react";
import { useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  { name: "Mirza Abdullah Beg", role: "Club Coordinator", year: "2023", image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/nrcxegg4d9kbp5ny417h" },
  { name: "Saksham Wallia", role: "Club Coordinator", year: "2023", image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/x33zjlv2igdhnlmxncec" },
  { name: "Sarthak Prashar", role: "Club Coordinator", year: "2024", image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/tbq4rloqyf1stcmha2iw" },
  { name: "Ishika Suri", role: "Club Coordinator", year: "2024", image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/knjtf9q6trsmhk5ddvdy" },
  { name: "Amritansh Chaubey", role: "Club Coordinator", year: "2025", image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/nnhivshxxazmmr9olyvn" },
  { name: "Shimphrui Obedient", role: "Club Coordinator", year: "2025", image: "/cc2.jpg" },
];

function TeamMemberCard({ member, index }) {
  // This component simply returns the markup.
  // The GSAP animation is handled from the parent container.
  return (
    <div
      className="team-card bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 transform hover:scale-105 transition-all duration-300 w-64 sm:w-72 md:w-80"
    >
      <div className="relative overflow-hidden group">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-white">{member.name}</h3>
        <p className="text-white mt-1">{member.role}</p>
      </div>
    </div>
  );
}

function YearSection({ year, members, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div
      ref={ref}
      className="mb-16 text-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(-30px)",
        transition: `opacity 0.6s ${index * 0.2}s ease, transform 0.6s ${index * 0.2}s ease`,
      }}
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
    </div>
  );
}

export default function Team() {
  const containerRef = useRef(null);
  const membersByYear = teamMembers.reduce((acc, member) => {
    if (!acc[member.year]) acc[member.year] = [];
    acc[member.year].push(member);
    return acc;
  }, {});

  // Sort years in descending order.
  const sortedYears = Object.keys(membersByYear).sort((a, b) => parseInt(b) - parseInt(a));

  // Use gsap.context to scope our animations to the container.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Select all team-card elements using gsap.utils.toArray.
      gsap.utils.toArray(".team-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            // Even indices come from the right; odd from the left.
            x: i % 2 === 0 ? -150 : 150,
            rotateY: 10,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "bottom 65%",
              toggleActions: "play none none reverse",
              scrub: true,
              // markers: true, // Uncomment to debug positions.
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white pt-24 px-6 overflow-hidden">
      <div className="container mx-auto py-16 relative text-center">
        <div className="flex justify-center items-center gap-2 mb-12">
          <Users2 className="text-white" />
          <h2 className="text-3xl font-bold">Our Team</h2>
        </div>
        {sortedYears.map((year, index) => (
          <YearSection key={year} year={year} members={membersByYear[year]} index={index} />
        ))}
      </div>
    </div>
  );
}
