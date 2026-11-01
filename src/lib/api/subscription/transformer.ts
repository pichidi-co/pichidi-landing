import type { PricingPlan, PlanFeature } from "./types";

/* ----------------------------- UI Types ----------------------------- */

export interface UiFeature {
  key: string;
  text: string;
  icon: string;
  iconVariant: "check" | "x";
}

export interface UiPlan {
  id: string;
  slug: string;
  title: string;
  price: string;
  rawPrice: number;
  description: string;
  durationLabel: string;
  features: UiFeature[];
  moreFeatures: UiFeature[];
  buttonText: string;
  isPopular: boolean;
  badge: string | null;
  isFree: boolean;
}

/* ------------------------------ Helpers ----------------------------- */

const CHECK_ICON = "/icons/pricing/mdi_file-tick.svg";

const faNumber = (n: number): string =>
  n.toLocaleString("fa-IR", { useGrouping: true });

const formatPrice = (price: number): string =>
  price === 0 ? "رایگان" : faNumber(price);

/* --------------------- Lookup tables for enums ---------------------- */

const REPORT_LEVEL_LABELS: Record<string, string> = {
  basic: "پایه",
  advanced: "پیشرفته",
  pro: "حرفه‌ای",
  custom: "سفارشی",
};

const SUPPORT_LEVEL_LABELS: Record<string, string> = {
  online: "آنلاین",
  normal: "معمولی",
  priority: "اولویت‌دار",
  dedicated: "اختصاصی",
};

/* --------------------------- Feature → Text ------------------------- */

function featureToUi(feature: PlanFeature): UiFeature {
  const { key, label, value, valueType, isUnlimited } = feature;

  // Boolean
  if (valueType === "boolean") {
    return {
      key,
      text: value ? label : `${label}: ندارد`,
      icon: CHECK_ICON,
      iconVariant: value ? "check" : "x",
    };
  }

  // Unlimited
  if (isUnlimited) {
    return {
      key,
      text: `${label}: نامحدود`,
      icon: CHECK_ICON,
      iconVariant: "check",
    };
  }

  // Number
  if (valueType === "number") {
    return {
      key,
      text: `${label}: ${faNumber(Number(value))}`,
      icon: CHECK_ICON,
      iconVariant: "check",
    };
  }

  // String — با mapping فارسی
  if (key === "report_level") {
    const label2 = REPORT_LEVEL_LABELS[String(value)] ?? String(value);
    return {
      key,
      text: `${label}: ${label2}`,
      icon: CHECK_ICON,
      iconVariant: "check",
    };
  }

  if (key === "support_level") {
    const label2 = SUPPORT_LEVEL_LABELS[String(value)] ?? String(value);
    return {
      key,
      text: `${label}: ${label2}`,
      icon: CHECK_ICON,
      iconVariant: "check",
    };
  }

  return {
    key,
    text: `${label}: ${value ?? "-"}`,
    icon: CHECK_ICON,
    iconVariant: "check",
  };
}

/* ------------------------ Duration label ---------------------------- */

function durationLabel(plan: PricingPlan): string {
  if (plan.price === 0) return "همیشگی";
  if (plan.durationDays === 30) return "ماهانه";
  if (plan.durationDays === 365) return "سالانه";
  return `${plan.durationDays} روزه`;
}

/* --------------------------- Plan → UiPlan -------------------------- */

const VISIBLE_FEATURES = 4;

export function transformPlanToUi(plan: PricingPlan): UiPlan {
  const allFeatures: UiFeature[] = plan.features.map(featureToUi);

  const isFree = plan.price === 0;

  return {
    id: plan._id,
    slug: plan.slug,
    title: plan.name,
    price: formatPrice(plan.price),
    rawPrice: plan.price,
    description: plan.description,
    durationLabel: durationLabel(plan),
    features: allFeatures.slice(0, VISIBLE_FEATURES),
    moreFeatures: allFeatures.slice(VISIBLE_FEATURES),
    buttonText: isFree ? "شروع رایگان" : "خرید اشتراک",
    isPopular: plan.isDefault,
    badge: plan.isDefault ? "پیشنهاد ویژه" : isFree ? "شروع رایگان" : null,
    isFree,
  };
}

/* ------------------------ Plans → UiPlans (bulk) -------------------- */

export function transformPlansToUi(plans: PricingPlan[]): UiPlan[] {
  return [...plans]
    .filter((p) => p.isActive && !p.deletedAt)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(transformPlanToUi);
}

/* --------------------- Compare matrix (برای جدول) -------------------- */

export interface CompareRow {
  key: string;
  label: string;
  values: {
    planId: string;
    display: string;
    variant: "check" | "x" | "text" | "unlimited";
  }[];
}

export function buildCompareMatrix(plans: PricingPlan[]): CompareRow[] {
  const activePlans = [...plans]
    .filter((p) => p.isActive && !p.deletedAt)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  // union of all feature keys
  const keys = new Map<string, string>(); // key → label
  activePlans.forEach((p) =>
    p.features.forEach((f) => {
      if (!keys.has(f.key)) keys.set(f.key, f.label);
    }),
  );

  const rows: CompareRow[] = [];

  keys.forEach((label, key) => {
    const values = activePlans.map((plan) => {
      const feature = plan.features.find((f) => f.key === key);

      if (!feature) {
        return { planId: plan._id, display: "—", variant: "text" as const };
      }

      if (feature.valueType === "boolean") {
        return {
          planId: plan._id,
          display: feature.value ? "دارد" : "ندارد",
          variant: feature.value ? ("check" as const) : ("x" as const),
        };
      }

      if (feature.isUnlimited) {
        return {
          planId: plan._id,
          display: "نامحدود",
          variant: "unlimited" as const,
        };
      }

      if (key === "report_level") {
        return {
          planId: plan._id,
          display: REPORT_LEVEL_LABELS[String(feature.value)] ?? "-",
          variant: "text" as const,
        };
      }

      if (key === "support_level") {
        return {
          planId: plan._id,
          display: SUPPORT_LEVEL_LABELS[String(feature.value)] ?? "-",
          variant: "text" as const,
        };
      }

      if (feature.valueType === "number") {
        return {
          planId: plan._id,
          display: faNumber(Number(feature.value)),
          variant: "text" as const,
        };
      }

      return {
        planId: plan._id,
        display: String(feature.value ?? "-"),
        variant: "text" as const,
      };
    });

    rows.push({ key, label, values });
  });

  return rows;
}