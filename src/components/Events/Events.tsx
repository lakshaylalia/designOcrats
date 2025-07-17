import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function EventCard({ title, date, image, description, index }: { 
  title: string; 
  date: string; 
  image: string; 
  description: string;
  index: number;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 transform transition-all duration-300 hover:scale-105"
    >
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-fill transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-4 text-white"
        >
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-300">{date}</p>
        </motion.div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white group-hover:text-white transition-colors">{title}</h3>
        <p className="text-white mt-1">{date}</p>
        <p className="text-gray-400 mt-2 group-hover:text-gray-300 transition-colors">{description}</p>
      </div>
    </motion.div>
  );
}

export default function Events() {
  const events = [
    {
      title: 'Pratical Aspects of Architecture in India',
      date: 'March 15, 2024',
      image: '/event1.jpg',
      description: 'Interactive workshop focusing on sustainable architectural practices and eco-friendly design solutions.'
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-32">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 mb-12"
        >
          <Calendar className="text-white" />
          <h2 className="text-3xl font-bold">Recent Events</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={index} {...event} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}