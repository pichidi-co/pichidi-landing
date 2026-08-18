import HeroSection from "@/components/landing/HeroSection/index";
import { FeaturesSection } from "@/components/landing/features";
import { PricingSection } from "@/components/landing/pricing";
import { SignUpSection } from "@/components/landing/SignUp";
import { FaqSection } from "@/components/landing/FAQ";
import VideoIntro from "@/components/landing/IntroSection/VideoIntro";
import React from "react";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <VideoIntro />
      <PricingSection />
      <SignUpSection />
      <FaqSection />
    </>
  );
};

export default LandingPage; 