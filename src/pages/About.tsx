import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TagsMarquee from "@/components/TagsMarquee";
import AboutTimeline from "@/components/AboutTimeline";
import { useLanguage } from "@/contexts/LanguageContext";
import danielCukier from "@/assets/about/daniel-cukier.jpg";
import yanLuiz from "@/assets/about/yan-luiz.jpg";
import annaBida from "@/assets/about/anna-bida.avif";

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="page-wrapper relative min-h-screen overflow-x-hidden bg-background">
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
        <section className="px-10 max-lg:px-8 max-md:px-6 max-[479px]:mt-8">
          <div className="mx-auto w-full max-w-[78rem]">
            <div
              className="relative flex overflow-clip min-h-[30rem] my-32 max-[479px]:my-[3.9rem] max-[479px]:min-h-[34.5rem] justify-between items-center rounded-[1.5rem] border border-primary/30 max-md:flex-col max-md:pt-8 max-[479px]:pt-0"
              style={{ backgroundColor: "rgba(14, 14, 14, 0.9)" }}
            >
              <div className="grid flex-1 self-stretch grid-cols-3 gap-4 max-lg:grid-cols-2 max-lg:gap-8 max-[479px]:grid-cols-1">
                {[
                  {
                    name: "Daniel Cukier",
                    image: danielCukier,
                    bio: "Developer since 1995, in crypto since 2016.",
                    roles: ["Founder of Playax", "CTO of Elo7", "CTO of Pravaler", "PhD in Computer Science"],
                  },
                  {
                    name: "Yan Luiz",
                    image: yanLuiz,
                    bio: "Developer since 2014, in crypto since 2016.",
                    roles: ["Youtuber", "Solidity and Rust Teacher", "Blockchain Developer", "Web Analytics"],
                  },
                  {
                    name: "Anna Bida",
                    image: annaBida,
                    bio: "Entrepreneur since 2015.",
                    roles: ["Project Manager", "Community Manager", "Digital Marketing", "Educator"],
                  },
                ].map((person) => (
                  <div key={person.name} className="flex flex-col items-center justify-center gap-8 px-2 max-lg:pb-8 max-[479px]:pb-4 max-[479px]:gap-4">
                    <img
                      src={person.image}
                      alt={person.name}
                      width={119}
                      className="rounded-full object-cover"
                      loading="lazy"
                    />
                    <h4 className="font-system text-sm font-semibold text-foreground">{person.name}</h4>
                    <div className="text-sm text-muted-foreground text-center leading-relaxed">
                      {person.bio}
                      <br /><br />
                      {person.roles.map((role, i) => (
                        <span key={role}>
                          {role}
                          {i < person.roles.length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <TagsMarquee />
      <Footer hideGallery />
    </div>
  );
};

export default About;
