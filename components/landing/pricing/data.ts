// src/components/pricing/data.ts
export const pricingPlans = [
  {
    id: 1,
    title: "طرح پایه",
    price: "رایگان",
    description: "مناسب برای شروع کار",
    features: [
      "۵ پروژه فعال",
      "۱۰ کاربر",
      "۱ گیگابایت فضا",
      "پشتیبانی ایمیل",
    ],
    buttonText: "شروع کنید",
    isPopular: false,
    badge: null, // بدون نشان
  },
  {
    id: 2,
    title: "طرح حرفه‌ای",
    price: "۲۹۹,۰۰۰",
    description: "مناسب برای تیم‌های کوچک",
    features: [
      "۵۰ پروژه فعال",
      "۱۰۰ کاربر",
      "۵۰ گیگابایت فضا",
      "پشتیبانی اولویت‌دار",
      "دسترسی به API",
    ],
    buttonText: "خرید اشتراک",
    isPopular: true,
    badge: "محبوب‌ترین", // نشان محبوب
  },
  {
    id: 3,
    title: "طرح سازمانی",
    price: "۵۹۹,۰۰۰",
    description: "مناسب برای سازمان‌ها",
    features: [
      "پروژه نامحدود",
      "کاربر نامحدود",
      "۲۰۰ گیگابایت فضا",
      "پشتیبانی ۲۴/۷",
      "دسترسی کامل به API",
    ],
    buttonText: "تماس بگیرید",
    isPopular: false,
    badge: "ویژه", // نشان ویژه
  },
];