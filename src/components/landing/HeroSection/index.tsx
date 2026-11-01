// components/HeroSection/HeroSection.tsx
import React from "react";
import HeroTitle from "./HeroTitle";
import HeroDescription from "./HeroDescription";
import HeroButtons from "./HeroButtons";
import { HeroVisual } from "./HeroVisual";

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 pt-28 sm:pt-32 md:pt-36 scroll-mt-28 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
        <div className="md:order-1 space-y-4 sm:space-y-6">
          <HeroTitle />
          <HeroDescription />
          <div className="h-2 sm:h-4" />
          <HeroButtons />
        </div>

        <div className="md:order-2 flex items-center justify-center mt-8 md:mt-0">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
