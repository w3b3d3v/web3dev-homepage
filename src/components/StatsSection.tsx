import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useLanguage();

  const stats = [
    { value: "7.970+", label: t("stats.discord") },
    { value: "1.820+", label: t("stats.articles") },
    { value: "12k+", label: t("stats.bootcampReg") },
    { value: "792", label: t("stats.bootcampGrad") },
    { value: "700+", label: t("stats.videos") },
  ];

  return (
    <section className="relative z-10">
      <div className="container-large">
        <div className="community-stats-padding">
          <div ref={ref} className="community-stats">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="community-stats-wrapper"
              >
                <div className="community-heading is-green">{stat.value}</div>
                <p className="community-description">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
