import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError, apiFetch } from "../../client";
import { sessionOptions } from "../auth/queries";
import type { PurchasePayload, PurchaseResponse } from "./types";

/** POST /customer/subscription/purchase  { planId } → redirects to the payment gateway */
export function usePurchasePlan() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: PurchasePayload) => {
      const res = await apiFetch<PurchaseResponse>("/subscription/purchase", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (!res.success || !res.data?.redirectUrl) {
        throw new Error("لینک پرداخت دریافت نشد، لطفاً دوباره تلاش کنید.");
      }
      return res;
    },
    onSuccess: (res) => {
      window.location.href = res.data.redirectUrl;
    },
    onError: (err) => {
      // session expired → the checkout page falls back to the login step
      if (err instanceof ApiError && err.status === 401) {
        qc.setQueryData(sessionOptions.queryKey, null);
      }
    },
  });
}
