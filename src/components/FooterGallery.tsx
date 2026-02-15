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
      {/* Gallery strip */}
      <div ref={ref} className="flex overflow-hidden">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.1 }}
            className="h-48 w-1/3 flex-shrink-0 sm:w-1/4 md:h-64 md:w-1/6"
          >
            <img
              src={img}
              alt="WEB3DEV community event"
              className="h-full w-full object-cover opacity-70 transition-opacity hover:opacity-100"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      {/* Footer bar */}
      <div className="border-t border-border/30 bg-background/80 px-6 py-8 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="font-heading text-lg font-bold text-foreground">
            <span className="text-gradient-green">WEB3</span>DEV
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="https://discord.gg/web3dev" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Discord</a>
            <a href="https://www.youtube.com/@web3dev" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">YouTube</a>
            <a href="https://pt.w3d.community/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Blog</a>
          </div>
          <p className="text-xs text-muted-foreground">© 2024 WEB3DEV. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterGallery;
