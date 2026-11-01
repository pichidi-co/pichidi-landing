export type PlanFeatureValueType = "number" | "boolean" | "string";

export interface PlanFeature {
  key: string;
  label: string;
  value: number | boolean | string | null;
  valueType: PlanFeatureValueType;
  isUnlimited: boolean;
}

export interface PricingPlan {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  durationDays: number;
  durationMinutes: number | null;
  trialDays: number;
  gracePeriodDays: number;
  isDefault: boolean;
  features: PlanFeature[];
  isActive: boolean;
  sortOrder: number;
  version: number;
  parentPlanId: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PlansApiResponse {
  success: boolean;
  data: PricingPlan[];
}

export interface PurchasePayload {
  planId: string;
}

export interface PurchaseResponse {
  success: boolean;
  data: {
    paymentId: string;
    redirectUrl: string;
    amount: number;
    isFree: boolean;
  };
}