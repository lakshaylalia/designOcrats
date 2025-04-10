import { useState, useEffect } from 'react';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  id: number;
  src: string;
  event: string;
  description?: string;
}

interface EventSection {
  title: string;
  images: GalleryImage[];
}



function GalleryImage({ image, index }: { image: GalleryImage; index: number }) {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);
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
      className="break-inside-avoid mb-4"
    >
      <div className="relative overflow-hidden rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-500 hover:scale-105 cursor-pointer">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/5">
            <Loader2 className="w-8 h-8 animate-spin text-white/50" />
          </div>
        )}
        <img
          src={image.src}
          alt={`${image.event} - Image ${image.id}`}
          className={`w-full object-cover transition-all duration-500 brightness-95 ${isLoaded ? 'opacity-100' : 'opacity-0'
            } hover:scale-110`}
          style={{
            height: `${Math.floor(250 + Math.random() * 200)}px`
          }}
          // onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          {/* <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-sm font-medium text-white">{image.event}</h3>
            <p className="text-sm text-white/80 mt-1">{image.description}</p>
          </div> */}
        </div>
      </div>
    </motion.div>
  );
}

function EventGallery({ section, index }: { section: EventSection; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="mb-16"
    >
      <h2 className="text-2xl font-bold mb-8 text-transparent text-center bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
        {section.title}
      </h2>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {section.images.map((image, idx) => (
          <GalleryImage key={image.id} image={image} index={idx} />
        ))}
      </div>
    </motion.section>
  );
}

export default function Gallery() {
  const [isLoading, setIsLoading] = useState(true);


  const galleryData: EventSection[] = [
    {
      title: "Nimbus 2K25",
      images: [
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/kfxnivthvrra1wl7hxv1",
          event: "Nimbus 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/ocgxjcxjpogyyid46uz6",
          event: "Nimbus 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/zbcmjhi7reggpuwhm0ps",
          event: "Nimbus 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/reo4pxgf8pzha1twduod",
          event: "Nimbus 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/l9freir0lb99qpw03mi0",
          event: "Nimbus 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/ppdnswjhvgne2miggrsf",
          event: "Nimbus 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/depfjj8d4mnjssbf3mff",
          event: "Nimbus 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/t4m4zaxbei1cl2m05sxq",
          event: "Nimbus 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/mxanz551zdks9bb4axlz",
          event: "Nimbus 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/cu7osvvjej3gm9fakaxq",
          event: "Nimbus 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/dcdjiuvoxxveku46mpjg",
          event: "Nimbus 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K25/wzrx6oafc2fshjt5ozwd",
          event: "Nimbus 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/yfuio6dprl2txt0caha9",
          event: "Nimbus 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/go8ulnwczigvzv8f9dji",
          event: "Nimbus 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 25,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/wnzg5t1zbqs2uoqdrvs4",
          event: "Nimbus 2K25",
          description: "Random",
        },
      ]
    },
    {
      title: "NIMBUS 2K24",
      images: [
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/foixdab8kvamc64mwh3z",
          event: "Nimbus 2K24",
          description: "Random",
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/wf99ub8ja19snz5ulx10",
          event: "Nimbus 2K24",
          description: "Random",
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/tzd3mkdw3oykb3afdx1b",
          event: "Nimbus 2K24",
          description: "Random",
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/gwf7kmky4ushycltr2yw",
          event: "Nimbus 2K24",
          description: "Random",
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/d1ghpdwfl76xobww0jem",
          event: "Nimbus 2K24",
          description: "Random",
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/fr6vficbp3xusle3oqgq",
          event: "Nimbus 2K24",
          description: "Random",
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/lfolaokrf4fsb5b4lrkp",
          event: "Nimbus 2K24",
          description: "Random",
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/o3jfhvr9150mns2ozx9s",
          event: "Nimbus 2K24",
          description: "Random",
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/lfwy1cxzbaztinfzkzfg",
          event: "Nimbus 2K24",
          description: "Random",
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/azcknukf19i6taxninki",
          event: "Nimbus 2K24",
          description: "Random",
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/xrkhakavmehoghm3oz5o",
          event: "Nimbus 2K24",
          description: "Random",
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/odwoj6xqzvfsrjjqrhmh",
          event: "Nimbus 2K24",
          description: "Random",
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/x0wgwimloncack0drxs0",
          event: "Nimbus 2K24",
          description: "Random",
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/Nimbus2K22/cudurfikbih5ozrnnytc",
          event: "Nimbus 2K24",
          description: "Random",
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/b4dapkbkylfkb4btfrsv",
          event: "Nimbus 2K24",
          description: "Random",
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/ygi2ocizc8a40nvdogli",
          event: "Nimbus 2K24",
          description: "Random",
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/fa2i7q5xa7bz7uswctds",
          event: "Nimbus 2K24",
          description: "Random",
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/whlo6kzl4citr8nqq4sd",
          event: "Nimbus 2K24",
          description: "Random",
        },
        {
          id: Math.random() * 19,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/njtenrfjjpqg8s28ahrx",
          event: "Nimbus 2K24",
          description: "Random",
        },
      ]
    },
    {
      title: "Guest Lectures",
      images: [
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/rgapicqyggdrqfb3seuy",
          event: "Guest Lectures 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/GuestLectures2K25/dnpcqoqcklnuurbpyisl",
          event: "Guest Lectures 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/ohhpxwohwzrpljuededo",
          event: "Guest Lectures 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/mbjmmhi3qwxlqxxiuxec",
          event: "Guest Lectures 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/cecdma7wlbzetdm4gxig",
          event: "Guest Lectures 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/GuestLectures2K25/sembbpdsh2cugawxicmn",
          event: "Guest Lectures 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/GuestLectures2K25/airrp0kbcm2jkuvwlzvl",
          event: "Guest Lectures 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/xqbmhgak6flcpwffic13",
          event: "Guest Lectures 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/mbjmmhi3qwxlqxxiuxec",
          event: "Guest Lectures 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/GuestLectures2K25/gmmizx3jiibqeyx4lvsa",
          event: "Guest Lectures 2K25",
          description: "Random",
        },
        {
          id: Math.random() * 21,
          src: "https://res.cloudinary.com/dl8msplgv/image/upload/f_auto,q_auto/v1/design-o-crats/public/cecdma7wlbzetdm4gxig",
          event: "Guest Lectures 2K25",
          description: "Random",
        },
      ]
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 py-16 relative">

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 animate-spin text-white/50" />
          </div>
        ) : (
          <div className="space-y-16">
            {galleryData.map((section, index) => (
              <EventGallery key={section.title} section={section} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}