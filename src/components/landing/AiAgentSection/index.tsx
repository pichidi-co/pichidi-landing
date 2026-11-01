"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Bot, Send, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

type Scenario = {
  q: string;
  intro: string;
  bars: { label: string; value: number; text: string }[];
  outro: string;
};

// demo conversation (sample data shown in the mock chat)
const SCENARIOS: Scenario[] = [
  {
    q: "کدوم پرسنل این ماه بیشترین تأخیر رو داشتن؟",
    intro: "این ماه سه نفر بیشترین تأخیر رو داشتن:",
    bars: [
      { label: "علی رضایی", value: 85, text: "۴ بار · ۵۲ دقیقه" },
      { label: "مریم احمدی", value: 60, text: "۳ بار · ۳۸ دقیقه" },
      { label: "سینا کریمی", value: 38, text: "۲ بار · ۲۴ دقیقه" },
    ],
    outro: "بیشتر تأخیرها شنبه‌ها و بین ۸ تا ۸:۳۰ ثبت شده.",
  },
  {
    q: "وضعیت اضافه‌کار تیم فروش چطوره؟",
    intro: "مجموع اضافه‌کار تیم فروش در این هفته:",
    bars: [
      { label: "دوشنبه", value: 30, text: "۲ ساعت" },
      { label: "سه‌شنبه", value: 55, text: "۴ ساعت" },
      { label: "چهارشنبه", value: 90, text: "۷ ساعت" },
    ],
    outro: "اضافه‌کار چهارشنبه از میانگین هفته‌های قبل بالاتره.",
  },
  {
    q: "الگوی غیبت مشکوکی می‌بینی؟",
    intro: "دو نفر در سه هفته اخیر الگوی تکراری دارن:",
    bars: [
      { label: "غیبت قبل از تعطیلی", value: 75, text: "۳ مورد" },
      { label: "غیبت بعد از تعطیلی", value: 50, text: "۲ مورد" },
    ],
    outro: "پیشنهاد می‌کنم گزارش کامل این دو نفر رو بررسی کنی.",
  },
];

type Phase = "idle" | "question" | "typing" | "answer";

export function AiAgentSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px" });
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (!inView) return;
    const next: Record<Phase, [Phase | "loop", number]> = {
      idle: ["question", 400],
      question: ["typing", 900],
      typing: ["answer", 1500],
      answer: ["loop", 6500],
    };
    const [to, ms] = next[phase];
    const t = setTimeout(() => {
      if (to === "loop") {
        setI((x) => (x + 1) % SCENARIOS.length);
        setPhase("question");
      } else setPhase(to);
    }, ms);
    return () => clearTimeout(t);
  }, [inView, phase]);

  const s = SCENARIOS[i];

  return (
    <section
      id="ai"
      className="relative w-full scroll-mt-28 overflow-hidden bg-gradient-to-br from-[#062F5F] via-[#0A4C8B] to-[#063A6B] py-14 text-white sm:py-20 md:py-24"
    >
      <div className="pointer-events-none absolute -top-24 right-[-80px] h-72 w-72 rounded-full bg-[#2B9ADA]/20 blur-3xl" />
      <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="start"
              light
              title="دستیار هوش مصنوعی که داده‌های حضور و غیاب رو می‌فهمه"
              description="به‌جای ساختن فیلتر و جدول، فقط سؤالت رو بپرس. ایجنت پیچیدی تأخیر، تعجیل و غیبت‌ها رو تحلیل می‌کنه و جواب رو خلاصه بهت می‌ده."
              className="mb-6 px-0"
            />
            <ul className="space-y-3 text-sm text-white/85 sm:text-base">
              {[
                "تحلیل الگوی تأخیر، تعجیل و غیبت هر نفر و هر تیم",
                "پاسخ به زبان ساده، بدون نیاز به گزارش‌ساز",
                "مقایسه هفته‌ها و ماه‌ها برای تصمیم‌گیری سریع‌تر",
              ].map((t, idx) => (
                <Reveal key={t} delay={idx * 0.1}>
                  <li className="flex items-start gap-3">
                    <Sparkles className="mt-1 h-4 w-4 shrink-0 text-secondary" />
                    {t}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* mock chat */}
          <div ref={ref} className="mx-auto w-full max-w-[480px]">
            <div className="overflow-hidden rounded-[28px] bg-white text-[#1F2965] shadow-2xl">
              <div className="flex items-center gap-3 bg-[#F1F7FC] px-5 py-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A4C8B] text-white">
                  <Bot className="h-5 w-5" />
                </span>
                <div className="text-sm">
                  <b>دستیار پیچیدی</b>
                  <span className="flex items-center gap-1 text-xs text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> آنلاین
                  </span>
                </div>
                <span className="mr-auto text-[11px] text-gray-400">نمونه گفتگو</span>
              </div>

              <div className="min-h-[330px] space-y-3 p-5 text-sm" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    {phase !== "idle" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mr-auto w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-[#0A4C8B] px-4 py-2.5 text-white"
                      >
                        {s.q}
                      </motion.div>
                    )}

                    {phase === "typing" && (
                      <div className="flex w-fit gap-1 rounded-2xl rounded-tr-sm bg-[#F1F7FC] px-4 py-3">
                        {[0, 1, 2].map((d) => (
                          <motion.span
                            key={d}
                            className="h-2 w-2 rounded-full bg-[#0A4C8B]/60"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
                          />
                        ))}
                      </div>
                    )}

                    {phase === "answer" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-[92%] space-y-3 rounded-2xl rounded-tr-sm bg-[#F1F7FC] px-4 py-3"
                      >
                        <p>{s.intro}</p>
                        <div className="space-y-2.5">
                          {s.bars.map((b, idx) => (
                            <div key={b.label}>
                              <div className="mb-1 flex justify-between text-xs">
                                <span>{b.label}</span>
                                <span className="text-gray-500">{b.text}</span>
                              </div>
                              <div className="h-2 overflow-hidden rounded-full bg-white">
                                <motion.div
                                  className="h-full origin-right rounded-full bg-gradient-to-l from-[#0A4C8B] to-[#2B9ADA]"
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: b.value / 100 }}
                                  transition={{ duration: 0.8, delay: 0.2 + idx * 0.15, ease: "easeOut" }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-600">{s.outro}</p>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-2 border-t border-gray-100 px-4 py-3">
                <div className="flex-1 rounded-full bg-[#F1F7FC] px-4 py-2 text-xs text-gray-400">
                  سؤالت رو بنویس…
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-[#063A6B]">
                  <Send className="h-4 w-4 -scale-x-100" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
