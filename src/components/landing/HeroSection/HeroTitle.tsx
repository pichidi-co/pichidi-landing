// components/HeroSection/HeroTitle.tsx
import React from "react";
import Image from "next/image";

const HeroTitle: React.FC = () => {
  return (
    <div className="relative w-full rtl">
      {/* بخش تایتل */}
      <div className="text-center space-y-3 sm:space-y-4">
        {/* عکس بالای تایتل - سمت راست */}
        <div className="flex justify-start md:justify-center lg:justify-start pl-2 sm:pl-4 md:pl-0">
          <Image
            src="/images/hero/پیچیدی.svg"
            alt="پیچیدی"
            width={150}
            height={150}
            className="object-contain w-32 sm:w-40 md:w-48 lg:w-52"
            priority
          />
        </div>

        <h1
          className="font-nozha"
          style={{
            fontWeight: 700,
            fontStyle: "Bold",
            fontSize: "clamp(28px, 8vw, 64px)",
            lineHeight: "1.1",
            letterSpacing: "0%",
            textAlign: "center",
            verticalAlign: "middle",
            color: "#1F2965",
          }}
        >
          پیچیدی میفهمه، کِی پیچیدی!
        </h1>
      </div>
    </div>
  );
};

export default HeroTitle;