// components/HeroSection/HeroButtons.tsx
"use client";

import React from "react";

const HeroButtons: React.FC = () => {
  const handleClick = (type: string) => {
    console.log(`دکمه ${type} کلیک شد`);
  };

  return (
    <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 justify-center md:justify-start items-center rtl">
      {/* دکمه اول - درخواست دمو رایگان */}
      <button
        onClick={() => handleClick("demo")}
        className="group relative bg-secondary px-4 sm:px-5 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-4 rounded-[30px] font-iranyekan text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 flex items-center gap-2 md:gap-3 cursor-pointer w-[160px] sm:w-[190px] md:w-[220px] lg:w-[240px] justify-center"
        style={{
          backgroundColor: "#FDD47B",
          border: "2px solid #FAC56E",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <span className="whitespace-nowrap">درخواست دمو رایگان</span>
        <span className="absolute inset-0 rounded-[30px] bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-yellow-600/50 group-hover:w-3/4 transition-all duration-300"></span>
      </button>

      {/* دکمه دوم - درخواست مشاوره رایگان */}
      <button
        onClick={() => handleClick("consult")}
        className="group relative bg-secondary px-4 sm:px-5 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-4 rounded-[30px] font-iranyekan text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 flex items-center gap-2 md:gap-3 cursor-pointer w-[160px] sm:w-[190px] md:w-[220px] lg:w-[240px] justify-center"
        style={{
          backgroundColor: "#FDD281",
          border: "2px solid #FAC56E",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <span className="whitespace-nowrap">درخواست مشاوره رایگان</span>
        <span className="absolute inset-0 rounded-[30px] bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-yellow-600/50 group-hover:w-3/4 transition-all duration-300"></span>
      </button>
    </div>
  );
};

export default HeroButtons;
