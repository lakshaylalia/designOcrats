import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Image as ImageIcon, Loader2, Search, Filter, Grid3X3, List, Eye, Heart, Share2, Download, X, ChevronLeft, ChevronRight, Calendar, Users, MapPin, Sparkles, Award, Building2, Lightbulb, Palette, Play, Pause, RotateCcw, Maximize, Info, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  id: number;
  src: string;
  event: string;
  description?: string;
  date?: string;
  photographer?: string;
  category?: string;
}

interface EventSection {
  title: string;
  images: GalleryImage[];
  description: string;
  date: string;
  color: string;
  icon: React.ReactNode;
}

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function Lightbox({ images, currentIndex, isOpen, onClose, onNext, onPrev }: LightboxProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoplay && images.length > 1) {
      interval = setInterval(() => {
        onNext();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoplay, images.length, onNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !images[currentIndex]) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
        onClick={onClose}
      >
       
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 blur-3xl animate-pulse" />
        </div>


        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setIsAutoplay(!isAutoplay);
              }}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isAutoplay ? <Pause size={20} /> : <Play size={20} />}
            </motion.button>
            
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setShowInfo(!showInfo);
              }}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Info size={20} />
            </motion.button>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                
              }}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Download size={20} />
            </motion.button>
            
            <motion.button
              onClick={onClose}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-red-500 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>
          </div>
        </div>

        
        {images.length > 1 && (
          <>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 z-10"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
            
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 z-10"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </>
        )}

      
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-[90vw] max-h-[80vh] mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-12 h-12 animate-spin text-white/50" />
            </div>
          )}
          
          <img
            src={currentImage.src}
            alt={currentImage.event}
            className={`max-w-full max-h-full object-contain rounded-2xl transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </motion.div>

       
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-6 left-6 right-6 p-6 bg-black/70 backdrop-blur-sm rounded-2xl text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-2">{currentImage.event}</h3>
              {currentImage.description && (
                <p className="text-gray-300 mb-2">{currentImage.description}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Image {currentIndex + 1} of {images.length}</span>
                {currentImage.date && (
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {currentImage.date}
                  </span>
                )}
                {currentImage.photographer && (
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {currentImage.photographer}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto pb-2">
            {images.map((image, index) => (
              <motion.button
                key={image.id}
                onClick={(e) => {
                  e.stopPropagation();
                  
                }}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === currentIndex 
                    ? 'border-orange-500 shadow-lg shadow-orange-500/25' 
                    : 'border-white/20 hover:border-white/40'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={image.src}
                  alt={`${image.event} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function GalleryImage({ image, index, onImageClick }: { 
  image: GalleryImage; 
  index: number; 
  onImageClick: (image: GalleryImage, index: number) => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, Math.random() * 2000 + 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="break-inside-avoid mb-6 group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-500 hover:scale-105 cursor-pointer border border-white/10 hover:border-orange-500/50">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/5 z-10">
            <Loader2 className="w-8 h-8 animate-spin text-white/50" />
          </div>
        )}
        
        <img
          src={image.src}
          alt={`${image.event} - Image ${image.id}`}
          className={`w-full object-cover transition-all duration-700 brightness-95 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-110 group-hover:brightness-110`}
          style={{
            height: `${Math.floor(250 + Math.random() * 200)}px`
          }}
          onClick={() => onImageClick(image, index)}
          loading="lazy"
        />
        
      
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      
          <div className="absolute top-4 right-4 flex gap-2">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                isLiked ? 'bg-red-500 text-white' : 'bg-black/50 text-white hover:bg-red-500'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart size={16} className={isLiked ? 'fill-current' : ''} />
            </motion.button>
            
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                
              }}
              className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 size={16} />
            </motion.button>
          </div>

          {/* Image Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold mb-1">{image.event}</h3>
            {image.description && (
              <p className="text-white/80 text-sm mb-2">{image.description}</p>
            )}
            <div className="flex items-center gap-3 text-xs text-white/60">
              {image.date && (
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {image.date}
                </span>
              )}
              {image.photographer && (
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  {image.photographer}
                </span>
              )}
            </div>
          </div>

     
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              onClick={() => onImageClick(image, index)}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-full font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye size={16} />
              View
            </motion.button>
          </div>
        </div>

        
        <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-tl from-purple-500/20 to-pink-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

function EventGallery({ section, index, onImageClick }: { 
  section: EventSection; 
  index: number;
  onImageClick: (image: GalleryImage, index: number, sectionImages: GalleryImage[]) => void;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (inView && sectionRef.current) {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 80, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: index * 0.2
        }
      );
    }
  }, [inView, index]);

  return (
    <motion.section
      ref={sectionRef}
      className="mb-20"
    >
      
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className={`p-4 rounded-2xl bg-gradient-to-r ${section.color} backdrop-blur-sm border border-white/10`}>
            <div className="text-white">
              {section.icon}
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
          {section.title}
        </h2>
        
        <p className="text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed">
          {section.description}
        </p>
        
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {section.date}
          </span>
          <span className="flex items-center gap-1">
            <ImageIcon size={14} />
            {section.images.length} Photos
          </span>
        </div>
      </div>

     
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 max-w-7xl mx-auto">
        {section.images.map((image, idx) => (
          <GalleryImage 
            key={image.id} 
            image={image} 
            index={idx} 
            onImageClick={(img, imgIndex) => onImageClick(img, imgIndex, section.images)}
          />
        ))}
      </div>
    </motion.section>
  );
}

export default function Gallery() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'masonry' | 'grid'>('masonry');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const galleryData: EventSection[] = [
    {
      title: "Nimbus 2K25",
      description: "Our latest annual technical festival showcasing innovative architectural projects, workshops, and competitions that brought together creative minds from across the region.",
      date: "March 2025",
      color: "from-orange-500/20 to-red-500/20",
      icon: <Sparkles className="w-8 h-8" />,
      images: [
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/kfxnivthvrra1wl7hxv1",
          event: "Nimbus 2K25",
          description: "Workshop session on advanced architectural design",
          date: "March 15, 2025",
          photographer: "DoC Photography Team",
          category: "workshop"
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/ocgxjcxjpogyyid46uz6",
          event: "Nimbus 2K25",
          description: "Design competition presentations",
          date: "March 16, 2025",
          photographer: "DoC Photography Team",
          category: "competition"
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/zbcmjhi7reggpuwhm0ps",
          event: "Nimbus 2K25",
          description: "Exhibition of student projects",
          date: "March 17, 2025",
          photographer: "DoC Photography Team",
          category: "exhibition"
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/reo4pxgf8pzha1twduod",
          event: "Nimbus 2K25",
          description: "Networking session with industry professionals",
          date: "March 18, 2025",
          photographer: "DoC Photography Team",
          category: "networking"
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/l9freir0lb99qpw03mi0",
          event: "Nimbus 2K25",
          description: "Guest lecture by renowned architect",
          date: "March 19, 2025",
          photographer: "DoC Photography Team",
          category: "lecture"
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/ppdnswjhvgne2miggrsf",
          event: "Nimbus 2K25",
          description: "Team collaboration during workshop",
          date: "March 20, 2025",
          photographer: "DoC Photography Team",
          category: "workshop"
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/depfjj8d4mnjssbf3mff",
          event: "Nimbus 2K25",
          description: "Award ceremony for winners",
          date: "March 21, 2025",
          photographer: "DoC Photography Team",
          category: "ceremony"
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/t4m4zaxbei1cl2m05sxq",
          event: "Nimbus 2K25",
          description: "Interactive design session",
          date: "March 22, 2025",
          photographer: "DoC Photography Team",
          category: "workshop"
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/mxanz551zdks9bb4axlz",
          event: "Nimbus 2K25",
          description: "Student presentations and feedback",
          date: "March 23, 2025",
          photographer: "DoC Photography Team",
          category: "presentation"
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/cu7osvvjej3gm9fakaxq",
          event: "Nimbus 2K25",
          description: "Closing ceremony highlights",
          date: "March 24, 2025",
          photographer: "DoC Photography Team",
          category: "ceremony"
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/dcdjiuvoxxveku46mpjg",
          event: "Nimbus 2K25",
          description: "Behind the scenes preparation",
          date: "March 25, 2025",
          photographer: "DoC Photography Team",
          category: "behind-scenes"
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/wzrx6oafc2fshjt5ozwd",
          event: "Nimbus 2K25",
          description: "Technical demonstration session",
          date: "March 26, 2025",
          photographer: "DoC Photography Team",
          category: "demonstration"
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/yfuio6dprl2txt0caha9",
          event: "Nimbus 2K25",
          description: "Group photo of participants",
          date: "March 27, 2025",
          photographer: "DoC Photography Team",
          category: "group"
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/go8ulnwczigvzv8f9dji",
          event: "Nimbus 2K25",
          description: "Innovation showcase display",
          date: "March 28, 2025",
          photographer: "DoC Photography Team",
          category: "showcase"
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/wnzg5t1zbqs2uoqdrvs4",
          event: "Nimbus 2K25",
          description: "Final project presentations",
          date: "March 29, 2025",
          photographer: "DoC Photography Team",
          category: "presentation"
        },
      ]
    },
    {
      title: "NIMBUS 2K24",
      description: "Previous year's successful technical festival featuring groundbreaking architectural innovations, expert lectures, and collaborative learning experiences.",
      date: "March 2024",
      color: "from-blue-500/20 to-cyan-500/20",
      icon: <Award className="w-8 h-8" />,
      images: [
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/foixdab8kvamc64mwh3z",
          event: "Nimbus 2K24",
          description: "Opening ceremony keynote",
          date: "March 10, 2024",
          photographer: "DoC Photography Team",
          category: "ceremony"
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/wf99ub8ja19snz5ulx10",
          event: "Nimbus 2K24",
          description: "Architectural model exhibition",
          date: "March 11, 2024",
          photographer: "DoC Photography Team",
          category: "exhibition"
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/tzd3mkdw3oykb3afdx1b",
          event: "Nimbus 2K24",
          description: "Design thinking workshop",
          date: "March 12, 2024",
          photographer: "DoC Photography Team",
          category: "workshop"
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/gwf7kmky4ushycltr2yw",
          event: "Nimbus 2K24",
          description: "Student project showcase",
          date: "March 13, 2024",
          photographer: "DoC Photography Team",
          category: "showcase"
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/d1ghpdwfl76xobww0jem",
          event: "Nimbus 2K24",
          description: "Panel discussion with experts",
          date: "March 14, 2024",
          photographer: "DoC Photography Team",
          category: "discussion"
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/fr6vficbp3xusle3oqgq",
          event: "Nimbus 2K24",
          description: "Collaborative design session",
          date: "March 15, 2024",
          photographer: "DoC Photography Team",
          category: "collaboration"
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/lfolaokrf4fsb5b4lrkp",
          event: "Nimbus 2K24",
          description: "Technology integration demo",
          date: "March 16, 2024",
          photographer: "DoC Photography Team",
          category: "technology"
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/o3jfhvr9150mns2ozx9s",
          event: "Nimbus 2K24",
          description: "Award presentation ceremony",
          date: "March 17, 2024",
          photographer: "DoC Photography Team",
          category: "awards"
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/lfwy1cxzbaztinfzkzfg",
          event: "Nimbus 2K24",
          description: "Networking dinner event",
          date: "March 18, 2024",
          photographer: "DoC Photography Team",
          category: "networking"
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/azcknukf19i6taxninki",
          event: "Nimbus 2K24",
          description: "Interactive design challenge",
          date: "March 19, 2024",
          photographer: "DoC Photography Team",
          category: "challenge"
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/xrkhakavmehoghm3oz5o",
          event: "Nimbus 2K24",
          description: "Sustainable architecture focus",
          date: "March 20, 2024",
          photographer: "DoC Photography Team",
          category: "sustainability"
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/odwoj6xqzvfsrjjqrhmh",
          event: "Nimbus 2K24",
          description: "Cultural program highlights",
          date: "March 21, 2024",
          photographer: "DoC Photography Team",
          category: "cultural"
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/x0wgwimloncack0drxs0",
          event: "Nimbus 2K24",
          description: "Final day celebrations",
          date: "March 22, 2024",
          photographer: "DoC Photography Team",
          category: "celebration"
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/cudurfikbih5ozrnnytc",
          event: "Nimbus 2K24",
          description: "Team building activities",
          date: "March 23, 2024",
          photographer: "DoC Photography Team",
          category: "team-building"
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/b4dapkbkylfkb4btfrsv",
          event: "Nimbus 2K24",
          description: "Innovation lab sessions",
          date: "March 24, 2024",
          photographer: "DoC Photography Team",
          category: "innovation"
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/ygi2ocizc8a40nvdogli",
          event: "Nimbus 2K24",
          description: "Mentorship program launch",
          date: "March 25, 2024",
          photographer: "DoC Photography Team",
          category: "mentorship"
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/fa2i7q5xa7bz7uswctds",
          event: "Nimbus 2K24",
          description: "Digital architecture workshop",
          date: "March 26, 2024",
          photographer: "DoC Photography Team",
          category: "digital"
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/whlo6kzl4citr8nqq4sd",
          event: "Nimbus 2K24",
          description: "Community outreach program",
          date: "March 27, 2024",
          photographer: "DoC Photography Team",
          category: "community"
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/njtenrfjjpqg8s28ahrx",
          event: "Nimbus 2K24",
          description: "Closing ceremony memories",
          date: "March 28, 2024",
          photographer: "DoC Photography Team",
          category: "memories"
        },
      ]
    },
    {
      title: "Guest Lectures & Expert Sessions",
      description: "Inspiring sessions with renowned architects and industry experts sharing their knowledge, experiences, and insights into the future of architecture.",
      date: "Throughout 2024-2025",
      color: "from-purple-500/20 to-pink-500/20",
      icon: <Users className="w-8 h-8" />,
      images: [
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/rgapicqyggdrqfb3seuy",
          event: "Guest Lectures 2K25",
          description: "Keynote on sustainable architecture",
          date: "January 15, 2025",
          photographer: "DoC Photography Team",
          category: "keynote"
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/GuestLectures2K25/dnpcqoqcklnuurbpyisl",
          event: "Guest Lectures 2K25",
          description: "Interactive Q&A session",
          date: "January 16, 2025",
          photographer: "DoC Photography Team",
          category: "interaction"
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/ohhpxwohwzrpljuededo",
          event: "Guest Lectures 2K25",
          description: "Expert panel discussion",
          date: "January 17, 2025",
          photographer: "DoC Photography Team",
          category: "panel"
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/mbjmmhi3qwxlqxxiuxec",
          event: "Guest Lectures 2K25",
          description: "Student engagement session",
          date: "January 18, 2025",
          photographer: "DoC Photography Team",
          category: "engagement"
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/cecdma7wlbzetdm4gxig",
          event: "Guest Lectures 2K25",
          description: "Technology in architecture talk",
          date: "January 19, 2025",
          photographer: "DoC Photography Team",
          category: "technology"
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/GuestLectures2K25/sembbpdsh2cugawxicmn",
          event: "Guest Lectures 2K25",
          description: "Design philosophy discussion",
          date: "January 20, 2025",
          photographer: "DoC Photography Team",
          category: "philosophy"
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/GuestLectures2K25/airrp0kbcm2jkuvwlzvl",
          event: "Guest Lectures 2K25",
          description: "Career guidance session",
          date: "January 21, 2025",
          photographer: "DoC Photography Team",
          category: "career"
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/xqbmhgak6flcpwffic13",
          event: "Guest Lectures 2K25",
          description: "Industry trends presentation",
          date: "January 22, 2025",
          photographer: "DoC Photography Team",
          category: "trends"
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/mbjmmhi3qwxlqxxiuxec",
          event: "Guest Lectures 2K25",
          description: "Networking with professionals",
          date: "January 23, 2025",
          photographer: "DoC Photography Team",
          category: "networking"
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/GuestLectures2K25/gmmizx3jiibqeyx4lvsa",
          event: "Guest Lectures 2K25",
          description: "Innovation showcase",
          date: "January 24, 2025",
          photographer: "DoC Photography Team",
          category: "innovation"
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/cecdma7wlbzetdm4gxig",
          event: "Guest Lectures 2K25",
          description: "Closing remarks and feedback",
          date: "January 25, 2025",
          photographer: "DoC Photography Team",
          category: "closing"
        },
      ]
    },
  ];

  const categories = [
    { id: 'all', label: 'All Photos', icon: <ImageIcon className="w-4 h-4" />, color: 'from-orange-500 to-red-500' },
    { id: 'workshop', label: 'Workshops', icon: <Palette className="w-4 h-4" />, color: 'from-blue-500 to-cyan-500' },
    { id: 'lecture', label: 'Lectures', icon: <Users className="w-4 h-4" />, color: 'from-purple-500 to-pink-500' },
    { id: 'competition', label: 'Competitions', icon: <Award className="w-4 h-4" />, color: 'from-green-500 to-emerald-500' },
    { id: 'exhibition', label: 'Exhibitions', icon: <Eye className="w-4 h-4" />, color: 'from-yellow-500 to-orange-500' }
  ];

  const filteredData = galleryData.map(section => ({
    ...section,
    images: section.images.filter(image => {
      const matchesSearch = searchTerm === '' || 
        image.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.category?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = activeFilter === 'all' || image.category === activeFilter;
      
      return matchesSearch && matchesFilter;
    })
  })).filter(section => section.images.length > 0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(headerRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

     
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

  const handleImageClick = (image: GalleryImage, index: number, sectionImages: GalleryImage[]) => {
    setLightboxImages(sectionImages);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleLightboxNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length);
  };

  const handleLightboxPrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  };

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
      
        <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
              <ImageIcon className="text-orange-500 w-8 h-8" />
            </div>
          </div>
          
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6">
            Our Gallery
          </h1>
          
          <p ref={descriptionRef} className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Explore our visual journey through workshops, competitions, exhibitions, and memorable moments 
            that showcase the creative spirit of DesignOCrats.
          </p>
        </div>

     
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all duration-300"
              />
            </div>

           
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeFilter === category.id
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

            <div className="flex items-center gap-2 p-1 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'masonry'
                    ? 'bg-gradient-to-r from-orange-500 to-purple-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-orange-500 to-purple-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-8">
          <p className="text-gray-400 text-center">
            Showing <span className="text-orange-500 font-semibold">
              {filteredData.reduce((acc, section) => acc + section.images.length, 0)}
            </span> photos
            {searchTerm && (
              <span> matching "<span className="text-white font-medium">{searchTerm}</span>"</span>
            )}
          </p>
        </div>

      
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full"
            />
          </div>
        ) : filteredData.length > 0 ? (
          <div className="space-y-20">
            {filteredData.map((section, index) => (
              <EventGallery 
                key={section.title} 
                section={section} 
                index={index} 
                onImageClick={handleImageClick}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-r from-orange-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
              <Search className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No photos found</h3>
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

        {/* Bottom Decoration */}
        <div className="mt-32 text-center">
          <div className="inline-flex items-center gap-4 p-6 rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 backdrop-blur-lg border border-white/10">
            <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300 font-medium">Capturing Architectural Moments</span>
            <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={handleLightboxNext}
        onPrev={handleLightboxPrev}
      />
    </motion.div>
  );
}