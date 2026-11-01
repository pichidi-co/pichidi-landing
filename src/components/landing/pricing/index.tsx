// components/landing/pricing/index.tsx
"use client";

import { motion } from "framer-motion";
import { usePricingToggle } from "@/components/hooks/usePricingToggle";
import { PricingHeader } from "./PricingHeader";
import { PricingToggle } from "./PricingToggle";
import { PricingCard } from "./PricingCard";

export function PricingSection() {
  const { isYearly, setIsYearly, plans } = usePricingToggle();

  return (
    <section id="pricing" className="w-full scroll-mt-28 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <PricingHeader />

        <div className="mb-12 sm:mb-14 md:mb-16 flex items-center justify-center">
          <PricingToggle isYearly={isYearly} onToggle={setIsYearly} />
        </div>

        <div className="grid gap-6 md:gap-7 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              className="flex w-full justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <PricingCard plan={plan} isYearly={isYearly} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
