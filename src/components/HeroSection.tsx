import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import ShimmerButton from "@/components/ShimmerButton";

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
        <h1 className="font-heading text-5xl font-black leading-tight text-foreground sm:text-6xl md:text-[5rem]">
          {t("hero.title1")}{" "}
          <br />
          <span className="text-gradient-green">Web3</span> {t("hero.title2")}
        </h1>

        <p className="mx-auto mt-6 max-w-xl font-body text-xl text-muted-foreground md:text-[1.6rem]">
          {t("hero.subtitle")}{" "}
          <span className="text-primary font-medium">{t("hero.highlight")}</span>
        </p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <ShimmerButton href="https://discord.gg/web3dev" target="_blank" rel="noopener noreferrer">
            {t("hero.cta")}
          </ShimmerButton>
        </motion.div>
      </motion.div>

      {/* Hero Window */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        className="home_hero_window relative z-10 mt-16"
      >
        <address className="home-hero-image-wrapper">
          <img
            src="https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/66552675a67896b4ce0946d7_discord_window.webp"
            srcSet="https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/66552675a67896b4ce0946d7_discord_window-p-500.webp 500w, https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/66552675a67896b4ce0946d7_discord_window-p-800.webp 800w, https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/66552675a67896b4ce0946d7_discord_window-p-1080.webp 1080w, https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/66552675a67896b4ce0946d7_discord_window.webp 1200w"
            sizes="(max-width: 1200px) 100vw, 1200px"
            alt="WEB3DEV Discord community"
            className="home-hero-image"
            loading="lazy"
          />
          <div className="home-hero-video">
            <video autoPlay loop muted playsInline style={{ objectFit: 'cover', width: '100%', height: '100%' }}>
              <source src="https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c%2F66927760f10e84623efcdf06_homepage-transcode.mp4" type="video/mp4" />
              <source src="https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c%2F66927760f10e84623efcdf06_homepage-transcode.webm" type="video/webm" />
            </video>
          </div>
        </address>
      </motion.div>
    </section>
  );
};

export default HeroSection;
