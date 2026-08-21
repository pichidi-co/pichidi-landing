// src/components/landing/QrDemo/index.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SignUpForm } from "@/components/landing/SignUp/SignUpForm";

// TODO: replace with the real download link / store link for the app
const DEMO_APP_URL = "https://pichidi.ir/app/demo";

export function QrDemoSection() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"form" | "qr">("form");

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) {
      // reset the flow a beat after close so it's fresh next time
      setTimeout(() => setStep("form"), 300);
    }
  };

  const qrCodeSrc = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(
    DEMO_APP_URL,
  )}`;

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-[30px] sm:rounded-[40px] bg-gradient-to-r from-[#0A4C8B] to-[#063A6B] px-6 sm:px-10 md:px-14 py-10 sm:py-14 shadow-2xl overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -left-10 w-64 h-64 rounded-full bg-white/5" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* متن */}
            <div className="text-center md:text-right order-2 md:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                اپلیکیشن پیچیدی رو رایگان امتحان کن
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
                شماره‌ات رو بده تا کد QR اختصاصی برات فعال بشه، بعد با اسکن
                همون کد نسخه دموی اپلیکیشن حضور و غیاب پیچیدی رو مستقیم روی
                گوشیت نصب کن.
              </p>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block mt-6 sm:mt-8"
              >
                <button
                  onClick={() => setOpen(true)}
                  className="rounded-full bg-secondary text-primary font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 shadow-lg hover:bg-secondary/90 transition-colors cursor-pointer"
                >
                  دریافت کد QR و دموی رایگان
                </button>
              </motion.div>
            </div>

            {/* پیش‌نمایش QR */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative flex h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 items-center justify-center rounded-[28px] bg-white/95 shadow-xl">
                <Image
                  src={qrCodeSrc}
                  alt="کد QR دموی پیچیدی"
                  width={180}
                  height={180}
                  unoptimized
                  className="h-[75%] w-[75%] object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* مودال درخواست دمو */}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          dir="rtl"
          className="max-w-md rounded-[30px] border-0 bg-gradient-to-r from-[#0A4C8B] to-[#063A6B] p-8"
        >
          {step === "form" ? (
            <div key="form-step">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl text-center">
                  درخواست دموی رایگان
                </DialogTitle>
                <DialogDescription className="text-white/70 text-center">
                  اطلاعاتت رو وارد کن تا کد QR دموی اپلیکیشن براتون فعال بشه
                </DialogDescription>
              </DialogHeader>
              <SignUpForm
                source="demo"
                submitButtonText="دریافت کد QR"
                onSuccess={() => setStep("qr")}
              />
            </div>
          ) : (
            <div key="qr-step">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl text-center">
                  کد QR شما آماده است 🎉
                </DialogTitle>
                <DialogDescription className="text-white/70 text-center">
                  با دوربین گوشی، کد زیر رو اسکن کن تا اپلیکیشن دموی پیچیدی نصب بشه
                </DialogDescription>
              </DialogHeader>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-4 py-2"
              >
                <div className="rounded-[24px] bg-white p-4 shadow-xl">
                  <Image
                    src={qrCodeSrc}
                    alt="کد QR دموی پیچیدی"
                    width={220}
                    height={220}
                    unoptimized
                  />
                </div>
                <p className="text-center text-xs sm:text-sm text-white/70 max-w-xs">
                  اگه اسکنر نداری، از لینک زیر هم می‌تونی به اپلیکیشن دسترسی داشته باشی
                </p>
                <a
                  href={DEMO_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="text-secondary text-xs sm:text-sm underline break-all"
                >
                  {DEMO_APP_URL}
                </a>
              </motion.div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}