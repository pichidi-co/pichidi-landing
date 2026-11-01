"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/shared/Reveal";
import { useConsult } from "@/components/providers/LandingProviders";
import { scrollToId } from "@/lib/scroll";

export function FinalCtaSection() {
  const { openConsult } = useConsult();
  return (
    <section className="w-full overflow-hidden py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-[#0A4C8B] to-[#063A6B] px-6 py-12 text-center shadow-2xl sm:rounded-[40px] sm:px-14 sm:py-16">
            <motion.div
              aria-hidden
              className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-white/5"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-white/5"
              animate={{ scale: [1.1, 1, 1.1] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative">
              <h2 className="font-nozha text-3xl text-white sm:text-4xl md:text-5xl leading-[1.3]">
                حضور و غیاب تیمت رو هوشمند کن
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-white/80 sm:text-base">
                دموی رایگان رو روی گوشیت امتحان کن یا با کارشناس‌های ما حرف بزن تا راه‌اندازی مناسب کسب‌وکارت رو بسازیم.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <button
                  onClick={() => scrollToId("demo")}
                  className="cursor-pointer rounded-full bg-secondary px-7 py-3 font-bold text-[#063A6B] shadow-lg transition-transform hover:scale-105"
                >
                  دریافت دموی رایگان
                </button>
                <button
                  onClick={() => openConsult("consultation")}
                  className="cursor-pointer rounded-full border-2 border-white/60 px-7 py-3 font-bold text-white transition-colors hover:bg-white/10"
                >
                  درخواست مشاوره
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
