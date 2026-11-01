// Customer API (plans, subscription…) and Auth API live under different prefixes.
const CUSTOMER_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1/customer";

// default: same host, "/customer" → "/auth". Override with NEXT_PUBLIC_AUTH_API_URL if your mount path differs.
const AUTH_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL ??
  CUSTOMER_URL.replace(/\/customer\/?$/, "") + "/auth";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(
  base: string,
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    let message = res.statusText;
    try {
      const err = await res.json();
      message = err?.message ?? err?.error ?? message;
    } catch {
      /* ignore */
    }
    throw new ApiError(message, res.status);
  }

  return res.json() as Promise<T>;
}

export const apiFetch = <T>(path: string, options?: RequestInit) =>
  request<T>(CUSTOMER_URL, path, options);

export const authFetch = <T>(path: string, options?: RequestInit) =>
  request<T>(AUTH_URL, path, options);
