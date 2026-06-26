import { useState } from "react";
import {
  PRICING_PLANS,
  PRICING_PLANS_YEARLY,
} from "@/components/constant/pricing";

export function usePricingToggle() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = isYearly ? PRICING_PLANS_YEARLY : PRICING_PLANS;

  return {
    isYearly,
    setIsYearly,
    plans,
  };
}
