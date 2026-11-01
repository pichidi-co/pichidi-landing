"use client";

import { useMemo } from "react";
import { usePlans } from "@/lib/api/subscription/queries";
import {
  transformPlansToUi,
  buildCompareMatrix,
  type UiPlan,
  type CompareRow,
} from "@/lib/api/subscription/transformer";

export function usePricingPlans() {
  const { data: rawPlans, isLoading, isError, refetch } = usePlans();

  const plans: UiPlan[] = useMemo(() => {
    if (!rawPlans) return [];
    return transformPlansToUi(rawPlans);
  }, [rawPlans]);

  const compareMatrix: CompareRow[] = useMemo(() => {
    if (!rawPlans) return [];
    return buildCompareMatrix(rawPlans);
  }, [rawPlans]);

  return { plans, compareMatrix, isLoading, isError, refetch };
}