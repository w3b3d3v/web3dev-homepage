import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

type Language = "pt" | "en" | "es";

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
    "nav.learn": "Aprenda",
    "nav.calendar": "Calendário Web3",
    "nav.articles": "Artigos Web3",
    "nav.solidityGuide": "Guia Solidity",
    "nav.glossary": "Glossário Web3",
    "nav.blockchainStudy": "Estudo Blockchain",
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

    // About
    "about.hero.title": "História da",
    "about.hero.highlight": "Comunidade",
    "about.hero.subtitle": "Saiba como nossa comunidade cria valor através de",
    "about.hero.subtitleHighlight": "Educação Técnica Gratuita",

    // Timeline
    "timeline.viewMore": "Ver mais →",

    "timeline.2022.jan.month": "Janeiro",
    "timeline.2022.jan.title": "Pré-lançamento no Metaverso",
    "timeline.2022.jan.desc": "Primeiro registro Onchain da Comunidade no Metaverso Web3land, marcado por uma POAP exclusiva. Evento histórico para todos os presentes.",
    "timeline.2022.feb.month": "Fevereiro",
    "timeline.2022.feb.title": "Captação do Primeiro Grant na NEAR",
    "timeline.2022.feb.desc": "Dentre os muitos grants que realizamos inauguramos com a NEAR, focando em criação e tradução de conteúdo de qualidade e técnico para devs.",
    "timeline.2022.apr.month": "Abril",
    "timeline.2022.apr.title": "Lançamento primeiro Build",
    "timeline.2022.apr.desc": "Lançamento da plataforma de Build com bootcamp de smart contracts em Solidity e apresentação oficial da identidade visual.",
    "timeline.2022.oct.month": "Outubro",
    "timeline.2022.oct.title": "Crescimento exponencial",
    "timeline.2022.oct.desc": "Alcançamos 3 mil membros no Discord em menos de um ano, expandindo nossa comunidade para o idioma espanhol.",

    "timeline.2023.feb.month": "Fevereiro",
    "timeline.2023.feb.title": "Primeiro Funding",
    "timeline.2023.feb.desc": "Ganhamos um investimento significativo celebrado em Live, marcando um ano de sucesso com foco na educação e crescimento da comunidade.",
    "timeline.2023.mar.month": "Março",
    "timeline.2023.mar.title": "Festa da Comunidade no Rio de Janeiro",
    "timeline.2023.mar.desc": "Realizamos o primeiro encontro presencial no Rio de Janeiro, promovendo momentos inesquecíveis!",
    "timeline.2023.jun.month": "Junho",
    "timeline.2023.jun.title": "Primeiro bootcamp presencial",
    "timeline.2023.jun.desc": "Primeiro bootcamp presencial em parceria com Ethereum Brasil, apoiando hackers a criar aplicações inovadoras com Solidity.",
    "timeline.2023.aug.month": "Agosto",
    "timeline.2023.aug.title": "Ethereum Argentina",
    "timeline.2023.aug.desc": "Participação em eventos internacionais, incluindo o prestigiado Ethereum Argentina, destacando nossa presença global e engajamento.",
    "timeline.2023.sep.month": "Setembro",
    "timeline.2023.sep.title": "Co-produção Hackathon Hyperdrive",
    "timeline.2023.sep.desc": "Contribuímos com um dos maiores hackathons globais da Solana, oferecendo workshops e contemplando nossa comunidade com premiações nacionais.",

    "timeline.2024.jan.month": "Janeiro",
    "timeline.2024.jan.title": "Polkadot Academy",
    "timeline.2024.jan.desc": "Nosso time esteve presente no Polkadot Academy, fortalecendo laços com a comunidade global e absorvendo novos conhecimentos.",
    "timeline.2024.apr.month": "Abril",
    "timeline.2024.apr.title": "Grant da Stellar",
    "timeline.2024.apr.desc": "Conquistamos um grant da Stellar, que impulsionou nossas iniciativas educacionais e de inovação, trazendo mais recursos para capacitar desenvolvedores.",
    "timeline.2024.may.month": "Maio",
    "timeline.2024.may.title": "7.3 mil membros no Discord",
    "timeline.2024.may.desc": "Seguimos crescendo e alcançamos a marca de 7.3 mil membros no Discord, consolidando nosso papel como referência em educação Web3 para a América Latina.",
    "timeline.2024.jul.month": "Julho",
    "timeline.2024.jul.title": "Lançamento do Build de Rust",
    "timeline.2024.jul.desc": "Com apoio do grant da Polkadot, lançamos o Build de Rust, expandindo nossa oferta de cursos técnicos e fortalecendo nossa rede de devs especializados.",
    "timeline.2024.sep.month": "Setembro",
    "timeline.2024.sep.title": "Hackathon NFT Brasil",
    "timeline.2024.sep.desc": "Participamos na co-produção do Hackathon NFT Brasil, apoiando projetos inovadores e oferecendo mentoria especializada, workshops e palestras.",

    "timeline.2025.feb.month": "Fevereiro",
    "timeline.2025.feb.title": "Curso introdutório de Rust",
    "timeline.2025.feb.desc": "Criamos um curso introdutório gratuito de Rust no nosso canal do YouTube para aumentar a taxa de membros graduados e inscritos na Polkadot Academy (PBAx).",
    "timeline.2025.mar.month": "Março",
    "timeline.2025.mar.title": "Digital Assets — Blockchain.Rio",
    "timeline.2025.mar.desc": "Participamos do evento Digital Assets parte do projeto Blockchain.Rio in the road, com um Talk sobre Substrate e Governança na Polkadot.",
    "timeline.2025.may.month": "Maio",
    "timeline.2025.may.title": "Hackathon da TokenNation",
    "timeline.2025.may.desc": "Co-produzimos o Hackathon da TokenNation, oferecendo toda estrutura de eventos online e suporte para os Hackers, além do time de mentores.",
    "timeline.2025.jun1.month": "Junho",
    "timeline.2025.jun1.title": "Polkadot Cloud — Evento Presencial",
    "timeline.2025.jun1.desc": "Realizamos um evento presencial sobre Polkadot Cloud e as inovações do ecossistema para criação de computação descentralizada.",
    "timeline.2025.jun2.month": "Junho",
    "timeline.2025.jun2.title": "Palestra na UFSC",
    "timeline.2025.jun2.desc": "Palestra presencial sobre Computação Descentralizada na Polkadot Cloud, realizada na Universidade Federal de Santa Catarina.",
    "timeline.2025.jul.month": "Julho",
    "timeline.2025.jul.title": "Hack the Block — BlockchainRio",
    "timeline.2025.jul.desc": "Colaboramos na co-produção do Hack the Block, Hackathon do Blockchain.Rio, oferecendo monitoria especializada e materiais de suporte educacional.",
  },
  en: {
    // Navbar
    "nav.about": "About us",
    "nav.bootcamp": "Bootcamp",
    "nav.resources": "Resources",
    "nav.learn": "Learn",
    "nav.calendar": "Web3 Calendar",
    "nav.articles": "Web3 Articles",
    "nav.solidityGuide": "Solidity Guide",
    "nav.glossary": "Web3 Glossary",
    "nav.blockchainStudy": "Blockchain Study",
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

    // About
    "about.hero.title": "Community",
    "about.hero.highlight": "History",
    "about.hero.subtitle": "Learn how our community creates value through",
    "about.hero.subtitleHighlight": "Free Technical Education",

    // Timeline
    "timeline.viewMore": "View more →",

    "timeline.2022.jan.month": "January",
    "timeline.2022.jan.title": "Pre-launch in the Metaverse",
    "timeline.2022.jan.desc": "First Onchain record of the Community in the Web3land Metaverse, marked by an exclusive POAP. A historic event for all attendees.",
    "timeline.2022.feb.month": "February",
    "timeline.2022.feb.title": "First Grant at NEAR",
    "timeline.2022.feb.desc": "Among the many grants we secured, we started with NEAR, focusing on creating and translating quality technical content for developers.",
    "timeline.2022.apr.month": "April",
    "timeline.2022.apr.title": "First Build Launch",
    "timeline.2022.apr.desc": "Launch of the Build platform with a Solidity smart contracts bootcamp and the official presentation of our visual identity.",
    "timeline.2022.oct.month": "October",
    "timeline.2022.oct.title": "Exponential growth",
    "timeline.2022.oct.desc": "We reached 3,000 Discord members in less than a year, expanding our community to Spanish speakers.",

    "timeline.2023.feb.month": "February",
    "timeline.2023.feb.title": "First Funding",
    "timeline.2023.feb.desc": "We received a significant investment celebrated in a Live event, marking one year of success focused on education and community growth.",
    "timeline.2023.mar.month": "March",
    "timeline.2023.mar.title": "Community Party in Rio de Janeiro",
    "timeline.2023.mar.desc": "We held our first in-person meetup in Rio de Janeiro, creating unforgettable moments!",
    "timeline.2023.jun.month": "June",
    "timeline.2023.jun.title": "First in-person bootcamp",
    "timeline.2023.jun.desc": "First in-person bootcamp in partnership with Ethereum Brasil, supporting hackers to build innovative Solidity applications.",
    "timeline.2023.aug.month": "August",
    "timeline.2023.aug.title": "Ethereum Argentina",
    "timeline.2023.aug.desc": "Participation in international events, including the prestigious Ethereum Argentina, highlighting our global presence and engagement.",
    "timeline.2023.sep.month": "September",
    "timeline.2023.sep.title": "Hackathon Hyperdrive Co-production",
    "timeline.2023.sep.desc": "We contributed to one of Solana's largest global hackathons, offering workshops and awarding our community with national prizes.",

    "timeline.2024.jan.month": "January",
    "timeline.2024.jan.title": "Polkadot Academy",
    "timeline.2024.jan.desc": "Our team attended Polkadot Academy, strengthening ties with the global community and absorbing new knowledge.",
    "timeline.2024.apr.month": "April",
    "timeline.2024.apr.title": "Stellar Grant",
    "timeline.2024.apr.desc": "We secured a grant from Stellar, which boosted our educational and innovation initiatives, bringing more resources to empower developers.",
    "timeline.2024.may.month": "May",
    "timeline.2024.may.title": "7.3k members on Discord",
    "timeline.2024.may.desc": "We kept growing and reached 7,300 Discord members, consolidating our role as a Web3 education reference in Latin America.",
    "timeline.2024.jul.month": "July",
    "timeline.2024.jul.title": "Rust Build Launch",
    "timeline.2024.jul.desc": "With support from the Polkadot grant, we launched the Rust Build, expanding our technical course offerings and strengthening our network of specialized devs.",
    "timeline.2024.sep.month": "September",
    "timeline.2024.sep.title": "NFT Brasil Hackathon",
    "timeline.2024.sep.desc": "We co-produced the NFT Brasil Hackathon, supporting innovative projects and providing specialized mentorship, workshops, and talks.",

    "timeline.2025.feb.month": "February",
    "timeline.2025.feb.title": "Intro Rust Course",
    "timeline.2025.feb.desc": "We created a free introductory Rust course on our YouTube channel to increase the graduation rate and enrollment in Polkadot Academy (PBAx).",
    "timeline.2025.mar.month": "March",
    "timeline.2025.mar.title": "Digital Assets — Blockchain.Rio",
    "timeline.2025.mar.desc": "We participated in the Digital Assets event, part of the Blockchain.Rio in the road project, with a Talk on Substrate and Polkadot Governance.",
    "timeline.2025.may.month": "May",
    "timeline.2025.may.title": "TokenNation Hackathon",
    "timeline.2025.may.desc": "We co-produced the TokenNation Hackathon, providing the full online event infrastructure and support for Hackers, plus a team of mentors.",
    "timeline.2025.jun1.month": "June",
    "timeline.2025.jun1.title": "Polkadot Cloud — In-person Event",
    "timeline.2025.jun1.desc": "We hosted an in-person event about Polkadot Cloud and ecosystem innovations for creating decentralized computing.",
    "timeline.2025.jun2.month": "June",
    "timeline.2025.jun2.title": "Lecture at UFSC",
    "timeline.2025.jun2.desc": "In-person lecture on Decentralized Computing on Polkadot Cloud, held at the Federal University of Santa Catarina.",
    "timeline.2025.jul.month": "July",
    "timeline.2025.jul.title": "Hack the Block — BlockchainRio",
    "timeline.2025.jul.desc": "We collaborated in co-producing Hack the Block, the Blockchain.Rio Hackathon, offering specialized mentoring and educational support materials.",
  },
  es: {
    // Navbar
    "nav.about": "Sobre nosotros",
    "nav.bootcamp": "Bootcamp",
    "nav.resources": "Recursos",
    "nav.learn": "Aprende",
    "nav.calendar": "Calendario Web3",
    "nav.articles": "Artículos Web3",
    "nav.solidityGuide": "Guía Solidity",
    "nav.glossary": "Glosario Web3",
    "nav.blockchainStudy": "Estudio Blockchain",
    "nav.lang": "🇪🇸 ES",

    // Hero
    "hero.title1": "Nunca más estudies",
    "hero.title2": "solo",
    "hero.subtitle": "Únete a nuestra comunidad y domina tecnologías innovadoras a través de",
    "hero.highlight": "Educación Técnica Gratuita",
    "hero.cta": "Comenzar Viaje",

    // Features
    "features.0.title": "Grupos de Estudio en",
    "features.0.accent": "Comunidad",
    "features.0.desc": "Nuestros miembros tienen la oportunidad de convertirse en líderes de grupos de estudio, ganando reconocimiento y autoridad.",
    "features.1.title": "Métodos de Enseñanza",
    "features.1.accent": "Pioneros",
    "features.1.desc": "Metodología de enseñanza peer-to-peer (p2p) que favorece el aprendizaje autónomo y colaborativo.",
    "features.2.title": "Contenido Práctico y",
    "features.2.accent": "Técnico",
    "features.2.desc": "Nos enfocamos en contenido técnico y actualizado en Web3, preparándote para las demandas de este mercado en crecimiento.",
    "features.3.title": "Alianzas y Network",
    "features.3.accent": "Estratégico",
    "features.3.desc": "Accede a una red de socios en el mercado Web3 que patrocinan y empoderan desarrolladores.",

    // Stats
    "stats.discord": "Miembros en Discord",
    "stats.articles": "Artículos Técnicos",
    "stats.bootcampReg": "Inscripciones en Bootcamps",
    "stats.bootcampGrad": "Graduaciones en Bootcamps",
    "stats.videos": "Videos en YouTube",

    // Bootcamp CTA
    "bootcamp.title": "Sumérgete en el mundo de Rust y blockchain.",
    "bootcamp.highlight": "Domina el Polkadot SDK como un PRO",
    "bootcamp.cta": "Saber Más",

    // Community CTA
    "community.title": "Únete a la comunidad",
    "community.highlight": "WEB3DEV",
    "community.title2": "y sé parte del futuro de la tecnología",
    "community.cta": "Participar ahora",

    // Solana Case
    "solana.title": "Caso",
    "solana.highlight": "Solana",
    "solana.stat1.label": "Page Views Generadas",
    "solana.stat2.label": "Devs Impactados",
    "solana.stat3.label": "Graduados",
    "solana.card1.title": "Traducción y Educación",
    "solana.card1.desc": "Artículos técnicos en portugués y español.",
    "solana.card2.title": "Coproducción del Hackathon Hyperdrive 2023",
    "solana.card2.desc": "Talleres técnicos y soporte para equipos.",
    "solana.card3.title": "Bootcamps Especializados",
    "solana.card3.desc": "Creación de smart contracts, desarrollo de colecciones de NFTs y soluciones de pago.",
    "solana.card4.title": "Desarrollo de Talentos",
    "solana.card4.desc": "Red de más de 130 desarrolladores Solana formados.",
    "solana.card5.title": "Mira la Playlist",
    "solana.card5.desc": "Serie de videos sobre el ecosistema Solana.",
    "solana.viewMore": "Ver más →",

    // Partners
    "partners.title1": "Socios y Clientes",
    "partners.title2": "Nativos Web3",
    "partners.cta": "Saber Más →",

    // FAQ
    "faq.title": "FAQ",
    "faq.q1": "1. ¿Cómo conectar con el Discord de la Comunidad?",
    "faq.a1": "Para comenzar a interactuar con el servidor de WEB3DEV necesitas tener una cuenta en Discord. Si aún no tienes una, descarga la aplicación y crea tu cuenta. Si ya estás registrado, solo únete a nuestro servidor. Tendrás acceso inmediato a todos los canales después de completar el onboarding y la verificación.",
    "faq.q2": "2. ¿Cómo seguir los Grupos de Estudio?",
    "faq.a2": "Para conocer nuestros Grupos de Estudio, accede al canal \"choose your group\" en el Discord de la comunidad para liberar el acceso al grupo que desees, ver el historial del grupo, participar en las conversaciones y recibir notificaciones sobre los próximos encuentros.",
    "faq.q3": "3. ¿Hay requisitos para participar en los Grupos de Estudio?",
    "faq.a3": "Los Grupos de Estudio son 100% abiertos a cualquier miembro de la comunidad. Es importante que cada uno evalúe su propio nivel de conocimiento. Ofrecemos un ambiente inclusivo, con grupos de todos los niveles.",
    "faq.q4": "4. ¿Cómo hacer nuestros Bootcamps?",
    "faq.a4": "Accede a la plataforma de aprendizaje build.w3d.community, crea tu cuenta e inscríbete para tener acceso gratuito a los Bootcamps. Las lecciones son asíncronas y puedes completarlas a tu ritmo.",
    "faq.q5": "5. ¿Cuáles son las ventajas de completar los Bootcamps?",
    "faq.a5": "Tendrás acceso a un canal exclusivo en Discord con otros desarrolladores y contarás con el soporte de monitores y moderadores. Al terminar, recibes un NFT de certificación y serás reconocido como miembro graduado.",
    "faq.q6": "6. ¿Qué es Web3nar?",
    "faq.a6": "Web3nar es nuestra serie de webinars educativos, donde expertos comparten sus conocimientos sobre temas actuales en blockchain.",
    "faq.q7": "7. ¿Por qué publicar artículos en WEB3DEV?",
    "faq.a7": "Publicar artículos te ayuda a compartir tu conocimiento y construir tu reputación en el área técnica Web3. Es una excelente manera de documentar tu progreso y especializarte.",

    // Footer
    "footer.rights": "© 2024 WEB3DEV. Todos los derechos reservados.",

    // About
    "about.hero.title": "Historia de la",
    "about.hero.highlight": "Comunidad",
    "about.hero.subtitle": "Conoce cómo nuestra comunidad crea valor a través de",
    "about.hero.subtitleHighlight": "Educación Técnica Gratuita",

    // Timeline
    "timeline.viewMore": "Ver más →",

    "timeline.2022.jan.month": "Enero",
    "timeline.2022.jan.title": "Prelanzamiento en el Metaverso",
    "timeline.2022.jan.desc": "Primer registro Onchain de la Comunidad en el Metaverso Web3land, marcado por un POAP exclusivo. Evento histórico para todos los presentes.",
    "timeline.2022.feb.month": "Febrero",
    "timeline.2022.feb.title": "Captación del Primer Grant en NEAR",
    "timeline.2022.feb.desc": "Entre los muchos grants que realizamos, inauguramos con NEAR, enfocándonos en la creación y traducción de contenido de calidad técnico para devs.",
    "timeline.2022.apr.month": "Abril",
    "timeline.2022.apr.title": "Lanzamiento del primer Build",
    "timeline.2022.apr.desc": "Lanzamiento de la plataforma Build con bootcamp de smart contracts en Solidity y presentación oficial de la identidad visual.",
    "timeline.2022.oct.month": "Octubre",
    "timeline.2022.oct.title": "Crecimiento exponencial",
    "timeline.2022.oct.desc": "Alcanzamos 3 mil miembros en Discord en menos de un año, expandiendo nuestra comunidad al idioma español.",

    "timeline.2023.feb.month": "Febrero",
    "timeline.2023.feb.title": "Primer Funding",
    "timeline.2023.feb.desc": "Ganamos una inversión significativa celebrada en vivo, marcando un año de éxito con foco en la educación y crecimiento de la comunidad.",
    "timeline.2023.mar.month": "Marzo",
    "timeline.2023.mar.title": "Fiesta de la Comunidad en Río de Janeiro",
    "timeline.2023.mar.desc": "Realizamos el primer encuentro presencial en Río de Janeiro, ¡promoviendo momentos inolvidables!",
    "timeline.2023.jun.month": "Junio",
    "timeline.2023.jun.title": "Primer bootcamp presencial",
    "timeline.2023.jun.desc": "Primer bootcamp presencial en asociación con Ethereum Brasil, apoyando a los hackers a crear aplicaciones innovadoras con Solidity.",
    "timeline.2023.aug.month": "Agosto",
    "timeline.2023.aug.title": "Ethereum Argentina",
    "timeline.2023.aug.desc": "Participación en eventos internacionales, incluido el prestigioso Ethereum Argentina, destacando nuestra presencia global y compromiso.",
    "timeline.2023.sep.month": "Septiembre",
    "timeline.2023.sep.title": "Coproducción Hackathon Hyperdrive",
    "timeline.2023.sep.desc": "Contribuimos a uno de los mayores hackathons globales de Solana, ofreciendo workshops y premiando a nuestra comunidad con reconocimientos nacionales.",

    "timeline.2024.jan.month": "Enero",
    "timeline.2024.jan.title": "Polkadot Academy",
    "timeline.2024.jan.desc": "Nuestro equipo estuvo presente en Polkadot Academy, fortaleciendo lazos con la comunidad global y absorbiendo nuevos conocimientos.",
    "timeline.2024.apr.month": "Abril",
    "timeline.2024.apr.title": "Grant de Stellar",
    "timeline.2024.apr.desc": "Obtuvimos un grant de Stellar que impulsó nuestras iniciativas educativas y de innovación, trayendo más recursos para capacitar desarrolladores.",
    "timeline.2024.may.month": "Mayo",
    "timeline.2024.may.title": "7.3 mil miembros en Discord",
    "timeline.2024.may.desc": "Seguimos creciendo y alcanzamos la marca de 7.3 mil miembros en Discord, consolidando nuestro papel como referencia en educación Web3 en Latinoamérica.",
    "timeline.2024.jul.month": "Julio",
    "timeline.2024.jul.title": "Lanzamiento del Build de Rust",
    "timeline.2024.jul.desc": "Con apoyo del grant de Polkadot, lanzamos el Build de Rust, ampliando nuestra oferta de cursos técnicos y fortaleciendo nuestra red de devs especializados.",
    "timeline.2024.sep.month": "Septiembre",
    "timeline.2024.sep.title": "Hackathon NFT Brasil",
    "timeline.2024.sep.desc": "Participamos en la coproducción del Hackathon NFT Brasil, apoyando proyectos innovadores y ofreciendo mentoría especializada, workshops y charlas.",

    "timeline.2025.feb.month": "Febrero",
    "timeline.2025.feb.title": "Curso introductorio de Rust",
    "timeline.2025.feb.desc": "Creamos un curso introductorio gratuito de Rust en nuestro canal de YouTube para aumentar la tasa de miembros graduados e inscritos en Polkadot Academy (PBAx).",
    "timeline.2025.mar.month": "Marzo",
    "timeline.2025.mar.title": "Digital Assets — Blockchain.Rio",
    "timeline.2025.mar.desc": "Participamos en el evento Digital Assets, parte del proyecto Blockchain.Rio in the road, con una charla sobre Substrate y Gobernanza en Polkadot.",
    "timeline.2025.may.month": "Mayo",
    "timeline.2025.may.title": "Hackathon de TokenNation",
    "timeline.2025.may.desc": "Coproducimos el Hackathon de TokenNation, ofreciendo toda la estructura de eventos online y soporte para los Hackers, además del equipo de mentores.",
    "timeline.2025.jun1.month": "Junio",
    "timeline.2025.jun1.title": "Polkadot Cloud — Evento Presencial",
    "timeline.2025.jun1.desc": "Realizamos un evento presencial sobre Polkadot Cloud y las innovaciones del ecosistema para la creación de computación descentralizada.",
    "timeline.2025.jun2.month": "Junio",
    "timeline.2025.jun2.title": "Conferencia en la UFSC",
    "timeline.2025.jun2.desc": "Conferencia presencial sobre Computación Descentralizada en Polkadot Cloud, realizada en la Universidad Federal de Santa Catarina.",
    "timeline.2025.jul.month": "Julio",
    "timeline.2025.jul.title": "Hack the Block — BlockchainRio",
    "timeline.2025.jul.desc": "Colaboramos en la coproducción de Hack the Block, Hackathon de Blockchain.Rio, ofreciendo mentoría especializada y materiales de apoyo educacional.",
  },
};

// Map URL locale to Language type
export const LANG_URL_MAP: Record<string, Language> = {
  "pt-BR": "pt",
  "en-US": "en",
  "es": "es",
};

// Map Language to URL segment
export const LANG_TO_URL: Record<Language, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es",
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>("pt");

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

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
