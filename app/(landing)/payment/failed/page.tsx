import Link from "next/link";
import type { Metadata } from "next";
import { StatusHero } from "@/components/payment/StatusHero";
import { getOrderByPublicId } from "@/lib/db";
import { FOOTER_TEXT } from "@/components/constant/footer";

export const metadata: Metadata = { title: "پرداخت ناموفق | پیچیدی" };
export const dynamic = "force-dynamic";

const REASONS: Record<string, string> = {
  cancelled: "پرداخت توسط شما لغو شد یا در درگاه کامل نشد.",
  verify: "تأیید پرداخت از سمت درگاه انجام نشد.",
  gateway: "ارتباط با درگاه پرداخت برقرار نشد.",
  not_found: "سفارشی با این مشخصات پیدا نشد.",
};

export default async function PaymentFailedPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; reason?: string }>;
}) {
  const { order: id, reason } = await searchParams;
  const order = id ? getOrderByPublicId(id) : undefined;
  const why = REASONS[reason ?? order?.failReason ?? ""] ?? "پرداخت انجام نشد.";
  const retryHref = order ? `/checkout?plan=${order.planId}&cycle=${order.cycle}` : "/#pricing";

  return (
    <main className="min-h-screen px-4 pb-20 pt-36 sm:pt-44">
      <div className="mx-auto max-w-xl">
        <StatusHero
          variant="failed"
          title="پرداخت ناموفق بود"
          subtitle={`${why} اگه مبلغی از حساب شما کسر شده، معمولاً تا ۷۲ ساعت به حسابتون برمی‌گرده.`}
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link href={retryHref} className="rounded-full bg-secondary px-8 py-3 font-bold text-[#063A6B] shadow-lg transition-transform hover:scale-105">
            تلاش مجدد برای پرداخت
          </Link>
          <a href={`tel:${FOOTER_TEXT.phone}`} className="rounded-full border-2 border-[#0A4C8B] px-8 py-3 font-bold text-[#0A4C8B] transition-colors hover:bg-[#0A4C8B] hover:text-white">
            تماس با پشتیبانی
          </a>
        </div>
        <p className="mt-6 text-center text-sm">
          <Link href="/" className="text-gray-500 underline">بازگشت به صفحه اصلی</Link>
        </p>
      </div>
    </main>
  );
}
