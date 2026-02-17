import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-7xl">
          {t("hero.title1")}{" "}
          <br />
          <span className="text-gradient-green">Web3</span> {t("hero.title2")}
        </h1>

        <p className="mx-auto mt-6 max-w-xl font-body text-lg text-muted-foreground md:text-xl">
          {t("hero.subtitle")}{" "}
          <span className="text-primary font-medium">{t("hero.highlight")}</span>
        </p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <a
            href="https://discord.gg/web3dev"
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer-button"
          >
            <span>{t("hero.cta")}</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mt-16 w-full max-w-4xl"
      >
        <div className="relative overflow-hidden rounded-xl border border-border/30 shadow-2xl shadow-primary/5">
          <img
            src="https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/66552675a67896b4ce0946d7_discord_window.webp"
            srcSet="https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/66552675a67896b4ce0946d7_discord_window-p-500.webp 500w, https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/66552675a67896b4ce0946d7_discord_window-p-800.webp 800w, https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/66552675a67896b4ce0946d7_discord_window-p-1080.webp 1080w, https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/66552675a67896b4ce0946d7_discord_window.webp 1200w"
            sizes="(max-width: 1200px) 100vw, 1200px"
            alt="WEB3DEV Discord community showing active study groups and members"
            className="w-full"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
