import { useState } from "react";
import { PRICING_PLANS } from "@/components/constant/pricing";

export function usePricingToggle() {
  const [isYearly, setIsYearly] = useState(false);
  return { isYearly, setIsYearly, plans: PRICING_PLANS };
}
