const checkIcon = "/icons/pricing/mdi_file-tick.svg";
const xIcon = "/icons/pricing/mdi_file-tick.svg";
// src/components/pricing/data.ts
export const pricingPlans = [
  {
    id: 1,
    title: "طرح پایه",
    price: "رایگان",
    description: "مناسب برای شروع کار",
    features: [
      { text: "۵ پروژه فعال", icon: checkIcon },
      { text: "۱۰ کاربر", icon: checkIcon },
      { text: "۱ گیگابایت فضا", icon: checkIcon },
      { text: "پشتیبانی ایمیل", icon: checkIcon },
    ],
    moreFeatures: [
      { text: "دسترسی به API پایه", icon: checkIcon },
      { text: "پشتیبانی ۸ ساعته", icon: checkIcon },
      { text: "۱ دامنه اختصاصی", icon: checkIcon },
      { text: "گزارش‌های پایه", icon: checkIcon },
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
      { text: "۵۰ پروژه فعال", icon: checkIcon },
      { text: "۱۰۰ کاربر", icon: checkIcon },
      { text: "۵۰ گیگابایت فضا", icon: checkIcon },
      { text: "پشتیبانی اولویت‌دار", icon: checkIcon },
      { text: "دسترسی به API", icon: checkIcon },
    ],
    moreFeatures: [
      { text: "دسترسی کامل به API", icon: checkIcon },
      { text: "پشتیبانی ۲۴ ساعته", icon: checkIcon },
      { text: "۵ دامنه اختصاصی", icon: checkIcon },
      { text: "گزارش‌های پیشرفته", icon: checkIcon },
      { text: "ابزارهای تحلیلی", icon: checkIcon },
      { text: "بکاپ خودکار", icon: checkIcon },
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
      { text: "پروژه نامحدود", icon: checkIcon },
      { text: "کاربر نامحدود", icon: checkIcon },
      { text: "۲۰۰ گیگابایت فضا", icon: checkIcon },
      { text: "پشتیبانی ۲۴/۷", icon: checkIcon },
      { text: "دسترسی کامل به API", icon: checkIcon },
    ],
    moreFeatures: [
      { text: "دسترسی کامل به API", icon: checkIcon },
      { text: "پشتیبانی اختصاصی", icon: checkIcon },
      { text: "دامنه نامحدود", icon: checkIcon },
      { text: "گزارش‌های سفارشی", icon: checkIcon },
      { text: "ابزارهای تحلیلی پیشرفته", icon: checkIcon },
      { text: "بکاپ روزانه", icon: checkIcon },
      { text: "امنیت پیشرفته", icon: checkIcon },
      { text: "میزبانی اختصاصی", icon: checkIcon },
    ],
    buttonText: "تماس بگیرید",
    isPopular: false,
    badge: "ویژه",
  },
];

// قیمت‌های سالانه
export const pricingPlansYearly = [
  {
    ...pricingPlans[0],
    price: "رایگان",
    description: "مناسب برای شروع کار - سالانه",
  },
  {
    ...pricingPlans[1],
    price: "۲۸۷,۰۰۰",
    description: "مناسب برای تیم‌های کوچک - سالانه",
    badge: "محبوب‌ترین 🎉",
  },
  {
    ...pricingPlans[2],
    price: "۵۷۵,۰۰۰",
    description: "مناسب برای سازمان‌ها - سالانه",
  },
];
