"use client";

import { motion } from "framer-motion";
import { SignUpForm } from "./SignUpForm";

export function SignUpSection() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-[30px] sm:rounded-[40px] bg-gradient-to-r from-[#0A4C8B] to-[#063A6B] px-6 sm:px-10 md:px-14 py-10 sm:py-14 shadow-2xl overflow-hidden"
        >
          <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -right-10 w-64 h-64 rounded-full bg-white/5" />

          <div className="relative text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              همین حالا ثبت نام کنید
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/80">
              اطلاعات خود را وارد کنید تا کارشناسان ما در اسرع وقت با شما تماس بگیرند
            </p>
          </div>

          <div className="relative">
            <SignUpForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}