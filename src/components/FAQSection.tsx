import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "1. Como conectar com o Discord da Comunidade?",
    answer:
      'Para começar a interagir com o servidor da WEB3DEV você precisa ter uma conta no Discord. Se ainda não tem, baixe o aplicativo e crie sua conta. Se já está cadastrado, basta acessar nosso servidor. Você terá acesso imediato a todos os canais após fazer o onboarding e o processo de verificação.',
  },
  {
    question: "2. Como acompanhar os Grupos de Estudos?",
    answer:
      'Para conhecer nossos Grupos de Estudos, acesse o canal "choose your group" no Discord da comunidade para liberar o acesso ao grupo que você desejar e liberar o histórico do grupo, participar das conversas e receber notificações sobre os próximos encontros.',
  },
  {
    question: "3. Existem requisitos para participar dos Grupos de Estudos?",
    answer:
      "Os Grupos de Estudos são 100% abertos a qualquer membro da comunidade. É importante que cada um avalie seu próprio nível de conhecimento. Oferecemos um ambiente inclusivo, com grupos de todos os níveis.",
  },
  {
    question: "4. Como fazer nossos Bootcamps?",
    answer:
      "Acesse a plataforma de aprendizado build.w3d.community, crie sua conta e inscreva-se para ter acesso gratuito aos Bootcamps. As lições são assíncronas e você pode completar no seu ritmo.",
  },
  {
    question: "5. Quais são as vantagens de completar os Bootcamps?",
    answer:
      "Você terá acesso a um canal exclusivo no Discord com outros desenvolvedores e contará com o suporte de monitores e moderadores. Quando terminar, você ganha um NFT de certificação e será reconhecido como membro graduado.",
  },
  {
    question: "6. O que é Web3nar?",
    answer:
      "Web3nar é nossa série de webinars educacionais, onde especialistas compartilham seus conhecimentos sobre temas atuais em blockchain.",
  },
  {
    question: "7. Por que publicar artigos na WEB3DEV?",
    answer:
      "Publicar artigos ajuda você a compartilhar seu conhecimento e a construir sua reputação na área técnica Web3. É uma ótima maneira de documentar seu progresso e se especializar.",
  },
];

const FAQItem = ({ item, index }: { item: typeof faqData[0]; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-border/50"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left font-heading text-sm font-medium text-foreground transition-colors hover:text-primary md:text-base"
      >
        {item.question}
        <ChevronDown
          className={`ml-4 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
      </div>
    </motion.div>
  );
};

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative z-10 px-6 py-24" ref={ref}>
      <div className="mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="mb-10 font-heading text-3xl font-bold text-foreground md:text-4xl"
        >
          FAQ
        </motion.h2>

        {isInView && faqData.map((item, i) => (
          <FAQItem key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
