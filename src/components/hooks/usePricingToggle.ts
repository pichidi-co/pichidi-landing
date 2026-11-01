"use client";

import { useMemo, useState } from "react";
import { usePlans } from "@/lib/api/subscription/queries";
import {
  transformPlansToUi,
  applyYearlyPrice,
} from "@/lib/api/subscription/transformer";

export function usePricingToggle() {
  const [isYearly, setIsYearly] = useState(false);
  const { data: plans, isLoading, isError, refetch } = usePlans();

  const uiPlans = useMemo(() => {
    if (!plans) return [];
    const base = transformPlansToUi(plans);
    return isYearly ? base.map(applyYearlyPrice) : base;
  }, [plans, isYearly]);

  return {
    isYearly,
    setIsYearly,
    plans: uiPlans,
    isLoading,
    isError,
    refetch,
  };
}