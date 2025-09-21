import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { TransformSection } from "@/components/sections/TransformSection";
import { EbookSection } from "@/components/sections/EbookSection";
import { CourseSection } from "@/components/sections/CourseSection";
import { Footer } from "@/components/sections/Footer";
import { PricingSection } from "@/components/sections/PricingSection";
import { WhoBenefitsSection } from "@/components/sections/WhoBenefitsSection";
import { CourseContentSection } from "@/components/sections/CourseContentSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <HeroSection />
        <TransformSection />
        <EbookSection />
        {/* <PricingSection /> */}
        <WhoBenefitsSection />
        <CourseContentSection />
        <CourseSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
