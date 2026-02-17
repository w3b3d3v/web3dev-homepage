import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TimelineEvent {
  month: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  videoId?: string;
}

interface TimelineYear {
  year: string;
  events: TimelineEvent[];
}

const TimelineEventItem = ({ event, index }: { event: TimelineEvent; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-15% 0px -15% 0px" });

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_auto_1fr] gap-0 md:gap-8 items-start min-h-[180px]">
      {/* Left: empty on even, content on odd */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.2, x: -10 }}
        transition={{ duration: 0.5 }}
        className="pr-4 md:pr-8 text-right"
      >
        {index % 2 === 0 ? (
          <div className="flex flex-col items-end">
            <span className="text-primary font-heading font-semibold text-base">{event.month}</span>
            <h3 className="font-heading text-lg font-semibold text-foreground mt-1">{event.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
            {event.link && (
              <a href={event.link} target="_blank" rel="noopener noreferrer" className="shimmer-button mt-3 inline-block text-xs">
                <span>Ver mais →</span>
              </a>
            )}
          </div>
        ) : null}
      </motion.div>

      {/* Center: dot */}
      <div className="relative flex items-start justify-center w-8 pt-1">
        <motion.div
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0.3 }}
          transition={{ duration: 0.4 }}
          className="w-3 h-3 rounded-full border-2 border-primary z-10"
          style={{
            background: isInView ? "hsl(145 100% 50%)" : "transparent",
            boxShadow: isInView ? "0 0 12px hsl(145 100% 50% / 0.6)" : "none",
          }}
        />
      </div>

      {/* Right: content on even, media on odd */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.2, x: 10 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="pl-4 md:pl-8"
      >
        {index % 2 === 0 ? (
          event.image ? (
            <div className="overflow-hidden rounded-lg border border-border/50">
              <img src={event.image} alt={event.title} className="w-full h-40 md:h-48 object-cover" loading="lazy" />
            </div>
          ) : event.videoId ? (
            <div className="overflow-hidden rounded-lg border border-border/50 aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${event.videoId}`}
                title={event.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          ) : null
        ) : (
          <div className="flex flex-col">
            <span className="text-primary font-heading font-semibold text-base">{event.month}</span>
            <h3 className="font-heading text-lg font-semibold text-foreground mt-1">{event.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
            {event.image && (
              <div className="mt-3 overflow-hidden rounded-lg border border-border/50">
                <img src={event.image} alt={event.title} className="w-full h-40 md:h-48 object-cover" loading="lazy" />
              </div>
            )}
            {event.videoId && !event.image && (
              <div className="mt-3 overflow-hidden rounded-lg border border-border/50 aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${event.videoId}`}
                  title={event.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            )}
            {event.link && (
              <a href={event.link} target="_blank" rel="noopener noreferrer" className="shimmer-button mt-3 inline-block text-xs">
                <span>Ver mais →</span>
              </a>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

const YearMarker = ({ year }: { year: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_auto_1fr] gap-0 md:gap-8 items-center">
      <motion.div
        animate={isInView ? { opacity: 1 } : { opacity: 0.3 }}
        className="text-right pr-4 md:pr-8"
      >
        <h2 className="font-heading text-4xl md:text-5xl font-black text-primary">{year}</h2>
      </motion.div>
      <div className="relative flex items-center justify-center w-8">
        <motion.div
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0.3 }}
          className="w-4 h-4 rounded-full border-2 border-primary z-10"
          style={{
            background: isInView ? "hsl(145 100% 50%)" : "transparent",
            boxShadow: isInView ? "0 0 16px hsl(145 100% 50% / 0.7)" : "none",
          }}
        />
      </div>
      <div className="pl-4 md:pl-8" />
    </div>
  );
};

const AboutTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  const timelineData: TimelineYear[] = [
    {
      year: "2022",
      events: [
        {
          month: "Janeiro",
          title: "Pré-lançamento no Metaverso",
          description: "Primeiro registro Onchain da Comunidade no Metaverso Web3land, marcado por uma POAP exclusiva. Evento histórico para todos os presentes.",
          image: "https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/66927989b9caea629b2bea95_poap.webp",
          link: "https://collectors.poap.xyz/drop/24766",
        },
        {
          month: "Fevereiro",
          title: "Captação do Primeiro Grant na NEAR",
          description: "Dentre os muitos grants que realizamos inauguramos com a NEAR, focando em criação e tradução de conteúdo de qualidade e técnico para devs.",
          videoId: "Yt6wovZLgf4",
          link: "https://pt.w3d.community/lorenzobattistela/near-por-tras-dos-panos-2n4g",
        },
        {
          month: "Abril",
          title: "Lançamento primeiro Build",
          description: "Lançamento da plataforma de Build com bootcamp de smart contracts em Solidity e apresentação oficial da identidade visual.",
          videoId: "QRjrWEVGgno",
          link: "https://www.youtube.com/live/gunQidhjgcs",
        },
        {
          month: "Outubro",
          title: "Crescimento exponencial",
          description: "Alcançamos 3 mil membros no Discord em menos de um ano, expandindo nossa comunidade para o idioma espanhol.",
          image: "https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/642c46919276b08970e98da8_chart%20(7).png",
        },
      ],
    },
    {
      year: "2023",
      events: [
        {
          month: "Fevereiro",
          title: "Primeiro Funding",
          description: "Ganhamos um investimento significativo celebrado em Live, marcando um ano de sucesso com foco na educação e crescimento da comunidade.",
          videoId: "Jeo0p0D8ayQ",
        },
        {
          month: "Março",
          title: "Festa da Comunidade no Rio de Janeiro",
          description: "Realizamos o primeiro encontro presencial no Rio de Janeiro, promovendo momentos inesquecíveis!",
          image: "https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/6658a0793bf07775a6fb1659_Foto_Comuniidade.webp",
        },
        {
          month: "Junho",
          title: "Primeiro bootcamp presencial",
          description: "Primeiro bootcamp presencial em parceria com Ethereum Brasil, apoiando hackers a criar aplicações inovadoras com Solidity.",
          image: "https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/671a10700822921f7ae7e255_DSC06607%20(1).avif",
        },
        {
          month: "Agosto",
          title: "Ethereum Argentina",
          description: "Participação em eventos internacionais, incluindo o prestigiado Ethereum Argentina, destacando nossa presença global e engajamento.",
          videoId: "kOjqCf3vfhs",
        },
        {
          month: "Setembro",
          title: "Co-produção Hackathon Hyperdrive",
          description: "Contribuímos com um dos maiores hackathons globais da Solana, oferecendo workshops e contemplando nossa comunidade com premiações nacionais.",
          videoId: "kHg2EmVUARw",
        },
      ],
    },
    {
      year: "2024",
      events: [
        {
          month: "Janeiro",
          title: "Polkadot Academy",
          description: "Nosso time esteve presente no Polkadot Academy, fortalecendo laços com a comunidade global e absorvendo novos conhecimentos.",
          image: "https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/671a11395f6dc5add0605d57_Polkadot%202.avif",
        },
        {
          month: "Abril",
          title: "Grant da Stellar",
          description: "Conquistamos um grant da Stellar, que impulsionou nossas iniciativas educacionais e de inovação, trazendo mais recursos para capacitar desenvolvedores.",
          videoId: "fGMI2m73Cn8",
        },
        {
          month: "Maio",
          title: "7.3 mil membros no Discord",
          description: "Seguimos crescendo e alcançamos a marca de 7.3 mil membros no Discord, consolidando nosso papel como referência em educação Web3 para a América Latina.",
          image: "https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/671b5a27bd9291c05e53538d_graph2024.avif",
        },
        {
          month: "Julho",
          title: "Lançamento do Build de Rust",
          description: "Com apoio do grant da Polkadot, lançamos o Build de Rust, expandindo nossa oferta de cursos técnicos e fortalecendo nossa rede de devs especializados.",
          videoId: "ROioE9Tlrmc",
          link: "https://www.w3d.community/build",
        },
        {
          month: "Setembro",
          title: "Hackathon NFT Brasil",
          description: "Participamos na co-produção do Hackathon NFT Brasil, apoiando projetos inovadores e oferecendo mentoria especializada, workshops e palestras.",
          image: "https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/671a12557ac63201e58db37c_Hackathon%20NFT%20Brasil.avif",
        },
      ],
    },
    {
      year: "2025",
      events: [
        {
          month: "Fevereiro",
          title: "Curso introdutório de Rust",
          description: "Criamos um curso introdutório gratuito de Rust no nosso canal do YouTube para aumentar a taxa de membros graduados e inscritos na Polkadot Academy (PBAx).",
          videoId: "18sCFMicV-4",
        },
        {
          month: "Março",
          title: "Digital Assets — Blockchain.Rio",
          description: "Participamos do evento Digital Assets parte do projeto Blockchain.Rio in the road, com um Talk sobre Substrate e Governança na Polkadot.",
          image: "https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/68712321b6c4a2e445f9306b_digital%20assets%20(1).png",
        },
        {
          month: "Maio",
          title: "Hackathon da TokenNation",
          description: "Co-produzimos o Hackathon da TokenNation, oferecendo toda estrutura de eventos online e suporte para os Hackers, além do time de mentores.",
          image: "https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/6870ec14e76ce1fc594df616_TOKENNATION_%40mayarabarbosa_-2218.jpg",
        },
        {
          month: "Junho",
          title: "Polkadot Cloud — Evento Presencial",
          description: "Realizamos um evento presencial sobre Polkadot Cloud e as inovações do ecossistema para criação de computação descentralizada.",
          image: "https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/68711e9dd6dc81cc5db19409_Talk%20founders%20haus.png",
        },
        {
          month: "Junho",
          title: "Palestra na UFSC",
          description: "Palestra presencial sobre Computação Descentralizada na Polkadot Cloud, realizada na Universidade Federal de Santa Catarina.",
          image: "https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/687146bef959fd83c843e0c3_ufsc%20(1).png",
        },
        {
          month: "Julho",
          title: "Hack the Block — BlockchainRio",
          description: "Colaboramos na co-produção do Hack the Block, Hackathon do Blockchain.Rio, oferecendo monitoria especializada e materiais de suporte educacional.",
          videoId: "bK9DA2BB7aM",
        },
      ],
    },
  ];

  let eventCounter = 0;

  return (
    <section ref={sectionRef} className="relative z-10 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="relative flex flex-col gap-12">
          {/* Background track */}
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 max-[767px]:left-[6px] max-[767px]:translate-x-0"
            style={{ width: "3px", backgroundColor: "rgb(65, 65, 65)", zIndex: -2 }}
          />
          {/* Progress bar */}
          <motion.div
            className="absolute left-1/2 top-0 -translate-x-1/2 origin-top max-[767px]:left-[6px] max-[767px]:translate-x-0"
            style={{
              width: "3px",
              height: lineHeight,
              opacity: lineOpacity,
              zIndex: -1,
              backgroundImage: "linear-gradient(180deg, #DC1FFF, #7B61FF 29%, #1E90FF 71%, #00FF66)",
            }}
          />

          {timelineData.map((yearGroup) => (
            <div key={yearGroup.year} className="flex flex-col gap-12">
              <YearMarker year={yearGroup.year} />
              {yearGroup.events.map((event) => {
                const idx = eventCounter++;
                return <TimelineEventItem key={`${yearGroup.year}-${event.month}-${event.title}`} event={event} index={idx} />;
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTimeline;
