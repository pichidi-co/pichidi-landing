"use client";

import { motion } from "framer-motion";
import { Check, CircleCheck, CircleX, MapPin, ScanFace, Layers } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

const POINTS = [
  { icon: MapPin, title: "لوکیشن و شعاع دلخواه", text: "هر شعبه، سایت یا پروژه رو روی نقشه تعریف کن و محدوده مجاز ثبت حضور رو خودت تعیین کن." },
  { icon: Layers, title: "چند لوکیشن، یک پنل", text: "نیروها رو به لوکیشن‌های مختلف اختصاص بده و همه‌چیز رو از یک جا ببین." },
  { icon: ScanFace, title: "GPS یا تشخیص چهره", text: "ورود و خروج با موقعیت مکانی یا تشخیص چهره ثبت می‌شه؛ بدون دستگاه فیزیکی." },
];

// employees walking toward the geofence center (200,160)
const WALKERS = [
  { x: [60, 120, 190], y: [270, 215, 172], d: 0 },
  { x: [350, 290, 225], y: [60, 110, 148], d: 1.4 },
];

function GeofenceMap() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0A4C8B] to-[#062F5F] p-2 shadow-2xl">
      <svg viewBox="0 0 400 320" className="w-full" role="img" aria-label="نمونه محدوده لوکیشن و ثبت حضور نیروها">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="white" strokeOpacity="0.07" />
          </pattern>
        </defs>
        <rect width="400" height="320" fill="url(#grid)" />
        {/* roads */}
        <path d="M0 230 C120 200 200 260 400 210" stroke="white" strokeOpacity="0.1" strokeWidth="12" fill="none" />
        <path d="M120 0 C150 120 110 220 160 320" stroke="white" strokeOpacity="0.1" strokeWidth="9" fill="none" />

        {/* pulse rings */}
        {[0, 1.2].map((d) => (
          <motion.circle
            key={d}
            cx="200"
            cy="160"
            fill="none"
            stroke="#FDD47B"
            strokeWidth="2"
            initial={{ r: 20, opacity: 0.6 }}
            animate={{ r: 100, opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, delay: d, ease: "easeOut" }}
          />
        ))}

        {/* geofence */}
        <circle cx="200" cy="160" r="92" fill="#FDD47B" fillOpacity="0.1" />
        <motion.circle
          cx="200"
          cy="160"
          r="92"
          fill="none"
          stroke="#FDD47B"
          strokeWidth="2"
          strokeDasharray="8 8"
          animate={{ strokeDashoffset: [0, -64] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* office pin */}
        <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
          <path d="M200 128c-11 0-19 8-19 19 0 14 19 33 19 33s19-19 19-33c0-11-8-19-19-19z" fill="#FDD47B" />
          <circle cx="200" cy="147" r="7" fill="#063A6B" />
        </motion.g>

        {/* employees entering */}
        {WALKERS.map((w, i) => (
          <motion.circle
            key={i}
            r="6"
            fill="#7EE2B8"
            stroke="white"
            strokeWidth="2"
            initial={{ cx: w.x[0], cy: w.y[0] }}
            animate={{ cx: w.x, cy: w.y }}
            transition={{ duration: 5, delay: w.d, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        ))}

        {/* employee outside the zone */}
        <circle cx="335" cy="262" r="6" fill="#FF8A8A" stroke="white" strokeWidth="2" />
        <motion.circle
          cx="335"
          cy="262"
          fill="none"
          stroke="#FF8A8A"
          initial={{ r: 6, opacity: 0.8 }}
          animate={{ r: 22, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-3 top-3 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs shadow-lg sm:text-sm"
      >
        <CircleCheck className="h-5 w-5 text-emerald-500" />
        <span>
          <b className="block text-[#1F2965]">ورود ثبت شد · ۰۸:۰۲</b>
          <span className="text-gray-500">داخل محدوده مجاز</span>
        </span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute bottom-3 left-3 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs shadow-lg sm:text-sm"
      >
        <CircleX className="h-5 w-5 text-red-500" />
        <span>
          <b className="block text-[#1F2965]">ثبت ورود انجام نشد</b>
          <span className="text-gray-500">خارج از محدوده مجاز</span>
        </span>
      </motion.div>
    </div>
  );
}

export function LocationSection() {
  return (
    <section id="location" className="w-full scroll-mt-28 overflow-hidden bg-[#F1F7FC] py-14 sm:py-20 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          title="حضور و غیاب لوکیشن‌محور؛ فقط همون‌جا که باید"
          description="ورود و خروج نیروها فقط داخل محدوده‌ای که تو تعریف کردی ثبت می‌شه. دیگه نه کارت‌زنی الکی، نه ثبت از خونه."
        />

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <GeofenceMap />
          </Reveal>

          <ul className="space-y-6">
            {POINTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <li className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0A4C8B] text-white">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-[#1F2965] sm:text-xl">{p.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-gray-600 sm:text-base">{p.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
            <Reveal delay={0.35}>
              <p className="flex items-center gap-2 text-sm text-[#0A4C8B]">
                <Check className="h-4 w-4" /> بدون نصب هیچ دستگاه یا سخت‌افزاری
              </p>
            </Reveal>
          </ul>
        </div>
      </div>
    </section>
  );
}
