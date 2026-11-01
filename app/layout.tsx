import type { Metadata } from "next";
import { digiNozha, irYekan } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "پیچیدی | حضور و غیاب آنلاین",
  description:
    "اپلیکیشن حضور و غیاب لوکیشن‌محور با دستیار هوش مصنوعی؛ تعریف لوکیشن، شیفت و نیرو، بدون نیاز به سخت‌افزار.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-scroll-behavior keeps Next from fighting the smooth-scroll CSS during route changes
    <html lang="fa" dir="rtl" data-scroll-behavior="smooth">
      <body className={`${digiNozha.variable} ${irYekan.variable} font-ir-yekan`}>
        {children}
      </body>
    </html>
  );
}
