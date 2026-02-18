import { motion, useScroll, useTransform, useInView } from "framer-motion";
import ShimmerButton from "@/components/ShimmerButton";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import timelinePoap from "@/assets/timeline/poap.webp";
import timelineChart2022 from "@/assets/timeline/chart-2022.png";
import timelineCommunityPhoto from "@/assets/timeline/community-photo.webp";
import timelineDsc06607 from "@/assets/timeline/dsc06607.avif";
import timelinePolkadot from "@/assets/timeline/polkadot.avif";
import timelineGraph2024 from "@/assets/timeline/graph2024.avif";
import timelineHackathonNft from "@/assets/timeline/hackathon-nft-brasil.avif";
import timelineDigitalAssets from "@/assets/timeline/digital-assets.png";
import timelineTokennation from "@/assets/timeline/tokennation.jpg";
import timelineFoundersHaus from "@/assets/timeline/founders-haus.png";
import timelineUfsc from "@/assets/timeline/ufsc.png";

interface TimelineEvent {
  month: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  videoId?: string;
}

interface TimelineYear {
  year: string;
  events: TimelineEvent[];
}

const TimelineEventItem = ({ event }: { event: TimelineEvent }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-15% 0px -15% 0px" });
  const { t } = useLanguage();

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_auto_1fr] gap-0 md:gap-8 items-start min-h-[180px]">
      {/* Left: text always */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.2, x: -10 }}
        transition={{ duration: 0.5 }}
        className="pr-4 md:pr-8 text-right"
      >
        <div className="flex flex-col items-end">
          <span className="text-primary font-heading font-semibold text-base">{event.month}</span>
          <h3 className="font-heading text-lg font-semibold text-foreground mt-1">{event.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
          {event.link && (
            <ShimmerButton href={event.link} target="_blank" rel="noopener noreferrer" className="mt-3 text-xs">
              {t("timeline.viewMore")}
            </ShimmerButton>
          )}
        </div>
      </motion.div>

      {/* Center: dot */}
      <div className="relative flex items-start justify-center w-8 pt-1">
        <motion.div
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0.3 }}
          transition={{ duration: 0.4 }}
          className="w-3 h-3 rounded-full border-2 border-primary z-10"
          style={{
            background: isInView ? "hsl(145 100% 50%)" : "transparent",
            boxShadow: isInView ? "0 0 12px hsl(145 100% 50% / 0.6)" : "none",
          }}
        />
      </div>

      {/* Right: media always */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.2, x: 10 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="pl-4 md:pl-8"
      >
        {event.image ? (
          <div className="overflow-hidden rounded-lg border border-border/50">
            <img src={event.image} alt={event.title} className="w-full h-40 md:h-48 object-cover" loading="lazy" />
          </div>
        ) : event.videoId ? (
          <div className="overflow-hidden rounded-lg border border-border/50 aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${event.videoId}`}
              title={event.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : null}
      </motion.div>
    </div>
  );
};

const YearMarker = ({ year }: { year: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_auto_1fr] gap-0 md:gap-8 items-center">
      <motion.div
        animate={isInView ? { opacity: 1 } : { opacity: 0.3 }}
        className="text-right pr-4 md:pr-8"
      >
        <h2 className="font-heading text-4xl md:text-5xl font-black text-primary">{year}</h2>
      </motion.div>
      <div className="relative flex items-center justify-center w-8">
        <motion.div
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0.3 }}
          className="w-4 h-4 rounded-full border-2 border-primary z-10"
          style={{
            background: isInView ? "hsl(145 100% 50%)" : "transparent",
            boxShadow: isInView ? "0 0 16px hsl(145 100% 50% / 0.7)" : "none",
          }}
        />
      </div>
      <div className="pl-4 md:pl-8" />
    </div>
  );
};

const AboutTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  const timelineData: TimelineYear[] = [
    {
      year: "2022",
      events: [
        {
          month: t("timeline.2022.jan.month"),
          title: t("timeline.2022.jan.title"),
          description: t("timeline.2022.jan.desc"),
          image: timelinePoap,
          link: "https://collectors.poap.xyz/drop/24766",
        },
        {
          month: t("timeline.2022.feb.month"),
          title: t("timeline.2022.feb.title"),
          description: t("timeline.2022.feb.desc"),
          videoId: "Yt6wovZLgf4",
        },
        {
          month: t("timeline.2022.apr.month"),
          title: t("timeline.2022.apr.title"),
          description: t("timeline.2022.apr.desc"),
          videoId: "QRjrWEVGgno",
          link: "https://www.youtube.com/live/gunQidhjgcs",
        },
        {
          month: t("timeline.2022.oct.month"),
          title: t("timeline.2022.oct.title"),
          description: t("timeline.2022.oct.desc"),
          image: timelineChart2022,
        },
      ],
    },
    {
      year: "2023",
      events: [
        {
          month: t("timeline.2023.feb.month"),
          title: t("timeline.2023.feb.title"),
          description: t("timeline.2023.feb.desc"),
          videoId: "Jeo0p0D8ayQ",
        },
        {
          month: t("timeline.2023.mar.month"),
          title: t("timeline.2023.mar.title"),
          description: t("timeline.2023.mar.desc"),
          image: timelineCommunityPhoto,
        },
        {
          month: t("timeline.2023.jun.month"),
          title: t("timeline.2023.jun.title"),
          description: t("timeline.2023.jun.desc"),
          image: timelineDsc06607,
        },
        {
          month: t("timeline.2023.aug.month"),
          title: t("timeline.2023.aug.title"),
          description: t("timeline.2023.aug.desc"),
          videoId: "kOjqCf3vfhs",
        },
        {
          month: t("timeline.2023.sep.month"),
          title: t("timeline.2023.sep.title"),
          description: t("timeline.2023.sep.desc"),
          videoId: "kHg2EmVUARw",
        },
      ],
    },
    {
      year: "2024",
      events: [
        {
          month: t("timeline.2024.jan.month"),
          title: t("timeline.2024.jan.title"),
          description: t("timeline.2024.jan.desc"),
          image: timelinePolkadot,
        },
        {
          month: t("timeline.2024.apr.month"),
          title: t("timeline.2024.apr.title"),
          description: t("timeline.2024.apr.desc"),
          videoId: "fGMI2m73Cn8",
        },
        {
          month: t("timeline.2024.may.month"),
          title: t("timeline.2024.may.title"),
          description: t("timeline.2024.may.desc"),
          image: timelineGraph2024,
        },
        {
          month: t("timeline.2024.jul.month"),
          title: t("timeline.2024.jul.title"),
          description: t("timeline.2024.jul.desc"),
          videoId: "ROioE9Tlrmc",
          link: "https://www.w3d.community/build",
        },
        {
          month: t("timeline.2024.sep.month"),
          title: t("timeline.2024.sep.title"),
          description: t("timeline.2024.sep.desc"),
          image: timelineHackathonNft,
        },
      ],
    },
    {
      year: "2025",
      events: [
        {
          month: t("timeline.2025.feb.month"),
          title: t("timeline.2025.feb.title"),
          description: t("timeline.2025.feb.desc"),
          videoId: "18sCFMicV-4",
        },
        {
          month: t("timeline.2025.mar.month"),
          title: t("timeline.2025.mar.title"),
          description: t("timeline.2025.mar.desc"),
          image: timelineDigitalAssets,
        },
        {
          month: t("timeline.2025.may.month"),
          title: t("timeline.2025.may.title"),
          description: t("timeline.2025.may.desc"),
          image: timelineTokennation,
        },
        {
          month: t("timeline.2025.jun1.month"),
          title: t("timeline.2025.jun1.title"),
          description: t("timeline.2025.jun1.desc"),
          image: timelineFoundersHaus,
        },
        {
          month: t("timeline.2025.jun2.month"),
          title: t("timeline.2025.jun2.title"),
          description: t("timeline.2025.jun2.desc"),
          image: timelineUfsc,
        },
        {
          month: t("timeline.2025.jul.month"),
          title: t("timeline.2025.jul.title"),
          description: t("timeline.2025.jul.desc"),
          videoId: "bK9DA2BB7aM",
        },
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="relative z-10 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="relative flex flex-col gap-12">
          {/* Background track */}
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 max-[767px]:left-[6px] max-[767px]:translate-x-0"
            style={{ width: "3px", backgroundColor: "rgb(65, 65, 65)", zIndex: -2 }}
          />
          {/* Progress bar */}
          <motion.div
            className="absolute left-1/2 top-0 -translate-x-1/2 origin-top max-[767px]:left-[6px] max-[767px]:translate-x-0"
            style={{
              width: "3px",
              height: lineHeight,
              opacity: lineOpacity,
              zIndex: -1,
              backgroundImage: "linear-gradient(180deg, #DC1FFF, #7B61FF 29%, #1E90FF 71%, #00FF66)",
            }}
          />

          {timelineData.map((yearGroup) => (
            <div key={yearGroup.year} className="flex flex-col gap-12">
              <YearMarker year={yearGroup.year} />
              {yearGroup.events.map((event) => (
                <TimelineEventItem key={`${yearGroup.year}-${event.month}-${event.title}`} event={event} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTimeline;
