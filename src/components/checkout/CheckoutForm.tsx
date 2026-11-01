"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2, Lock, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { BillingCycle, PricingPlan } from "@/components/types/pricing";
import { getPlanAmount, getUnitPrice } from "@/components/constant/pricing";
import { formatToman, normalizeDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

interface Values {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export function CheckoutForm({ plan, initialCycle }: { plan: PricingPlan; initialCycle: BillingCycle }) {
  const [cycle, setCycle] = useState<BillingCycle>(initialCycle);
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>();

  const unit = getUnitPrice(plan, cycle);
  const total = getPlanAmount(plan, cycle);
  const yearlySaving = (plan.monthlyPrice - plan.yearlyPrice) * 12;
  const busy = isSubmitting || redirecting;

  const onSubmit = async (values: Values) => {
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id, cycle, ...values }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.paymentUrl) {
        setError(data.error || "خطایی رخ داد، لطفاً دوباره تلاش کنید.");
        return;
      }
      setRedirecting(true);
      window.location.href = data.paymentUrl;
    } catch {
      setError("ارتباط با سرور برقرار نشد.");
    }
  };

  const fieldClass = "rounded-full bg-white/95 border-0 h-11 px-4 text-[#1F2965]";

  return (
    <main className="min-h-screen px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/#pricing"
          className="mb-6 inline-flex items-center gap-1 text-sm text-[#0A4C8B] hover:underline"
        >
          <ArrowRight className="h-4 w-4" /> بازگشت به تعرفه‌ها
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
          {/* ---------- plan summary ---------- */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[30px] bg-[#F6F5F5] p-6 shadow-[10px_10px_8px_rgba(0,0,0,0.15)] sm:p-8"
          >
            <p className="text-sm text-gray-500">پلن انتخابی شما</p>
            <h1 className="mt-1 text-2xl font-bold text-gray-800 sm:text-3xl">{plan.title}</h1>
            <p className="mt-1 text-sm text-gray-500">{plan.description}</p>

            <div className="mt-5 grid grid-cols-2 gap-1 rounded-full bg-[#07437A] p-1 text-sm">
              {(["monthly", "yearly"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCycle(c)}
                  className={cn(
                    "cursor-pointer rounded-full py-2 font-bold transition-colors",
                    cycle === c ? "bg-[#B0C6D9] text-[#07437A]" : "text-white",
                  )}
                >
                  {c === "monthly" ? "ماهانه" : "سالانه"}
                </button>
              ))}
            </div>

            <ul className="mt-6 space-y-3">
              {[...plan.features, ...(plan.moreFeatures ?? [])].map((f) => (
                <li key={f.text} className="flex items-start gap-3 text-sm text-gray-700">
                  <Image src={f.icon} alt="" width={18} height={18} className="mt-0.5 h-[18px] w-[18px] shrink-0" />
                  {f.text}
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2 border-t border-gray-300 pt-5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>قیمت هر ماه</span>
                <span>{formatToman(unit)} تومان</span>
              </div>
              {cycle === "yearly" && (
                <>
                  <div className="flex justify-between text-gray-600">
                    <span>مدت اشتراک</span>
                    <span>۱۲ ماه</span>
                  </div>
                  {yearlySaving > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>صرفه‌جویی نسبت به پرداخت ماهانه</span>
                      <span>{formatToman(yearlySaving)} تومان</span>
                    </div>
                  )}
                </>
              )}
              <div className="flex items-baseline justify-between pt-2 text-base font-bold text-gray-800">
                <span>مبلغ قابل پرداخت</span>
                <motion.span key={total} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-xl">
                  {formatToman(total)} تومان
                </motion.span>
              </div>
            </div>
          </motion.section>

          {/* ---------- buyer form ---------- */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[30px] bg-gradient-to-r from-[#0A4C8B] to-[#063A6B] p-6 shadow-2xl sm:p-8"
          >
            <h2 className="text-center text-xl font-bold text-white sm:text-2xl">اطلاعات خریدار</h2>
            <p className="mt-1 text-center text-sm text-white/70">
              بعد از تأیید، به درگاه امن پرداخت منتقل می‌شی.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="firstName" className="text-white">نام</Label>
                <Input id="firstName" autoComplete="given-name" placeholder="نام خود را وارد کنید" className={fieldClass}
                  {...register("firstName", { required: "نام الزامی است" })} />
                {errors.firstName && <p className="text-xs text-red-200">{errors.firstName.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lastName" className="text-white">نام خانوادگی</Label>
                <Input id="lastName" autoComplete="family-name" placeholder="نام خانوادگی خود را وارد کنید" className={fieldClass}
                  {...register("lastName", { required: "نام خانوادگی الزامی است" })} />
                {errors.lastName && <p className="text-xs text-red-200">{errors.lastName.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phoneNumber" className="text-white">شماره تماس</Label>
                <Input id="phoneNumber" type="tel" inputMode="numeric" autoComplete="tel" dir="ltr" placeholder="09xxxxxxxxx"
                  className={cn(fieldClass, "text-right")}
                  {...register("phoneNumber", {
                    required: "شماره تماس الزامی است",
                    setValueAs: normalizeDigits,
                    pattern: { value: /^09\d{9}$/, message: "شماره موبایل معتبر نیست" },
                  })} />
                {errors.phoneNumber && <p className="text-xs text-red-200">{errors.phoneNumber.message}</p>}
              </div>

              <Button type="submit" disabled={busy}
                className="h-12 w-full rounded-full bg-secondary text-base font-bold text-primary hover:bg-secondary/90">
                {busy ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> در حال انتقال به درگاه…</>
                ) : (
                  <>پرداخت {formatToman(total)} تومان</>
                )}
              </Button>

              {error && (
                <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} role="alert"
                  className="text-center text-sm font-medium text-red-200">
                  {error}
                </motion.p>
              )}

              <div className="flex items-center justify-center gap-4 pt-1 text-xs text-white/60">
                <span className="flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> پرداخت امن</span>
                <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> اطلاعات کارت نزد ما ذخیره نمی‌شود</span>
              </div>
            </form>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
