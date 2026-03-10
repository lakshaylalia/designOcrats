import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  Calendar,
  Award,
  Target,
  Lightbulb,
  Eye,
  Share2,
  Download,
  Heart,
  Bookmark,
  Play,
  Pause,
  RotateCcw,
  Maximize,
  Info,
  Palette,
  Users,
  Building2,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { projects } from '../../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

interface ProjectSection {
  title: string;
  content: string;
  icon: React.ReactNode;
  color: string;
}

export default function WorkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);
  
  // State management
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [showImageInfo, setShowImageInfo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Refs for animations
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-play functionality
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isAutoplay && project?.gallery && project.gallery.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === project.gallery!.length - 1 ? 0 : prev + 1
        );
        setIsImageLoading(true);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoplay, project?.gallery]);

  // Advanced GSAP animations
  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      // Hero section entrance
      const heroTl = gsap.timeline();
      
      heroTl.fromTo(backButtonRef.current,
        { opacity: 0, x: -50, rotateY: -90 },
        { opacity: 1, x: 0, rotateY: 0, duration: 0.8, ease: "back.out(1.7)" }
      );

      // Image container with 3D effect
      heroTl.fromTo(imageRef.current,
        { opacity: 0, scale: 0.8, rotateX: -20, z: -100 },
        { opacity: 1, scale: 1, rotateX: 0, z: 0, duration: 1.2, ease: "power3.out" },
        "-=0.4"
      );

      // Title with character animation
      if (titleRef.current) {
        const text = titleRef.current.textContent || '';
        titleRef.current.innerHTML = '';
        text.split('').forEach((char, i) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.opacity = '0';
          span.style.display = 'inline-block';
          span.style.transform = 'translateY(100px) rotateX(-90deg)';
          titleRef.current?.appendChild(span);

          gsap.to(span, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            delay: 0.8 + i * 0.03,
            ease: "back.out(1.7)"
          });
        });
      }

      // Content sections with staggered animations
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          gsap.fromTo(section,
            { 
              opacity: 0, 
              y: 80, 
              rotateX: -15,
              scale: 0.95
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 1,
              delay: index * 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

      // Floating particles animation
      gsap.utils.toArray(".floating-particle").forEach((particle: any, i) => {
        gsap.to(particle, {
          y: "random(-100, 100)",
          x: "random(-50, 50)",
          rotation: "random(-360, 360)",
          duration: "random(4, 8)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-orange-500/20 to-purple-500/20 flex items-center justify-center">
            <Building2 className="w-10 h-10 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Project not found</h1>
          <p className="text-gray-400 mb-8">The project you're looking for doesn't exist or has been moved.</p>
          <button
            onClick={() => navigate('/works')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
          >
            <ArrowLeft size={20} />
            Back to Works
          </button>
        </motion.div>
      </div>
    );
  }

  const nextImage = () => {
    if (project.gallery) {
      setCurrentImageIndex((prev) => 
        prev === project.gallery!.length - 1 ? 0 : prev + 1
      );
      setIsImageLoading(true);
    }
  };

  const prevImage = () => {
    if (project.gallery) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.gallery!.length - 1 : prev - 1
      );
      setIsImageLoading(true);
    }
  };

  const projectSections: ProjectSection[] = [
    {
      title: "The Challenge",
      content: project.challenge || "This project presented unique architectural challenges that required innovative solutions and creative problem-solving approaches.",
      icon: <Target className="w-6 h-6" />,
      color: "from-red-500 to-orange-500"
    },
    {
      title: "Our Solution",
      content: project.solution || "We developed a comprehensive solution that addresses all project requirements while maintaining aesthetic appeal and functional efficiency.",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "The Outcome",
      content: project.outcome || "The project was successfully completed, exceeding expectations and setting new standards in architectural innovation and design excellence.",
      icon: <Award className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <motion.div 
      ref={containerRef} 
      className="min-h-screen bg-black text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] rounded-full bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-3xl animate-pulse" />
          <div className="absolute top-1/4 left-1/3 w-[900px] h-[900px] rounded-full bg-gradient-to-r from-blue-500/15 to-cyan-500/15 blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl animate-pulse delay-2000" />
        </div>
        
        {/* Floating Particles */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute w-2 h-2 bg-gradient-to-r from-orange-500/40 to-purple-500/40 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-12">
          <motion.button
            ref={backButtonRef}
            onClick={() => navigate('/works')}
            className="group inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white font-medium hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Works
          </motion.button>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                isLiked 
                  ? 'bg-red-500 border-red-500 text-white' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-red-400'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart size={18} className={isLiked ? 'fill-current' : ''} />
            </motion.button>
            
            <motion.button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                isBookmarked 
                  ? 'bg-blue-500 border-blue-500 text-white' 
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-blue-400'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bookmark size={18} className={isBookmarked ? 'fill-current' : ''} />
            </motion.button>
            
            <motion.button
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 size={18} />
            </motion.button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Enhanced Image Gallery */}
          <div ref={imageRef} className="space-y-6">
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 group">
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/5 z-10">
                  <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
                </div>
              )}
              
              <motion.img
                src={project.gallery?.[currentImageIndex] || project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-700"
                onLoad={() => setIsImageLoading(false)}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              />
              
              {/* Image Overlay Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Navigation Controls */}
                {project.gallery && project.gallery.length > 1 && (
                  <>
                    <motion.button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300"
                      whileHover={{ scale: 1.1, x: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft size={24} />
                    </motion.button>
                    
                    <motion.button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300"
                      whileHover={{ scale: 1.1, x: 2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight size={24} />
                    </motion.button>
                  </>
                )}
                
                {/* Top Controls */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => setIsAutoplay(!isAutoplay)}
                      className="p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      {isAutoplay ? <Pause size={16} /> : <Play size={16} />}
                    </motion.button>
                    
                    <motion.button
                      onClick={() => setShowImageInfo(!showImageInfo)}
                      className="p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Info size={16} />
                    </motion.button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <motion.button
                      className="p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Download size={16} />
                    </motion.button>
                    
                    <motion.button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Maximize size={16} />
                    </motion.button>
                  </div>
                </div>
                
                {/* Bottom Info */}
                <AnimatePresence>
                  {showImageInfo && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute bottom-4 left-4 right-4 p-4 bg-black/70 backdrop-blur-sm rounded-xl"
                    >
                      <p className="text-white text-sm">
                        Image {currentImageIndex + 1} of {project.gallery?.length || 1}
                      </p>
                      <p className="text-gray-300 text-xs mt-1">{project.title}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            {project.gallery && project.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {project.gallery.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setIsImageLoading(true);
                    }}
                    className={`flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'border-orange-500 shadow-lg shadow-orange-500/25' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={image}
                      alt={`${project.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Enhanced Content */}
          <div ref={contentRef} className="space-y-8">
            {/* Project Header */}
            <div className="space-y-6">
              <div>
                <h1 ref={titleRef} className="text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500">
                  {project.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <span className="font-medium">{project.year}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-purple-500" />
                    <span className="font-medium">{project.technologies?.length || 3} Technologies</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Featured Project</span>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-orange-500" />
                  Project Overview
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {project.fullDescription || project.description}
                </p>
              </div>
            </div>

            {/* Technologies */}
            {project.technologies && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-xl text-white font-medium hover:from-orange-500/30 hover:to-purple-500/30 transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {/* Project Sections */}
            <div className="space-y-8">
              {projectSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  ref={el => sectionsRef.current[index] = el}
                  className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-500 overflow-hidden"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className={`absolute top-4 right-4 w-24 h-24 bg-gradient-to-r ${section.color} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-3 rounded-2xl bg-gradient-to-r ${section.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {section.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-purple-500 transition-all duration-300">
                        {section.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed text-lg group-hover:text-white transition-colors duration-300">
                      {section.content}
                    </p>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tl from-purple-500/10 to-pink-500/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              className="p-8 rounded-3xl bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 text-center"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Interested in Similar Projects?</h3>
              <p className="text-gray-300 mb-6">Explore more of our innovative architectural solutions and creative designs.</p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                  onClick={() => navigate('/works')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="w-5 h-5" />
                  View All Projects
                </motion.button>
                
                <motion.button
                  onClick={() => navigate('/about')}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/20 rounded-xl text-white font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Users className="w-5 h-5" />
                  Learn About Us
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="mt-32 text-center">
          <div className="inline-flex items-center gap-4 p-6 rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 backdrop-blur-lg border border-white/10">
            <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300 font-medium">Architectural Excellence in Every Detail</span>
            <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}