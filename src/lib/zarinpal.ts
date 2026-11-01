// Zarinpal v4 REST wrapper. Amounts are in Toman (currency: "IRT").
// ENV: ZARINPAL_MERCHANT_ID, ZARINPAL_SANDBOX=true (optional), NEXT_PUBLIC_SITE_URL

const sandbox = () => process.env.ZARINPAL_SANDBOX === "true";
const host = () => (sandbox() ? "https://sandbox.zarinpal.com" : "https://payment.zarinpal.com");

export const isMockGateway = () => !process.env.ZARINPAL_MERCHANT_ID;

export function getSiteUrl(fallbackOrigin: string) {
  return (process.env.NEXT_PUBLIC_SITE_URL || fallbackOrigin).replace(/\/$/, "");
}

export async function requestPayment(params: {
  amount: number;
  description: string;
  callbackUrl: string;
  mobile?: string;
}): Promise<{ authority: string; paymentUrl: string }> {
  const res = await fetch(`${host()}/pg/v4/payment/request.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      merchant_id: process.env.ZARINPAL_MERCHANT_ID,
      amount: params.amount,
      currency: "IRT",
      description: params.description,
      callback_url: params.callbackUrl,
      metadata: params.mobile ? { mobile: params.mobile } : undefined,
    }),
  });
  const json = await res.json();
  const authority = json?.data?.authority;
  if (json?.data?.code !== 100 || !authority) {
    throw new Error(`Zarinpal request failed: ${JSON.stringify(json?.errors ?? json)}`);
  }
  return { authority, paymentUrl: `${host()}/pg/StartPay/${authority}` };
}

export async function verifyPayment(params: { amount: number; authority: string }) {
  const res = await fetch(`${host()}/pg/v4/payment/verify.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      merchant_id: process.env.ZARINPAL_MERCHANT_ID,
      amount: params.amount,
      authority: params.authority,
    }),
  });
  const json = await res.json();
  const code = json?.data?.code;
  // 100 = verified, 101 = already verified
  return {
    ok: code === 100 || code === 101,
    refId: json?.data?.ref_id ? String(json.data.ref_id) : undefined,
    cardPan: json?.data?.card_pan as string | undefined,
  };
}
