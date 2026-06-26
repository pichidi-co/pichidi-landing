export interface Feature {
  text: string;
  icon: string;
}

export interface PricingPlan {
  id: number;
  title: string;
  price: string;
  description: string;
  features: Feature[];
  moreFeatures?: Feature[];
  buttonText: string;
  isPopular: boolean;
  badge?: string | null;
}
