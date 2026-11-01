import type { Metadata } from "next";
import Script from "next/script"; // 👈 اضافه کنید
import { Geist, Geist_Mono } from "next/font/google";
import { digiNozha, irYekan } from "@/lib/fonts";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "./globals.css";

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
      <body className={`${digiNozha.variable} ${irYekan.variable} font-ir-yekan`}>
        <QueryProvider>{children}</QueryProvider>

        <Script
          id="goftino-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(){var i="Uz1yxd",a=window,d=document;function g(){var g=d.createElement("script"),s="https://www.goftino.com/widget/"+i,l=localStorage.getItem("goftino_"+i);g.async=!0,g.src=l?s+"?o="+l:s;d.getElementsByTagName("head")[0].appendChild(g);}"complete"===d.readyState?g():a.attachEvent?a.attachEvent("onload",g):a.addEventListener("load",g,!1);}();`,
          }}
        />
      </body>
    </html>
  );
}