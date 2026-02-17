import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import solanaClassroom from "@/assets/solana-classroom.webp";
import bootcampClass from "@/assets/bootcamp-class.webp";
import developersTable from "@/assets/developers-table.webp";
import solanaThumbnail from "@/assets/solana-thumbnail.webp";
import { useLanguage } from "@/contexts/LanguageContext";

const TimelineItem = ({
  title,
  description,
  image,
  link,
  index,
  viewMoreLabel,
  isHeader,
  caseStats,
  t,
}: {
  title: string;
  description: string;
  image?: string;
  link?: string;
  index: number;
  viewMoreLabel: string;
  isHeader?: boolean;
  caseStats?: Array<{ value: string; label: string }>;
  t?: (key: string) => string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_auto_1fr] gap-0 md:gap-8 items-center min-h-[220px]">
      {/* Left: Text */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -10 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="pr-4 md:pr-8 text-right"
      >
        {isHeader ? (
          <>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              {title.split(" ")[0]}{" "}
              <span className="text-gradient-green">{title.split(" ").slice(1).join(" ")}</span>
            </h2>
            {caseStats && (
              <div className="mt-4 flex flex-wrap justify-end gap-6">
                {caseStats.map((stat) => (
                  <div key={stat.label} className="text-right">
                    <div className="font-heading text-xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
             {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="shimmer-button mt-3 inline-block text-xs"
              >
                <span>{viewMoreLabel}</span>
              </a>
            )}
          </>
        )}
      </motion.div>

      {/* Center: Dot on the line */}
      <div className="relative flex items-center justify-center w-8">
        <motion.div
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0.3 }}
          transition={{ duration: 0.4 }}
          className={`rounded-full border-2 border-primary z-10 ${isHeader ? "w-4 h-4" : "w-3 h-3"}`}
          style={{
            background: isInView ? "hsl(145 100% 50%)" : "transparent",
            boxShadow: isInView ? "0 0 12px hsl(145 100% 50% / 0.6)" : "none",
          }}
        />
      </div>

      {/* Right: Image or empty for header */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 10 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="pl-4 md:pl-8"
      >
        {isHeader ? (
          <div />
        ) : image ? (
          <div className="overflow-hidden rounded-lg border border-border/50">
            <img
              src={image}
              alt={title}
              className="w-full h-40 md:h-48 object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-full h-40 md:h-48 rounded-lg border border-border/30 bg-card/30" />
        )}
      </motion.div>
    </div>
  );
};

const SolanaCaseSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  const caseStats = [
    { value: "4.9k", label: t("solana.stat1.label") },
    { value: "1.5k", label: t("solana.stat2.label") },
    { value: "50+", label: t("solana.stat3.label") },
  ];

  const timelineItems = [
    {
      title: t("solana.title") + " " + t("solana.highlight"),
      description: "",
      image: undefined,
      isHeader: true,
    },
    {
      title: t("solana.card1.title"),
      description: t("solana.card1.desc"),
      link: "https://pt.w3d.community/search?q=solana",
      image: solanaClassroom,
    },
    {
      title: t("solana.card2.title"),
      description: t("solana.card2.desc"),
      image: solanaClassroom,
    },
    {
      title: t("solana.card3.title"),
      description: t("solana.card3.desc"),
      image: bootcampClass,
    },
    {
      title: t("solana.card4.title"),
      description: t("solana.card4.desc"),
      image: developersTable,
    },
    {
      title: t("solana.card5.title"),
      description: t("solana.card5.desc"),
      image: solanaThumbnail,
      link: "https://youtube.com/playlist?list=PLVX4xVoD65UOnAi_8t69_s7Dh4WiTziS2",
    },
  ];

  return (
    <section ref={sectionRef} className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Timeline */}
        <div className="relative flex flex-col gap-16">
          {/* Vertical line background (dark) */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 bg-[rgb(65,65,65)]" style={{ width: "3px" }} />

          {/* Vertical line glow (animated) */}
          <motion.div
            className="absolute left-1/2 top-0 -translate-x-1/2 origin-top"
            style={{
              width: "3px",
              height: lineHeight,
              opacity: lineOpacity,
              background: "linear-gradient(to bottom, hsl(145 100% 50% / 0.8), hsl(145 100% 50% / 0.3))",
              boxShadow: "0 0 8px hsl(145 100% 50% / 0.4)",
            }}
          />

          {timelineItems.map((item, i) => (
            <TimelineItem
              key={i}
              {...item}
              index={i}
              viewMoreLabel={t("solana.viewMore")}
              caseStats={item.isHeader ? caseStats : undefined}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolanaCaseSection;
