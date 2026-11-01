"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { UiPlan } from "@/lib/api/subscription/transformer";

interface PricingCardProps extends UiPlan {
  onPurchase?: (planId: string) => void;
  isPurchasing?: boolean;
  className?: string;
}

export function PricingCard({
  id,
  title,
  price,
  description,
  durationLabel,
  features,
  moreFeatures = [],
  buttonText,
  isPopular,
  badge,
  onPurchase,
  isPurchasing,
  className,
}: PricingCardProps) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      className={cn(
        "relative flex w-full max-w-[320px] sm:max-w-[350px] md:max-w-[378px] flex-col",
        "rounded-[25px] sm:rounded-[30px]",
        "bg-[#F6F5F5]",
        "p-5 sm:p-6 md:p-8",
        "shadow-[10px_10px_8px_rgba(0,0,0,0.2)] md:shadow-[14px_14px_10px_rgba(0,0,0,0.25)]",
        "transition-all duration-300",
        "hover:-translate-y-2 hover:shadow-[15px_15px_12px_rgba(0,0,0,0.25)] md:hover:shadow-[20px_20px_15px_rgba(0,0,0,0.3)]",
        isPopular && "ring-2 ring-primary",
        "h-auto",
        className,
      )}
    >
      {badge && (
        <div
          className={cn(
            "absolute right-0 top-0 flex items-center justify-center rounded-bl-[30px] rounded-tr-[25px] sm:rounded-tr-[30px] px-4 sm:px-5 md:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold",
            isPopular
              ? "bg-[#F6C86A] text-primary"
              : "bg-[#07437A] text-white",
          )}
          style={{
            minWidth: "120px",
            height: "44px",
            borderTopRightRadius: "25px",
            borderBottomLeftRadius: "40px",
          }}
        >
          {badge}
        </div>
      )}

      <div className="mb-4 sm:mb-5 md:mb-6 mt-5 sm:mt-6 md:mt-7 text-center">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          {title}
        </h3>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-500">
          {description}
        </p>
        <div className="mt-3 sm:mt-4 flex items-baseline justify-center gap-1">
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {price}
          </span>
          {price !== "رایگان" && (
            <span className="text-xs sm:text-sm text-gray-500">
              تومان / {durationLabel}
            </span>
          )}
        </div>
      </div>

      <ul className="mb-3 sm:mb-4 space-y-2.5 sm:space-y-3">
        {features.map((feature, index) => (
          <li
            key={`${feature.key}-${index}`}
            className="flex items-start gap-2.5 sm:gap-3 text-gray-700"
          >
            <div className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0">
              <Image
                src={feature.icon}
                alt={feature.text}
                width={16}
                height={16}
                className={cn(
                  "h-4 w-4 sm:h-5 sm:w-5",
                  feature.iconVariant === "x" && "opacity-40",
                )}
              />
            </div>
            <span className="text-xs sm:text-sm">{feature.text}</span>
          </li>
        ))}
      </ul>

      {moreFeatures.length > 0 && (
        <div className="mb-3 sm:mb-4 w-full text-left">
          <button
            onClick={() => setShowMore(!showMore)}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium transition-colors hover:text-primary/80 cursor-pointer"
          >
            <span>{showMore ? "مشاهده کمتر" : "مشاهده همه ویژگی‌ها"}</span>
            <svg
              className={cn(
                "h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300",
                showMore && "rotate-180",
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            className={cn(
              "mt-2 sm:mt-3 space-y-2 sm:space-y-3 overflow-hidden transition-all duration-300 text-left",
              showMore ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
            )}
          >
            {moreFeatures.map((feature, index) => (
              <li
                key={`${feature.key}-more-${index}`}
                className="flex items-start gap-2.5 sm:gap-3 text-gray-600"
              >
                <div className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0">
                  <Image
                    src={feature.icon}
                    alt={feature.text}
                    width={16}
                    height={16}
                    className={cn(
                      "h-4 w-4 sm:h-5 sm:w-5 opacity-70",
                      feature.iconVariant === "x" && "opacity-30",
                    )}
                  />
                </div>
                <span className="text-xs sm:text-sm">{feature.text}</span>
              </li>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => onPurchase?.(id)}
        disabled={isPurchasing}
        className={cn(
          "w-full rounded-full py-2.5 sm:py-3 font-semibold text-sm sm:text-base transition-all duration-300",
          isPopular
            ? "bg-primary text-secondary hover:bg-primary/90"
            : "border-2 border-primary text-primary hover:bg-primary hover:text-white",
          "mt-auto",
          isPurchasing && "opacity-60 cursor-not-allowed",
        )}
      >
        {isPurchasing ? "در حال انتقال..." : buttonText}
      </button>
    </div>
  );
}