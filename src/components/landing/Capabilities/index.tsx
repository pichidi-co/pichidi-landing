"use client";

import { motion } from "framer-motion";
import { Bell, CalendarClock, Plane, ScanFace, Users, Layers, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const SHIFTS = [
  { label: "ثابت", segs: [{ l: 10, w: 60 }], color: "#0A4C8B" },
  { label: "چرخشی", segs: [{ l: 5, w: 25 }, { l: 40, w: 25 }, { l: 75, w: 20 }], color: "#2B9ADA" },
  { label: "شناور", segs: [{ l: 22, w: 45 }], color: "#F6C86A" },
];

function ShiftCard() {
  return (
    <div className="col-span-1 flex flex-col justify-between rounded-[28px] bg-gradient-to-br from-[#0A4C8B] to-[#063A6B] p-6 text-white shadow-xl md:col-span-2">
      <div>
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
          <CalendarClock className="h-6 w-6" />
        </span>
        <h3 className="mt-4 text-xl font-bold">تعریف نامحدود شیفت</h3>
        <p className="mt-1 text-sm leading-7 text-white/75">
          شیفت ثابت، چرخشی، شناور و هر گروه‌بندی کاری متناسب با پیچیدگی کسب‌وکار تو.
        </p>
      </div>
      <div className="mt-6 space-y-3">
        {SHIFTS.map((s, i) => (
          <div key={s.label} className="flex items-center gap-3 text-xs">
            <span className="w-12 shrink-0 text-white/80">{s.label}</span>
            <div className="relative h-3 flex-1 rounded-full bg-white/10">
              {s.segs.map((g, j) => (
                <motion.span
                  key={j}
                  className="absolute top-0 h-3 origin-right rounded-full"
                  style={{ right: `${g.l}%`, width: `${g.w}%`, background: s.color }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.2 + j * 0.1 }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const ITEMS = [
  { icon: Users, title: "مدیریت نیرو", text: "افزودن پرسنل، گروه‌بندی و اختصاص به شیفت و لوکیشن." },
  { icon: Plane, title: "مرخصی و مأموریت", text: "ثبت و پیگیری مرخصی و مأموریت، کنار حضور و غیاب." },
  { icon: Bell, title: "تشخیص تخلف", text: "تأخیر، تعجیل و غیبت خودکار شناسایی می‌شن." },
  { icon: TrendingUp, title: "گزارش لحظه‌ای", text: "عملکرد، مرخصی، مأموریت و اضافه‌کار در یک نگاه." },
  { icon: Layers, title: "چند لوکیشن", text: "شعبه‌ها و سایت‌های مختلف در یک پنل." },
  { icon: ScanFace, title: "تشخیص چهره", text: "ثبت حضور مطمئن‌تر، بدون کارت و دستگاه." },
];

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="w-full scroll-mt-28 overflow-hidden bg-[#F1F7FC] py-14 sm:py-20 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="هر چیزی که برای مدیریت نیرو لازم داری"
          description="از تعریف شیفت تا گزارش‌های مدیریتی، همه‌چیز یک‌جا و هماهنگ."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
          <ShiftCard />
          {ITEMS.slice(0, 2).map((it, i) => (
            <Card key={it.title} {...it} i={i} />
          ))}
          {ITEMS.slice(2).map((it, i) => (
            <Card key={it.title} {...it} i={i + 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ icon: Icon, title, text, i }: (typeof ITEMS)[number] & { i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: i * 0.07 }}
      whileHover={{ y: -4 }}
      className="rounded-[28px] bg-white p-6 shadow-md"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0A4C8B]/10 text-[#0A4C8B]">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-lg font-bold text-[#1F2965]">{title}</h3>
      <p className="mt-1 text-sm leading-7 text-gray-600">{text}</p>
    </motion.div>
  );
}
