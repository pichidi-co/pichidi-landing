// app/api/customers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAllCustomers, getCustomersBySource } from "@/lib/db";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
  }

  const source = req.nextUrl.searchParams.get("source"); // "consultation" | "demo" | null
  const customers = source ? getCustomersBySource(source) : getAllCustomers();

  return NextResponse.json({ customers });
}