// app/api/payment/callback/route.ts
// The gateway sends the user back here: /api/payment/callback?order=<id>&Authority=...&Status=OK|NOK
import { NextRequest, NextResponse } from "next/server";
import { getOrderByPublicId, markOrderFailed, markOrderPaid } from "@/lib/db";
import { getSiteUrl, isMockGateway, verifyPayment } from "@/lib/zarinpal";

export async function GET(req: NextRequest) {
  const site = getSiteUrl(req.nextUrl.origin);
  const go = (path: string) => NextResponse.redirect(`${site}${path}`, 303);

  const publicId = req.nextUrl.searchParams.get("order") ?? "";
  const authority = req.nextUrl.searchParams.get("Authority") ?? "";
  const status = req.nextUrl.searchParams.get("Status");

  const order = publicId ? getOrderByPublicId(publicId) : undefined;
  if (!order) return go("/payment/failed?reason=not_found");

  // refreshing the callback URL after a successful payment must not break anything
  if (order.status === "paid") return go(`/payment/success?order=${publicId}`);

  if (status !== "OK" || !authority || authority !== order.authority) {
    markOrderFailed(publicId, "cancelled");
    return go(`/payment/failed?order=${publicId}&reason=cancelled`);
  }

  try {
    // dev-only fake gateway
    if (isMockGateway() && process.env.NODE_ENV !== "production" && authority.startsWith("MOCK-")) {
      markOrderPaid(publicId, `MOCK${Date.now().toString().slice(-8)}`, "6037-99**-****-1234");
      return go(`/payment/success?order=${publicId}`);
    }

    const result = await verifyPayment({ amount: order.amount, authority });
    if (result.ok) {
      markOrderPaid(publicId, result.refId, result.cardPan);
      return go(`/payment/success?order=${publicId}`);
    }
    markOrderFailed(publicId, "verify");
    return go(`/payment/failed?order=${publicId}&reason=verify`);
  } catch (err) {
    console.error("Verify error:", err);
    // don't mark as failed: the user may have paid, so keep it pending for manual check
    return go(`/payment/failed?order=${publicId}&reason=verify`);
  }
}
