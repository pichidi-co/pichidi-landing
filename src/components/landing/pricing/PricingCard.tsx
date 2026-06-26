"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { PricingPlan } from "@/components/types/pricing";

type PricingCardProps = PricingPlan & {
  className?: string;
};

export function PricingCard({
  title,
  price,
  description,
  features,
  moreFeatures = [],
  buttonText,
  isPopular,
  badge,
  className,
}: PricingCardProps) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      className={cn(
        "relative flex w-full max-w-[378px] flex-col",
        "rounded-[30px]",
        "bg-[#F6F5F5]",
        "p-8",
        "shadow-[14px_14px_10px_rgba(0,0,0,0.25)]",
        "transition-all duration-300",
        "hover:-translate-y-2 hover:shadow-[20px_20px_15px_rgba(0,0,0,0.3)]",
        isPopular && "ring-2 ring-primary",
        "h-auto",
        className,
      )}
    >
      {badge && (
        <div
          className="absolute right-0 top-0 flex items-center justify-center rounded-bl-[30px] rounded-tr-[30px] bg-[#F6C86A] px-6 py-3 text-sm font-bold text-primary"
          style={{
            width: "179px",
            height: "54px",
            borderTopRightRadius: "30px",
            borderBottomLeftRadius: "55px",
          }}
        >
          {badge}
        </div>
      )}

      <div className="mb-6 mt-7 text-center">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-sm text-gray-500"> / ماه</span>
        </div>
      </div>

      <ul className="mb-4 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-700">
            <div className="mt-1 h-5 w-5 flex-shrink-0">
              <Image
                src={feature.icon}
                alt={feature.text}
                width={20}
                height={20}
                className="h-5 w-5"
              />
            </div>
            <span className="text-sm">{feature.text}</span>
          </li>
        ))}
      </ul>

      {moreFeatures.length > 0 && (
        <div className="mb-4 w-full text-left">
          <button
            onClick={() => setShowMore(!showMore)}
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary/80 cursor-pointer"
          >
            <span>{showMore ? "مشاهده کمتر" : "مشاهده همه ویژگی‌ها"}</span>
            <svg
              className={cn(
                "h-4 w-4 transition-transform duration-300",
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
              "mt-3 space-y-3 overflow-hidden transition-all duration-300 text-left",
              showMore ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
            )}
          >
            {moreFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-600">
                <div className="mt-1 h-5 w-5 flex-shrink-0">
                  <Image
                    src={feature.icon}
                    alt={feature.text}
                    width={20}
                    height={20}
                    className="h-5 w-5 opacity-70"
                  />
                </div>
                <span className="text-sm">{feature.text}</span>
              </li>
            ))}
          </div>
        </div>
      )}

      <button
        className={cn(
          "w-full rounded-full py-3 font-semibold transition-all duration-300",
          isPopular
            ? "bg-primary text-secondary hover:bg-primary/90"
            : "border-2 border-primary text-primary hover:bg-primary hover:text-white",
          "mt-auto",
        )}
      >
        {buttonText}
      </button>
    </div>
  );
}
