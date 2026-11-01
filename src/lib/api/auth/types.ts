export type AuthRole = "user" | "customer";

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  profileImage: string | null;
}

export interface AuthSession {
  role: AuthRole;
  user: AuthUser;
}

export interface AuthResponse extends AuthSession {
  success: boolean;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
  data: { role: AuthRole; expiresIn: number };
}
