// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import {
  createOrder,
  getCustomerByPhoneAndSource,
  insertCustomer,
  markOrderFailed,
  setOrderAuthority,
} from "@/lib/db";
import { getPlanAmount, getPlanById } from "@/components/constant/pricing";
import { normalizeDigits } from "@/lib/format";
import { getSiteUrl, isMockGateway, requestPayment } from "@/lib/zarinpal";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const phoneNumber = normalizeDigits(String(body.phoneNumber ?? ""));
    const cycle = body.cycle === "yearly" ? "yearly" : "monthly";
    const plan = getPlanById(body.planId);

    if (!firstName || !lastName || !phoneNumber) {
      return NextResponse.json({ error: "همه فیلدها الزامی هستند." }, { status: 400 });
    }
    if (!/^09\d{9}$/.test(phoneNumber)) {
      return NextResponse.json({ error: "شماره موبایل معتبر نیست." }, { status: 400 });
    }
    // price is ALWAYS computed here — never trust an amount sent by the browser
    if (!plan || plan.action !== "checkout") {
      return NextResponse.json({ error: "پلن انتخابی معتبر نیست." }, { status: 400 });
    }

    const amount = getPlanAmount(plan, cycle);
    const mock = isMockGateway();
    if (mock && process.env.NODE_ENV === "production") {
      console.error("ZARINPAL_MERCHANT_ID is not set");
      return NextResponse.json({ error: "درگاه پرداخت هنوز راه‌اندازی نشده است." }, { status: 500 });
    }

    const publicId = randomUUID();
    createOrder({ publicId, planId: plan.id, cycle, amount, firstName, lastName, phoneNumber });

    // keep the buyer as a lead too (ignore "already exists")
    if (!getCustomerByPhoneAndSource(phoneNumber, "checkout")) {
      insertCustomer({ firstName, lastName, phoneNumber, source: "checkout" });
    }

    const site = getSiteUrl(req.nextUrl.origin);

    if (mock) {
      const authority = `MOCK-${publicId}`;
      setOrderAuthority(publicId, authority);
      return NextResponse.json({
        paymentUrl: `${site}/payment/mock?order=${publicId}&Authority=${authority}`,
      });
    }

    try {
      const { authority, paymentUrl } = await requestPayment({
        amount,
        description: `اشتراک ${plan.title} پیچیدی (${cycle === "yearly" ? "سالانه" : "ماهانه"})`,
        callbackUrl: `${site}/api/payment/callback?order=${publicId}`,
        mobile: phoneNumber,
      });
      setOrderAuthority(publicId, authority);
      return NextResponse.json({ paymentUrl });
    } catch (err) {
      console.error("Gateway request error:", err);
      markOrderFailed(publicId, "gateway");
      return NextResponse.json(
        { error: "ارتباط با درگاه پرداخت برقرار نشد، لطفاً دوباره تلاش کنید." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "خطایی رخ داد، لطفاً دوباره تلاش کنید." }, { status: 500 });
  }
}
