"use client";

import { motion } from "framer-motion";
import { CalendarClock, MapPin, Smartphone, TrendingUp, Users } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const STEPS = [
  { icon: MapPin, title: "لوکیشن رو تعریف کن", text: "محل کار و محدوده مجاز ثبت حضور رو روی نقشه مشخص کن." },
  { icon: CalendarClock, title: "شیفت‌ها رو بساز", text: "شیفت ثابت، چرخشی یا شناور؛ هر چقدر که لازم داری." },
  { icon: Users, title: "نیروها رو اضافه کن", text: "پرسنل رو به شیفت و لوکیشن اختصاص بده." },
  { icon: Smartphone, title: "نیروها ثبت می‌کنن", text: "ورود و خروج با اپلیکیشن موبایل، فقط داخل محدوده." },
  { icon: TrendingUp, title: "گزارش و تحلیل بگیر", text: "گزارش لحظه‌ای و تحلیل هوشمند، همون موقع." },
];

export function HowItWorks() {
  return (
    <section id="how" className="w-full scroll-mt-28 overflow-hidden py-14 sm:py-20 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="راه‌اندازی در چند دقیقه"
          description="از تعریف لوکیشن تا اولین گزارش؛ بدون خرید دستگاه و بدون نصب."
        />

        <div className="relative">
          {/* connecting line (draws itself once) */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute right-[10%] top-8 hidden h-0.5 w-[80%] origin-right bg-gradient-to-l from-[#0A4C8B] to-[#2B9ADA]/30 lg:block"
          />

          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.18 }}
                className="relative text-center"
              >
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0A4C8B] text-white shadow-lg ring-8 ring-white">
                  <s.icon className="h-7 w-7" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-bold text-[#063A6B]">
                    {new Intl.NumberFormat("fa-IR").format(i + 1)}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#1F2965]">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-[240px] text-sm leading-7 text-gray-600">{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
