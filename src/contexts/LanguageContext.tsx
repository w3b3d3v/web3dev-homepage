import { createContext, useContext, useState, ReactNode } from "react";

type Language = "pt" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Navbar
    "nav.about": "Sobre nós",
    "nav.bootcamp": "Bootcamp",
    "nav.resources": "Recursos",
    "nav.articles": "Artigos",
    "nav.youtube": "YouTube",
    "nav.web3nars": "Web3nars",
    "nav.lang": "🇧🇷 PT-BR",

    // Hero
    "hero.title1": "Nunca mais estude",
    "hero.title2": "sozinho",
    "hero.subtitle": "Entre na nossa comunidade e domine tecnologias inovadoras através de",
    "hero.highlight": "Educação Técnica Gratuita",
    "hero.cta": "Começar Jornada",

    // Features
    "features.0.title": "Grupos de Estudo em",
    "features.0.accent": "Comunidade",
    "features.0.desc": "Nossos membros têm a oportunidade de evoluir para líderes de grupos de estudos ganhando reconhecimento e autoridade.",
    "features.1.title": "Métodos de Ensino",
    "features.1.accent": "Pioneiros",
    "features.1.desc": "Metodologia de ensino peer-to-peer (p2p) que favorece o aprendizado autônomo e colaborativo.",
    "features.2.title": "Conteúdo Prático e",
    "features.2.accent": "Técnico",
    "features.2.desc": "Focamos em conteúdo técnico e atualizado em Web3, preparando você para as demandas desse mercado em crescimento.",
    "features.3.title": "Parcerias e Network",
    "features.3.accent": "Estratégico",
    "features.3.desc": "Acesse uma rede de parceiros no mercado Web3 que patrocinam e empoderam desenvolvedores.",

    // Stats
    "stats.discord": "Membros no Discord",
    "stats.articles": "Artigos Técnicos",
    "stats.bootcampReg": "Inscrições em Bootcamps",
    "stats.bootcampGrad": "Graduações em Bootcamps",
    "stats.videos": "Vídeos no YouTube",

    // Bootcamp CTA
    "bootcamp.title": "Mergulhe no mundo de Rust e blockchain.",
    "bootcamp.highlight": "Domine o Polkadot SDK como um PRO",
    "bootcamp.cta": "Saber Mais",

    // Community CTA
    "community.title": "Entre para comunidade",
    "community.highlight": "WEB3DEV",
    "community.title2": "e faça parte do futuro da tecnologia",
    "community.cta": "Participar agora",

    // Solana Case
    "solana.title": "Case",
    "solana.highlight": "Solana",
    "solana.stat1.label": "Page Views Geradas",
    "solana.stat2.label": "Devs Impactados",
    "solana.stat3.label": "Graduados",
    "solana.card1.title": "Tradução e Educação",
    "solana.card1.desc": "Artigos técnicos em português e espanhol.",
    "solana.card2.title": "Co-produção do Hackathon Hyperdrive 2023",
    "solana.card2.desc": "Workshops técnicos e suporte para equipes.",
    "solana.card3.title": "Bootcamps Especializados",
    "solana.card3.desc": "Criação de smart contracts, desenvolvimento de coleções de NFTs e solução de pagamentos.",
    "solana.card4.title": "Desenvolvimento de Talentos",
    "solana.card4.desc": "Rede de mais de 130 desenvolvedores Solana formados.",
    "solana.card5.title": "Assista a Playlist",
    "solana.card5.desc": "Série de vídeos sobre o ecosistema Solana.",
    "solana.viewMore": "Ver mais →",

    // Partners
    "partners.title1": "Parceiros & Clientes",
    "partners.title2": "Nativos Web3",
    "partners.cta": "Saiba Mais →",

    // FAQ
    "faq.title": "FAQ",
    "faq.q1": "1. Como conectar com o Discord da Comunidade?",
    "faq.a1": "Para começar a interagir com o servidor da WEB3DEV você precisa ter uma conta no Discord. Se ainda não tem, baixe o aplicativo e crie sua conta. Se já está cadastrado, basta acessar nosso servidor. Você terá acesso imediato a todos os canais após fazer o onboarding e o processo de verificação.",
    "faq.q2": "2. Como acompanhar os Grupos de Estudos?",
    "faq.a2": "Para conhecer nossos Grupos de Estudos, acesse o canal \"choose your group\" no Discord da comunidade para liberar o acesso ao grupo que você desejar e liberar o histórico do grupo, participar das conversas e receber notificações sobre os próximos encontros.",
    "faq.q3": "3. Existem requisitos para participar dos Grupos de Estudos?",
    "faq.a3": "Os Grupos de Estudos são 100% abertos a qualquer membro da comunidade. É importante que cada um avalie seu próprio nível de conhecimento. Oferecemos um ambiente inclusivo, com grupos de todos os níveis.",
    "faq.q4": "4. Como fazer nossos Bootcamps?",
    "faq.a4": "Acesse a plataforma de aprendizado build.w3d.community, crie sua conta e inscreva-se para ter acesso gratuito aos Bootcamps. As lições são assíncronas e você pode completar no seu ritmo.",
    "faq.q5": "5. Quais são as vantagens de completar os Bootcamps?",
    "faq.a5": "Você terá acesso a um canal exclusivo no Discord com outros desenvolvedores e contará com o suporte de monitores e moderadores. Quando terminar, você ganha um NFT de certificação e será reconhecido como membro graduado.",
    "faq.q6": "6. O que é Web3nar?",
    "faq.a6": "Web3nar é nossa série de webinars educacionais, onde especialistas compartilham seus conhecimentos sobre temas atuais em blockchain.",
    "faq.q7": "7. Por que publicar artigos na WEB3DEV?",
    "faq.a7": "Publicar artigos ajuda você a compartilhar seu conhecimento e a construir sua reputação na área técnica Web3. É uma ótima maneira de documentar seu progresso e se especializar.",

    // Footer
    "footer.rights": "© 2024 WEB3DEV. Todos os direitos reservados.",
  },
  en: {
    // Navbar
    "nav.about": "About us",
    "nav.bootcamp": "Bootcamp",
    "nav.resources": "Resources",
    "nav.articles": "Articles",
    "nav.youtube": "YouTube",
    "nav.web3nars": "Web3nars",
    "nav.lang": "🇺🇸 EN-US",

    // Hero
    "hero.title1": "Never study",
    "hero.title2": "alone again",
    "hero.subtitle": "Master Technologies with Our",
    "hero.highlight": "Free Technical Education",
    "hero.cta": "Start Journey",

    // Features
    "features.0.title": "Study Groups in",
    "features.0.accent": "Community",
    "features.0.desc": "Our members can become study group leaders, gaining recognition and influence.",
    "features.1.title": "Teaching Pioneer",
    "features.1.accent": "Methods",
    "features.1.desc": "Peer-to-peer (p2p) teaching methodology that favors practical and interactive learning.",
    "features.2.title": "Technical and",
    "features.2.accent": "Practical Content",
    "features.2.desc": "We focus on technical and up-to-date Web3 content, preparing you for the demands of this growing market.",
    "features.3.title": "Strategic Partnerships",
    "features.3.accent": "and Network",
    "features.3.desc": "Access a network of Web3 partners that sponsor and support developers.",

    // Stats
    "stats.discord": "Discord Members",
    "stats.articles": "Technical Articles",
    "stats.bootcampReg": "Bootcamp Registrations",
    "stats.bootcampGrad": "Graduations in Bootcamps",
    "stats.videos": "Videos on YouTube",

    // Bootcamp CTA
    "bootcamp.title": "Deep Dive in the Rust and blockchain world.",
    "bootcamp.highlight": "Dominate Polkadot SDK like a PRO",
    "bootcamp.cta": "Join Now",

    // Community CTA
    "community.title": "Join the community",
    "community.highlight": "WEB3DEV",
    "community.title2": "and be part of the future of technology",
    "community.cta": "Participate now",

    // Solana Case
    "solana.title": "Solana",
    "solana.highlight": "case",
    "solana.stat1.label": "Page Views Generated",
    "solana.stat2.label": "Devs Impacted",
    "solana.stat3.label": "Graduates",
    "solana.card1.title": "Translation and Education",
    "solana.card1.desc": "Technical articles in Portuguese and Spanish.",
    "solana.card2.title": "Co-production of the Hyperdrive 2023 Hackathon",
    "solana.card2.desc": "Technical workshops and support for teams.",
    "solana.card3.title": "Specialized Bootcamps",
    "solana.card3.desc": "Creation of smart contracts, development of NFT collections and payment solutions.",
    "solana.card4.title": "Talent Development",
    "solana.card4.desc": "Network of more than 130 trained Solana developers.",
    "solana.card5.title": "Watch the Playlist",
    "solana.card5.desc": "Series of videos about the Solana ecosystem.",
    "solana.viewMore": "View more →",

    // Partners
    "partners.title1": "Partners & Customers",
    "partners.title2": "Web3 Natives",
    "partners.cta": "Learn More →",

    // FAQ
    "faq.title": "FAQ",
    "faq.q1": "1. How to connect with the Community Discord?",
    "faq.a1": "To start interacting with the WEB3DEV server, you need to have a Discord account. If you don't have one yet, download the app and create your account. If you're already registered, just join our server. You'll gain immediate access to all channels after completing the onboarding and verification process.",
    "faq.q2": "2. How to follow the Study Groups?",
    "faq.a2": "To explore our Study Groups, go to the \"choose your group\" channel on our community Discord. There you can unlock access to the group of your choice, view the chat history, join the conversations, and get notifications about upcoming sessions.",
    "faq.q3": "3. Are there requirements to participate in Study Groups?",
    "faq.a3": "The Study Groups are 100% open to any member of the community. It's up to each person to evaluate their own knowledge level. We offer an inclusive environment with groups at all levels to support your technical learning journey.",
    "faq.q4": "4. How to do our Bootcamps?",
    "faq.a4": "Visit our learning platform at build.w3d.community, create your account, and enroll for free access to our Bootcamps. Lessons are asynchronous, so you can complete them at your own pace.",
    "faq.q5": "5. What are the advantages of completing Bootcamps?",
    "faq.a5": "You'll have access to an exclusive Discord channel with other developers and receive support from moderators and study monitors. Once you complete the bootcamp, you'll receive a certification NFT and be recognized as a graduated member.",
    "faq.q6": "6. What is Web3nar?",
    "faq.a6": "Web3nar is our series of educational webinars where experts share knowledge about current blockchain topics.",
    "faq.q7": "7. Why publish articles on WEB3DEV?",
    "faq.a7": "Publishing articles helps you share your knowledge and build your reputation in the Web3 technical space. It's a great way to document your progress and deepen your expertise.",

    // Footer
    "footer.rights": "© 2024 WEB3DEV. All rights reserved.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("pt");

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
