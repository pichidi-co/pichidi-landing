import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { getPlanById } from "@/components/constant/pricing";

export const metadata: Metadata = { title: "تکمیل خرید | پیچیدی" };

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; cycle?: string }>;
}) {
  const { plan: planId, cycle } = await searchParams;
  const plan = getPlanById(planId);

  // only paid, self-serve plans can be checked out
  if (!plan || plan.action !== "checkout") redirect("/#pricing");

  return <CheckoutForm plan={plan} initialCycle={cycle === "yearly" ? "yearly" : "monthly"} />;
}
