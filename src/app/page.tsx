import { Suspense } from "react";
import HeroSection from "@/components/sections/HeroSection";
import ServicesMarquee from "@/components/sections/ServicesMarquee";
import LaunchSection from "@/components/sections/LaunchSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TelehealthSection from "@/components/sections/TelehealthSection";
import HealthCardSection from "@/components/sections/HealthCardSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import RolesSection from "@/components/sections/RolesSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import ExploreSection from "@/components/sections/ExploreSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesMarquee />
      <LaunchSection />
      <FeaturesSection />
      <TelehealthSection />
      <HealthCardSection />
      <HowItWorksSection />
      <RolesSection />
      {/* Streamed so a slow blog API never holds up the rest of the page (or navigation to it). */}
      <Suspense fallback={null}>
        <BlogSection />
      </Suspense>
      <ExploreSection />
      <ContactSection />
    </>
  );
}
