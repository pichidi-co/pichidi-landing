"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Reveal } from "@/components/shared/Reveal";

// TODO: these are SAMPLE numbers — replace with your real figures before going live.
const STATS = [
  { to: 500, suffix: "+", label: "کسب‌وکار فعال" },
  { to: 15000, suffix: "+", label: "نیروی ثبت‌شده" },
  { to: 2000000, suffix: "+", label: "ورود و خروج ثبت‌شده" },
  { to: 99, suffix: "٪", label: "دسترسی‌پذیری سامانه" },
];

const fa = new Intl.NumberFormat("fa-IR");

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => setV(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {fa.format(v)}
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  return (
    <section className="w-full py-6 sm:py-10">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 rounded-[30px] sm:rounded-[40px] bg-gradient-to-r from-[#0A4C8B] to-[#063A6B] py-8 sm:py-10 shadow-2xl">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`px-4 py-3 text-center ${
                  i !== 0 ? "md:border-r md:border-white/15" : ""
                }`}
              >
                <div className="font-nozha text-3xl sm:text-4xl md:text-5xl text-secondary">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-xs sm:text-sm text-white/80">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
