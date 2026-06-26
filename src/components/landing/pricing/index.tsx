"use client";

import { usePricingToggle } from "@/components/hooks/usePricingToggle";
import { PricingHeader } from "./PricingHeader";
import { PricingToggle } from "./PricingToggle";
import { PricingCard } from "./PricingCard";

export function PricingSection() {
  const { isYearly, setIsYearly, plans } = usePricingToggle();

  return (
    <section className="container py-24">
      <PricingHeader />
      
      <div className="mb-16 flex items-center justify-center">
        <PricingToggle isYearly={isYearly} onToggle={setIsYearly} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center items-start">
        {plans.map((plan) => (
          <PricingCard key={plan.id} {...plan} />
        ))}
      </div>
    </section>
  );
}