import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import ShimmerButton from "@/components/ShimmerButton";
import discordWindow from "@/assets/discord-window.webp";
import discordWindow500 from "@/assets/discord-window-500.webp";
import discordWindow800 from "@/assets/discord-window-800.webp";
import discordWindow1080 from "@/assets/discord-window-1080.webp";
import homepageMp4 from "@/assets/video/homepage.mp4";
import homepageWebm from "@/assets/video/homepage.webm";

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
            src={discordWindow}
            srcSet={`${discordWindow500} 500w, ${discordWindow800} 800w, ${discordWindow1080} 1080w, ${discordWindow} 1200w`}
            sizes="(max-width: 1200px) 100vw, 1200px"
            alt="WEB3DEV Discord community"
            className="home-hero-image"
            loading="lazy"
          />
          <div className="home-hero-video">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              ref={(el) => { if (el) { el.muted = true; el.play().catch(() => {}); } }}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            >
              <source src={homepageMp4} type="video/mp4" />
              <source src={homepageWebm} type="video/webm" />
            </video>
          </div>
        </address>
      </motion.div>
    </section>
  );
};

export default HeroSection;
