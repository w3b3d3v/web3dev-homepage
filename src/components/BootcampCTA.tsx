import { motion, useInView } from "framer-motion";
import ShimmerButton from "@/components/ShimmerButton";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import bootcampClass from "@/assets/bootcamp-class.webp";

const BootcampCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section className="relative z-10 px-6 my-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-[78rem] overflow-hidden flex flex-col md:flex-row items-center justify-between"
        style={{
          minHeight: "30rem",
          border: "1px solid hsl(var(--primary))",
          borderRadius: "1.5rem",
          backgroundColor: "rgba(14, 14, 14, 0.9)",
        }}
      >
        {/* Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto md:self-stretch overflow-hidden">
          <img
            src={bootcampClass}
            alt="Build a Blockchain with Rust"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="font-heading text-2xl font-normal text-foreground md:text-3xl lg:text-[3rem] leading-tight">
            {t("bootcamp.title")}{" "}
            <span className="text-gradient-green italic">{t("bootcamp.highlight")}</span>
          </h2>
          <div className="mt-6">
            <ShimmerButton href="https://www.w3d.community/build" target="_blank" rel="noopener noreferrer">
              {t("bootcamp.cta")}
            </ShimmerButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BootcampCTA;
