// DEV ONLY — fake gateway used when ZARINPAL_MERCHANT_ID is not set, so you can test both result pages.
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function MockGatewayPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; Authority?: string }>;
}) {
  if (process.env.NODE_ENV === "production") notFound();
  const { order, Authority } = await searchParams;
  const base = `/api/payment/callback?order=${order}&Authority=${Authority}`;

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-[28px] bg-[#F6F5F5] p-8 text-center shadow-xl">
        <h1 className="text-xl font-bold text-gray-800">درگاه پرداخت آزمایشی</h1>
        <p className="mt-2 text-sm text-gray-500">فقط در حالت توسعه نمایش داده می‌شود.</p>
        <div className="mt-6 space-y-3">
          <a href={`${base}&Status=OK`} className="block rounded-full bg-emerald-500 py-3 font-bold text-white">
            شبیه‌سازی پرداخت موفق
          </a>
          <a href={`${base}&Status=NOK`} className="block rounded-full bg-red-500 py-3 font-bold text-white">
            شبیه‌سازی پرداخت ناموفق
          </a>
        </div>
      </div>
    </main>
  );
}
