import { useState, useEffect, useRef } from 'react';
import { Loader2, Search, Filter, Grid3X3, List, Eye, Calendar, Palette, ArrowRight, Play, Sparkles, Building2, Lightbulb, Award } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { projects } from '../../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

interface FilterOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const filterOptions: FilterOption[] = [
  { id: 'all', label: 'All Projects', icon: <Grid3X3 className="w-4 h-4" />, color: 'from-orange-500 to-red-500' },
  { id: 'sustainable', label: 'Sustainable', icon: <Sparkles className="w-4 h-4" />, color: 'from-green-500 to-emerald-500' },
  { id: 'urban', label: 'Urban Design', icon: <Building2 className="w-4 h-4" />, color: 'from-blue-500 to-cyan-500' },
  { id: 'innovative', label: 'Innovative', icon: <Lightbulb className="w-4 h-4" />, color: 'from-purple-500 to-pink-500' },
  { id: 'award-winning', label: 'Award Winning', icon: <Award className="w-4 h-4" />, color: 'from-yellow-500 to-orange-500' }
];

function ProjectCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 animate-pulse">
      <div className="relative aspect-[4/3] overflow-hidden bg-white/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-white/50" />
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-32 bg-white/10 rounded" />
          <div className="h-4 w-16 bg-white/10 rounded" />
        </div>
        <div className="h-4 w-full bg-white/10 rounded mb-2" />
        <div className="h-4 w-3/4 bg-white/10 rounded" />
      </div>
    </div>
  );
}

function ProjectCard({ project, index, viewMode }: { 
  project: typeof projects[0];
  index: number;
  viewMode: 'grid' | 'list';
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        {
          opacity: 0,
          y: 60,
          rotateX: -15,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [index]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: index * 0.1 }
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-orange-500/50 transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-1/3 aspect-video md:aspect-square overflow-hidden">
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                <Loader2 className="w-8 h-8 animate-spin text-white/50" />
              </div>
            )}
            <img
              src={project.image}
              alt={project.title}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              } ${isHovered ? 'scale-110' : 'scale-100'}`}
              onLoad={() => setIsImageLoaded(true)}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <div className="flex-1 p-6 md:p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-purple-500 transition-all duration-300 mb-2">
                  {project.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {project.year}
                  </div>
                  <div className="flex items-center gap-1">
                    <Palette className="w-4 h-4" />
                    {project.technologies?.length || 3} Tools
                  </div>
                </div>
              </div>
              <motion.button
                onClick={() => navigate(`/works/${project.id}`)}
                className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-purple-500 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-white transition-colors">
              {project.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {project.technologies?.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80 group-hover:bg-orange-500/20 group-hover:text-orange-300 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <button
                onClick={() => navigate(`/works/${project.id}`)}
                className="flex items-center gap-2 text-orange-500 hover:text-orange-400 font-medium transition-colors"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-orange-500/50 transition-all duration-500 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative aspect-[4/3] overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/5">
            <Loader2 className="w-8 h-8 animate-spin text-white/50" />
          </div>
        )}
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-110 brightness-110' : 'scale-100'}`}
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Calendar className="w-4 h-4" />
                {project.year}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Palette className="w-4 h-4" />
                {project.technologies?.length || 3} Tools
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-sm text-gray-300 mb-4 line-clamp-2">{project.description}</p>
            <motion.button
              onClick={() => navigate(`/works/${project.id}`)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-4 h-4" />
              View Project
            </motion.button>
          </div>
        </div>
      </div>

      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-purple-500 transition-all duration-300">
            {project.title}
          </h3>
          <span className="text-orange-500 font-medium">{project.year}</span>
        </div>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies?.slice(0, 2).map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80 group-hover:bg-orange-500/20 group-hover:text-orange-300 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tl from-purple-500/10 to-pink-500/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export default function Works() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
  let filtered = projects;

  if (searchTerm) {
    filtered = filtered.filter(project =>
      (project.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (project.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
  }

  if (activeFilter !== 'all') {
    filtered = filtered.filter(project => {
      const title = project.title?.toLowerCase() || '';
      const outcome = project.outcome?.toLowerCase() || '';

      switch (activeFilter) {
        case 'sustainable':
          return title.includes('green') || 
                 title.includes('sustain') ||
                 title.includes('chaya');
        case 'urban':
          return title.includes('city') || 
                 title.includes('urban');
        case 'innovative':
          return title.includes('sensory') || 
                 title.includes('scintillating');
        case 'award-winning':
          return outcome.includes('award') || 
                 outcome.includes('acclaim');
        default:
          return true;
      }
    });
  }

  setFilteredProjects(filtered);
}, [searchTerm, activeFilter, projects]);


  useEffect(() => {
    // Enhanced header animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(headerRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Title character animation
      if (titleRef.current) {
        const text = titleRef.current.textContent || '';
        titleRef.current.innerHTML = '';
        text.split('').forEach((char, i) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.opacity = '0';
          span.style.display = 'inline-block';
          span.style.transform = 'translateY(50px) rotateX(-90deg)';
          titleRef.current?.appendChild(span);

          gsap.to(span, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            delay: 0.5 + i * 0.02,
            ease: "back.out(1.7)"
          });
        });
      }

      tl.fromTo(descriptionRef.current,
        { opacity: 0, y: 30, rotateX: -15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, delay: 1, ease: "power3.out" }
      );

      tl.fromTo(controlsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-32 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-3xl animate-pulse" />
          <div className="absolute top-1/4 left-1/3 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-500/15 to-cyan-500/15 blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl animate-pulse delay-2000" />
        </div>
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-orange-500/30 to-purple-500/30 rounded-full blur-sm animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Enhanced Header */}
        <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
              <Building2 className="text-orange-500 w-8 h-8" />
            </div>
          </div>
          
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6">
            Our Works
          </h1>
          
          <p ref={descriptionRef} className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Explore our portfolio of innovative architectural designs and creative solutions 
            that push the boundaries of modern architecture and sustainable design.
          </p>
        </div>

        {/* Enhanced Controls */}
        <div ref={controlsRef} className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all duration-300"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => setActiveFilter(option.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeFilter === option.id
                      ? `bg-gradient-to-r ${option.color} text-white shadow-lg`
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {option.icon}
                  {option.label}
                </motion.button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 p-1 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-orange-500 to-purple-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-orange-500 to-purple-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="max-w-6xl mx-auto mb-8">
          <p className="text-gray-400 text-center">
            Showing <span className="text-orange-500 font-semibold">{filteredProjects.length}</span> of{' '}
            <span className="text-purple-500 font-semibold">{projects.length}</span> projects
            {searchTerm && (
              <span> matching "<span className="text-white font-medium">{searchTerm}</span>"</span>
            )}
          </p>
        </div>

        {/* Projects Grid/List */}
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className={viewMode === 'grid' 
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "space-y-8"
            }>
              {Array.from({ length: 6 }).map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${viewMode}-${activeFilter}-${searchTerm}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={viewMode === 'grid' 
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" 
                  : "space-y-8"
                }
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    viewMode={viewMode}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-r from-orange-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
                <Search className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No projects found</h3>
              <p className="text-gray-400 mb-8">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('all');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              >
                <Filter className="w-5 h-5" />
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>

        {/* Bottom Decoration */}
        <div className="mt-32 text-center">
          <div className="inline-flex items-center gap-4 p-6 rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 backdrop-blur-lg border border-white/10">
            <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300 font-medium">Crafting Architectural Excellence</span>
            <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}