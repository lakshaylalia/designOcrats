// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

function Gallery() {
  // const [images, setImages] = useState([]);
  // const [loading, setLoading] = useState(true);

  // const animationSettings = {
  //   initial: { opacity: 0, scale: 0.8 },
  //   animate: { opacity: 1, scale: 1 },
  //   transition: { duration: 0.6, type: "spring" },
  // };

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       // Fetch images from Cloudinary using environment variables
  //       const response = await fetch(
  //         `https://api.cloudinary.com/v1_1/${process.env.REACT_APP.REACT_APP_CLOUD_NAME}/resources/image`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Authorization": "Basic " + btoa(`${process.env.REACT_APP_API_KEY}:${process.env.REACT_APP_API_SECRET}`),
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       setImages(data.resources); 
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching images:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchImages();
  // }, []);

  // if (loading) return <div>Loading...</div>;

  return (
    // <div className="w-full h-screen grid grid-cols-2 md:grid-cols-4 gap-6 p-6 place-items-center">
    //   {images.map((image) => (
    //     <motion.div key={image.public_id} {...animationSettings}>
    //       <img
    //         src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/${image.public_id}.jpg`}
    //         alt={image.public_id}
    //         loading="lazy"
    //         className="w-48 h-48 rounded-lg shadow-lg transition-transform duration-300 hover:scale-110"
    //       />
    //     </motion.div>
    //   ))}
    // </div>
    <>Empty</>
  );
}

export default Gallery;
