import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { Instagram, Linkedin, ChevronDown, Building2, Users, HelpCircle, Sparkles, Target, Plus, Minus, ArrowRight, Play, Award, Calendar, Eye } from 'lucide-react';
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

interface Achievement {
  number: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      question: "What is DesignOCrats?",
      answer: "DesignOCrats (DoC) is the premier architectural club of NIT Hamirpur, dedicated to fostering creativity and innovation in architectural design among students.",
      isOpen: false
    },
    {
      question: "How can I join DesignOCrats?",
      answer: "Students can join DoC through our annual recruitment process. Keep an eye on our announcements for upcoming recruitment dates and application procedures.",
      isOpen: false
    },
    {
      question: "What activities does DoC organize?",
      answer: "We organize workshops, design competitions, seminars, guest lectures, and architectural visits to enhance learning and provide practical exposure to the field.",
      isOpen: false
    },
    {
      question: "Do you offer mentorship programs?",
      answer: "Yes, we have senior-junior mentorship programs where experienced members guide newcomers in their architectural journey and career development.",
      isOpen: false
    }
  ]);

  const toggleFAQ = (index: number) => {
    setFaqs(faqs.map((faq, i) => ({
      ...faq,
      isOpen: i === index ? !faq.isOpen : false
    })));
  };

  const achievements: Achievement[] = [
    { 
      number: "50+", 
      label: "Projects Completed", 
      icon: <Building2 className="w-8 h-8" />,
      description: "Innovative architectural projects"
    },
    { 
      number: "100+", 
      label: "Active Members", 
      icon: <Users className="w-8 h-8" />,
      description: "Passionate design enthusiasts"
    },
    { 
      number: "20+", 
      label: "Awards Won", 
      icon: <Award className="w-8 h-8" />,
      description: "Recognition for excellence"
    },
    { 
      number: "5+", 
      label: "Years Experience", 
      icon: <Calendar className="w-8 h-8" />,
      description: "Building architectural futures"
    }
  ];

  const features: Feature[] = [
    {
      title: "Innovative Workshops",
      description: "Hands-on sessions with cutting-edge architectural software and design methodologies.",
      icon: <Sparkles className="w-6 h-6" />,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Expert Mentorship",
      description: "Learn from industry professionals and experienced architects through guest lectures.",
      icon: <Users className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Real Projects",
      description: "Work on actual architectural challenges and build your professional portfolio.",
      icon: <Building2 className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Creative Events",
      description: "Participate in design competitions, exhibitions, and networking events.",
      icon: <Target className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const coordinators = [
    {
      name: "Amritansh Chaubey",
      role: "Club Coordinator",
      image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/nnhivshxxazmmr9olyvn",
      quote: "Leading DoC towards architectural excellence and innovation.",
      social: {
        linkedin: "https://www.linkedin.com/in/amritansh-chaubey-8012552b7/",
        instagram: "https://instagram.com"
      }
    },
    {
      name: "Shimphrui Obedient",
      role: "Club Coordinator",
      image: "/cc2.jpg",
      quote: "Building bridges between creativity and technical expertise.",
      social: {
        linkedin: "https://www.linkedin.com/in/shimphrui-obedient-03b846246/",
        instagram: "https://instagram.com"
      }
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
       if (!logoRef.current || !textRef.current) return;
      const tl = gsap.timeline();
      
      tl.fromTo(logoRef.current, 
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: "back.out(1.7)" }
      )
      .fromTo(textRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
        "-=0.6"
      );

      // Floating animation for logo
      gsap.to(logoRef.current, {
        y: "20px",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Scroll-triggered animations
      gsap.utils.toArray(".animate-on-scroll").forEach((element: any, index) => {
        gsap.fromTo(element,
          { opacity: 0, y: 60, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Staggered card animations
      gsap.utils.toArray(".feature-card").forEach((card: any, index) => {
        gsap.fromTo(card,
          { opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: 15 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-60">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-3xl animate-pulse" />
          <div className="absolute top-1/4 left-1/3 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-500/15 to-cyan-500/15 blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl animate-pulse delay-2000" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 pt-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Enhanced Text Content */}
            <div ref={textRef} className="space-y-8">
              <motion.div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">NIT Hamirpur's Premier Architecture Club</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 animate-pulse">
                    Design
                  </span>{" "}
                  <span className="text-white">O</span>{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
                    Crats
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                  Where <span className="text-orange-500 font-semibold">creativity</span> meets{" "}
                  <span className="text-purple-500 font-semibold">innovation</span> in architectural design
                </p>
              </motion.div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/works"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105"
                >
                  <Eye className="w-5 h-5" />
                  Explore Our Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="mailto:designocrats.nimbus@nith.ac.in"
                  className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-white/20 rounded-full text-white font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                >
                  <Play className="w-5 h-5" />
                  Get in Touch
                </Link>
              </div>

              <div className="flex gap-6">
                <a
                  href="https://www.instagram.com/designocrats/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 border border-white/20 rounded-xl hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300"
                >
                  <Instagram className="w-6 h-6 group-hover:text-orange-500 transition-colors" />
                </a>
                <a
                  href="https://www.linkedin.com/company/design-o-crats-nith/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 border border-white/20 rounded-xl hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
                >
                  <Linkedin className="w-6 h-6 group-hover:text-purple-500 transition-colors" />
                </a>
              </div>
            </div>

            {/* Right Column - Enhanced Logo */}
            <div className="flex justify-center lg:justify-end">
              <motion.div
                ref={logoRef}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-2xl rounded-full opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src="https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/gboyrhzs1ojgyne6vhyd"
                  alt="DesignOCrats Logo"
                  className="relative w-80 h-80 lg:w-96 lg:h-96 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                />
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-col items-center gap-2 text-white/60">
              <span className="text-sm">Scroll to explore</span>
              <ChevronDown className="w-6 h-6" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Achievements Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">Impact</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Numbers that reflect our commitment to architectural excellence and community building
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="animate-on-scroll group text-center p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-500 hover:scale-105"
                whileHover={{ y: -10 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r from-orange-500/20 to-purple-500/20 group-hover:from-orange-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <div className="text-orange-500 group-hover:scale-110 transition-transform">
                    {achievement.icon}
                  </div>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500 mb-2">
                  {achievement.number}
                </h3>
                <p className="text-white font-semibold mb-2">{achievement.label}</p>
                <p className="text-gray-400 text-sm">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">Offer</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive programs designed to shape the future architects of tomorrow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`feature-card group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 overflow-hidden`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className={`absolute top-4 right-4 w-24 h-24 bg-gradient-to-r ${feature.color} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-14 h-14 mb-6 rounded-2xl bg-gradient-to-r ${feature.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-purple-500 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Coordinators Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16 animate-on-scroll">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Users className="text-orange-500 w-8 h-8" />
              <h2 className="text-4xl lg:text-5xl font-bold">
                Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">Leaders</span>
              </h2>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Passionate coordinators driving innovation and excellence in architectural education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {coordinators.map((coordinator, index) => (
              <motion.div
                key={index}
                className="animate-on-scroll group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-500"
                whileHover={{ y: -10 }}
              >
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    <img
                      src={coordinator.image}
                      alt={coordinator.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-orange-500 group-hover:border-purple-500 transition-colors duration-300"
                    />
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-purple-500 transition-all duration-300">
                      {coordinator.name}
                    </h3>
                    <p className="text-orange-500 font-medium">{coordinator.role}</p>
                  </div>
                </div>
                
                <blockquote className="text-gray-300 italic mb-6 group-hover:text-white transition-colors">
                  "{coordinator.quote}"
                </blockquote>
                
                <div className="flex gap-4">
                  <a
                    href={coordinator.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/10 hover:bg-blue-500 transition-colors duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={coordinator.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/10 hover:bg-pink-500 transition-colors duration-300"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16 animate-on-scroll">
            <div className="flex items-center justify-center gap-3 mb-6">
              <HelpCircle className="text-orange-500 w-8 h-8" />
              <h2 className="text-4xl lg:text-5xl font-bold">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">Questions</span>
              </h2>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to know about joining and participating in DesignOCrats
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="animate-on-scroll bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors group"
                >
                  <h3 className="text-lg font-semibold text-white group-hover:text-orange-500 transition-colors">
                    {faq.question}
                  </h3>
                  <div className={`p-2 rounded-lg bg-white/10 transition-all duration-300 ${faq.isOpen ? 'rotate-45 bg-orange-500' : 'group-hover:bg-white/20'}`}>
                    {faq.isOpen ? (
                      <Minus className="w-5 h-5 text-white" />
                    ) : (
                      <Plus className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors" />
                    )}
                  </div>
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
                      <div className="px-8 pb-6">
                        <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 text-center">
          <motion.div className="animate-on-scroll max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold mb-8">
              Ready to Shape the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
                Future?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Join DesignOCrats and be part of a community that's redefining architectural education and innovation at NIT Hamirpur.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="mailto:designocrats.nimbus@nith.ac.in"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/20 rounded-full text-white font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}