// src/components/landing/SignUp/SignUpForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface SignUpFormProps {
  onSuccess?: () => void;
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>();

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (values: SignUpFormValues) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "خطایی رخ داد.");
        return;
      }

      setStatus("success");
      setMessage("ثبت‌نام شما با موفقیت انجام شد!");
      reset();
      if (onSuccess) setTimeout(onSuccess, 1100);
    } catch {
      setStatus("error");
      setMessage("ارتباط با سرور برقرار نشد.");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto space-y-4 sm:space-y-5"
      dir="rtl"
    >
      <div className="space-y-1.5">
        <Label htmlFor="firstName" className="text-white">نام</Label>
        <Input
          id="firstName"
          placeholder="نام خود را وارد کنید"
          className="rounded-full bg-white/95 border-0 h-11 px-4"
          {...register("firstName", { required: "نام الزامی است" })}
        />
        {errors.firstName && (
          <p className="text-xs text-red-200">{errors.firstName.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="lastName" className="text-white">نام خانوادگی</Label>
        <Input
          id="lastName"
          placeholder="نام خانوادگی خود را وارد کنید"
          className="rounded-full bg-white/95 border-0 h-11 px-4"
          {...register("lastName", { required: "نام خانوادگی الزامی است" })}
        />
        {errors.lastName && (
          <p className="text-xs text-red-200">{errors.lastName.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phoneNumber" className="text-white">شماره موبایل</Label>
        <Input
          id="phoneNumber"
          placeholder="09xxxxxxxxx"
          dir="ltr"
          className="rounded-full bg-white/95 border-0 h-11 px-4 text-right"
          {...register("phoneNumber", {
            required: "شماره موبایل الزامی است",
            pattern: { value: /^09\d{9}$/, message: "شماره موبایل معتبر نیست" },
          })}
        />
        {errors.phoneNumber && (
          <p className="text-xs text-red-200">{errors.phoneNumber.message}</p>
        )}
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full h-12 bg-secondary text-primary font-bold text-base hover:bg-secondary/90"
        >
          {isSubmitting ? "در حال ارسال..." : "ثبت نام"}
        </Button>
      </motion.div>

      <AnimatePresence>
        {status !== "idle" && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`text-center text-sm font-medium ${
              status === "success" ? "text-secondary" : "text-red-200"
            }`}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  );
}