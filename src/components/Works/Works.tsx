import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, X, ExternalLink, Loader2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface Project {
  title: string;
  description: string;
  image: string;
  year: string;
  technologies?: string[];
  link?: string;
}

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

function ProjectCard({ project, index, onClick }: { 
  project: Project; 
  index: number;
  onClick: () => void;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <p className="text-sm text-gray-300 mt-2">{project.description}</p>
            <button
              onClick={onClick}
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
    </motion.div>
  );
}

export default function Works() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const projects: Project[] = [
    {
      title: "Modern Architecture",
      description: "A showcase of innovative architectural design solutions that blend form and function seamlessly.",
      image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/ovdjsmsukvjmcouurrhb",
      year: "2023",
      technologies: ["AutoCAD", "Revit", "3ds Max"],
      link: "/works"
    },
    {
      title: "Urban Planning",
      description: "Comprehensive urban development project focusing on sustainable city planning and community spaces.",
      image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/qenodttsdadoo5tumndj",
      year: "2023",
      technologies: ["SketchUp", "ArcGIS", "Lumion"],
      link: "/works"
    },
    {
      title: "Sustainable Design",
      description: "Eco-friendly architectural solutions that minimize environmental impact while maximizing efficiency.",
      image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/gnku8fce70stvs7us3as",
      year: "2022",
      technologies: ["Revit", "Green Building Studio", "Enscape"],
      link: "/works"
    },
    {
      title: "Interior Innovation",
      description: "Modern interior design concepts that transform spaces into functional works of art.",
      image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/xcbil9vmws2zli6sy8tm",
      year: "2022",
      technologies: ["3ds Max", "V-Ray", "Corona Renderer"],
      link: "/works"
    },
    {
      title: "Cultural Heritage",
      description: "Preservation and modernization of historical architecture while maintaining cultural significance.",
      image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/qdnh0yzxeyhouobin1h1",
      year: "2022",
      technologies: ["Photogrammetry", "Revit", "AutoCAD"],
      link: "/works"
    },
    {
      title: "Future Cities",
      description: "Visionary urban development concepts that shape the cities of tomorrow.",
      image: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/ejht1khtsjjw93vfwhud",
      year: "2022",
      technologies: ["Rhino", "Grasshopper", "Lumion"],
      link: "/works"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 py-16 relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Briefcase className="text-orange-500" size={32} />
            <h1 className="text-4xl md:text-5xl font-bold">Our Works</h1>
          </div>
          <p className="text-lg text-gray-400">
            Explore our portfolio of innovative architectural designs and creative solutions 
            that push the boundaries of modern architecture.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Show skeleton loading cards
            Array.from({ length: 6 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))
          ) : (
            // Show actual project cards
            projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))
          )}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-white/10 backdrop-blur-xl rounded-2xl max-w-4xl w-full overflow-hidden"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
                
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    {selectedProject.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                      <p className="text-orange-500">{selectedProject.year}</p>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedProject.description}
                    </p>
                    {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors"
                      >
                        View Project <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}