import { Users2, ChevronRight, Linkedin, Instagram, Mail } from "lucide-react";
import { useEffect, useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  { 
    name: "Mirza Abdullah Beg", 
    role: "Club Coordinator", 
    year: "2023", 
    image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/nrcxegg4d9kbp5ny417h",
    bio: "Leading architectural innovation with passion for sustainable design.",
    social: {
      linkedin: "#",
      instagram: "#",
      email: "mirza@example.com"
    }
  },
  { 
    name: "Saksham Wallia", 
    role: "Club Coordinator", 
    year: "2023", 
    image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/x33zjlv2igdhnlmxncec",
    bio: "Passionate about modern architectural solutions and community building.",
    social: {
      linkedin: "#",
      instagram: "#",
      email: "saksham@example.com"
    }
  },
  { 
    name: "Sarthak Prashar", 
    role: "Club Coordinator", 
    year: "2024", 
    image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/tbq4rloqyf1stcmha2iw",
    bio: "Focused on integrating technology with architectural design principles.",
    social: {
      linkedin: "#",
      instagram: "#",
      email: "sarthak@example.com"
    }
  },
  { 
    name: "Ishika Suri", 
    role: "Club Coordinator", 
    year: "2024", 
    image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/knjtf9q6trsmhk5ddvdy",
    bio: "Dedicated to creating inclusive and accessible architectural spaces.",
    social: {
      linkedin: "#",
      instagram: "#",
      email: "ishika@example.com"
    }
  },
  { 
    name: "Amritansh Chaubey", 
    role: "Club Coordinator", 
    year: "2025", 
    image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/nnhivshxxazmmr9olyvn",
    bio: "Excited to lead DoC towards new heights of architectural excellence.",
    social: {
      linkedin: "https://www.linkedin.com/in/amritansh-chaubey-8012552b7/",
      instagram: "#",
      email: "amritansh@example.com"
    }
  },
  { 
    name: "Shimphrui Obedient", 
    role: "Club Coordinator", 
    year: "2025", 
    image: "/cc2.jpg",
    bio: "Happy to contribute to DoC's mission of architectural innovation.",
    social: {
      linkedin: "https://www.linkedin.com/in/shimphrui-obedient-03b846246/",
      instagram: "#",
      email: "shimphrui@example.com"
    }
  },
];

// ⬇️ Team Member Card
function TeamMemberCard({ member, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      className="team-card group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 w-full max-w-md flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* ⬇️ Centered Circular Image */}
      <div className="relative overflow-hidden flex items-center justify-center">
        <img
          src={member.image}
          alt={member.name}
          className="h-60 w-60  object-cover mx-auto mt-6 mb-4 transition-transform duration-700 group-hover:scale-110"
          style={{ objectPosition: 'center center' }}
        />
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex justify-center gap-3">
              {member.social.linkedin !== "#" && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-orange-500 transition-colors duration-300"
                >
                  <Linkedin size={18} className="text-white" />
                </a>
              )}
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-purple-500 transition-colors duration-300"
              >
                <Instagram size={18} className="text-white" />
              </a>
              <a
                href={`mailto:${member.social.email}`}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-blue-500 transition-colors duration-300"
              >
                <Mail size={18} className="text-white" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="p-6 relative z-10 text-center">
        <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-purple-500 transition-all duration-300">
          {member.name}
        </h3>
        <p className="text-orange-500 font-medium mt-1">{member.role}</p>
        <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm text-white/80 mt-2">
          Class of {member.year}
        </div>
        <p className="text-gray-400 text-sm mt-4 leading-relaxed">
          {member.bio}
        </p>
      </div>

      <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-tl from-purple-500/20 to-pink-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

// ⬇️ Year Group
function YearSection({ year, members, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="mb-20"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-orange-500" />
          <ChevronRight className="text-orange-500" size={24} />
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
            Class of {year}
          </h2>
          <ChevronRight className="text-purple-500 rotate-180" size={24} />
          <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500" />
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Meet the dedicated coordinators who have shaped the vision and direction of DesignOCrats
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
        {members.map((member, idx) => (
          <TeamMemberCard key={idx} member={member} index={idx} />
        ))}
      </div>
    </motion.div>
  );
}

// ⬇️ Main Team Export
export default function Team() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const membersByYear = teamMembers.reduce((acc, member) => {
    if (!acc[member.year]) acc[member.year] = [];
    acc[member.year].push(member);
    return acc;
  }, {});

  const sortedYears = Object.keys(membersByYear).sort((a, b) => parseInt(a) - parseInt(b));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { opacity: 0, y: -50 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out"
      });

      if (titleRef.current) {
        const text = titleRef.current.textContent;
        titleRef.current.innerHTML = '';
        text.split('').forEach((char, i) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.opacity = '0';
          span.style.display = 'inline-block';
          titleRef.current.appendChild(span);

          gsap.to(span, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.5 + i * 0.05,
            ease: "power3.out"
          });
        });
      }

      gsap.fromTo(descriptionRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 1, delay: 1, ease: "power3.out"
      });

      gsap.utils.toArray(".team-card").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, x: i % 2 === 0 ? -100 : 100, rotateY: 15 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "bottom 60%",
              toggleActions: "play none none reverse",
              scrub: 1,
            },
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white pt-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-3xl animate-pulse" />
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/15 blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl animate-pulse delay-2000" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div ref={headerRef} className="text-center mb-20">
          <div className="relative inline-block mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
                <Users2 className="text-orange-500" size={32} />
              </div>
            </div>
            <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold text-white mb-6">Our Team</h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-2xl rounded-full opacity-50"></div>
          </div>
          <p ref={descriptionRef} className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Meet the passionate individuals who drive DesignOCrats forward, each bringing unique perspectives 
            and expertise to shape the future of architecture at NIT Hamirpur.
          </p>
        </div>

        <div className="space-y-20">
          {sortedYears.map((year, index) => (
            <YearSection key={year} year={year} members={membersByYear[year]} index={index} />
          ))}
        </div>

        <div className="mt-32 text-center">
          <div className="inline-flex items-center gap-4 p-6 rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 backdrop-blur-lg border border-white/10">
            <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300 font-medium">Building the Future Together</span>
            <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
