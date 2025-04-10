//@ts-nocheck
import { useEffect, useRef, useState ,useLayoutEffect } from 'react';
import { Instagram, Linkedin, ChevronDown, Building2, Users, HelpCircle, Sparkles, Target, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface FAQ {
  question: string;
  answer: string;
  isOpen?: boolean;
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const missionTextRef = useRef(null);
  const MissionHeadingref = useRef(null);
  const coordinatorsHeadingRef  = useRef(null);
  const FaqHeadingRef = useRef(null);
  const FaqTextRef = useRef(null);
  const LogoRef = useRef(null);
  const LeftRef = useRef(null);
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      question: "What is DesignOCrats?",
      answer: "DesignOCrats (DoC) is the architectural club of NIT Hamirpur, dedicated to fostering creativity and innovation in architectural design among students.",
      isOpen: false
    },
    {
      question: "How can I join DesignOCrats?",
      answer: "Students can join DoC through our annual recruitment process. Keep an eye on our announcements for upcoming recruitment dates.",
      isOpen: false
    },
    {
      question: "What activities does DoC organize?",
      answer: "We organize workshops, design competitions, seminars, and architectural visits to enhance learning and practical exposure.",
      isOpen: false
    }
  ]);

  const toggleFAQ = (index: number) => {
    setFaqs(faqs.map((faq, i) => ({
      ...faq,
      isOpen: i === index ? !faq.isOpen : false
    })));
  };


  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "100+", label: "Active Members" },
    { number: "20+", label: "Awards Won" },
    { number: "5+", label: "Years Experience" }
  ];

  const coordinators = [
    {
      name: "Amritansh Chaubey",
      role: "Club Coordinator",
      image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/nnhivshxxazmmr9olyvn",
      description: "“I am excited to take on the role of CC of DoC.“",
      social: {
        linkedin: "https://www.linkedin.com/in/amritansh-chaubey-8012552b7/",
        instagram: "https://instagram.com"
      }
    },
    {
      name: "Shimphrui obedient",
      role: "Club Coordinator",
      image: "/cc2.jpg",
      description: "“I am very happy to join as Club Coordinator of DoC.”",
      social: {
        linkedin: "https://www.linkedin.com/in/shimphrui-obedient-03b846246/",
        instagram: "https://instagram.com"
      }
    }
  ];

  const missions = [
    {
      icon: <Sparkles className="text-orange-500" size={32} />,
      title: "Innovation",
      description: "Pushing the boundaries of architectural design through creative thinking and modern approaches."
    },
    {
      icon: <Target className="text-orange-500" size={32} />,
      title: "Excellence",
      description: "Striving for excellence in every project and initiative we undertake."
    }
  ];

    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray(".section-block").forEach((el, i) => {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              Y:100,
              rotateY: 10,
            },
            {
              opacity: 1,
              x: 0,
              y:0,
              rotateY: 0,
              duration: 2,
              ease: "power3.inOut",
                scrollTrigger: {
                trigger: el,
                start: "top 100%", // start animation when the top of the element hits 80% of viewport height
                end:"bottom 100%",
                // markers: true, // uncomment to see visual markers for debugging
                toggleActions: "play none none reverse",
                scrub:true,
            
              },
            }
          );
        });


        gsap.utils.toArray(".mission-cards").forEach((el, i) => {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              y: 100,
              rotateY: 10,
            },
            {
              opacity: 1,
              x: 0,
              y:0,
              rotateY: 0,
              duration: 2,
              ease: "power2.inOut",
                scrollTrigger: {
                trigger: el,
                start: "top 80%", // start animation when the top of the element hits 80% of viewport height
                end:"bottom 70%",
                // markers: true, // uncomment to see visual markers for debugging
                toggleActions: "play none none reverse",
                scrub:true,
            
              },
            }
          );
        });


        gsap.utils.toArray(".coordinators").forEach((el, i) => {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              y:  200,
              rotateY: 10,
            },
            {
              opacity: 1,
              x: 0,
              y:0,
              rotateY: 0,
              duration: 4,
              ease: "power2.inOut",
                scrollTrigger: {
                trigger: el,
                start: "top 90%", // start animation when the top of the element hits 80% of viewport height
                end:"bottom 75%",
                // markers: true, // uncomment to see visual markers for debugging
                toggleActions: "play none none reverse",
                scrub:true,
            
              },
            }
          );
        });
        
        gsap.utils.toArray(".faqs").forEach((el, i) => {
          gsap.fromTo(
            el,
            {
              opacity: 0,
            x: i%2==0?-200: 200,
              rotateY: 10,
            },
            {
              opacity: 1,
              x: 0,
            
              rotateY: 0,
              duration: 4,
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
    }, []);
    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        if (
          !MissionHeadingref.current ||
          !missionTextRef.current ||
          !FaqHeadingRef.current ||
          !coordinatorsHeadingRef.current || !LeftRef.current || !LogoRef
        )
          return;
    
        const commonConfig = {
          opacity: 0,
          x: -200,
          rotateY: 10,
        };
    
        const commonFinal = {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 3,
          ease: "power2.inOut",
          scrollTrigger: {
            start: "top 70%",
            end: "bottom 50%",
            toggleActions: "play none none reverse",
            scrub: true,
            // markers: true,
          },
        };
    
        gsap.fromTo(
          MissionHeadingref.current,
          { ...commonConfig },
          {
            ...commonFinal,
            scrollTrigger: {
              ...commonFinal.scrollTrigger,
              trigger: MissionHeadingref.current,
            },
          }
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: LogoRef.current,
            start: "top 80%", // adjust as needed
          },
        });
    
        // Logo enters from left and rotates
        tl.fromTo(
          LogoRef.current,
          {
            x: -200,
            rotation: -90,
            opacity: 0,
          },
          {
            x: 0,
            rotation: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power1.out",
          }
        );
    
        // LeftRef moves up and fades in concurrently or slightly delayed
        tl.fromTo(
          LeftRef.current,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.6" // starts 0.6s before the previous animation ends
        );
        gsap.fromTo(
          FaqHeadingRef.current,
          { ...commonConfig },
          {
            ...commonFinal,
            scrollTrigger: {
              ...commonFinal.scrollTrigger,
              trigger: FaqHeadingRef.current,
            },
          }
        );
    
        gsap.fromTo(
          coordinatorsHeadingRef.current,
          { ...commonConfig },
          {
            ...commonFinal,
            duration: 2,
            scrollTrigger: {
              ...commonFinal.scrollTrigger,
              trigger: coordinatorsHeadingRef.current,
            },
          }
        );
    
        // Mission text comes from right, so change `x` to 200
        gsap.fromTo(
          missionTextRef.current,
          {
            opacity: 0,
            x: 200,
            rotateY: 10,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 3,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: missionTextRef.current,
              start: "top 70%",
              end: "bottom 50%",
              toggleActions: "play none none reverse",
              scrub: true,
              // markers: true,
            },
          }
        );
        gsap.fromTo(
        FaqTextRef.current,
          {
            opacity: 0,
            x: 200,
            rotateY: 10,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 4,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: FaqTextRef.current,
              start: "top 70%",
              end: "bottom 50%",
              toggleActions: "play none none reverse",
              scrub: true,
              // markers: true,
            },
          }
        );
        
      }, missionTextRef);
      
    
      return () => ctx.revert();
    }, []);
    

  return (
    <motion.div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        {/* Animated background gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -inset-[10px] opacity-50">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-orange-500/30 to-purple-500/30 blur-3xl animate-pulse" />
            <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl animate-pulse delay-1000" />
          </div>
        </div>

        <div className="container mx-auto px-4 pt-32 relative z-10">
          <div className="flex sm:flex-col md:flex-row lg:flex-row  lg:justify-around gap-12 items-center ">
            {/* Left Column - Text Content */}
            <div ref={textRef} className="space-y-8" ref = {LeftRef}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="gsap-fade-in"
              >
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
                    Design
                  </span>{" "}
                  O Crats
                </h1>
                <p className="text-gray-400 text-xl mt-6">
                  Shaping the future of architecture at NIT Hamirpur
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap gap-4 gsap-fade-in"
              >
                <Link
                  to="/works"
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                >
                  Explore Our Work
                </Link>
                <Link to="mailto:designocrats.nimbus@nith.ac.in"
                  className="px-8 py-3 border border-white/20 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Get in Touch
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex gap-4 gsap-fade-in"
              
              >
                <a
                  href="https://www.instagram.com/designocrats/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/company/design-o-crats-nith/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Linkedin size={24} />
                </a>
              </motion.div>
            </div>

            {/* Right Column - Image */}
            <motion.div
              ref={LogoRef}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 0.7 }}
              transition={{ duration: 0.8, ease: "easeIn" }}
              className="relative floating-image"
            >
              <div className="relative group">
                <motion.img
                  initial={{ opacity: 0, scale: 1.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeIn" }}
                  // src="./DOC_color.svg"
                  src="https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/gboyrhzs1ojgyne6vhyd"

                  alt="Architecture"
                   style={{ 
                     filter: `
                     
                       drop-shadow(0 0 4px #EA25BF)
                       drop-shadow(0 0 4px #31D8C4)
                     
                     `,
                   
                     willChange: "transform, filter",}}
                  className=" transition-transform duration-800  hidden md:block hover:scale-150 hover:rotate-180"
                  style={{ willChange: "transform, filter", }} />

              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-24 grid grid-cols-2 section-block lg:grid-cols-4 gap-8 gsap-fade-in"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
              >
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
                  {stat.number}
                </h3>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-32 mission-section"
          >
            <div className="text-center mb-2">
              <h2 ref={MissionHeadingref} className="text-4xl font-bold mb-4">Our Mission</h2>
              <p ref={missionTextRef} className="text-gray-400 max-w-2xl mx-auto">
                Empowering students to explore and excel in architectural design through innovation and collaboration.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mission-cards">
              {missions.map((mission, index) => (
                <motion.div
                  key={index}
                  className="mission-card bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="mb-4 flex items-center gap-4">{mission.icon}
                    <h3 className="text-2xl font-semibold mb-4">{mission.title}</h3>
                  </div>
                  <p className="text-gray-400">{mission.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Coordinators Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-32"
          >
            <div className="flex items-center gap-2 mb-12 justify-center" ref={coordinatorsHeadingRef}>
              <Users className="text-orange-500" size={32} />
              <h2 className="text-3xl font-bold">Our Coordinators</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 coordinators" >
              {coordinators.map((coordinator, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    <img
                      src={coordinator.image}
                      alt={coordinator.name}
                      className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{coordinator.name}</h3>
                      <p className="text-orange-500">{coordinator.role}</p>
                      <p className="text-gray-400 mt-2">{coordinator.description}</p>
                      <div className="flex gap-4 mt-4">
                        <a
                          href={coordinator.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-white transition-colors"
                        >
                          <Linkedin size={20} />
                        </a>
                        <a
                          href={coordinator.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-white transition-colors"
                        >
                          <Instagram size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-32 mb-16"
          >
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4" ref={FaqHeadingRef}>
                <HelpCircle className="text-orange-500" size={32} />
                <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              </div>
              <p className="text-gray-400 max-w-2xl mx-auto" ref={FaqTextRef}>
                Find answers to common questions about DesignOCrats and our activities
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4 ">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden faqs"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-sm font-semibold">{faq.question}</h3>
                    {faq.isOpen ? (
                      <Minus className="text-orange-500 flex-shrink-0" />
                    ) : (
                      <Plus className="text-orange-500 flex-shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {faq.isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-4 text-gray-400">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
