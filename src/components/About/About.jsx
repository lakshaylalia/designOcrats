import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { 
  Sparkles, 
  Users, 
  Lightbulb, 
  Trophy, 
  Palette, 
  MessageCircle, 
  Brain,
  ChevronRight,
  Play
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "Architectural Workshops",
    content: "Hands-on workshops focusing on architectural software tools, equipping participants with essential practical skills.",
    icon: <Palette className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    delay: 0.1
  },
  {
    title: "Expert Lectures",
    content: "Lectures from renowned experts sharing industry insights, experiences, and the latest trends in architecture.",
    icon: <Users className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    delay: 0.2
  },
  {
    title: "Project Development",
    content: "Opportunities to bridge theory and practice by developing real-world architectural projects.",
    icon: <Lightbulb className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    delay: 0.3
  },
  {
    title: "Fun & Engaging Events",
    content: "Creative events like Crats Alley and Braintecture that encourage exploration and networking in a relaxed atmosphere.",
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    delay: 0.4
  },
  {
    title: "Hands-on Design Tools",
    content: "Sessions cover Monolithic Expression, Fabrication, AutoCAD, SketchUp, and Photoshop — essential design and technical skills.",
    icon: <Trophy className="w-6 h-6" />,
    color: "from-yellow-500 to-orange-500",
    delay: 0.5
  },
  {
    title: "Guest Lectures & Expert Talks",
    content: "Architects like Ajay Sharma and Siddharth Gautam share insights on motivation, innovation, and sustainability in architecture.",
    icon: <MessageCircle className="w-6 h-6" />,
    color: "from-indigo-500 to-purple-500",
    delay: 0.6
  },
  {
    title: "Quizzes & Games",
    content: "DOC hosts engaging events like Crats Alley, a gaming challenge, and the Braintecture Quiz to stimulate creativity and fun.",
    icon: <Brain className="w-6 h-6" />,
    color: "from-pink-500 to-rose-500",
    delay: 0.7
  },
];

const About = () => {
  const [showSections, setShowSections] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const progressRef = useRef(null);

  // Wait for 6 seconds (or duration of typewriter) then show sections.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSections(true);
    }, 5990);
    return () => clearTimeout(timeout);
  }, []);

  // Advanced GSAP animations
  useLayoutEffect(() => {
    if (!showSections) return;
    
    const ctx = gsap.context(() => {
      // Timeline progress bar animation
      gsap.fromTo(progressRef.current, 
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          }
        }
      );

      // Staggered card animations with advanced effects
      gsap.utils.toArray(".timeline-card").forEach((card, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          }
        });

        // Multi-stage animation
        tl.fromTo(card, 
          {
            opacity: 0,
            y: 100,
            rotateX: -15,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          }
        )
        .fromTo(card.querySelector('.card-content'), 
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          }, "-=0.4"
        )
        .fromTo(card.querySelector('.card-icon'), 
          {
            scale: 0,
            rotation: -180,
          },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: "back.out(2)",
          }, "-=0.6"
        );
      });

      // Floating particles animation
      gsap.utils.toArray(".floating-particle").forEach((particle, i) => {
        gsap.to(particle, {
          y: "random(-50, 50)",
          x: "random(-30, 30)",
          rotation: "random(-180, 180)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });

      // Interactive hover animations
      gsap.utils.toArray(".timeline-card").forEach((card, i) => {
        const hoverTl = gsap.timeline({ paused: true });
        
        hoverTl.to(card, {
          scale: 1.05,
          rotateY: 5,
          z: 50,
          duration: 0.3,
          ease: "power2.out",
        })
        .to(card.querySelector('.glow-effect'), {
          opacity: 1,
          scale: 1.1,
          duration: 0.3,
        }, 0)
        .to(card.querySelector('.card-bg'), {
          scale: 1.02,
          duration: 0.3,
        }, 0);

        card.addEventListener('mouseenter', () => {
          hoverTl.play();
          setActiveCard(i);
        });
        
        card.addEventListener('mouseleave', () => {
          hoverTl.reverse();
          setActiveCard(null);
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [showSections]);

  return (
    <div className="relative w-full min-h-screen bg-black text-white">
      {/* Hero Section with Background Image */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Image */}
        <motion.img
          src="https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/vmxayfadskjnwv6us37w"
          alt="Design O Crats Architecture"
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={{ scale: 1.25 }}
          animate={{ scale: 1 }}
          transition={{ duration: 5 }}
        />
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6 md:px-20 h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-4xl md:text-7xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
                About
              </span>{" "}
              Us
            </h1>
            <p className="md:text-xl text-gray-300 max-w-2xl mx-auto">
              Crafting innovative architectural solutions since 2020
            </p>
          </motion.div>

          <div className="mt-8">
            <p className="md:text-xl text-gray-300 max-w-2xl mx-auto">
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
        </div>
      </div>

      {/* Modern Timeline Section */}
      <div className="relative w-full min-h-screen bg-black overflow-hidden">
        {/* Advanced Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated gradient orbs */}
          <div className="absolute -inset-[10px] opacity-40">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-3xl animate-pulse" />
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/15 blur-3xl animate-pulse delay-1000" />
            <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl animate-pulse delay-2000" />
          </div>
          
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="floating-particle absolute w-2 h-2 bg-gradient-to-r from-orange-500/30 to-purple-500/30 rounded-full blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
        </div>

        {/* Timeline Content */}
        {showSections && (
          <div className="relative z-10 py-20" ref={timelineRef}>
            {/* Enhanced Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-center mb-20 px-6"
            >
              <div className="relative inline-block">
                <h2 className="text-3xl md:text-7xl font-bold text-white mb-6 relative z-10">
                  What We{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 animate-pulse">
                    Offer
                  </span>
                </h2>
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-2xl rounded-full opacity-50"></div>
              </div>
              <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Discover our comprehensive range of programs and activities designed to shape the future of architecture
              </p>
            </motion.div>

            {/* Modern Timeline Container */}
            <div ref={containerRef} className="relative max-w-7xl mx-auto px-6">
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent hidden lg:block">
                <div 
                  ref={progressRef}
                  className="w-full bg-gradient-to-b from-orange-500 to-purple-500 origin-top"
                  style={{ transformOrigin: 'top' }}
                ></div>
              </div>

              {/* Timeline Cards */}
              <div className="space-y-16 lg:space-y-24">
                {sections.map((section, i) => (
                  <div
                    key={i}
                    className={`timeline-card relative ${
                      i % 2 === 0 ? 'lg:pr-1/2 lg:text-right' : 'lg:pl-1/2 lg:ml-auto'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full border-4 border-black z-20 hidden lg:block">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full animate-ping opacity-75"></div>
                    </div>

                    {/* Card Container */}
                    <div className={`relative group ${i % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12'}`}>
                      {/* Connection Line */}
                      <div className={`absolute top-8 w-8 h-0.5 bg-gradient-to-r from-orange-500 to-purple-500 hidden lg:block ${
                        i % 2 === 0 ? 'right-0' : 'left-0'
                      }`}></div>

                      {/* Main Card */}
                      <div className="relative p-8 lg:p-10 rounded-3xl border border-white/20 backdrop-blur-xl bg-white/5 overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20">
                        {/* Background Effects */}
                        <div className="card-bg absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
                        <div className="glow-effect absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-pink-500/20 blur-2xl rounded-3xl opacity-0 transition-all duration-500"></div>

                        {/* Content */}
                        <div className="card-content relative z-10">
                          {/* Header */}
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`card-icon p-3 rounded-2xl bg-gradient-to-r ${section.color} text-white shadow-lg`}>
                              {section.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg lg:text-3xl font-bold text-white mb-2 tracking-wide">
                                {section.title}
                              </h3>
                              <div className={`w-16 h-1 bg-gradient-to-r ${section.color} rounded-full`}></div>
                            </div>
                            <ChevronRight className={`w-6 h-6 text-gray-400 transition-all duration-300 ${
                              activeCard === i ? 'rotate-90 text-purple-500' : ''
                            }`} />
                          </div>

                          {/* Description */}
                          <p className="text-gray-300 text-base md:text-xl leading-relaxed mb-6">
                            {section.content}
                          </p>

                          {/* Interactive Elements */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Play className="w-4 h-4" />
                              <span>Learn More</span>
                            </div>
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${section.color} opacity-20 flex items-center justify-center`}>
                              <div className="w-6 h-6 rounded-full bg-white/30"></div>
                            </div>
                          </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-purple-500/10 rounded-full blur-xl"></div>
                        <div className="absolute bottom-4 left-4 w-20 h-20 bg-gradient-to-tl from-purple-500/10 to-pink-500/10 rounded-full blur-lg"></div>
                        
                        {/* Animated border */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Decoration */}
              <div className="mt-32 text-center">
                <div className="inline-flex items-center gap-4 p-6 rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 backdrop-blur-lg border border-white/10">
                  <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-300 font-medium">Journey Continues...</span>
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse delay-500"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;