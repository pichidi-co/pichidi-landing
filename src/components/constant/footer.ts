import { FooterColumn, SocialLink } from "@/components/types/footer";

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "نرم افزار و اپلیکیشن",
    links: [
      { text: "اپلیکیشن حضور و غیاب", href: "#" },
      { text: "نرم افزار حضور غیاب تحت وب", href: "#" },
      { text: "نرم افزار حضور غیاب اندروید", href: "#" },
      { text: "نرم افزار حضور غیاب ایفون", href: "#" },
    ],
  },
  {
    title: "دسترسی سریع",
    links: [
      { text: "درخواست دمو رایگان", href: "#" },
      { text: "درخواست پشتیبانی", href: "#" },
      { text: "دریافت بروز رسانی", href: "#" },
      { text: "دریافت مشاوره", href: "#" },
      { text: "تماس با ما", href: "#" },
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: "/icons/social/FaceBook.svg",
    href: "#",
    label: "فیسبوک",
  },
  {
    icon: "/icons/social/Telegram.svg",
    href: "#",
    label: "تلگرام",
  },

  {
    icon: "/icons/social/Instagram.svg",
    href: "#",
    label: "اینستاگرام",
  },
];

export const FOOTER_TEXT = {
  brand: "پیچیدی",
  phone: "09136900677",
  copyright:
    "تمامی کالاها و خدمات این فروشگاه، حسب مورد دارای مجوزهای لازم از مراجع مربوطه می‌باشند و فعالیت‌های این سایت تابع قوانین و مقررات جمهوری اسلامی ایران است کلیه حقوق مادی و معنوی این وبسایت و مطالب آن برای پیچیدی محفوظ است.",
};
