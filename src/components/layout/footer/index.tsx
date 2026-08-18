// src/components/layout/footer/index.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Send, Facebook, Phone } from "lucide-react";
import { FOOTER_COLUMNS, FOOTER_TEXT } from "@/components/constant/footer";
import { FooterColumn } from "./FooterColumn";
import { FooterBottom } from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-white overflow-hidden">
      {/* Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 180" className="w-full h-[170px]" preserveAspectRatio="none">
          <path
            d="M0,90 C180,180 360,160 560,95 C760,30 980,0 1180,45 C1320,75 1400,120 1440,150 L1440,0 L0,0 Z"
            fill="white"
            stroke="#0A4C8B"
            strokeWidth="3"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand + social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <motion.div whileHover={{ scale: 1.06 }} transition={{ type: "spring", stiffness: 220 }}>
              <Image src="/images/footer/bot.png" alt="" width={220} height={220} />
            </motion.div>

            <p className="mt-4 text-center text-sm text-gray-500 max-w-xs">
              {FOOTER_TEXT.brand} — سامانه هوشمند حضور و غیاب برای تیم‌های امروزی
            </p>

            <div className="flex gap-4 mt-5">
              {[Instagram, Send, Facebook].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.15, backgroundColor: "#0A4C8B", color: "#fff" }}
                  className="border-2 border-[#0A4C8B] rounded-full p-2 text-[#0A4C8B] transition"
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns from constant/footer.ts */}
          {FOOTER_COLUMNS.map((column, i) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.15 * (i + 1) }}
              className="text-center md:text-right"
            >
              <FooterColumn column={column} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex justify-center items-center gap-2 text-[#0A4C8B]"
        >
          <Phone size={22} />
          <span className="text-2xl font-semibold" dir="ltr">
            {FOOTER_TEXT.phone}
          </span>
        </motion.div>
      </div>

      <FooterBottom />
    </footer>
  );
}