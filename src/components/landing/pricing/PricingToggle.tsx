"use client";

import { cn } from "@/lib/utils";

interface PricingToggleProps {
  isYearly: boolean;
  onToggle: (value: boolean) => void;
}

export function PricingToggle({ isYearly, onToggle }: PricingToggleProps) {
  return (
    <div className="relative flex h-[87px] w-[435px] items-center rounded-[50px] bg-[#07437A] p-[7px]">
      <div
        className={cn(
          "absolute h-[73px] w-[207px] rounded-[50px] bg-[#B0C6D9] transition-all duration-300 ease-in-out",
          isYearly ? "left-[7px]" : "left-[calc(100%-214px)]",
        )}
      />

      <button
        onClick={() => onToggle(false)}
        className={cn(
          "relative z-10 h-full w-1/2 text-center text-2xl font-bold transition-colors duration-300 cursor-pointer",
          !isYearly ? "" : "text-white",
        )}
      >
        تعرفه ماهانه
      </button>

      <button
        onClick={() => onToggle(true)}
        className={cn(
          "relative z-10 h-full w-1/2 text-center text-2xl font-bold transition-colors duration-300",
          isYearly ? "" : "text-white",
        )}
      >
        تعرفه سالانه
      </button>
    </div>
  );
}