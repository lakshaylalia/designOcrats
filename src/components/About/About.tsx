import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Building2, Users, Target, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    year: 2020,
    title: "Foundation",
    description: "Started with a vision to revolutionize architectural design",
    icon: Building2,
    color: "from-orange-500 to-red-500"
  },
  {
    year: 2021,
    title: "Team Expansion",
    description: "Grew to a team of passionate architects and designers",
    icon: Users,
    color: "from-blue-500 to-purple-500"
  },
  {
    year: 2022,
    title: "Innovation Hub",
    description: "Launched our state-of-the-art design innovation center",
    icon: Target,
    color: "from-green-500 to-teal-500"
  },
  {
    year: 2023,
    title: "Global Recognition",
    description: "Received multiple international awards for sustainable design",
    icon: Award,
    color: "from-purple-500 to-pink-500"
  }
];

function ParallaxSection({ children, offset = 50 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <motion.div ref={ref} style={{ y, opacity }}>
      {children}
    </motion.div>
  );
}

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "none" : "translateX(-200px)",
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
      }}
    >
      <div className="w-1/2 flex justify-center">
        <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${item.color} p-8 shadow-xl transform hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-full h-full text-white" />
        </div>
      </div>
      <div className="w-1/2 space-y-4">
        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
          {item.year}
        </div>
        <h3 className="text-2xl font-bold">{item.title}</h3>
        <p className="text-gray-400">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 200,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
      });

      gsap.to(".parallax-bg", {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-bg",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-purple-500 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <div className="parallax-bg min-h-screen flex items-center justify-center bg-[url('https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/vmxayfadskjnwv6us37w')] bg-cover bg-fixed relative">
        <div className="absolute inset-0 bg-black/70" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 hero-text"
          >
            <h1 className="text-7xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
                About
              </span>{" "}
              Us
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Crafting innovative architectural solutions since 2020
            </p>
          </motion.div>
        </div>
      </div>

      {/* Vision Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <ParallaxSection>
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-5xl font-bold">Our Vision</h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                At DesignOCrats, we believe in pushing the boundaries of architectural innovation while maintaining 
                a deep respect for sustainable practices and cultural heritage. Our approach combines cutting-edge 
                technology with timeless design principles to create spaces that inspire and endure.
              </p>
            </div>
          </ParallaxSection>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-50" />
        <div className="container mx-auto px-4 relative">
          <h2 className="text-5xl font-bold text-center mb-24">Our Journey</h2>
          <div className="space-y-32">
            {timeline.map((item, index) => (
              <TimelineItem key={item.year} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: "50+", label: "Projects Completed" },
              { number: "100+", label: "Happy Clients" },
              { number: "20+", label: "Awards Won" }
            ].map((stat, index) => (
              <ParallaxSection key={index} offset={100}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 mt-2">{stat.label}</div>
                </motion.div>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}