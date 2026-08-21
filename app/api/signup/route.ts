// app/api/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { insertCustomer, getCustomerByPhoneAndSource } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, phoneNumber, source } = await req.json();

    if (!firstName?.trim() || !lastName?.trim() || !phoneNumber?.trim()) {
      return NextResponse.json({ error: "همه فیلدها الزامی هستند." }, { status: 400 });
    }

    if (!/^09\d{9}$/.test(phoneNumber.trim())) {
      return NextResponse.json({ error: "شماره موبایل معتبر نیست." }, { status: 400 });
    }

    const normalizedSource =
      typeof source === "string" && source.trim() ? source.trim() : "consultation";

    if (getCustomerByPhoneAndSource(phoneNumber.trim(), normalizedSource)) {
      return NextResponse.json(
        { error: "این شماره موبایل قبلاً برای همین درخواست ثبت شده است." },
        { status: 409 }
      );
    }

    const customer = insertCustomer({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phoneNumber: phoneNumber.trim(),
      source: normalizedSource,
    });

    return NextResponse.json({ success: true, customer }, { status: 201 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "خطایی رخ داد، لطفاً دوباره تلاش کنید." }, { status: 500 });
  }
}