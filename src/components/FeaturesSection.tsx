import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import studyGroup from "@/assets/study-group.webp";
import bootcampGroup from "@/assets/bootcamp-group.webp";
import discordWindow from "@/assets/discord-window.webp";
import bootcampClass from "@/assets/bootcamp-class.webp";
import { useLanguage } from "@/contexts/LanguageContext";

type AccentColor = "green" | "purple" | "blue";

const accentColors: Record<AccentColor, string> = {
  green: "145 100% 50%",
  purple: "270 80% 60%",
  blue: "210 100% 55%",
};

const FeatureCard = ({
  title,
  titleAccent,
  description,
  image,
  imageAlt,
  index,
  accent = "green",
}: {
  title: string;
  titleAccent: string;
  description: string;
  image: string;
  imageAlt: string;
  index: number;
  accent?: AccentColor;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const color = accentColors[accent];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative overflow-hidden rounded-xl"
      style={{
        background: `radial-gradient(ellipse at top left, hsl(${color} / 0.12) 0%, hsl(220 15% 8% / 0.95) 60%, hsl(220 20% 4%) 100%)`,
      }}
    >
      {/* Gradient border overlay */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-10"
        style={{
          border: '1.5px solid transparent',
          borderImage: `linear-gradient(135deg, hsl(${color} / 0.8) 0%, hsl(${color} / 0.3) 30%, transparent 60%) 1`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {/* Simpler gradient border using pseudo-approach with box-shadow */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-10"
        style={{
          boxShadow: `inset 1px 1px 0 0 hsl(${color} / 0.6), inset 0 0 0 1px hsl(${color} / 0.1)`,
          borderRadius: 'inherit',
        }}
      />

      {/* Top-left corner glow accent */}
      <div
        className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10"
        style={{
          borderTop: `2px solid hsl(${color})`,
          borderLeft: `2px solid hsl(${color})`,
          borderTopLeftRadius: '0.75rem',
          boxShadow: `-4px -4px 20px hsl(${color} / 0.4), inset 3px 3px 12px hsl(${color} / 0.15)`,
        }}
      />

      <div className="p-6 md:p-8 relative z-20">
        <h3 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">
          {title}{" "}
          <span
            className="italic"
            style={{ color: `hsl(${color})` }}
          >
            {titleAccent}
          </span>
        </h3>
        <p className="mt-3 font-body text-sm text-muted-foreground leading-relaxed md:text-base">
          {description}
        </p>
      </div>

      <div className="aspect-video overflow-hidden relative z-20">
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

  const features: Array<{
    title: string;
    titleAccent: string;
    description: string;
    image: string;
    imageAlt: string;
    accent: AccentColor;
  }> = [
    {
      title: t("features.0.title"),
      titleAccent: t("features.0.accent"),
      description: t("features.0.desc"),
      image: studyGroup,
      imageAlt: "Developer studying at computer with community",
      accent: "green",
    },
    {
      title: t("features.1.title"),
      titleAccent: t("features.1.accent"),
      description: t("features.1.desc"),
      image: bootcampClass,
      imageAlt: "Bootcamp classroom teaching session",
      accent: "purple",
    },
    {
      title: t("features.2.title"),
      titleAccent: t("features.2.accent"),
      description: t("features.2.desc"),
      image: discordWindow,
      imageAlt: "Discord community and streaming session",
      accent: "green",
    },
    {
      title: t("features.3.title"),
      titleAccent: t("features.3.accent"),
      description: t("features.3.desc"),
      image: bootcampGroup,
      imageAlt: "Bootcamp group photo",
      accent: "blue",
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
