"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import type { CompareRow, UiPlan } from "@/lib/api/subscription/transformer";

interface PricingCompareProps {
  plans: UiPlan[];
  rows: CompareRow[];
}

const CHECK_ICON = "/icons/pricing/mdi_file-tick.svg";

export function PricingCompare({ plans, rows }: PricingCompareProps) {
  if (plans.length === 0 || rows.length === 0) return null;

  return (
    <div className="mt-16 sm:mt-20">
      <div className="mb-8 text-center">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
          مقایسه دقیق پلن‌ها
        </h3>
        <p className="mt-2 text-sm sm:text-base text-gray-500">
          همه ویژگی‌ها را کنار هم ببین و بهترین انتخاب را داشته باش
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full min-w-[720px] border-collapse text-right">
          <thead>
            <tr className="bg-[#07437A] text-white">
              <th className="p-3 sm:p-4 text-xs sm:text-sm font-semibold w-[220px]">
                ویژگی
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  className="p-3 sm:p-4 text-xs sm:text-sm font-semibold text-center"
                >
                  <div className="flex flex-col items-center gap-1">
                    <span>{plan.title}</span>
                    <span className="text-[10px] sm:text-xs font-normal opacity-80">
                      {plan.price === "رایگان"
                        ? "رایگان"
                        : `${plan.price} تومان`}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.key}
                className={cn(
                  "border-b border-gray-100 last:border-0",
                  idx % 2 === 1 && "bg-gray-50/50",
                )}
              >
                <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium text-gray-700">
                  {row.label}
                </td>
                {row.values.map((v) => (
                  <td
                    key={v.planId}
                    className="p-3 sm:p-4 text-center text-xs sm:text-sm"
                  >
                    <CompareCell display={v.display} variant={v.variant} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CompareCell({
  display,
  variant,
}: {
  display: string;
  variant: "check" | "x" | "text" | "unlimited";
}) {
  if (variant === "check") {
    return (
      <div className="inline-flex items-center gap-1.5 text-green-600">
        <Image src={CHECK_ICON} alt="دارد" width={16} height={16} />
        <span className="text-xs">{display}</span>
      </div>
    );
  }

  if (variant === "x") {
    return (
      <div className="inline-flex items-center gap-1.5 text-gray-400">
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <span className="text-xs">{display}</span>
      </div>
    );
  }

  if (variant === "unlimited") {
    return (
      <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
        نامحدود
      </span>
    );
  }

  return <span className="text-gray-700">{display}</span>;
}