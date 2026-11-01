"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/client";
import { normalizeDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  usePasswordLogin,
  useSendOtp,
  useSignUp,
  useVerifyOtp,
} from "@/lib/api/auth/mutations";

type Mode = "phone" | "otp" | "signup" | "password";

const PHONE_RE = /^09\d{9}$/;
const RESEND_SECONDS = 120; // backend cooldown between two OTPs
const fieldClass = "rounded-full bg-white/95 border-0 h-11 px-4 text-[#1F2965]";

const onlyDigits = (v: string, max: number) =>
  normalizeDigits(v).replace(/\D/g, "").slice(0, max);

const errText = (e: unknown) =>
  e instanceof Error && e.message ? e.message : "خطایی رخ داد، لطفاً دوباره تلاش کنید.";

/** the API answers "no account with this phone" with 404 */
const isNotFound = (e: unknown) =>
  e instanceof ApiError && (e.status === 404 || e.message.includes("وجود ندارد"));

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-white">{label}</Label>
      {children}
    </div>
  );
}

function Submit({ busy, children }: { busy: boolean; children: ReactNode }) {
  return (
    <Button
      type="submit"
      disabled={busy}
      className="h-12 w-full rounded-full bg-secondary text-base font-bold text-primary hover:bg-secondary/90"
    >
      {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : children}
    </Button>
  );
}

function LinkButton({ onClick, disabled, children }: { onClick: () => void; disabled?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="block w-full cursor-pointer text-center text-sm text-white/80 underline disabled:cursor-not-allowed disabled:no-underline disabled:opacity-60"
    >
      {children}
    </button>
  );
}

/** Login / sign-up inside the checkout page. On success the session cache is filled and the page swaps to the pay box. */
export function AuthPanel() {
  const [mode, setMode] = useState<Mode>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const [left, setLeft] = useState(0);

  const sendOtp = useSendOtp();
  const verify = useVerifyOtp();
  const login = usePasswordLogin();
  const signUp = useSignUp();
  const busy = sendOtp.isPending || verify.isPending || login.isPending || signUp.isPending;

  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  const go = (m: Mode) => {
    setMode(m);
    setError("");
    setInfo("");
  };

  const goSignup = () => {
    setMode("signup");
    setError("");
    setInfo("با این شماره حسابی نداریم. اطلاعات زیر رو کامل کن تا حساب بسازیم.");
  };

  const requestCode = () => {
    setError("");
    setInfo("");
    sendOtp.mutate(
      { phone },
      {
        onSuccess: () => {
          setCode("");
          setLeft(RESEND_SECONDS);
          setMode("otp");
        },
        onError: (e) => (isNotFound(e) ? goSignup() : setError(errText(e))),
      },
    );
  };

  const submitPhone = (e: FormEvent) => {
    e.preventDefault();
    if (!PHONE_RE.test(phone)) return setError("شماره موبایل معتبر نیست");
    requestCode();
  };

  const submitOtp = (e: FormEvent) => {
    e.preventDefault();
    if (code.length !== 4) return setError("کد ۴ رقمی رو وارد کن");
    setError("");
    verify.mutate({ phone, code }, { onError: (err) => setError(errText(err)) });
  };

  const submitSignup = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return setError("نام و نام خانوادگی رو وارد کن");
    if (password.length < 6) return setError("رمز عبور باید حداقل ۶ کاراکتر باشه");
    setError("");
    setInfo("");
    signUp.mutate({ name: name.trim(), phone, password }, { onError: (err) => setError(errText(err)) });
  };

  const submitPassword = (e: FormEvent) => {
    e.preventDefault();
    if (!PHONE_RE.test(phone)) return setError("شماره موبایل معتبر نیست");
    if (!password) return setError("رمز عبور رو وارد کن");
    setError("");
    login.mutate(
      { phone, password },
      { onError: (err) => (isNotFound(err) ? goSignup() : setError(errText(err))) },
    );
  };

  const titles: Record<Mode, { t: string; s: string }> = {
    phone: { t: "ورود یا ثبت‌نام", s: "برای خرید اشتراک، شماره موبایلت رو وارد کن." },
    otp: { t: "کد تأیید رو وارد کن", s: `کد ۴ رقمی به ${phone} پیامک شد.` },
    signup: { t: "ساخت حساب کاربری", s: "فقط چند ثانیه طول می‌کشه." },
    password: { t: "ورود با رمز عبور", s: "با شماره موبایل و رمز عبورت وارد شو." },
  };

  return (
    <div>
      <h2 className="text-center font-nozha text-2xl text-white sm:text-3xl">{titles[mode].t}</h2>
      <p className="mt-1 text-center text-sm text-white/70">{titles[mode].s}</p>
      {info && <p className="mt-3 text-center text-sm font-medium text-secondary">{info}</p>}

      {mode === "phone" && (
        <form onSubmit={submitPhone} className="mt-6 space-y-4" noValidate>
          <Field id="phone" label="شماره موبایل">
            <Input id="phone" type="tel" inputMode="numeric" autoComplete="tel" dir="ltr" placeholder="09xxxxxxxxx"
              value={phone} onChange={(e) => setPhone(onlyDigits(e.target.value, 11))}
              className={cn(fieldClass, "text-right")} />
          </Field>
          <Submit busy={busy}>دریافت کد تأیید</Submit>
          <LinkButton onClick={() => go("password")}>ورود با رمز عبور</LinkButton>
        </form>
      )}

      {mode === "otp" && (
        <form onSubmit={submitOtp} className="mt-6 space-y-4" noValidate>
          <Field id="code" label="کد تأیید">
            <Input id="code" type="text" inputMode="numeric" autoComplete="one-time-code" dir="ltr" placeholder="۴ رقمی"
              value={code} onChange={(e) => setCode(onlyDigits(e.target.value, 4))} autoFocus
              className={cn(fieldClass, "text-center text-lg tracking-[0.5em]")} />
          </Field>
          <Submit busy={busy}>تأیید و ادامه</Submit>
          <LinkButton onClick={requestCode} disabled={left > 0 || busy}>
            {left > 0 ? `ارسال مجدد کد تا ${left} ثانیه دیگر` : "ارسال مجدد کد"}
          </LinkButton>
          <LinkButton onClick={() => go("phone")}>ویرایش شماره</LinkButton>
        </form>
      )}

      {mode === "signup" && (
        <form onSubmit={submitSignup} className="mt-6 space-y-4" noValidate>
          <Field id="signup-phone" label="شماره موبایل">
            <Input id="signup-phone" dir="ltr" value={phone} readOnly className={cn(fieldClass, "text-right opacity-80")} />
          </Field>
          <Field id="name" label="نام و نام خانوادگی">
            <Input id="name" autoComplete="name" placeholder="نام و نام خانوادگی" value={name}
              onChange={(e) => setName(e.target.value)} className={fieldClass} />
          </Field>
          <Field id="signup-password" label="رمز عبور">
            <Input id="signup-password" type="password" autoComplete="new-password" dir="ltr" placeholder="حداقل ۶ کاراکتر"
              value={password} onChange={(e) => setPassword(e.target.value)} className={cn(fieldClass, "text-right")} />
          </Field>
          <Submit busy={busy}>ساخت حساب و ادامه</Submit>
          <LinkButton onClick={() => go("phone")}>شماره اشتباهه؟ ویرایش</LinkButton>
        </form>
      )}

      {mode === "password" && (
        <form onSubmit={submitPassword} className="mt-6 space-y-4" noValidate>
          <Field id="login-phone" label="شماره موبایل">
            <Input id="login-phone" type="tel" inputMode="numeric" autoComplete="tel" dir="ltr" placeholder="09xxxxxxxxx"
              value={phone} onChange={(e) => setPhone(onlyDigits(e.target.value, 11))}
              className={cn(fieldClass, "text-right")} />
          </Field>
          <Field id="login-password" label="رمز عبور">
            <Input id="login-password" type="password" autoComplete="current-password" dir="ltr"
              value={password} onChange={(e) => setPassword(e.target.value)} className={cn(fieldClass, "text-right")} />
          </Field>
          <Submit busy={busy}>ورود و ادامه</Submit>
          <LinkButton onClick={() => go("phone")}>ورود با کد تأیید</LinkButton>
        </form>
      )}

      {error && (
        <p role="alert" className="mt-4 text-center text-sm font-medium text-red-200">
          {error}
        </p>
      )}
    </div>
  );
}
