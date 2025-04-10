import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { projects } from '../../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WorkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Refs for GSAP animations
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const backButtonRef = useRef(null);
  const titleRef = useRef(null);
  const yearRef = useRef(null);
  const descriptionRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    if (!project) return;

    // Initial animations timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Back button animation
    tl.fromTo(backButtonRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6 }
    );

    // Image animation
    tl.fromTo(imageRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8 },
      "-=0.4"
    );

    // Content animations
    tl.fromTo([titleRef.current, yearRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
      "-=0.4"
    );

    tl.fromTo(descriptionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.2"
    );

    // Sections animations with ScrollTrigger
    sectionsRef.current.forEach((section, index) => {
      gsap.fromTo(section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <button
            onClick={() => navigate('/works')}
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400"
          >
            <ArrowLeft size={20} />
            Back to Works
          </button>
        </div>
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

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 py-32 relative">
        <button
          ref={backButtonRef}
          onClick={() => navigate('/works')}
          className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Works
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          <div ref={imageRef} className="relative aspect-video rounded-xl overflow-hidden bg-white/5">
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                <Loader2 className="w-8 h-8 animate-spin text-white/50" />
              </div>
            )}
            <img
              src={project.gallery?.[currentImageIndex] || project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              onLoad={() => setIsImageLoading(false)}
            />
            {project.gallery && project.gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          <div ref={contentRef} className="space-y-8">
            <div>
              <h1 ref={titleRef} className="text-4xl font-bold mb-2">{project.title}</h1>
              <p ref={yearRef} className="text-orange-500">{project.year}</p>
            </div>

            <div ref={descriptionRef} className="prose prose-invert">
              <p className="text-gray-300 leading-relaxed">
                {project.fullDescription || project.description}
              </p>
            </div>

            {project.challenge && (
              <div ref={el => sectionsRef.current[0] = el}>
                <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                <p className="text-gray-300">{project.challenge}</p>
              </div>
            )}

            {project.solution && (
              <div ref={el => sectionsRef.current[1] = el}>
                <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
                <p className="text-gray-300">{project.solution}</p>
              </div>
            )}

            {project.outcome && (
              <div ref={el => sectionsRef.current[2] = el}>
                <h2 className="text-2xl font-bold mb-4">The Outcome</h2>
                <p className="text-gray-300">{project.outcome}</p>
              </div>
            )}

            {project.technologies && (
              <div ref={el => sectionsRef.current[3] = el}>
                <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}