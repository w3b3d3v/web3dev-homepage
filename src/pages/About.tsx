import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TagsMarquee from "@/components/TagsMarquee";
import AboutTimeline from "@/components/AboutTimeline";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <GridBackground />
      <Navbar />
      <main className="pt-32 pb-24">
        {/* Hero */}
        <section className="px-6 text-center mb-16">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[80px] font-black text-foreground">
            {t("about.hero.title")}{" "}
            <span className="text-gradient-green">{t("about.hero.highlight")}</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("about.hero.subtitle")}{" "}
            <span className="text-primary">{t("about.hero.subtitleHighlight")}</span>
          </p>
        </section>

        <AboutTimeline />

        {/* Stats */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {[
              { value: "7.970+", label: t("stats.discord") },
              { value: "1.820+", label: t("stats.articles") },
              { value: "12k+", label: t("stats.bootcampReg") },
              { value: "792", label: t("stats.bootcampGrad") },
              { value: "700+", label: t("stats.videos") },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-3xl md:text-4xl font-black text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Founders */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Daniel Cukier",
                image: "https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/6871436eab2a07f357ccb4bd_daniel%20cukier.jpg",
                bio: "Developer since 1995, in crypto since 2016.",
                roles: ["Founder of Playax", "CTO of Elo7", "CTO of Pravaler", "PhD in Computer Science"],
              },
              {
                name: "Yan Luiz",
                image: "https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/687143cd6b733a6ba7e88e8f_yan%20luiz.jpeg",
                bio: "Developer since 2014, in crypto since 2016.",
                roles: ["Youtuber", "Solidity and Rust Teacher", "Blockchain Developer", "Web Analytics"],
              },
              {
                name: "Anna Bida",
                image: "https://cdn.prod.website-files.com/62a8ec427bc5320b15a57b9c/671a1708fb4a8cb0f02b8e94_Anna%20Bida.avif",
                bio: "Entrepreneur since 2015.",
                roles: ["Project Manager", "Community Manager", "Digital Marketing", "Educator"],
              },
            ].map((person) => (
              <div key={person.name} className="glow-card p-6 text-center">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  loading="lazy"
                />
                <h4 className="font-heading text-lg font-semibold text-foreground">{person.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{person.bio}</p>
                <ul className="mt-3 space-y-1">
                  {person.roles.map((role) => (
                    <li key={role} className="text-xs text-muted-foreground">{role}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <TagsMarquee />
      <Footer hideGallery />
    </div>
  );
};

export default About;
