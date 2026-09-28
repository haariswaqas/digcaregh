import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HealthCardSection from "@/components/sections/HealthCardSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import RolesSection from "@/components/sections/RolesSection";
import WaitlistSection from "@/components/sections/WaitlistSection";
import ContactSection from "@/components/sections/ContactSection";
import ExploreSection from "@/components/sections/ExploreSection";
import BlogSection from "@/components/sections/BlogSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <AboutSection /> */}
      <FeaturesSection />
      <HealthCardSection />
      <HowItWorksSection />
      <RolesSection />
      {/* <WaitlistSection /> */}
      <BlogSection />
      <ContactSection />
      <ExploreSection />
    </>
  );
}