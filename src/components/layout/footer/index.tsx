"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Send, Facebook, Phone, Mail, ArrowUp } from "lucide-react";

import { FOOTER_COLUMNS, FOOTER_TEXT } from "@/components/constant/footer";
import { FooterColumn } from "./FooterColumn";

export default function Footer() {
  const socialLinks = [
    { Icon: Instagram, label: "Instagram", href: "#" },
    { Icon: Send, label: "Telegram", href: "#" },
    { Icon: Facebook, label: "Facebook", href: "#" },
  ];

  return (
    <footer className="relative mt-32 overflow-hidden bg-[#062F5F] text-white">
      {/* Top decorative wave */}
      <div className="absolute -top-[1px] left-0 w-full overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="relative block h-[140px] w-full"
        >
          <path
            d="
              M0,110
              C180,170 300,170 480,100
              C660,30 780,30 960,100
              C1140,170 1260,170 1440,100
              L1440,0
              L0,0
              Z
            "
            fill="white"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-36 pb-8">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 lg:gap-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-4"
          >
            <div className="flex flex-col items-center md:items-start">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 18,
                }}
                className="relative mb-5"
              >
                <div className="absolute inset-0 rounded-full bg-white/10 blur-3xl" />

                <Image
                  src="/images/footer/upscalemedia-transformed (2).png"
                  alt="لوگو سامانه حضور و غیاب"
                  width={300}
                  height={300}
                  className="relative h-auto w-[240px] object-contain"
                />
              </motion.div>

              <p className="max-w-sm text-center text-sm leading-7 text-white/65 md:text-right">
                راهکاری ساده و مطمئن برای مدیریت حضور و غیاب و ارتباط بهتر با
                مجموعه شما
              </p>

              {/* Social */}
              <div className="mt-6 flex gap-3">
                {socialLinks.map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    whileHover={{
                      y: -4,
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.92 }}
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      text-white/75
                      transition-all
                      hover:border-white/20
                      hover:bg-white
                      hover:text-[#062F5F]
                    "
                  >
                    <Icon size={19} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10 md:col-span-5">
            {FOOTER_COLUMNS.map((column, i) => (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * i,
                }}
              >
                <FooterColumn column={column} />
              </motion.div>
            ))}
          </div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-3"
          >
            <h3 className="mb-6 text-lg font-bold">ارتباط با ما</h3>

            <div className="space-y-4">
              <a
                href="mailto:info@example.com"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-4
                  transition-all
                  hover:bg-white/10
                "
              >
                <span
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/10
                  "
                >
                  <Mail size={18} />
                </span>

                <div className="min-w-0">
                  <p className="mb-1 text-xs text-white/45">ایمیل</p>

                  <p className="truncate text-sm">info@example.com</p>
                </div>
              </a>

              <a
                href={`tel:${FOOTER_TEXT.phone}`}
                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-4
                  transition-all
                  hover:bg-white/10
                "
              >
                <span
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/10
                  "
                >
                  <Phone size={18} />
                </span>

                <div>
                  <p className="mb-1 text-xs text-white/45">شماره تماس</p>

                  <p dir="ltr" className="text-sm">
                    {FOOTER_TEXT.phone}
                  </p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-5 text-xs text-white/45 md:flex-row">
          <p>© 1405 تمامی حقوق محفوظ است</p>

          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-white">
              قوانین و مقررات
            </a>

            <a href="#" className="transition-colors hover:text-white">
              حریم خصوصی
            </a>

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                transition-all
                hover:bg-white
                hover:text-[#062F5F]
              "
              aria-label="بازگشت به بالا"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
