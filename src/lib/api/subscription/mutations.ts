import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "../client";
import type { PurchasePayload, PurchaseResponse } from "./types";

export function usePurchasePlan() {
  return useMutation({
    mutationFn: (payload: PurchasePayload) =>
      apiFetch<PurchaseResponse>("/customer/subscription/purchase", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: (res) => {
      if (!res.success) return;

      if (res.data.isFree) {
        // پلن رایگان — منطق فعال‌سازی را اینجا اضافه کن
        return;
      }

      if (res.data.redirectUrl) {
        window.location.href = res.data.redirectUrl;
      }
    },
  });
}