import { useState, useEffect, useRef } from 'react';
import {Loader2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { projects } from '../../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ProjectCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 animate-pulse">
      <div className="relative aspect-video overflow-hidden bg-white/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-white/50" />
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="h-6 w-32 bg-white/10 rounded" />
          <div className="h-4 w-16 bg-white/10 rounded" />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { 
  project: typeof projects[0];
  index: number;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
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

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
    >
      <div className="relative aspect-video overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/5">
            <Loader2 className="w-8 h-8 animate-spin text-white/50" />
          </div>
        )}
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-110`}
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`}
        onTouchStart={() =>{setShow(!show)}}>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <p className="text-sm text-gray-300 mt-2">{project.description}</p>
            <button
              onClick={() => navigate(`/works/${project.id}`)}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
            {project.title}
          </h3>
          <span className="text-orange-500">{project.year}</span>
        </div>
      </div>
    </div>
  );
}

export default function Works() {
  const [isLoading, setIsLoading] = useState(true);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Header animation
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }
    );

    // Title animation with split text
    if (titleRef.current) {
      const text = titleRef.current.textContent;
      titleRef.current.innerHTML = '';
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        titleRef.current.appendChild(span);

        gsap.to(span, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.5 + i * 0.05,
          ease: "power3.out"
        });
      });
    }

    // Description fade in
    gsap.fromTo(descriptionRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
        ease: "power3.out"
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 py-16 relative">
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold">
              Our Works
            </h1>
          </div>
          <p ref={descriptionRef} className="text-lg text-gray-400">
            Explore our portfolio of innovative architectural designs and creative solutions 
            that push the boundaries of modern architecture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))
          ) : (
            projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}