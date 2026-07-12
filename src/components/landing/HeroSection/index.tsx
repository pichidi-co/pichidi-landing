// components/HeroSection/HeroSection.tsx
import React from "react";
import HeroTitle from "./HeroTitle";
import HeroDescription from "./HeroDescription";
import HeroButtons from "./HeroButtons";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 mt-6 sm:mt-8 md:mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
        {/* سمت چپ - محتوای متنی و دکمه‌ها */}
        <div className="md:order-1 space-y-4 sm:space-y-6">
          <HeroTitle />
          <HeroDescription />
          <div className="h-2 sm:h-4" />
          <HeroButtons />
        </div>

        {/* سمت راست - عکس با هاله دایره‌ای */}
        <div className="md:order-2 flex items-center justify-center mt-8 md:mt-0">
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] xl:w-[522px] xl:h-[550px]">
            {/* هاله دایره‌ای */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, #2B9ADA 29.12%, #65B6E4 40.96%, #A9D6F0 54.52%, #DDEFF9 72.6%, #FFFFFF 90.24%)",
                transform: "scale(1.3) sm:scale(1.4)",
              }}
            ></div>

            {/* عکس */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-900 z-10">
              <Image
                src="/images/charactor/IMG_7113 1 (3).png"
                alt="سامانه حضور و غیاب هوشمند"
                fill
                className="object-contain p-2"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;