import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import BootcampCTA from "@/components/BootcampCTA";
import CommunityCTA from "@/components/CommunityCTA";
import SolanaCaseSection from "@/components/SolanaCaseSection";
import PartnersSection from "@/components/PartnersSection";
import TagsMarquee from "@/components/TagsMarquee";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <GridBackground />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <BootcampCTA />
        <CommunityCTA />
        <SolanaCaseSection />
        <PartnersSection />
        <TagsMarquee />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
