"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Crown, Gift, Rocket, TrendingUp, X, type LucideIcon } from "lucide-react";
import type { UiPlan } from "@/lib/api/subscription/transformer";
import type { AuthSession } from "@/lib/api/auth/types";
import { cn } from "@/lib/utils";
import { AuthPanel } from "./AuthPanel";
import { PayBox } from "./PayBox";

const ICONS: Record<string, LucideIcon> = { free: Gift, basic: Rocket, growth: TrendingUp, pro: Crown };
const PER: Record<string, string> = { ماهانه: "ماه", سالانه: "سال" };
const STEPS = ["انتخاب پلن", "ورود به حساب", "پرداخت"];
const fa = new Intl.NumberFormat("fa-IR");

function Steps({ current }: { current: number }) {
  return (
    <div className="mx-auto mb-8 flex max-w-md items-start sm:mb-10">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <Fragment key={label}>
            {i > 0 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
                className={cn("mt-5 h-0.5 flex-1 origin-right", i <= current ? "bg-[#0A4C8B]" : "bg-gray-300")}
              />
            )}
            <div className="flex w-20 flex-col items-center gap-2 text-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: i * 0.15 }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shadow-md ring-4 ring-[#F1F7FC]",
                  done && "bg-[#0A4C8B] text-white",
                  active && "bg-secondary text-[#063A6B]",
                  !done && !active && "bg-white text-gray-400",
                )}
              >
                {done ? <Check className="h-5 w-5" /> : fa.format(i + 1)}
              </motion.span>
              <span className={cn("text-xs", active || done ? "font-medium text-[#1F2965]" : "text-gray-400")}>
                {label}
              </span>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

export function CheckoutForm({ plan, session }: { plan: UiPlan; session: AuthSession | null }) {
  const allFeatures = [...plan.features, ...plan.moreFeatures];
  const Icon = ICONS[plan.slug] ?? Rocket;
  const per = PER[plan.durationLabel] ?? plan.durationLabel;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F1F7FC] px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute -top-24 left-[-80px] h-72 w-72 rounded-full bg-[#2B9ADA]/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-[-100px] h-80 w-80 rounded-full bg-[#0A4C8B]/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <Link
          href="/#pricing"
          className="mb-6 inline-flex items-center gap-1 text-sm text-[#0A4C8B] hover:underline"
        >
          <ArrowRight className="h-4 w-4" /> بازگشت به تعرفه‌ها
        </Link>

        <Steps current={session ? 2 : 1} />

        <div className="grid items-start gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
          {/* ---------- plan summary ---------- */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="rounded-[28px] bg-white p-6 shadow-md sm:p-8"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A4C8B]/10 text-[#0A4C8B]">
                <Icon className="h-6 w-6" />
              </span>
              {plan.isPopular && plan.badge && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.4 }}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-[#063A6B]"
                >
                  {plan.badge}
                </motion.span>
              )}
            </div>

            <p className="mt-4 text-sm text-gray-500">پلن انتخابی شما</p>
            <h1 className="mt-1 font-nozha text-3xl text-[#1F2965] sm:text-4xl">{plan.title}</h1>
            <p className="mt-1 text-sm leading-7 text-gray-500">{plan.description}</p>

            <div className="my-5 h-px bg-gray-100" />

            <ul className="space-y-3">
              {allFeatures.map((f, i) => {
                const off = f.iconVariant === "x";
                return (
                  <motion.li
                    key={f.key}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.25 + i * 0.05 }}
                    className={cn("flex items-start gap-3", off && "opacity-50")}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                        off ? "bg-gray-300/50 text-gray-500" : "bg-[#0A4C8B]/10 text-[#0A4C8B]",
                      )}
                    >
                      {off ? <X className="h-3 w-3" strokeWidth={3} /> : <Check className="h-3 w-3" strokeWidth={3} />}
                    </span>
                    <span className="text-sm leading-6 text-gray-700">{f.text}</span>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-6 space-y-2 rounded-2xl bg-[#F1F7FC] p-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>نوع اشتراک</span>
                <span>{plan.durationLabel}</span>
              </div>
              <div className="flex items-baseline justify-between pt-1 font-bold text-[#1F2965]">
                <span>مبلغ قابل پرداخت</span>
                <span className="font-nozha text-2xl">
                  {fa.format(plan.rawPrice)} <span className="font-ir-yekan text-xs font-normal text-gray-500">تومان / {per}</span>
                </span>
              </div>
            </div>
          </motion.section>

          {/* ---------- login / pay ---------- */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0A4C8B] to-[#063A6B] p-6 shadow-2xl sm:p-8 lg:sticky lg:top-32"
          >
            <motion.div
              aria-hidden
              className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-white/5"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-white/5"
              animate={{ scale: [1.1, 1, 1.1] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative">
              {session ? <PayBox plan={plan} session={session} /> : <AuthPanel />}
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
