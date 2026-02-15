import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import solanaClassroom from "@/assets/solana-classroom.webp";
import bootcampClass from "@/assets/bootcamp-class.webp";
import developersTable from "@/assets/developers-table.webp";
import solanaThumbnail from "@/assets/solana-thumbnail.webp";
import { useLanguage } from "@/contexts/LanguageContext";

const SolanaCaseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const caseStats = [
    { value: "4.9k", label: t("solana.stat1.label") },
    { value: "1.5k", label: t("solana.stat2.label") },
    { value: "50+", label: t("solana.stat3.label") },
  ];

  const cards = [
    {
      title: t("solana.card1.title"),
      description: t("solana.card1.desc"),
      link: "https://pt.w3d.community/search?q=solana",
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
    <section className="relative z-10 px-6 py-24" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            {t("solana.title")} <span className="text-gradient-green">{t("solana.highlight")}</span>
          </h2>

          <div className="mt-10 flex flex-wrap gap-8">
            {caseStats.map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="glow-card overflow-hidden"
            >
              {card.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground">{card.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
                {card.link && (
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-primary hover:underline"
                  >
                    {t("solana.viewMore")}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolanaCaseSection;
