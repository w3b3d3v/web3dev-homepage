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

const PartnersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useLanguage();

  return (
    <section className="relative z-10 px-6 py-24" ref={ref}>
      <div className="mx-auto max-w-7xl text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="font-heading text-3xl font-bold text-foreground md:text-4xl"
        >
          <span className="text-primary italic">{t("partners.title1")}</span> {t("partners.title2")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mt-4"
        >
          <a
            href="https://calendly.com/anna-w3d/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            {t("partners.cta")}
          </a>
        </motion.div>

        <div className="mt-14 grid grid-cols-3 items-center gap-8 sm:grid-cols-4 md:grid-cols-6">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="flex items-center justify-center grayscale opacity-60 transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <img
                src={p.logo}
                alt={`${p.name} logo`}
                className="h-10 w-auto max-w-[100px] object-contain md:h-12"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
