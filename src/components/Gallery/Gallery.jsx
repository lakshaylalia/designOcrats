import { motion } from "framer-motion";
import { useState } from "react";

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

  const toggleImage = (image) => {
    setVisibleImage(visibleImage === image ? null : image);
  };
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
            className={`w-40 h-40 md:w-70 md:h-70 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105
              ${visibleImage === image.id ? "scale-120" : "scale-100"}`}
            onTouchStart={() => toggleImage(image.id)}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default Gallery;
