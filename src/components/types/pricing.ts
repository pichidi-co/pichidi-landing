export interface Feature {
  text: string;
  icon: string;
}

export type BillingCycle = "monthly" | "yearly";

/** what the card's button does */
export type PlanAction = "checkout" | "consult" | "signup";

export interface PricingPlan {
  id: string;
  title: string;
  /** Toman per month, billed monthly. 0 = free */
  monthlyPrice: number;
  /** Toman per month, when billed yearly (total charge = yearlyPrice * 12) */
  yearlyPrice: number;
  description: string;
  features: Feature[];
  moreFeatures?: Feature[];
  buttonText: string;
  isPopular: boolean;
  badge?: string | null;
  action: PlanAction;
}
