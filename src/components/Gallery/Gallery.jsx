import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

const images = [
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
];

function Gallery() {
  const [visibleImage, setVisibleImage] = useState(null);

  return (
    <div className="w-full min-h-screen grid grid-cols-2 md:grid-cols-4 gap-6 p-6 place-items-center">
      {images.map((image) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          whileHover={{ scale: 1.1 }}
        >
          <img
            src={image.src}
            alt="Gallery Image"
            loading="eager"
            className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-110"
            onTouchStart={() => setVisibleImage(image)}
            onClick={() => setVisibleImage(image)}
          />
        </motion.div>
      ))}

      {visibleImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          <button
            className="absolute top-5 right-5 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
            onClick={() => setVisibleImage(null)}
          >
            <X size={30} />
          </button>

          <motion.img
            src={visibleImage.src}
            alt="Fullscreen Image"
            className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          />
        </div>
      )}
    </div>
  );
}

export default Gallery;
