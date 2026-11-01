"use client";

import { useState } from "react";
import { usePricingPlans } from "@/components/hooks/usePricingPlans";
import { PricingHeader } from "./PricingHeader";
import { PricingCard } from "./PricingCard";
import { PricingCompare } from "./PricingCompare";
import { usePurchasePlan } from "@/lib/api/subscription/mutations";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const { plans, compareMatrix, isLoading, isError, refetch } =
    usePricingPlans();
  const [pendingPlanId, setPendingPlanId] = useState<string | null>(null);
  const { mutateAsync: purchase } = usePurchasePlan();

  const handlePurchase = async (planId: string) => {
    try {
      setPendingPlanId(planId);
      await purchase({ planId });
    } catch (error) {
      console.error("Purchase failed:", error);
    } finally {
      setPendingPlanId(null);
    }
  };

  if (isLoading) {
    return (
      <section className="w-full py-24 text-center text-muted-foreground">
        در حال بارگذاری پلن‌ها...
      </section>
    );
  }

  if (isError) {
    return (
      <section className="w-full py-24 text-center">
        <p className="text-red-500 mb-4">خطا در دریافت پلن‌ها</p>
        <button
          onClick={() => refetch()}
          className="rounded-full border border-primary text-primary px-6 py-2 text-sm hover:bg-primary hover:text-white transition"
        >
          تلاش دوباره
        </button>
      </section>
    );
  }

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <PricingHeader />

        {/* Plan Cards — 4 plans in responsive grid */}
        <div
          className={cn(
            "grid gap-6 md:gap-7 lg:gap-8 justify-items-center items-stretch",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              {...plan}
              onPurchase={handlePurchase}
              isPurchasing={pendingPlanId === plan.id}
            />
          ))}
        </div>

        {/* Compare table */}
        <PricingCompare plans={plans} rows={compareMatrix} />
      </div>
    </section>
  );
}