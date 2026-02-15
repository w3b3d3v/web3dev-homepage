import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BootcampCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative z-10 px-6 py-24">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="glow-card mx-auto max-w-4xl overflow-hidden p-12 text-center md:p-16"
        style={{
          boxShadow: "0 0 60px hsl(145 100% 50% / 0.06), inset 0 1px 0 hsl(145 100% 50% / 0.1)",
        }}
      >
        <h2 className="font-heading text-2xl font-bold text-foreground md:text-4xl">
          Mergulhe no mundo de Rust e blockchain.{" "}
          <span className="text-gradient-green">Domine o Polkadot SDK como um PRO</span>
        </h2>
        <div className="mt-8">
          <a
            href="https://www.w3d.community/build"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-button inline-block"
          >
            Saber Mais
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default BootcampCTA;
