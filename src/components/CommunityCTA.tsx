import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const CommunityCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section className="relative z-10 px-6 py-24">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="font-heading text-2xl font-bold text-foreground md:text-4xl">
          {t("community.title")} <span className="text-gradient-green">{t("community.highlight")}</span> {t("community.title2")}
        </h2>
        <div className="mt-8">
          <a
            href="https://discord.gg/web3dev"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-button inline-block"
          >
            {t("community.cta")}
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default CommunityCTA;
