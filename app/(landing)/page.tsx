import HeroSection from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/features";
import { PricingSection } from "@/components/landing/pricing";
import React from "react";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
    </>
  );
};

export default LandingPage;
