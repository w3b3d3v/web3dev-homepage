import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import studyGroup from "@/assets/study-group.webp";
import bootcampGroup from "@/assets/bootcamp-group.webp";
import { useLanguage } from "@/contexts/LanguageContext";

const FeatureCard = ({
  title,
  titleAccent,
  description,
  image,
  imageAlt,
  index,
}: {
  title: string;
  titleAccent: string;
  description: string;
  image?: string;
  imageAlt?: string;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`glow-card overflow-hidden ${image ? "row-span-2" : ""}`}
    >
      {image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={imageAlt || title}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6 md:p-8">
        <h3 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
          {title} <span className="text-primary italic">{titleAccent}</span>
        </h3>
        <p className="mt-3 font-body text-sm text-muted-foreground leading-relaxed md:text-base">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      title: t("features.0.title"),
      titleAccent: t("features.0.accent"),
      description: t("features.0.desc"),
      image: studyGroup,
      imageAlt: "Developer studying at computer with community",
    },
    {
      title: t("features.1.title"),
      titleAccent: t("features.1.accent"),
      description: t("features.1.desc"),
    },
    {
      title: t("features.2.title"),
      titleAccent: t("features.2.accent"),
      description: t("features.2.desc"),
    },
    {
      title: t("features.3.title"),
      titleAccent: t("features.3.accent"),
      description: t("features.3.desc"),
      image: bootcampGroup,
      imageAlt: "Bootcamp group photo",
    },
  ];

  return (
    <section id="features" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <FeatureCard {...features[0]} index={0} />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-1">
            <FeatureCard {...features[1]} index={1} />
            <FeatureCard {...features[2]} index={2} />
          </div>
          <div className="lg:col-span-1">
            <FeatureCard {...features[3]} index={3} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
