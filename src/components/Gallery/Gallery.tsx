import { useState, useEffect } from 'react';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/src/ScrollTrigger';
import { divMode } from 'tsparticles-engine';
gsap.registerPlugin(ScrollTrigger)

window.scroll({
  behavior:'smooth'
})

interface GalleryImage {
  id: number;
  src: string;
}

function GalleryImage({ image, index }: { image: GalleryImage; index: number }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white/5">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/5">
            <Loader2 className="w-8 h-8 animate-spin text-white/50" />
          </div>
        )}
        <img
          src={image.src}
          alt={`Gallery image ${image.id}`}
          className={`w-full h-full object-cover transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
            } group-hover:scale-110`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [isLoading, setIsLoading] = useState(true);

  const images: GalleryImage[] = [
    {
      id: 1,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/bchvtwgmpysopbbkucwq",
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/vs1lmmdv5krtddaytnqj",
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/q3fbok5qlhc5jskxuyxf",
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/ygi2ocizc8a40nvdogli",
    },
    {
      id: 5,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/fa2i7q5xa7bz7uswctds",
    },
    {
      id: 6,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/nqpwpjawl8vhuto4dp1k",
    },
    {
      id: 7,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/whlo6kzl4citr8nqq4sd",
    },
    {
      id: 8,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/yfuio6dprl2txt0caha9",
    },
    {
      id: 9,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/vmxayfadskjnwv6us37w",
    },
    {
      id: 10,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/wnzg5t1zbqs2uoqdrvs4",
    },
    {
      id: 11,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/go8ulnwczigvzv8f9dji",
    },
    {
      id: 12,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/b4dapkbkylfkb4btfrsv",
    },
    {
      id: 13,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/njtenrfjjpqg8s28ahrx",
    },
    {
      id: 14,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/umsbnv1padqj60p6peag",
    },
    {
      id: 15,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/mbjmmhi3qwxlqxxiuxec",
    },
    {
      id: 16,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/xqbmhgak6flcpwffic13",
    },
    {
      id: 17,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/ohhpxwohwzrpljuededo",
    },
    {
      id: 18,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/cecdma7wlbzetdm4gxig",
    },
    {
      id: 19,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/cuyvltmqrtjkq0pczn3w",
    },
    {
      id: 20,
      src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/rgapicqyggdrqfb3seuy",
    },
  ];

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-4 py-8 mt-2">
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {images.map((image, id) => (
        <div key={id} className="break-inside-avoid overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
          <img
            src={image.src}
            alt=""
            className="w-full object-cover"
            style={{
              height: `${250 + Math.random() * 200}px`,
            }}
          />
        </div>
      ))}
    </div>
  </div>
  
  );
}