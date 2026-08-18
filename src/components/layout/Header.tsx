// src/components/layout/Header.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import Lego from "../../../public/logos/IMG_7066 1.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SignUpForm } from "@/components/landing/SignUp/SignUpForm";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[85%] max-w-6xl"
      >
        <div className="flex h-20 items-center justify-between rounded-full bg-gradient-to-r from-[#0A4C8B] to-[#063A6B] px-6 py-3 shadow-xl overflow-hidden relative">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="ml-4 flex items-center overflow-hidden w-12 h-12 md:w-24 md:h-24"
          >
            <Image
              src={Lego}
              alt="Logo"
              className="w-full h-full object-contain transform scale-125"
            />
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white">
            {["خانه", "محصولات", "تعرفه ها", "ارتباط با ما", "پشتیبانی"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all hover:after:w-full text-xl"
                >
                  {item}
                </Link>
              ),
            )}
          </nav>

          {/* Login / Register */}
          <motion.div
            className="flex bg-[#07437A] border-2 border-[#F6C86A] items-center rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="rounded-full text-xl">ورود</Button>
            <Button
              onClick={() => setOpen(true)}
              className="rounded-full text-xl bg-secondary text-black"
            >
              ثبت نام
            </Button>
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.15, rotate: 8 }} className="cursor-pointer">
              <MessageCircle className="h-8 w-8 text-white" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.15, rotate: -8 }} className="cursor-pointer">
              <Phone className="h-8 w-8 text-white" />
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Sign-up modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          dir="rtl"
          className="max-w-md rounded-[30px] border-0 bg-gradient-to-r from-[#0A4C8B] to-[#063A6B] p-8"
        >
          <DialogHeader>
            <DialogTitle className="text-white text-2xl text-center">
              ثبت نام در پیچیدی
            </DialogTitle>
            <DialogDescription className="text-white/70 text-center">
              اطلاعات خود را وارد کنید تا کارشناسان ما با شما تماس بگیرند
            </DialogDescription>
          </DialogHeader>
          <SignUpForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}