"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { usePricingPlans } from "@/components/hooks/usePricingPlans";
import { useSession } from "@/lib/api/auth/queries";
import { CheckoutForm } from "./CheckoutForm";

/** Finds the plan (by slug) + the login state, then renders the checkout page. */
export function CheckoutView({ slug }: { slug: string }) {
  const router = useRouter();
  const { plans, isLoading, isError, refetch } = usePricingPlans();
  const { data: session, isLoading: sessionLoading } = useSession();

  const plan = plans.find((p) => p.slug === slug);
  // only paid plans can be checked out
  const invalid = !isLoading && !isError && (!plan || plan.isFree);

  useEffect(() => {
    if (invalid) router.replace("/#pricing");
  }, [invalid, router]);

  if (isError) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 pt-32">
        <p className="text-gray-600">دریافت اطلاعات پلن با مشکل مواجه شد.</p>
        <button
          onClick={() => refetch()}
          className="cursor-pointer rounded-full border-2 border-primary px-6 py-2 font-semibold text-primary hover:bg-primary hover:text-white"
        >
          تلاش مجدد
        </button>
      </main>
    );
  }

  if (isLoading || sessionLoading || !plan || plan.isFree) {
    return (
      <main className="flex min-h-screen items-center justify-center pt-32">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  // a failed session check just means "not logged in" → show the login step
  return <CheckoutForm plan={plan} session={session ?? null} />;
}
