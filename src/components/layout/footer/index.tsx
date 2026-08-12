"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Phone,
  Instagram,
  Send,
  Facebook,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-white overflow-hidden">

      {/* ================= Wave ================= */}

      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 180"
          className="w-full h-[170px]"
          preserveAspectRatio="none"
        >
          <path
            d="
            M0,90
            C180,180
            360,160
            560,95
            C760,30
            980,0
            1180,45
            C1320,75
            1400,120
            1440,150
            L1440,0
            L0,0
            Z
          "
            fill="white"
            stroke="#0A4C8B"
            strokeWidth="3"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* ================= Right ================= */}

          <div className="flex flex-col items-center">

            <Image
              src="/images/footer/bot.png"
              alt=""
              width={250}
              height={250}
            />

            <div className="flex gap-4 mt-5">

              <a
                href="#"
                className="border-2 border-[#0A4C8B] rounded-full p-2 text-[#0A4C8B] hover:bg-[#0A4C8B] hover:text-white transition"
              >
                <Instagram size={22} />
              </a>

              <a
                href="#"
                className="border-2 border-[#0A4C8B] rounded-full p-2 text-[#0A4C8B] hover:bg-[#0A4C8B] hover:text-white transition"
              >
                <Send size={22} />
              </a>

              <a
                href="#"
                className="border-2 border-[#0A4C8B] rounded-full p-2 text-[#0A4C8B] hover:bg-[#0A4C8B] hover:text-white transition"
              >
                <Facebook size={22} />
              </a>

            </div>

          </div>

          {/* ================= Center ================= */}

          <div className="text-center">

            <h3 className="font-bold text-2xl mb-6">
              دسترسی سریع
            </h3>

            <ul className="space-y-3">

              <li>
                <Link href="#">
                  درخواست دمو رایگان
                </Link>
              </li>

              <li>
                <Link href="#">
                  درخواست پشتیبانی
                </Link>
              </li>

              <li>
                <Link href="#">
                  دریافت بروزرسانی
                </Link>
              </li>

              <li>
                <Link href="#">
                  دریافت مشاوره
                </Link>
              </li>

              <li>
                <Link href="#">
                  تماس با ما
                </Link>
              </li>

            </ul>

          </div>

          {/* ================= Left ================= */}

          <div className="text-center">

            <div className="flex justify-center items-center gap-2 mb-8">

              <Phone
                className="text-[#0A4C8B]"
                size={22}
              />

              <span className="text-3xl font-semibold">
                09136900677
              </span>

            </div>

            <h3 className="font-bold text-2xl mb-6">
              نرم افزار و اپلیکیشن
            </h3>

            <ul className="space-y-3">

              <li>
                <Link href="#">
                  اپلیکیشن حضور و غیاب
                </Link>
              </li>

              <li>
                <Link href="#">
                  نرم افزار حضور غیاب تحت وب
                </Link>
              </li>

              <li>
                <Link href="#">
                  نرم افزار حضور غیاب اندروید
                </Link>
              </li>

              <li>
                <Link href="#">
                  نرم افزار حضور غیاب آیفون
                </Link>
              </li>

            </ul>

          </div>

        </div>

      </div>

    </footer>
  );
}