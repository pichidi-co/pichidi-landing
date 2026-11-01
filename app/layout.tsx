import type { Metadata } from "next";
import Script from "next/script";
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
    <html lang="fa" dir="rtl" data-scroll-behavior="smooth">
      <body
        className={`${digiNozha.variable} ${irYekan.variable} font-ir-yekan`}
      >
        {children}

        <Script id="goftino-widget" strategy="afterInteractive">
          {`
            !function(){
              var i="Uz1yxd",d=document,
              g=d.createElement("script"),
              s="https://www.goftino.com/widget/"+i,
              l=localStorage.getItem("goftino_"+i);
              g.type="text/javascript";
              g.async=!0;
              g.src=l?s+"?o="+l:s;
              d.getElementsByTagName("head")[0].appendChild(g);
            }();
          `}
        </Script>
      </body>
    </html>
  );
}
