import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { StatusHero } from "@/components/payment/StatusHero";
import { getOrderByPublicId } from "@/lib/db";
import { getPlanById } from "@/components/constant/pricing";
import { formatToman, formatTehranDate } from "@/lib/format";

export const metadata: Metadata = { title: "پرداخت موفق | پیچیدی" };
export const dynamic = "force-dynamic";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: id } = await searchParams;
  const order = id ? getOrderByPublicId(id) : undefined;

  // this page is only for verified payments
  if (!order || order.status !== "paid") redirect(`/payment/failed${id ? `?order=${id}` : ""}`);

  const plan = getPlanById(order.planId);
  const rows: [string, string][] = [
    ["پلن", `${plan?.title ?? order.planId} (${order.cycle === "yearly" ? "سالانه" : "ماهانه"})`],
    ["مبلغ پرداختی", `${formatToman(order.amount)} تومان`],
    ["کد پیگیری", order.refId ?? "—"],
    ["تاریخ پرداخت", formatTehranDate(order.paidAt)],
    ["خریدار", `${order.firstName} ${order.lastName}`],
    ["شماره تماس", order.phoneNumber],
  ];

  return (
    <main className="min-h-screen px-4 pb-20 pt-36 sm:pt-44">
      <div className="mx-auto max-w-xl">
        <StatusHero
          variant="success"
          title="پرداخت با موفقیت انجام شد"
          subtitle="اشتراک شما ثبت شد. کد پیگیری رو نگه دار تا در صورت نیاز به پشتیبانی اعلام کنی."
        />

        <dl className="mt-10 divide-y divide-gray-200 rounded-[28px] bg-[#F6F5F5] px-6 py-2 shadow-[10px_10px_8px_rgba(0,0,0,0.12)]">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-4 py-3.5 text-sm">
              <dt className="text-gray-500">{k}</dt>
              <dd className="font-medium text-gray-800">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex justify-center">
          <Link href="/" className="rounded-full bg-secondary px-8 py-3 font-bold text-[#063A6B] shadow-lg transition-transform hover:scale-105">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </main>
  );
}
