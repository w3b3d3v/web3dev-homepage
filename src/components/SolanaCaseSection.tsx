import { motion, useScroll, useTransform, useInView } from "framer-motion";
import ShimmerButton from "@/components/ShimmerButton";
import React, { useRef } from "react";
import communityMp4 from "@/assets/video/community.mp4";
import communityWebm from "@/assets/video/community.webm";
import {
  HistoryIcon1,
  HistoryIcon2,
  HistoryIcon3,
  HistoryIcon4,
  HistoryIcon5,
  HistoryIcon6,
} from "@/components/icons/TimelineIcons";
import timelineHackathon from "@/assets/timeline-2-hackathon.webp";
import timelineBootcamp from "@/assets/timeline-3-bootcamp.webp";
import timelineTalents from "@/assets/timeline-4-talents.webp";
import timelinePlaylist from "@/assets/timeline-5-playlist.webp";
import { useLanguage } from "@/contexts/LanguageContext";

const dotStyle = (isInView: boolean, size: "sm" | "lg" = "sm") => ({
  background: isInView ? "hsl(145 100% 50%)" : "transparent",
  boxShadow: isInView ? `0 0 ${size === "lg" ? "16" : "12"}px hsl(145 100% 50% / 0.6)` : "none",
});

const TimelineItem = ({
  title,
  description,
  image,
  video,
  icon: Icon,
  link,
  index,
  viewMoreLabel,
  isHeader,
  caseStats,
}: {
  title: string;
  description: string;
  image?: string;
  video?: { mp4: string; webm: string };
  icon?: React.ComponentType<{ className?: string }>;
  link?: string;
  index: number;
  viewMoreLabel: string;
  isHeader?: boolean;
  caseStats?: Array<{ value: string; label: string }>;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });

  const textContent = isHeader ? (
    <>
      <h2 className="font-heading text-3xl md:text-[3rem] font-normal text-foreground">
        {title.split(" ")[0]}{" "}
        <span className="text-gradient-green">{title.split(" ").slice(1).join(" ")}</span>
      </h2>
      {caseStats && (
        <div className="mt-4 flex flex-wrap justify-end gap-6 max-[767px]:justify-start">
          {caseStats.map((stat) => (
            <div key={stat.label} className="text-right max-[767px]:text-left">
              <div className="font-heading text-xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </>
  ) : (
    <>
      <h3 className="font-heading text-xl md:text-[2.75rem] font-semibold text-foreground leading-tight">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {link && (
        <ShimmerButton href={link} target="_blank" rel="noopener noreferrer" className="mt-3 text-xs">
          {viewMoreLabel}
        </ShimmerButton>
      )}
    </>
  );

  const mediaContent = video ? (
    <div className="overflow-hidden rounded-lg border border-border/50">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        ref={(el) => { if (el) { el.muted = true; el.play().catch(() => {}); } }}
        className="w-full h-40 md:h-48 object-cover"
      >
        <source src={video.webm} type="video/webm" />
        <source src={video.mp4} type="video/mp4" />
      </video>
    </div>
  ) : image ? (
    <div className="overflow-hidden rounded-lg border border-border/50">
      <img src={image} alt={title} className="w-full h-40 md:h-48 object-cover" loading="lazy" />
    </div>
  ) : null;

  return (
    <div ref={ref} className="relative">
      {/* ── Desktop: text | dot | image ── */}
      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-8 items-center min-h-[220px]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -10 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="pr-8 text-right"
        >
          {textContent}
        </motion.div>

        <div className="flex items-center justify-center w-10">
          <motion.div
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0.3 }}
            transition={{ duration: 0.4 }}
            className="z-10 flex items-center justify-center"
          >
            {Icon ? (
              <Icon className={`${isHeader ? "w-7 h-7" : "w-6 h-6"} text-white`} />
            ) : (
              <div className={`rounded-full border-2 border-primary ${isHeader ? "w-4 h-4" : "w-3 h-3"}`} style={dotStyle(isInView, isHeader ? "lg" : "sm")} />
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 10 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="pl-8"
        >
          {mediaContent ?? <div />}
        </motion.div>
      </div>

      {/* ── Mobile: dot-column | content ── */}
      <div className="grid grid-cols-[32px_1fr] gap-0 md:hidden items-start">
        <div className="flex items-start justify-center pt-1">
          <motion.div
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0.3 }}
            transition={{ duration: 0.4 }}
            className="z-10 flex-shrink-0 flex items-center justify-center"
          >
            {Icon ? (
              <Icon className={`${isHeader ? "w-6 h-6" : "w-5 h-5"} text-white`} />
            ) : (
              <div className={`rounded-full border-2 border-primary ${isHeader ? "w-4 h-4" : "w-3 h-3"}`} style={dotStyle(isInView, isHeader ? "lg" : "sm")} />
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 5 }}
          transition={{ duration: 0.5 }}
          className="pl-3 flex flex-col gap-3"
        >
          {textContent}
          {mediaContent && <div>{mediaContent}</div>}
        </motion.div>
      </div>
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
      icon: HistoryIcon1,
    },
    {
      title: t("solana.card1.title"),
      description: t("solana.card1.desc"),
      link: "https://pt.w3d.community/search?q=solana",
      video: { mp4: communityMp4, webm: communityWebm },
      icon: HistoryIcon2,
    },
    {
      title: t("solana.card2.title"),
      description: t("solana.card2.desc"),
      image: timelineHackathon,
      icon: HistoryIcon3,
    },
    {
      title: t("solana.card3.title"),
      description: t("solana.card3.desc"),
      image: timelineBootcamp,
      icon: HistoryIcon4,
    },
    {
      title: t("solana.card4.title"),
      description: t("solana.card4.desc"),
      image: timelineTalents,
      icon: HistoryIcon5,
    },
    {
      title: t("solana.card5.title"),
      description: t("solana.card5.desc"),
      image: timelinePlaylist,
      link: "https://youtube.com/playlist?list=PLVX4xVoD65UOnAi_8t69_s7Dh4WiTziS2",
      icon: HistoryIcon6,
    },
  ];

  return (
    <section ref={sectionRef} className="relative z-10 px-6 pt-24 pb-0">
      <div className="mx-auto max-w-5xl">
        <div className="relative flex flex-col gap-16">
          {/* Gray background track */}
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 max-[767px]:left-[15px] max-[767px]:translate-x-0"
            style={{ width: "3px", backgroundColor: "rgb(65, 65, 65)", zIndex: -2 }}
          />
          {/* Animated gradient progress bar */}
          <motion.div
            className="absolute left-1/2 top-0 -translate-x-1/2 origin-top max-[767px]:left-[15px] max-[767px]:translate-x-0"
            style={{
              width: "3px",
              height: lineHeight,
              opacity: lineOpacity,
              zIndex: -1,
              backgroundImage: "linear-gradient(180deg, #DC1FFF, #7B61FF 29%, #1E90FF 71%, #00FF66)",
            }}
          />

          {timelineItems.map((item, i) => (
            <TimelineItem
              key={i}
              {...item}
              index={i}
              viewMoreLabel={t("solana.viewMore")}
              caseStats={item.isHeader ? caseStats : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolanaCaseSection;
