import { NextRequest, NextResponse } from "next/server";
import { getAllCustomers } from "@/lib/db";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
  }
  return NextResponse.json({ customers: getAllCustomers() });
}