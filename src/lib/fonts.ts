import localFont from "next/font/local";

export const digiNozha = localFont({
  src: [
    {
      path: "../../public/fonts/nozha/DigiNozha2Bold.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--digi-nozha",
    display: "swap",
});

export const irYekan = localFont({
  src: [
    {
      path: "../../public/fonts/iranyekan/Qs_Iranyekan.ttf",
      weight: "400",
      style: "normal",
    },
  ],
   variable: "--ir-yekan",
  display: "swap",
});