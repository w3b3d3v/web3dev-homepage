import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import solanaClassroom from "@/assets/solana-classroom.webp";
import bootcampClass from "@/assets/bootcamp-class.webp";
import developersTable from "@/assets/developers-table.webp";
import solanaThumbnail from "@/assets/solana-thumbnail.webp";

const SolanaCaseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const caseStats = [
    { value: "4.9k", label: "Page Views Geradas" },
    { value: "1.5k", label: "Devs Impactados" },
    { value: "50+", label: "Graduados" },
  ];

  const cards = [
    {
      title: "Tradução e Educação",
      description: "Artigos técnicos em português e espanhol.",
      link: "https://pt.w3d.community/search?q=solana",
    },
    {
      title: "Co-produção do Hackathon Hyperdrive 2023",
      description: "Workshops técnicos e suporte para equipes.",
      image: solanaClassroom,
    },
    {
      title: "Bootcamps Especializados",
      description: "Criação de smart contracts, desenvolvimento de coleções de NFTs e solução de pagamentos.",
      image: bootcampClass,
    },
    {
      title: "Desenvolvimento de Talentos",
      description: "Rede de mais de 130 desenvolvedores Solana formados.",
      image: developersTable,
    },
    {
      title: "Assista a Playlist",
      description: "Série de vídeos sobre o ecosistema Solana.",
      image: solanaThumbnail,
      link: "https://youtube.com/playlist?list=PLVX4xVoD65UOnAi_8t69_s7Dh4WiTziS2",
    },
  ];

  return (
    <section className="relative z-10 px-6 py-24" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Case <span className="text-gradient-green">Solana</span>
          </h2>

          {/* Stats row */}
          <div className="mt-10 flex flex-wrap gap-8">
            {caseStats.map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="glow-card overflow-hidden"
            >
              {card.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground">{card.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
                {card.link && (
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-primary hover:underline"
                  >
                    Ver mais →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolanaCaseSection;
