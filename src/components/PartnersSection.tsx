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
    <section className="relative z-10 my-32 px-10 max-[991px]:px-8 max-[767px]:px-6 max-[479px]:mt-8" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-[78rem] overflow-hidden flex flex-col md:flex-row items-center justify-between"
        style={{
          minHeight: "30rem",
          border: `1px solid hsl(${PURPLE})`,
          borderRadius: "1.5rem",
          backgroundColor: "rgba(14, 14, 14, 0.9)",
        }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 w-full">
          {/* Left: Title + Button */}
          <div className="flex flex-col items-start gap-6 md:w-2/5 shrink-0">
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
              className="shimmer-button"
            >
              <span>{t("partners.cta")}</span>
            </a>
          </div>

          {/* Right: Logo Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 items-center gap-8 md:w-3/5">
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
