import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "7.970+", label: "Membros no Discord" },
  { value: "1.820+", label: "Artigos Técnicos" },
  { value: "12k+", label: "Inscrições em Bootcamps" },
  { value: "792", label: "Graduações em Bootcamps" },
  { value: "700+", label: "Vídeos no YouTube" },
];

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative z-10 px-6 py-20">
      <div className="section-divider mx-auto mb-20 max-w-4xl" />
      <div ref={ref} className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-heading text-3xl font-bold text-primary md:text-4xl">
              {stat.value}
            </div>
            <div className="mt-2 font-body text-sm text-muted-foreground">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="section-divider mx-auto mt-20 max-w-4xl" />
    </section>
  );
};

export default StatsSection;
