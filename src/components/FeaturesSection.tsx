import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import communityCard1 from "@/assets/features/community-card-1.webp";
import communityCard1_500 from "@/assets/features/community-card-1-500.webp";
import communityCard3 from "@/assets/features/community-card-3.webp";
import communityCard3_500 from "@/assets/features/community-card-3-500.webp";
import communityCard4 from "@/assets/features/community-card-4.webp";
import communityCard4_500 from "@/assets/features/community-card-4-500.webp";
import chartVideoPoster from "@/assets/features/chart-video-poster.jpg";
import chartMp4 from "@/assets/video/chart.mp4";
import chartWebm from "@/assets/video/chart.webm";

type CardConfig = {
  titleKey: string;
  accentKey: string;
  descKey: string;
  borderClass: string;
  glowClass: string;
  accentColor: string;
  media:
    | { type: "image"; src: string; srcSet: string; alt: string }
    | { type: "video"; poster: string; mp4: string; webm: string };
};

const cards: CardConfig[] = [
  {
    titleKey: "features.0.title",
    accentKey: "features.0.accent",
    descKey: "features.0.desc",
    borderClass: "is-green",
    glowClass: "is-green",
    accentColor: "var(--base-green)",
    media: {
      type: "image",
      src: communityCard1,
      srcSet: `${communityCard1_500} 500w, ${communityCard1} 579w`,
      alt: "Developer studying at computer",
    },
  },
  {
    titleKey: "features.1.title",
    accentKey: "features.1.accent",
    descKey: "features.1.desc",
    borderClass: "is-purple",
    glowClass: "is-purple",
    accentColor: "var(--base-purple)",
    media: {
      type: "video",
      poster: chartVideoPoster,
      mp4: chartMp4,
      webm: chartWebm,
    },
  },
  {
    titleKey: "features.2.title",
    accentKey: "features.2.accent",
    descKey: "features.2.desc",
    borderClass: "is-radiant-green",
    glowClass: "is-radiant-green",
    accentColor: "var(--radiant-green)",
    media: {
      type: "image",
      src: communityCard3,
      srcSet: `${communityCard3_500} 500w, ${communityCard3} 579w`,
      alt: "Group of students at computers",
    },
  },
  {
    titleKey: "features.3.title",
    accentKey: "features.3.accent",
    descKey: "features.3.desc",
    borderClass: "is-blue",
    glowClass: "is-blue",
    accentColor: "var(--base-blue)",
    media: {
      type: "image",
      src: communityCard4,
      srcSet: `${communityCard4_500} 500w, ${communityCard4} 579w`,
      alt: "Bootcamp group photo",
    },
  },
];

const CommunityCard = ({ config, index }: { config: CardConfig; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`community-grid-item ${config.borderClass}`}
    >
      <div className="community-grid_wrapper">
        <div className="community-grid_text-wrapper">
          <div className={`community-card_bg-effect ${config.glowClass}`} />
          <h2 className="community-heading">
            {t(config.titleKey)}{" "}
            <span className="community-heading_accent" style={{ color: config.accentColor }}>
              <em>{t(config.accentKey)}</em>
            </span>
          </h2>
          <div className="community-description">{t(config.descKey)}</div>
        </div>

        {config.media.type === "image" ? (
          <img
            src={config.media.src}
            srcSet={config.media.srcSet}
            sizes="(max-width: 579px) 100vw, 579px"
            alt={config.media.alt}
            className="community-grid_image"
            loading="lazy"
          />
        ) : (
          <div
            className="community-grid_image community-grid_video"
            style={{ backgroundImage: `url("${config.media.poster}")` }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              ref={(el) => { if (el) { el.muted = true; el.play().catch(() => {}); } }}
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            >
              <source src={config.media.mp4} type="video/mp4" />
              <source src={config.media.webm} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="relative z-10">
      <div className="container-large">
        <div className="community-wrapper">
          <div className="community-grid">
            {cards.map((card, i) => (
              <CommunityCard key={i} config={card} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
