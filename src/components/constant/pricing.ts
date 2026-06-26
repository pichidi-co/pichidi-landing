import { PricingPlan } from "@/components/types/pricing";

const CHECK_ICON = "/icons/pricing/mdi_file-tick.svg";
const X_ICON = "/icons/pricing/x.svg";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 1,
    title: "طرح پایه",
    price: "رایگان",
    description: "مناسب برای شروع کار",
    features: [
      { text: "۵ پروژه فعال", icon: CHECK_ICON },
      { text: "۱۰ کاربر", icon: CHECK_ICON },
      { text: "۱ گیگابایت فضا", icon: CHECK_ICON },
      { text: "پشتیبانی ایمیل", icon: CHECK_ICON },
    ],
    moreFeatures: [
      { text: "دسترسی به API پایه", icon: CHECK_ICON },
      { text: "پشتیبانی ۸ ساعته", icon: CHECK_ICON },
      { text: "۱ دامنه اختصاصی", icon: CHECK_ICON },
      { text: "گزارش‌های پایه", icon: CHECK_ICON },
    ],
    buttonText: "شروع کنید",
    isPopular: false,
    badge: null,
  },
  {
    id: 2,
    title: "طرح حرفه‌ای",
    price: "۲۹۹,۰۰۰",
    description: "مناسب برای تیم‌های کوچک",
    features: [
      { text: "۵۰ پروژه فعال", icon: CHECK_ICON },
      { text: "۱۰۰ کاربر", icon: CHECK_ICON },
      { text: "۵۰ گیگابایت فضا", icon: CHECK_ICON },
      { text: "پشتیبانی اولویت‌دار", icon: CHECK_ICON },
      { text: "دسترسی به API", icon: CHECK_ICON },
    ],
    moreFeatures: [
      { text: "دسترسی کامل به API", icon: CHECK_ICON },
      { text: "پشتیبانی ۲۴ ساعته", icon: CHECK_ICON },
      { text: "۵ دامنه اختصاصی", icon: CHECK_ICON },
      { text: "گزارش‌های پیشرفته", icon: CHECK_ICON },
      { text: "ابزارهای تحلیلی", icon: CHECK_ICON },
      { text: "بکاپ خودکار", icon: CHECK_ICON },
    ],
    buttonText: "خرید اشتراک",
    isPopular: true,
    badge: "محبوب‌ترین",
  },
  {
    id: 3,
    title: "طرح سازمانی",
    price: "۵۹۹,۰۰۰",
    description: "مناسب برای سازمان‌ها",
    features: [
      { text: "پروژه نامحدود", icon: CHECK_ICON },
      { text: "کاربر نامحدود", icon: CHECK_ICON },
      { text: "۲۰۰ گیگابایت فضا", icon: CHECK_ICON },
      { text: "پشتیبانی ۲۴/۷", icon: CHECK_ICON },
      { text: "دسترسی کامل به API", icon: CHECK_ICON },
    ],
    moreFeatures: [
      { text: "دسترسی کامل به API", icon: CHECK_ICON },
      { text: "پشتیبانی اختصاصی", icon: CHECK_ICON },
      { text: "دامنه نامحدود", icon: CHECK_ICON },
      { text: "گزارش‌های سفارشی", icon: CHECK_ICON },
      { text: "ابزارهای تحلیلی پیشرفته", icon: CHECK_ICON },
      { text: "بکاپ روزانه", icon: CHECK_ICON },
      { text: "امنیت پیشرفته", icon: CHECK_ICON },
      { text: "میزبانی اختصاصی", icon: CHECK_ICON },
    ],
    buttonText: "تماس بگیرید",
    isPopular: false,
    badge: "ویژه",
  },
];

export const PRICING_PLANS_YEARLY = [
  {
    ...PRICING_PLANS[0],
    price: "رایگان",
    description: "مناسب برای شروع کار - سالانه",
  },
  {
    ...PRICING_PLANS[1],
    price: "۲۸۷,۰۰۰",
    description: "مناسب برای تیم‌های کوچک - سالانه",
    badge: "محبوب‌ترین 🎉",
  },
  {
    ...PRICING_PLANS[2],
    price: "۵۷۵,۰۰۰",
    description: "مناسب برای سازمان‌ها - سالانه",
  },
];
