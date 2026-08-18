import { NextRequest, NextResponse } from "next/server";
import { insertCustomer, getCustomerByPhone } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, phoneNumber } = await req.json();

    if (!firstName?.trim() || !lastName?.trim() || !phoneNumber?.trim()) {
      return NextResponse.json({ error: "همه فیلدها الزامی هستند." }, { status: 400 });
    }

    if (!/^09\d{9}$/.test(phoneNumber.trim())) {
      return NextResponse.json({ error: "شماره موبایل معتبر نیست." }, { status: 400 });
    }

    if (getCustomerByPhone(phoneNumber.trim())) {
      return NextResponse.json(
        { error: "این شماره موبایل قبلاً ثبت شده است." },
        { status: 409 }
      );
    }

    const customer = insertCustomer({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phoneNumber: phoneNumber.trim(),
    });

    return NextResponse.json({ success: true, customer }, { status: 201 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "خطایی رخ داد، لطفاً دوباره تلاش کنید." }, { status: 500 });
  }
}