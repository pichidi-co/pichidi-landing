// components/landing/pricing/index.tsx
"use client";

import { usePricingPlans } from "@/components/hooks/usePricingPlans";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PricingCard } from "./PricingCard";
import { PricingCompare } from "./PricingCompare";

function CardSkeleton() {
  return <div className="h-[540px] w-full max-w-[330px] animate-pulse rounded-[28px] bg-white shadow-md" />;
}

export function PricingSection() {
  const { plans, compareMatrix, isLoading, isError, refetch } = usePricingPlans();

  return (
    <section
      id="pricing"
      className="relative w-full scroll-mt-28 overflow-hidden bg-[#F1F7FC] py-14 sm:py-20 md:py-24"
    >
      <div aria-hidden className="pointer-events-none absolute -top-24 left-[-80px] h-72 w-72 rounded-full bg-[#2B9ADA]/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-[-100px] h-80 w-80 rounded-full bg-[#0A4C8B]/10 blur-3xl" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          title="تعرفه‌ها؛ هر چقدر که لازم داری"
          description="پلن مناسب تیمت رو انتخاب کن و هر زمان خواستی تغییرش بده."
        />

        {isError ? (
          <div className="py-10 text-center">
            <p className="mb-4 text-gray-600">دریافت تعرفه‌ها با مشکل مواجه شد.</p>
            <button
              onClick={() => refetch()}
              className="cursor-pointer rounded-full border-2 border-[#0A4C8B] px-6 py-2 font-bold text-[#0A4C8B] transition-colors hover:bg-[#0A4C8B] hover:text-white"
            >
              تلاش مجدد
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-stretch justify-items-center gap-5 md:grid-cols-2 xl:grid-cols-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
              : plans.map((plan, i) => <PricingCard key={plan.id} plan={plan} index={i} />)}
          </div>
        )}

        <PricingCompare plans={plans} rows={compareMatrix} />
      </div>
    </section>
  );
}
