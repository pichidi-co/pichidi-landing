// components/HeroSection/HeroTitle.tsx
import React from "react";
import Image from "next/image";

const HeroTitle: React.FC = () => {
  return (
    <div className="relative w-full rtl">
      {/* بخش تایتل */}
      <div className="text-center space-y-4 mb-8">
        {/* عکس بالای تایتل - سمت راست */}
        <div className="flex justify-start md:justify-center lg:justify-start pl-4 md:pl-0">
          <Image
            src="/images/hero/پیچیدی.svg"
            alt="پیچیدی"
            width={200}
            height={200}
            className="object-contain"
            priority
          />
        </div>

        <p
          className="font-nozha"
          style={{
            fontWeight: 700,
            fontStyle: "Bold",
            fontSize: "64px",
            lineHeight: "100%",
            letterSpacing: "0%",
            textAlign: "center",
            verticalAlign: "middle",
            color: "#1F2965",
          }}
        >
          پیچیدی میفهمه، کِی پیچیدی!
        </p>
      </div>
    </div>
  );
};

export default HeroTitle;
