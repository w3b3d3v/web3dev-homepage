import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import studyGroup from "@/assets/study-group.webp";
import bootcampGroup from "@/assets/bootcamp-group.webp";
import discordWindow from "@/assets/discord-window.webp";
import studentsDesk from "@/assets/students-desk.webp";
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
  image: string;
  imageAlt: string;
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
      className="glow-card overflow-hidden relative"
    >
      {/* Top-left corner accent */}
      <div
        className="absolute top-0 left-0 w-12 h-12 pointer-events-none z-10"
        style={{
          borderTop: '2px solid hsl(var(--primary))',
          borderLeft: '2px solid hsl(var(--primary))',
          borderTopLeftRadius: 'var(--radius)',
          boxShadow: '-4px -4px 15px hsl(var(--primary) / 0.3), inset 2px 2px 10px hsl(var(--primary) / 0.1)',
        }}
      />

      <div className="p-6 md:p-8">
        <h3 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">
          {title} <span className="text-primary italic">{titleAccent}</span>
        </h3>
        <p className="mt-3 font-body text-sm text-muted-foreground leading-relaxed md:text-base">
          {description}
        </p>
      </div>

      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
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
      image: discordWindow,
      imageAlt: "Discord community and streaming session",
    },
    {
      title: t("features.2.title"),
      titleAccent: t("features.2.accent"),
      description: t("features.2.desc"),
      image: studentsDesk,
      imageAlt: "Students working together at desk",
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
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
