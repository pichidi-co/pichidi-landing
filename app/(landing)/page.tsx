import HeroSection from "@/components/landing/HeroSection/index";
import { FeaturesSection } from "@/components/landing/features";
import { PricingSection } from "@/components/landing/pricing";
import { FaqSection } from "@/components/landing/FAQ";
import VideoIntro from "@/components/landing/IntroSection/VideoIntro";
import React from "react";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FaqSection />
      <VideoIntro />
    </>
  );
};

export default LandingPage;
