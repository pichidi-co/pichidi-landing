// app/(landing)/page.tsx
import HeroSection from "@/components/landing/HeroSection/index";
import { StatsStrip } from "@/components/landing/StatsStrip";
import { FeaturesSection } from "@/components/landing/features";
import { LocationSection } from "@/components/landing/LocationSection";
import { AiAgentSection } from "@/components/landing/AiAgentSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ShowcaseSection } from "@/components/landing/Showcase";
import { CapabilitiesSection } from "@/components/landing/Capabilities";
import { ComparisonSection } from "@/components/landing/Comparison";
import { QrDemoSection } from "@/components/landing/QrDemo";
import { PricingSection } from "@/components/landing/pricing";
import { FaqSection } from "@/components/landing/FAQ";
import { FinalCtaSection } from "@/components/landing/FinalCta";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <FeaturesSection />
      <LocationSection />
      <AiAgentSection />
      <HowItWorks />
      <ShowcaseSection />
      <CapabilitiesSection />
      <ComparisonSection />
      <QrDemoSection />
      <PricingSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
};

export default LandingPage;
