"use client";

import { cn } from "@/lib/utils";

interface PricingToggleProps {
  isYearly: boolean;
  onToggle: (value: boolean) => void;
}

export function PricingToggle({ isYearly, onToggle }: PricingToggleProps) {
  return (
    <div className="relative flex h-[72px] sm:h-[80px] md:h-[87px] w-[340px] sm:w-[390px] md:w-[435px] items-center rounded-[40px] sm:rounded-[45px] md:rounded-[50px] bg-[#07437A] p-[6px] sm:p-[7px] flex-shrink-0 mx-auto">
      <div
        className={cn(
          "absolute h-[60px] sm:h-[66px] md:h-[73px] w-[160px] sm:w-[185px] md:w-[207px] rounded-[40px] sm:rounded-[45px] md:rounded-[50px] bg-[#B0C6D9] transition-all duration-300 ease-in-out",
          isYearly
            ? "left-[6px] sm:left-[7px]"
            : "left-[calc(100%-166px)] sm:left-[calc(100%-192px)] md:left-[calc(100%-214px)]",
        )}
      />

      <button
        onClick={() => onToggle(false)}
        className={cn(
          "relative z-10 h-full w-1/2 text-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold transition-colors duration-300 cursor-pointer",
          !isYearly ? "text-[#07437A]" : "text-white",
        )}
      >
        تعرفه ماهانه
      </button>

      <button
        onClick={() => onToggle(true)}
        className={cn(
          "relative z-10 h-full w-1/2 text-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold transition-colors duration-300",
          isYearly ? "text-[#07437A]" : "text-white",
        )}
      >
        تعرفه سالانه
      </button>
    </div>
  );
}