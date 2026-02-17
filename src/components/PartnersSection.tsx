import { motion, useInView } from "framer-motion";
import ShimmerButton from "@/components/ShimmerButton";
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
    <section className="relative z-10 py-4" ref={ref}>
      {/* padding-global */}
      <div className="px-10 max-[991px]:px-8 max-[767px]:px-6 max-[479px]:mt-8">
        {/* container-large */}
        <div className="block w-full max-w-[78rem] mx-auto max-[479px]:max-w-none">
          {/* grid-item cta-wrapper */}
          <motion.div
            initial={{ opacity: 0, x: "-1rem" }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative flex overflow-clip w-full flex-row gap-[0.4rem] rounded-[1.5rem]
              my-32 min-h-[30rem] justify-between items-center
              max-[767px]:flex-col max-[767px]:pt-8 max-[767px]:px-0 max-[767px]:pb-0
              max-[479px]:min-h-[34.5rem] max-[479px]:my-[3.9rem] max-[479px]:pt-0 max-[479px]:flex-col"
            style={{
              border: `1px solid hsl(${PURPLE})`,
              backgroundColor: "rgba(14, 14, 14, 0.9)",
            }}
          >
            {/* text_wrapper */}
            <div className="flex flex-col justify-start items-start flex-1 gap-6 pr-8 pl-14 max-[767px]:pb-14 max-[767px]:flex-[0_1_auto] max-[479px]:p-6">
              <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl lg:text-4xl leading-tight">
                <span className="italic" style={{ color: `hsl(${PURPLE})` }}>
                  {t("partners.title1")}
                </span>
                <br />
                {t("partners.title2")}
              </h2>
              <ShimmerButton href="https://calendly.com/anna-w3d/" target="_blank" rel="noopener noreferrer">
                {t("partners.cta")}
              </ShimmerButton>
            </div>

            {/* image_wrapper is--partners */}
            <div className="relative z-[1] self-stretch flex-1 grid grid-cols-3 place-items-center gap-4 py-6
              max-[479px]:px-8 max-[479px]:gap-8">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
