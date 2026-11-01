"use client";

import { Loader2, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UiPlan } from "@/lib/api/subscription/transformer";
import type { AuthSession } from "@/lib/api/auth/types";
import { usePurchasePlan } from "@/lib/api/subscription/mutations";
import { useLogout } from "@/lib/api/auth/mutations";
import { formatToman } from "@/lib/format";

/** Shown when the visitor is logged in: account summary + pay button. */
export function PayBox({ plan, session }: { plan: UiPlan; session: AuthSession }) {
  const purchase = usePurchasePlan();
  const logout = useLogout();

  // stay disabled after success too, while the browser is redirecting to the gateway
  const busy = purchase.isPending || purchase.isSuccess;
  const isCustomer = session.role === "customer";

  return (
    <div>
      <h2 className="text-center text-xl font-bold text-white sm:text-2xl">تأیید و پرداخت</h2>
      <p className="mt-1 text-center text-sm text-white/70">
        بعد از تأیید، به درگاه امن پرداخت منتقل می‌شی.
      </p>

      <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm text-white">
        <p className="text-white/60">حساب کاربری</p>
        <p className="mt-1 font-bold">{session.user.name}</p>
        <p dir="ltr" className="mt-0.5 text-right text-white/80">{session.user.phone}</p>
      </div>

      {isCustomer ? (
        <>
          <Button
            onClick={() => purchase.mutate({ planId: plan.id })}
            disabled={busy}
            className="mt-5 h-12 w-full rounded-full bg-secondary text-base font-bold text-primary hover:bg-secondary/90"
          >
            {busy ? (
              <><Loader2 className="h-5 w-5 animate-spin" /> در حال انتقال به درگاه…</>
            ) : (
              <>پرداخت {formatToman(plan.rawPrice)} تومان</>
            )}
          </Button>

          {purchase.isError && (
            <p role="alert" className="mt-3 text-center text-sm font-medium text-red-200">
              {purchase.error.message || "خطایی رخ داد، لطفاً دوباره تلاش کنید."}
            </p>
          )}
        </>
      ) : (
        <p role="alert" className="mt-5 text-center text-sm font-medium text-red-200">
          این حساب مربوط به نیروی یک سازمانه و امکان خرید نداره. با حساب مدیر مجموعه وارد شو.
        </p>
      )}

      <button
        type="button"
        onClick={() => logout.mutate()}
        disabled={busy || logout.isPending}
        className="mt-4 block w-full cursor-pointer text-center text-sm text-white/80 underline disabled:opacity-60"
      >
        ورود با حساب دیگر
      </button>

      <div className="flex items-center justify-center gap-4 pt-4 text-xs text-white/60">
        <span className="flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> پرداخت امن</span>
        <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> اطلاعات کارت نزد ما ذخیره نمی‌شود</span>
      </div>
    </div>
  );
}
