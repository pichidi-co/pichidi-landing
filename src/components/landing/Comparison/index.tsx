"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

import { SectionHeading } from "@/components/shared/SectionHeading";

const ROWS: [string, string, string][] = [
  ["خرید و نصب دستگاه", "لازم است", "لازم نیست"],
  ["ثبت حضور در چند شعبه و پروژه", "هر محل، یک دستگاه", "یک پنل برای همه"],
  ["ثبت حضور مأموران و دورکاران", "دشوار", "با موبایل و موقعیت مکانی"],
  ["محدودیت به محدوده مجاز", "فقط کنار دستگاه", "لوکیشن و شعاع دلخواه"],
  ["تحلیل هوشمند داده‌ها", "ندارد", "دستیار هوش مصنوعی"],
  ["گزارش لحظه‌ای", "اغلب با تأخیر", "همان لحظه"],
];

export function ComparisonSection() {
  return (
    <section id="compare" className="w-full scroll-mt-28 overflow-hidden py-14 sm:py-20 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          title="چرا پیچیدی، به‌جای دستگاه حضور و غیاب؟"
          description="مقایسه سریع با روش سنتی که هنوز خیلی‌ها استفاده می‌کنن."
        />

        <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-lg">
          <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-[#F1F7FC] text-xs font-bold text-[#1F2965] sm:text-base">
            <div className="p-3 sm:p-5" />
            <div className="p-3 text-center sm:p-5">دستگاه سنتی</div>
            <div className="bg-[#0A4C8B] p-3 text-center text-white sm:p-5">پیچیدی</div>
          </div>

          {ROWS.map(([label, old, ours], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="grid grid-cols-[1.2fr_1fr_1fr] items-center border-t border-gray-100 text-xs sm:text-sm"
            >
              <div className="p-3 font-medium text-[#1F2965] sm:p-5">{label}</div>
              <div className="flex items-center justify-center gap-1.5 p-3 text-center text-gray-500 sm:p-5">
                <X className="h-4 w-4 shrink-0 text-red-400" />
                {old}
              </div>
              <div className="flex items-center justify-center gap-1.5 self-stretch bg-[#0A4C8B]/5 p-3 text-center font-medium text-[#0A4C8B] sm:p-5">
                <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                {ours}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
