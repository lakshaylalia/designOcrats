import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "Architectural Workshops",
    content:
      "Hands-on workshops focusing on architectural software tools, equipping participants with essential practical skills.",
  },
  {
    title: "Expert Lectures",
    content:
      "Lectures from renowned experts sharing industry insights, experiences, and the latest trends in architecture.",
  },
  {
    title: "Project Development",
    content:
      "Opportunities to bridge theory and practice by developing real-world architectural projects.",
  },
  {
    title: "Fun & Engaging Events",
    content:
      "Creative events like Crats Alley and Braintecture that encourage exploration and networking in a relaxed atmosphere.",
  },
  {
    title: "Hands-on Design Tools",
    content:
      "Sessions cover Monolithic Expression, Fabrication, AutoCAD, SketchUp, and Photoshop — essential design and technical skills.",
  },
  {
    title: "Guest Lectures & Expert Talks",
    content:
      "Architects like Ajay Sharma and Siddharth Gautam share insights on motivation, innovation, and sustainability in architecture.",
  },
  {
    title: "Quizzes & Games",
    content:
      "DOC hosts engaging events like Crats Alley, a gaming challenge, and the Braintecture Quiz to stimulate creativity and fun.",
  },
];

const About = () => {
  const [showSections, setShowSections] = useState(false);
  const containerRef = useRef(null);

  // Wait for 7 seconds (or duration of typewriter) then show sections.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSections(true);
    }, 7000);
    return () => clearTimeout(timeout);
  }, []);

  // Apply scroll-triggered animations to each section once they're visible.
  useLayoutEffect(() => {
    if (!showSections) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".section-block").forEach((el, i) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            x: i % 2 === 0 ? 100 : -100,
            rotateY: 10,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1,
            ease: "power2.inOut",
              scrollTrigger: {
              trigger: el,
              start: "top 80%", // start animation when the top of the element hits 80% of viewport height
              end:"bottom 60%",
              // markers: true, // uncomment to see visual markers for debugging
              toggleActions: "play none none reverse",
              scrub:true,
          
            },
          }
        );
      });
    }, containerRef);
  
    return () => ctx.revert();
  }, [showSections]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background */}
      <motion.img
        src="https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/gboyrhzs1ojgyne6vhyd"
        alt="doc"
        className="absolute inset-0 w-full h-full object-cover object-center" 
        animate={{ scale: 0.8 }}
        transition={{ duration: 5 }}
      />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 md:px-20 h-[75vh]">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 font-[Inter]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Design O Crats
        </motion.h1>

        <p className="text-lg md:text-xl max-w-3xl">
          <Typewriter
            words={[
              "A dynamic platform where creativity, innovation, and design converge to inspire and foster new ideas in the field of architecture.",
            ]}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={40}
            deleteSpeed={40}
          />
        </p>
      </div>
      
      {/* Section Blocks */}
      {showSections && (
        <div
          ref={containerRef}
          className="relative z-20 px-6 py-10 max-w-6xl mx-auto space-y-16"
        >
          {sections.map((sec, i) => (
            <div
              key={i}
              className={`section-block relative p-8 rounded-3xl border border-white/10 backdrop-blur-md bg-white/10 transition duration-300 overflow-hidden ${
                i % 2 === 0 ? "ml-auto mr-0" : "mr-auto ml-0"
              } max-w-2xl`}
            >
              {/* Glow Blur Background */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 blur-2xl rounded-3xl z-0"></div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-extrabold text-white mb-3 tracking-wide">
                  {sec.title}
                </h3>
                <p className="text-white/80 text-base leading-relaxed">
                  {sec.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default About;
