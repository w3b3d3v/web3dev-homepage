import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import studyGroup from "@/assets/study-group.webp";
import img1 from "@/assets/gallery/img1.webp";
import img2 from "@/assets/gallery/img2.webp";
import solanaClassroom from "@/assets/solana-classroom.webp";
import img3 from "@/assets/gallery/img3.webp";
import img4 from "@/assets/gallery/img4.webp";

const images = [studyGroup, img1, img2, solanaClassroom, img3, img4];

const FooterGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="relative z-10">
      <div ref={ref} className="flex overflow-hidden">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group relative h-48 w-1/3 flex-shrink-0 overflow-hidden sm:w-1/4 md:h-72 md:w-1/6"
          >
            <img
              src={img}
              alt="WEB3DEV community event"
              className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110"
              loading="lazy"
            />
            {/* Green glow overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {/* Bottom edge glow */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-primary/0 transition-all duration-500 group-hover:bg-primary/40 group-hover:shadow-[0_0_20px_hsl(145_100%_50%/0.3)]" />
          </motion.div>
        ))}
      </div>
    </footer>
  );
};

export default FooterGallery;
