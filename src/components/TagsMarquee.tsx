import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const tags = [
  { label: "BLOCKCHAIN", variant: "green" },
  { label: "DEFI", variant: "blue" },
  { label: "SMART CONTRACTS", variant: "darkgreen" },
  { label: "SOLIDITY", variant: "purple" },
  { label: "POLKADOT", variant: "green" },
  { label: "DAPPS", variant: "darkgreen" },
  { label: "NFTs", variant: "blue" },
  { label: "DAOs", variant: "green" },
  { label: "RUST", variant: "purple" },
  { label: "BLOCKCHAIN", variant: "green" },
  { label: "SMART CONTRACTS", variant: "darkgreen" },
  { label: "SOLIDITY", variant: "purple" },
  { label: "POLKADOT", variant: "green" },
  { label: "DAPPS", variant: "darkgreen" },
  { label: "NFTs", variant: "blue" },
  { label: "DAOs", variant: "green" },
  { label: "RUST", variant: "purple" },
];

const variantStyles: Record<string, string> = {
  green: "bg-[hsl(145_100%_50%)] text-[hsl(160_60%_15%)]",
  blue: "bg-[hsl(210_80%_65%)] text-[hsl(220_40%_20%)]",
  darkgreen: "bg-[hsl(160_60%_40%)] text-[hsl(160_60%_12%)]",
  purple: "bg-[hsl(270_80%_60%)] text-[hsl(270_40%_15%)]",
};

const TagsMarquee = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative z-10 overflow-hidden py-8">
      <motion.div
        style={{ x }}
        className="flex gap-4 w-max"
      >
        {tags.map((tag, i) => (
          <div
            key={i}
            className={`flex items-center justify-center px-8 py-3 rounded-[3rem] font-heading font-bold text-lg whitespace-nowrap ${variantStyles[tag.variant]}`}
          >
            {tag.label}
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default TagsMarquee;
