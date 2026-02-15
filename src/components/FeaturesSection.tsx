import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import studyGroup from "@/assets/study-group.webp";
import studentsDesk from "@/assets/students-desk.webp";
import bootcampGroup from "@/assets/bootcamp-group.webp";

const FeatureCard = ({
  title,
  titleAccent,
  description,
  image,
  imageAlt,
  index,
}: {
  title: string;
  titleAccent: string;
  description: string;
  image?: string;
  imageAlt?: string;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`glow-card overflow-hidden ${image ? "row-span-2" : ""}`}
    >
      {image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={imageAlt || title}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6 md:p-8">
        <h3 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
          {title} <span className="text-primary italic">{titleAccent}</span>
        </h3>
        <p className="mt-3 font-body text-sm text-muted-foreground leading-relaxed md:text-base">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      title: "Grupos de Estudo em",
      titleAccent: "Comunidade",
      description:
        "Nossos membros têm a oportunidade de evoluir para líderes de grupos de estudos ganhando reconhecimento e autoridade.",
      image: studyGroup,
      imageAlt: "Developer studying at computer with community",
    },
    {
      title: "Métodos de Ensino",
      titleAccent: "Pioneiros",
      description:
        "Metodologia de ensino peer-to-peer (p2p) que favorece o aprendizado autônomo e colaborativo.",
    },
    {
      title: "Conteúdo Prático e",
      titleAccent: "Técnico",
      description:
        "Focamos em conteúdo técnico e atualizado em Web3, preparando você para as demandas desse mercado em crescimento.",
    },
    {
      title: "Parcerias e Network",
      titleAccent: "Estratégico",
      description:
        "Acesse uma rede de parceiros no mercado Web3 que patrocinam e empoderam desenvolvedores.",
      image: bootcampGroup,
      imageAlt: "Bootcamp group photo",
    },
  ];

  return (
    <section id="features" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Large card left */}
          <div className="lg:col-span-1">
            <FeatureCard {...features[0]} index={0} />
          </div>

          {/* Two smaller cards stacked */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <FeatureCard {...features[1]} index={1} />
            <FeatureCard {...features[2]} index={2} />
          </div>

          {/* Large card right */}
          <div className="lg:col-span-1">
            <FeatureCard {...features[3]} index={3} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
