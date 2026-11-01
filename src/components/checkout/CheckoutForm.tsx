"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import type { UiPlan } from "@/lib/api/subscription/transformer";
import type { AuthSession } from "@/lib/api/auth/types";
import { formatToman } from "@/lib/format";
import { cn } from "@/lib/utils";
import { AuthPanel } from "./AuthPanel";
import { PayBox } from "./PayBox";

export function CheckoutForm({ plan, session }: { plan: UiPlan; session: AuthSession | null }) {
  const allFeatures = [...plan.features, ...plan.moreFeatures];

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

            <ul className="mt-6 space-y-3">
              {allFeatures.map((f) => {
                const off = f.iconVariant === "x";
                return (
                  <li key={f.key} className="flex items-start gap-3 text-sm text-gray-700">
                    {off ? (
                      <X className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gray-400" />
                    ) : (
                      <Image src={f.icon} alt="" width={18} height={18} className="mt-0.5 h-[18px] w-[18px] shrink-0" />
                    )}
                    <span className={cn(off && "text-gray-400")}>{f.text}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 space-y-2 border-t border-gray-300 pt-5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>نوع اشتراک</span>
                <span>{plan.durationLabel}</span>
              </div>
              <div className="flex items-baseline justify-between pt-2 text-base font-bold text-gray-800">
                <span>مبلغ قابل پرداخت</span>
                <span className="text-xl">{formatToman(plan.rawPrice)} تومان</span>
              </div>
            </div>
          </motion.section>

          {/* ---------- login / pay ---------- */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[30px] bg-gradient-to-r from-[#0A4C8B] to-[#063A6B] p-6 shadow-2xl sm:p-8"
          >
            {session ? <PayBox plan={plan} session={session} /> : <AuthPanel />}
          </motion.section>
        </div>
      </div>
    </main>
  );
}
