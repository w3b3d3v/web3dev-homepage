import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import studyGroup from "@/assets/study-group.webp";
import img1 from "@/assets/gallery/img1.webp";
import img2 from "@/assets/gallery/img2.webp";
import solanaClassroom from "@/assets/solana-classroom.webp";
import img3 from "@/assets/gallery/img3.webp";
import img4 from "@/assets/gallery/img4.webp";
import bootcampClass from "@/assets/bootcamp-class.webp";
import bootcampGroup from "@/assets/bootcamp-group.webp";
import developersTable from "@/assets/developers-table.webp";
import studentDesk from "@/assets/students-desk.webp";

const row1 = [studyGroup, img1, img2, solanaClassroom, img3, img4, studyGroup, img1, img2];
const row2 = [bootcampClass, bootcampGroup, developersTable, studentDesk, img3, img4, bootcampClass, bootcampGroup, developersTable];

const FooterGallery = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <footer ref={ref} className="relative z-10 overflow-hidden">
      {[row1, row2].map((row, rowIdx) => (
        <motion.div
          key={rowIdx}
          style={{ x: rowIdx === 0 ? x1 : x2 }}
          className="flex w-max gap-1 mb-1 last:mb-0"
        >
          {row.map((img, i) => (
            <div
              key={i}
              className="group relative h-36 w-52 flex-shrink-0 overflow-hidden md:h-56 md:w-80"
            >
              <img
                src={img}
                alt="WEB3DEV community event"
                className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 h-1 bg-primary/0 transition-all duration-500 group-hover:bg-primary/40 group-hover:shadow-[0_0_20px_hsl(145_100%_50%/0.3)]" />
            </div>
          ))}
        </motion.div>
      ))}
    </footer>
  );
};

export default FooterGallery;
