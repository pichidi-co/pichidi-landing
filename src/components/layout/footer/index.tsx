"use client";

import { FOOTER_COLUMNS, FOOTER_TEXT } from "@/components/constant/footer";
import { FooterColumn } from "./FooterColumn";
import { FooterSocial } from "./FooterSocial";
import { FooterBottom } from "./FooterBottom";

export function Footer() {
  return (
    <footer className="w-full">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* ستون سوم: شماره تماس */}
          <FooterSocial />
          {/* ستون اول: نرم افزار و اپلیکیشن */}
          <FooterColumn column={FOOTER_COLUMNS[0]} />

          {/* ستون دوم: دسترسی سریع */}
          <FooterColumn column={FOOTER_COLUMNS[1]} />
        </div>

        {/* کپی‌رایت */}
        <FooterBottom />
      </div>
    </footer>
  );
}
