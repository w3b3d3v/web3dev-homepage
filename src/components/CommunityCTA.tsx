import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import developersTable from "@/assets/developers-table.webp";

const CommunityCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section className="relative z-10 px-6 py-12">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-xl"
        style={{
          background: "radial-gradient(ellipse at top left, hsl(145 100% 50% / 0.08) 0%, hsl(220 15% 8% / 0.95) 60%, hsl(220 20% 4%) 100%)",
        }}
      >
        {/* Green corner accent */}
        <div
          className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10"
          style={{
            borderTop: "2px solid hsl(145 100% 50%)",
            borderLeft: "2px solid hsl(145 100% 50%)",
            borderTopLeftRadius: "0.75rem",
            boxShadow: "-4px -4px 20px hsl(145 100% 50% / 0.4), inset 3px 3px 12px hsl(145 100% 50% / 0.15)",
          }}
        />
        <div
          className="absolute inset-0 rounded-xl pointer-events-none z-10"
          style={{
            boxShadow: "inset 1px 1px 0 0 hsl(145 100% 50% / 0.5), inset 0 0 0 1px hsl(145 100% 50% / 0.08)",
          }}
        />

        <div className="grid md:grid-cols-2 items-center">
          {/* Text */}
          <div className="p-8 md:p-12 order-2 md:order-1">
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl lg:text-4xl leading-tight">
              {t("community.title")}{" "}
              <span className="text-gradient-green italic">{t("community.highlight")}</span>{" "}
              {t("community.title2")}
            </h2>
            <div className="mt-6">
              <a
                href="https://discord.gg/web3dev"
                target="_blank"
                rel="noopener noreferrer"
                className="glow-button inline-block"
              >
                {t("community.cta")}
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="h-64 md:h-80 overflow-hidden order-1 md:order-2">
            <img
              src={developersTable}
              alt="WEB3DEV community members"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CommunityCTA;
