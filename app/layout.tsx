import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { digiNozha, irYekan } from "@/lib/fonts";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "پیچیدی | حضور و غیاب آنلاین",
  description: "پیچیدی | حضور و غیاب آنلاین",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={` ${digiNozha.variable} ${irYekan.variable}  font-ir-yekan`}>
        {children}
      </body>
    </html>
  );
}
