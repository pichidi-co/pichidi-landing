import { queryOptions, useQuery } from "@tanstack/react-query";
import { ApiError, authFetch } from "../../client";
import type { AuthResponse, AuthSession } from "./types";

export const authKeys = {
  me: ["auth", "me"] as const,
};

const isAuthError = (e: unknown) =>
  e instanceof ApiError && (e.status === 401 || e.status === 403);

const toSession = (r: AuthResponse): AuthSession => ({ role: r.role, user: r.user });

/** GET /auth/me → on an expired access token try POST /auth/refresh once → null when logged out */
async function fetchSession(): Promise<AuthSession | null> {
  try {
    return toSession(await authFetch<AuthResponse>("/me"));
  } catch (e) {
    if (!isAuthError(e)) throw e;
  }

  try {
    await authFetch("/refresh", { method: "POST" });
    return toSession(await authFetch<AuthResponse>("/me"));
  } catch (e) {
    if (isAuthError(e)) return null;
    throw e;
  }
}

/**
 * queryOptions() gives the key a data type, so qc.setQueryData(sessionOptions.queryKey, …)
 * is fully typed (AuthSession | null) without passing generics by hand.
 */
export const sessionOptions = queryOptions({
  queryKey: authKeys.me,
  queryFn: fetchSession,
  staleTime: 60 * 1000,
  retry: false,
});

export function useSession() {
  return useQuery(sessionOptions);
}
