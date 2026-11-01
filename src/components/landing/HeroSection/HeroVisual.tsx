"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bot, MapPin } from "lucide-react";

/** Character image with a gentle float + two "live" chips that show what the product does. */
export function HeroVisual() {
  return (
    <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] xl:w-[522px] xl:h-[550px]">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, #2B9ADA 29.12%, #65B6E4 40.96%, #A9D6F0 54.52%, #DDEFF9 72.6%, #FFFFFF 90.24%)",
          transform: "scale(1.3)",
        }}
      />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full h-full rounded-full overflow-hidden bg-white z-10"
      >
        <Image
          src="/images/charactor/IMG_7113 1 (3).png"
          alt="سامانه حضور و غیاب هوشمند"
          fill
          className="object-contain p-2"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute -right-2 sm:-right-6 top-6 z-20 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-xl text-xs sm:text-sm"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <MapPin className="h-4 w-4" />
        </span>
        <span>
          <b className="block text-[#1F2965]">ورود ثبت شد</b>
          <span className="text-gray-500">داخل محدوده شرکت</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute -left-2 sm:-left-6 bottom-10 z-20 flex items-center gap-2 rounded-2xl bg-[#0A4C8B] px-3 py-2 shadow-xl text-xs sm:text-sm text-white"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
          <Bot className="h-4 w-4" />
        </span>
        <span>
          <b className="block">گزارش تأخیرها آماده است</b>
          <span className="text-white/70">تحلیل هوشمند</span>
        </span>
      </motion.div>
    </div>
  );
}
