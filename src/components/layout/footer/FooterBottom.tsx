// src/components/layout/footer/FooterBottom.tsx
import { FOOTER_TEXT } from "@/components/constant/footer";

export function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#0A4C8B] py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-white/80 text-center sm:text-right">
          {FOOTER_TEXT.copyright.replace("2025", String(currentYear))}
        </p>
        <div className="flex items-center gap-4 text-xs text-white/60">
          <a href="#" className="hover:text-white transition-colors">
            حریم خصوصی
          </a>
          <span className="w-px h-4 bg-white/20" />
          <a href="#" className="hover:text-white transition-colors">
            قوانین استفاده
          </a>
          <span className="w-px h-4 bg-white/20" />
          <a href="#" className="hover:text-white transition-colors">
            پشتیبانی
          </a>
        </div>
      </div>
    </div>
  );
}