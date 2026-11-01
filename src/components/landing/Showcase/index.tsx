"use client";

import { motion } from "framer-motion";
import { Laptop, MapPin, Smartphone } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const BARS = [45, 70, 55, 85, 60, 92, 74];
const ROWS = [
  { name: "علی رضایی", place: "دفتر مرکزی", time: "۰۷:۵۸", status: "حاضر", cls: "bg-emerald-100 text-emerald-700" },
  { name: "مریم احمدی", place: "شعبه شمال", time: "۰۸:۱۷", status: "تأخیر", cls: "bg-amber-100 text-amber-700" },
  { name: "سینا کریمی", place: "پروژه ۳", time: "—", status: "مرخصی", cls: "bg-sky-100 text-sky-700" },
  { name: "نگار صالحی", place: "دفتر مرکزی", time: "۰۸:۰۰", status: "حاضر", cls: "bg-emerald-100 text-emerald-700" },
];

function LaptopMock() {
  return (
    <div className="mx-auto w-full max-w-[720px]">
      <div className="rounded-t-2xl bg-[#0b1b33] p-2 sm:p-3 shadow-2xl">
        <div className="flex aspect-[16/10] overflow-hidden rounded-lg bg-[#F1F7FC] text-[#1F2965]">
          {/* sidebar */}
          <div className="hidden w-[18%] flex-col gap-2 bg-[#0A4C8B] p-3 sm:flex">
            <div className="h-5 w-12 rounded bg-white/30" />
            {["داشبورد", "نیروها", "شیفت‌ها", "لوکیشن‌ها", "گزارش‌ها"].map((t, i) => (
              <div key={t} className={`rounded px-2 py-1 text-[9px] text-white ${i === 0 ? "bg-white/20" : "opacity-70"}`}>
                {t}
              </div>
            ))}
          </div>

          <div className="flex-1 space-y-2 p-2 sm:p-4">
            <div className="grid grid-cols-3 gap-2">
              {[
                ["حاضر", "۱۲۴"],
                ["تأخیر", "۹"],
                ["غایب", "۶"],
              ].map(([l, v]) => (
                <div key={l} className="rounded-lg bg-white p-2 shadow-sm">
                  <div className="text-[8px] text-gray-500 sm:text-[10px]">{l}</div>
                  <div className="text-sm font-bold sm:text-lg">{v}</div>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-white p-2 shadow-sm sm:p-3">
              <div className="mb-1 text-[8px] text-gray-500 sm:text-[10px]">حضور در ۷ روز گذشته</div>
              <div className="flex h-16 items-end gap-1.5 sm:h-24">
                {BARS.map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-[#0A4C8B] to-[#2B9ADA]"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-1">
              {ROWS.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + i * 0.12 }}
                  className="flex items-center justify-between rounded-md bg-white px-2 py-1 text-[8px] shadow-sm sm:text-[10px]"
                >
                  <span className="w-1/4 font-medium">{r.name}</span>
                  <span className="w-1/4 text-gray-500">{r.place}</span>
                  <span className="w-1/6 text-gray-500">{r.time}</span>
                  <span className={`rounded-full px-2 py-0.5 ${r.cls}`}>{r.status}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto h-2.5 w-[108%] -translate-x-[3.5%] rounded-b-xl bg-gradient-to-b from-[#c9d3df] to-[#aab6c4] shadow-lg" />
    </div>
  );
}

function PhoneMock() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="w-[128px] rounded-[26px] border-[5px] border-[#0b1b33] bg-white p-3 text-center text-[#1F2965] shadow-2xl sm:w-[170px] sm:rounded-[32px] sm:border-[6px]"
    >
      <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#0b1b33]/80" />
      <p className="text-[10px] sm:text-xs">صبح بخیر، علی 👋</p>
      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] text-emerald-700 sm:text-[11px]">
        <MapPin className="h-3 w-3" /> داخل محدوده
      </span>

      <div className="relative mx-auto my-4 flex h-20 w-20 items-center justify-center sm:my-6 sm:h-28 sm:w-28">
        {[0, 1].map((d) => (
          <motion.span
            key={d}
            className="absolute inset-0 rounded-full bg-[#0A4C8B]/30"
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: d * 1, ease: "easeOut" }}
          />
        ))}
        <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#0A4C8B] to-[#063A6B] text-[11px] font-bold text-white shadow-lg sm:text-sm">
          ثبت ورود
        </div>
      </div>

      <p className="font-nozha text-xl sm:text-2xl">۰۸:۰۲</p>
      <p className="mb-2 text-[9px] text-gray-500 sm:text-[11px]">شیفت صبح · ۰۸ تا ۱۶</p>
    </motion.div>
  );
}

export function ShowcaseSection() {
  return (
    <section id="product" className="w-full scroll-mt-28 overflow-hidden py-14 sm:py-20 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="یک رابط کاربری برای موبایل، لپ‌تاپ و هر دستگاه دیگه"
          description="نیروها با اپلیکیشن موبایل ثبت می‌کنن و مدیر همه‌چیز رو روی پنل وب می‌بینه؛ هر دو سریع، ساده و واکنش‌گرا."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative pb-16 sm:pb-20"
        >
          <div className="absolute inset-x-[10%] top-8 -z-10 h-[70%] rounded-full bg-[#2B9ADA]/20 blur-3xl" />
          <LaptopMock />
          <div className="absolute bottom-0 left-2 sm:left-[6%] lg:left-[12%]">
            <PhoneMock />
          </div>
        </motion.div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-[#0A4C8B]">
          <span className="flex items-center gap-2 rounded-full bg-[#F1F7FC] px-4 py-2">
            <Smartphone className="h-4 w-4" /> اپلیکیشن موبایل
          </span>
          <span className="flex items-center gap-2 rounded-full bg-[#F1F7FC] px-4 py-2">
            <Laptop className="h-4 w-4" /> پنل مدیریت تحت وب
          </span>
        </div>
      </div>
    </section>
  );
}
