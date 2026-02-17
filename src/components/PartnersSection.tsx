import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

import ledger from "@/assets/partners/ledger.webp";
import octopus from "@/assets/partners/octopus.webp";
import oneInch from "@/assets/partners/1inch.webp";
import ethereumBrasil from "@/assets/partners/ethereum-brasil.webp";
import helium from "@/assets/partners/helium.webp";
import filecoin from "@/assets/partners/filecoin.webp";
import near from "@/assets/partners/near.webp";
import dfinity from "@/assets/partners/dfinity.webp";
import solana from "@/assets/partners/solana.webp";
import algorand from "@/assets/partners/algorand.webp";
import polkadot from "@/assets/partners/polkadot.png";
import stellar from "@/assets/partners/stellar.png";

const partners = [
  { name: "Ledger", logo: ledger },
  { name: "Octopus Network", logo: octopus },
  { name: "1inch", logo: oneInch },
  { name: "Ethereum Brasil", logo: ethereumBrasil },
  { name: "Helium", logo: helium },
  { name: "Filecoin", logo: filecoin },
  { name: "NEAR", logo: near },
  { name: "Dfinity", logo: dfinity },
  { name: "Stellar", logo: stellar },
  { name: "Solana", logo: solana },
  { name: "Algorand", logo: algorand },
  { name: "Polkadot", logo: polkadot },
];

const PURPLE = "270 80% 60%";

const PartnersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useLanguage();

  return (
    <section className="relative z-10 px-6 py-12" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-xl"
        style={{
          background: `radial-gradient(ellipse at top left, hsl(${PURPLE} / 0.12) 0%, hsl(220 15% 8% / 0.95) 60%, hsl(220 20% 4%) 100%)`,
        }}
      >
        {/* Purple corner accent */}
        <div
          className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-10"
          style={{
            borderTop: `2px solid hsl(${PURPLE})`,
            borderLeft: `2px solid hsl(${PURPLE})`,
            borderTopLeftRadius: "0.75rem",
            boxShadow: `-4px -4px 20px hsl(${PURPLE} / 0.4), inset 3px 3px 12px hsl(${PURPLE} / 0.15)`,
          }}
        />
        <div
          className="absolute inset-0 rounded-xl pointer-events-none z-10"
          style={{
            boxShadow: `inset 1px 1px 0 0 hsl(${PURPLE} / 0.5), inset 0 0 0 1px hsl(${PURPLE} / 0.08)`,
          }}
        />

        <div className="grid md:grid-cols-[1fr_1.5fr] items-center gap-8 p-8 md:p-12 relative z-20">
          {/* Left: Title + Button */}
          <div className="flex flex-col items-start gap-6">
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl lg:text-4xl leading-tight">
              <span className="italic" style={{ color: `hsl(${PURPLE})` }}>
                {t("partners.title1")}
              </span>
              <br />
              {t("partners.title2")}
            </h2>
            <a
              href="https://calendly.com/anna-w3d/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 rounded-full font-semibold text-sm border transition-all duration-300"
              style={{
                borderColor: `hsl(${PURPLE})`,
                color: `hsl(${PURPLE})`,
              }}
            >
              {t("partners.cta")}
            </a>
          </div>

          {/* Right: Logo Grid */}
          <div className="grid grid-cols-3 items-center gap-8">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="flex items-center justify-center"
              >
                <img
                  src={p.logo}
                  alt={`${p.name} logo`}
                  className="h-12 w-auto max-w-[80px] object-contain md:h-14"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PartnersSection;
