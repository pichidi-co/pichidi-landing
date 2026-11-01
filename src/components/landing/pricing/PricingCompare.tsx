"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { useConsult } from "@/components/providers/LandingProviders";
import { cn } from "@/lib/utils";
import type { CompareRow, UiPlan } from "@/lib/api/subscription/transformer";

const POP = { type: "spring", stiffness: 300, damping: 15 } as const;

export function PricingCompare({ plans, rows }: { plans: UiPlan[]; rows: CompareRow[] }) {
  const { openConsult } = useConsult();
  if (plans.length === 0 || rows.length === 0) return null;

  return (
    <div className="mt-16 sm:mt-24">
      <Reveal className="mb-8 text-center sm:mb-10">
        <h3 className="font-nozha text-3xl leading-[1.3] text-[#1F2965] sm:text-4xl">مقایسه دقیق پلن‌ها</h3>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          همه ویژگی‌ها رو کنار هم ببین و بهترین انتخاب رو داشته باش.
        </p>
      </Reveal>

      <Reveal>
        <div className="overflow-x-auto rounded-[28px] border border-gray-200 bg-white shadow-lg">
          <table className="w-full min-w-[680px] border-collapse text-right">
            <thead>
              <tr>
                <th className="sticky right-0 z-10 w-[190px] bg-[#F1F7FC] p-4 text-sm font-bold text-[#1F2965] sm:p-5">
                  ویژگی
                </th>
                {plans.map((p) => (
                  <th
                    key={p.id}
                    className={cn(
                      "p-4 text-center sm:p-5",
                      p.isPopular ? "bg-[#0A4C8B] text-white" : "bg-[#F1F7FC] text-[#1F2965]",
                    )}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-bold sm:text-base">{p.title}</span>
                      <span className={cn("text-xs font-normal", p.isPopular ? "text-white/75" : "text-gray-500")}>
                        {p.isFree ? "رایگان" : `${p.price} تومان / ماه`}
                      </span>
                      {p.isPopular && p.badge && (
                        <span className="mt-1 rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold text-[#063A6B]">
                          {p.badge}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.key}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="group border-t border-gray-100 text-sm"
                >
                  <td className="sticky right-0 z-10 bg-white p-4 font-medium text-[#1F2965] transition-colors group-hover:bg-[#F1F7FC] sm:p-5">
                    {row.label}
                  </td>
                  {row.values.map((v, j) => (
                    <td
                      key={v.planId}
                      className={cn(
                        "p-4 text-center transition-colors sm:p-5",
                        plans[j]?.isPopular
                          ? "bg-[#0A4C8B]/5 group-hover:bg-[#0A4C8B]/10"
                          : "group-hover:bg-[#F1F7FC]",
                      )}
                    >
                      <Cell display={v.display} variant={v.variant} />
                    </td>
                  ))}
                </motion.tr>
              ))}

              <tr className="border-t border-gray-100">
                <td className="sticky right-0 z-10 bg-white p-4 sm:p-5" />
                {plans.map((p) => {
                  const cls = cn(
                    "inline-block cursor-pointer rounded-full px-5 py-2 text-sm font-bold transition-colors",
                    p.isPopular
                      ? "bg-secondary text-[#063A6B] hover:bg-secondary/90"
                      : "border-2 border-[#0A4C8B] text-[#0A4C8B] hover:bg-[#0A4C8B] hover:text-white",
                  );
                  return (
                    <td key={p.id} className={cn("p-4 text-center sm:p-5", p.isPopular && "bg-[#0A4C8B]/5")}>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                        {p.isFree ? (
                          <button onClick={() => openConsult("free")} className={cls}>{p.buttonText}</button>
                        ) : (
                          <Link href={`/checkout?plan=${p.slug}`} className={cls}>{p.buttonText}</Link>
                        )}
                      </motion.div>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-center text-xs text-gray-400 md:hidden">برای دیدن همه پلن‌ها جدول رو به کنار بکش</p>
      </Reveal>
    </div>
  );
}

function Cell({ display, variant }: { display: string; variant: "check" | "x" | "text" | "unlimited" }) {
  if (variant === "check")
    return (
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={POP}
        className="inline-flex items-center gap-1.5 font-medium text-[#0A4C8B]"
      >
        <Check className="h-4 w-4 text-emerald-500" />
        {display}
      </motion.span>
    );

  if (variant === "x")
    return (
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={POP}
        className="inline-flex items-center gap-1.5 text-gray-500"
      >
        <X className="h-4 w-4 text-red-400" />
        {display}
      </motion.span>
    );

  if (variant === "unlimited")
    return (
      <motion.span
        initial={{ scale: 0.7, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={POP}
        className="inline-block rounded-full bg-amber-100 px-3 py-0.5 text-xs font-bold text-amber-700"
      >
        نامحدود
      </motion.span>
    );

  return <span className="font-medium text-[#1F2965]">{display}</span>;
}
