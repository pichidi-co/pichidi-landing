import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../client";
import type { PlansApiResponse } from "./types";

export const subscriptionKeys = {
  all: ["subscription"] as const,
  plans: () => [...subscriptionKeys.all, "plans"] as const,
};

export function usePlans() {
  return useQuery({
    queryKey: subscriptionKeys.plans(),
    queryFn: () => apiFetch<PlansApiResponse>("/plans"),
    staleTime: 5 * 60 * 1000,
    select: (res) => res.data,
  });
}