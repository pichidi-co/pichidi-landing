// components/landing/pricing/index.tsx
"use client";

import { usePricingToggle } from "@/components/hooks/usePricingToggle";
import { PricingHeader } from "./PricingHeader";
import { PricingToggle } from "./PricingToggle";
import { PricingCard } from "./PricingCard";

export function PricingSection() {
  const { isYearly, setIsYearly, plans } = usePricingToggle();

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <PricingHeader />
        
        <div className="mb-12 sm:mb-14 md:mb-16 flex items-center justify-center">
          <PricingToggle isYearly={isYearly} onToggle={setIsYearly} />
        </div>

        <div className="grid gap-6 md:gap-7 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center items-stretch">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}