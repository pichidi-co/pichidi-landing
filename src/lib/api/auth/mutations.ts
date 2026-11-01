import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "../../client";
import { authKeys } from "./queries";
import type { AuthResponse, AuthSession, SendOtpResponse } from "./types";

const post = <T>(path: string, body?: unknown) =>
  authFetch<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined });

/** puts the logged-in account straight into the session cache (cookies were set by the API) */
function useSaveSession() {
  const qc = useQueryClient();
  return (res: AuthResponse) =>
    qc.setQueryData<AuthSession | null>(authKeys.me, { role: res.role, user: res.user });
}

export function useSendOtp() {
  return useMutation({
    mutationFn: (p: { phone: string }) => post<SendOtpResponse>("/send-otp", p),
  });
}

export function useVerifyOtp() {
  const save = useSaveSession();
  return useMutation({
    mutationFn: (p: { phone: string; code: string }) => post<AuthResponse>("/verify-otp", p),
    onSuccess: (res) => save(res),
  });
}

export function usePasswordLogin() {
  const save = useSaveSession();
  return useMutation({
    mutationFn: (p: { phone: string; password: string }) => post<AuthResponse>("/login", p),
    onSuccess: (res) => save(res),
  });
}

export function useSignUp() {
  const save = useSaveSession();
  return useMutation({
    mutationFn: (p: { name: string; phone: string; password: string }) =>
      post<AuthResponse>("/sign-up", p),
    onSuccess: (res) => save(res),
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => post<{ success: boolean }>("/logout"),
    onSettled: () => qc.setQueryData<AuthSession | null>(authKeys.me, null),
  });
}
