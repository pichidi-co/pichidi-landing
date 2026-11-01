"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "@/components/types/pricing";
import { getUnitPrice } from "@/components/constant/pricing";
import { formatToman } from "@/lib/format";
import { useConsult } from "@/components/providers/LandingProviders";

interface PricingCardProps {
  plan: PricingPlan;
  isYearly: boolean;
  className?: string;
}

export function PricingCard({ plan, isYearly, className }: PricingCardProps) {
  const { title, description, features, moreFeatures = [], buttonText, isPopular, badge, action } = plan;
  const [showMore, setShowMore] = useState(false);
  const { openConsult } = useConsult();

  const cycle = isYearly ? "yearly" : "monthly";
  const unit = getUnitPrice(plan, cycle);
  const badgeText = badge ? (isYearly && isPopular ? `${badge} 🎉` : badge) : null;

  const btnClass = cn(
    "mt-auto block w-full rounded-full py-2.5 sm:py-3 text-center font-semibold text-sm sm:text-base transition-all duration-300 cursor-pointer",
    isPopular
      ? "bg-primary text-secondary hover:bg-primary/90"
      : "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  );

  return (
    <div
      className={cn(
        "relative flex w-full max-w-[320px] sm:max-w-[350px] md:max-w-[378px] flex-col",
        "rounded-[25px] sm:rounded-[30px] bg-[#F6F5F5] p-5 sm:p-6 md:p-8",
        "shadow-[10px_10px_8px_rgba(0,0,0,0.2)] md:shadow-[14px_14px_10px_rgba(0,0,0,0.25)]",
        "transition-all duration-300 hover:-translate-y-2",
        isPopular && "ring-2 ring-primary",
        className,
      )}
    >
      {badgeText && (
        <div
          className="absolute right-0 top-0 flex items-center justify-center bg-[#F6C86A] px-4 text-xs sm:text-sm font-bold text-primary"
          style={{ width: 140, height: 44, borderTopRightRadius: 25, borderBottomLeftRadius: 40 }}
        >
          {badgeText}
        </div>
      )}

      <div className="mb-4 sm:mb-5 md:mb-6 mt-5 sm:mt-6 md:mt-7 text-center">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{title}</h3>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-500">
          {description}
          {isYearly && unit > 0 && " · پرداخت سالانه"}
        </p>
        <div className="mt-3 sm:mt-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`${plan.id}-${cycle}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="inline-block text-3xl sm:text-4xl md:text-5xl font-bold"
            >
              {unit === 0 ? "رایگان" : formatToman(unit)}
            </motion.span>
          </AnimatePresence>
          {unit > 0 && <span className="text-xs sm:text-sm text-gray-500"> تومان / ماه</span>}
        </div>
      </div>

      <ul className="mb-3 sm:mb-4 space-y-2.5 sm:space-y-3">
        {features.map((feature) => (
          <li key={feature.text} className="flex items-start gap-2.5 sm:gap-3 text-gray-700">
            <Image src={feature.icon} alt="" width={16} height={16} className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="text-xs sm:text-sm">{feature.text}</span>
          </li>
        ))}
      </ul>

      {moreFeatures.length > 0 && (
        <div className="mb-3 sm:mb-4 w-full">
          <button
            onClick={() => setShowMore(!showMore)}
            aria-expanded={showMore}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium transition-colors hover:text-primary/80 cursor-pointer"
          >
            <span>{showMore ? "مشاهده کمتر" : "مشاهده همه ویژگی‌ها"}</span>
            <svg
              className={cn("h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300", showMore && "rotate-180")}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <ul
            className={cn(
              "space-y-2 sm:space-y-3 overflow-hidden transition-all duration-300",
              showMore ? "mt-3 max-h-[500px] opacity-100" : "max-h-0 opacity-0",
            )}
          >
            {moreFeatures.map((feature) => (
              <li key={feature.text} className="flex items-start gap-2.5 sm:gap-3 text-gray-600">
                <Image src={feature.icon} alt="" width={16} height={16} className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 opacity-70" />
                <span className="text-xs sm:text-sm">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {action === "checkout" ? (
        <Link href={`/checkout?plan=${plan.id}&cycle=${cycle}`} className={btnClass}>
          {buttonText}
        </Link>
      ) : (
        <button onClick={() => openConsult(action === "signup" ? "free" : "consultation")} className={btnClass}>
          {buttonText}
        </button>
      )}
    </div>
  );
}
