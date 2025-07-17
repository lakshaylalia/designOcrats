import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Star, 
  ArrowRight, 
  Play, 
  Pause,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Sparkles,
  Award,
  Building2,
  Lightbulb,
  Palette,
  Eye,
  Heart,
  Share2,
  Download,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  longDescription: string;
  image: string;
  gallery?: string[];
  category: 'workshop' | 'lecture' | 'competition' | 'exhibition' | 'networking';
  status: 'upcoming' | 'ongoing' | 'completed';
  attendees: number;
  rating?: number;
  highlights: string[];
  organizer: string;
  tags: string[];
}

const events: Event[] = [
  {
    id: 'practical-aspects-architecture',
    title: 'Practical Aspects of Architecture in India',
    date: 'March 15, 2024',
    time: '2:00 PM - 4:00 PM',
    location: 'Architecture Auditorium, NIT Hamirpur',
    description: 'Expert lecture on real-world architectural practices and challenges in the Indian context.',
    longDescription: 'Join us for an insightful session exploring the practical challenges and opportunities in Indian architecture. Our expert speaker will discuss sustainable practices, local materials, climate considerations, and regulatory frameworks that shape architectural practice in India.',
    image: 'https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/rgapicqyggdrqfb3seuy',
    gallery: [
      'https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/rgapicqyggdrqfb3seuy',
      'https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/GuestLectures2K25/dnpcqoqcklnuurbpyisl',
      'https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/ohhpxwohwzrpljuededo'
    ],
    category: 'lecture',
    status: 'completed',
    attendees: 150,
    rating: 4.8,
    highlights: [
      'Sustainable Architecture Practices',
      'Local Material Usage',
      'Climate-Responsive Design',
      'Regulatory Compliance'
    ],
    organizer: 'DesignOCrats',
    tags: ['Architecture', 'Sustainability', 'India', 'Practice']
  },
  {
    id: 'autocad-workshop-2024',
    title: 'Advanced AutoCAD Workshop',
    date: 'April 20, 2024',
    time: '10:00 AM - 5:00 PM',
    location: 'Computer Lab, Architecture Department',
    description: 'Comprehensive hands-on workshop covering advanced AutoCAD techniques for architectural drafting.',
    longDescription: 'Master the art of architectural drafting with our intensive AutoCAD workshop. Learn advanced techniques, 3D modeling, rendering, and professional drawing standards used in the industry.',
    image: 'https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/kfxnivthvrra1wl7hxv1',
    category: 'workshop',
    status: 'upcoming',
    attendees: 80,
    highlights: [
      '3D Modeling Techniques',
      'Professional Drawing Standards',
      'Rendering and Visualization',
      'Industry Best Practices'
    ],
    organizer: 'DesignOCrats',
    tags: ['AutoCAD', 'Workshop', 'Technical', 'Software']
  },
  {
    id: 'design-competition-2024',
    title: 'Sustainable Housing Design Competition',
    date: 'May 10, 2024',
    time: '9:00 AM - 6:00 PM',
    location: 'Main Auditorium, NIT Hamirpur',
    description: 'Annual design competition focusing on innovative sustainable housing solutions.',
    longDescription: 'Showcase your creativity and technical skills in our flagship design competition. Participants will design sustainable housing solutions addressing contemporary challenges like climate change, urbanization, and resource scarcity.',
    image: 'https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/ocgxjcxjpogyyid46uz6',
    category: 'competition',
    status: 'upcoming',
    attendees: 200,
    highlights: [
      'Cash Prizes Worth ₹50,000',
      'Industry Expert Judges',
      'Portfolio Building Opportunity',
      'Networking with Professionals'
    ],
    organizer: 'DesignOCrats',
    tags: ['Competition', 'Sustainable', 'Housing', 'Innovation']
  },
  {
    id: 'architectural-photography',
    title: 'Architectural Photography Exhibition',
    date: 'June 5, 2024',
    time: '11:00 AM - 7:00 PM',
    location: 'Gallery Space, Student Activity Center',
    description: 'Curated exhibition showcasing the best architectural photography by students and professionals.',
    longDescription: 'Experience architecture through the lens of talented photographers. This exhibition features stunning architectural photography that captures the essence, beauty, and complexity of built environments.',
    image: 'https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/zbcmjhi7reggpuwhm0ps',
    category: 'exhibition',
    status: 'upcoming',
    attendees: 300,
    highlights: [
      'Professional Photography Display',
      'Student Work Showcase',
      'Interactive Installations',
      'Photography Workshops'
    ],
    organizer: 'DesignOCrats',
    tags: ['Photography', 'Exhibition', 'Visual', 'Art']
  }
];

const categories = [
  { id: 'all', label: 'All Events', icon: <Calendar className="w-4 h-4" />, color: 'from-orange-500 to-red-500' },
  { id: 'workshop', label: 'Workshops', icon: <Palette className="w-4 h-4" />, color: 'from-blue-500 to-cyan-500' },
  { id: 'lecture', label: 'Lectures', icon: <Users className="w-4 h-4" />, color: 'from-purple-500 to-pink-500' },
  { id: 'competition', label: 'Competitions', icon: <Award className="w-4 h-4" />, color: 'from-green-500 to-emerald-500' },
  { id: 'exhibition', label: 'Exhibitions', icon: <Eye className="w-4 h-4" />, color: 'from-yellow-500 to-orange-500' }
];

function EventCard({ event, index }: { event: Event; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || 'from-gray-500 to-gray-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500';
      case 'ongoing': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:bg-white/10 hover:border-orange-500/50 transition-all duration-500 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={event.gallery?.[currentImageIndex] || event.image}
          alt={event.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovered ? 'scale-110 brightness-110' : 'scale-100'
          }`}
        />
        
        {/* Image Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Gallery Navigation */}
          {event.gallery && event.gallery.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImageIndex(prev => prev === 0 ? event.gallery!.length - 1 : prev - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentImageIndex(prev => prev === event.gallery!.length - 1 ? 0 : prev + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                isLiked ? 'bg-red-500 text-white' : 'bg-black/50 text-white hover:bg-red-500'
              }`}
            >
              <Heart size={16} className={isLiked ? 'fill-current' : ''} />
            </button>
            <button className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300">
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(event.status)}`}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getCategoryColor(event.category)}`}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-purple-500 transition-all duration-300 mb-2">
              {event.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-orange-500" />
                {event.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-purple-500" />
                {event.time}
              </div>
            </div>
          </div>
          {event.rating && (
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{event.rating}</span>
            </div>
          )}
        </div>

        {/* Location and Attendees */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-blue-500" />
            {event.location}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-green-500" />
            {event.attendees} attendees
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4 group-hover:text-white transition-colors">
          {event.description}
        </p>

        {/* Highlights */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" />
            Highlights
          </h4>
          <div className="flex flex-wrap gap-2">
            {event.highlights.slice(0, 3).map((highlight, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80 group-hover:bg-orange-500/20 group-hover:text-orange-300 transition-all duration-300"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-xs text-purple-300 border border-purple-500/30"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <motion.button
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Eye className="w-4 h-4" />
          {event.status === 'upcoming' ? 'Register Now' : 'View Details'}
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tl from-purple-500/10 to-pink-500/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export default function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState(events);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  // Filter events
  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (activeCategory !== 'all') {
      filtered = filtered.filter(event => event.category === activeCategory);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, activeCategory]);

  // Advanced GSAP animations
  useLayoutEffect(() => {
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
            delay: 0.5 + i * 0.03,
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
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="min-h-screen bg-black text-white pt-32 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-3xl animate-pulse" />
          <div className="absolute top-1/4 left-1/3 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-500/15 to-cyan-500/15 blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl animate-pulse delay-2000" />
        </div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
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

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Enhanced Header */}
        <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
              <Calendar className="text-orange-500 w-8 h-8" />
            </div>
          </div>
          
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6">
            Our Events
          </h1>
          
          <p ref={descriptionRef} className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Discover our exciting lineup of workshops, lectures, competitions, and exhibitions 
            designed to inspire and educate the next generation of architects.
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
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all duration-300"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.icon}
                  {category.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="max-w-6xl mx-auto mb-8">
          <p className="text-gray-400 text-center">
            Showing <span className="text-orange-500 font-semibold">{filteredEvents.length}</span> of{' '}
            <span className="text-purple-500 font-semibold">{events.length}</span> events
            {searchTerm && (
              <span> matching "<span className="text-white font-medium">{searchTerm}</span>"</span>
            )}
          </p>
        </div>

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto">
          {filteredEvents.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${searchTerm}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
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
              <h3 className="text-2xl font-bold text-white mb-4">No events found</h3>
              <p className="text-gray-400 mb-8">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
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
            <span className="text-gray-300 font-medium">Building Knowledge Through Events</span>
            <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}