import type { BillingCycle, PricingPlan } from "@/components/types/pricing";

const CHECK_ICON = "/icons/pricing/mdi_file-tick.svg";
const f = (text: string) => ({ text, icon: CHECK_ICON });

// TODO: limits (تعداد نیرو / لوکیشن) are placeholders — set them to your real plan limits.
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    title: "طرح پایه",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "مناسب برای شروع کار",
    features: [
      f("تا ۵ نیرو"),
      f("۱ لوکیشن"),
      f("ثبت ورود و خروج با اپلیکیشن موبایل"),
      f("گزارش‌های پایه"),
    ],
    moreFeatures: [f("شیفت ثابت"), f("پنل مدیریت تحت وب"), f("پشتیبانی ایمیلی")],
    buttonText: "شروع رایگان",
    isPopular: false,
    badge: null,
    action: "signup",
  },
  {
    id: "pro",
    title: "طرح حرفه‌ای",
    monthlyPrice: 299000,
    yearlyPrice: 287000,
    description: "مناسب برای تیم‌های در حال رشد",
    features: [
      f("تا ۵۰ نیرو"),
      f("تا ۵ لوکیشن"),
      f("شیفت ثابت، چرخشی و شناور"),
      f("ثبت حضور با GPS و تشخیص چهره"),
      f("گزارش‌های لحظه‌ای"),
    ],
    moreFeatures: [
      f("مرخصی، مأموریت و اضافه‌کار"),
      f("تحلیل حضور و غیاب با هوش مصنوعی"),
      f("اپلیکیشن موبایل + پنل وب"),
      f("پشتیبانی اولویت‌دار"),
    ],
    buttonText: "خرید اشتراک",
    isPopular: true,
    badge: "محبوب‌ترین",
    action: "checkout",
  },
  {
    id: "enterprise",
    title: "طرح سازمانی",
    monthlyPrice: 599000,
    yearlyPrice: 575000,
    description: "مناسب برای سازمان‌ها و چندشعبه‌ای‌ها",
    features: [
      f("نیروی نامحدود"),
      f("لوکیشن نامحدود"),
      f("همه امکانات طرح حرفه‌ای"),
      f("گزارش‌های سفارشی"),
      f("پشتیبانی اختصاصی"),
    ],
    moreFeatures: [f("آموزش و راه‌اندازی تیم"), f("مشاوره پیاده‌سازی")],
    buttonText: "تماس بگیرید",
    isPopular: false,
    badge: "ویژه",
    action: "consult",
  },
];

export function getPlanById(id: string | null | undefined) {
  return PRICING_PLANS.find((p) => p.id === id);
}

export function getUnitPrice(plan: PricingPlan, cycle: BillingCycle) {
  return cycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
}

/** Total amount (Toman) actually charged at the gateway. Always computed server-side too. */
export function getPlanAmount(plan: PricingPlan, cycle: BillingCycle) {
  return cycle === "yearly" ? plan.yearlyPrice * 12 : plan.monthlyPrice;
}
