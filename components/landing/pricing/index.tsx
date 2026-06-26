// src/components/pricing/pricing-section.tsx
import { PricingCard } from "./PricingCard";
import { pricingPlans } from "./data";

export function PricingSection() {
  return (
    <section className="container py-24">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-bold">تعرفه‌ها</h2>
        <p className="mt-4 text-muted-foreground">
          طرح‌های مناسب برای هر نوع کسب‌وکار
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.id} {...plan} />
        ))}
      </div>
    </section>
  );
}