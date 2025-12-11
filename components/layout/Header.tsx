"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import Lego from "../../public/logos/IMG_7066 1.svg";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] bg-[#07437A] text-white 
    rounded-3xl shadow-lg z-50 px-6 py-4"
    >
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={Lego}
            alt="Logo"
            width={60}
            height={60}
            className="w-12 h-12 md:w-16 md:h-16"
          />
        </div>

        <ul className="hidden md:flex items-center gap-8 md:gap-4 text-lg font-medium">
          <li className="hover:text-[#F6C86A] transition">
            <Link href="/">خانه</Link>
          </li>
          <li className="hover:text-[#F6C86A] transition">
            <Link href="/">محصولات</Link>
          </li>
          <li className="hover:text-[#F6C86A] transition">
            <Link href="/">تعرفه‌ها</Link>
          </li>
          <li className="hover:text-[#F6C86A] transition">
            <Link href="/">ارتباط با ما</Link>
          </li>
          <li className="hover:text-[#F6C86A] transition">
            <Link href="/">پشتیبانی</Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-6">
          <div
            className="flex items-center 
            rounded-full px-4 py-2"
          >
            <button
              className="px-6 py-2 border-2 border-[#F6C86A] text-lg rounded-full 
              min-w-[120px] hover:bg-white/20 transition"
            >
              ورود
            </button>

            <button
              className="px-6 py-2 bg-[#F6C86A] text-black text-lg rounded-full 
              min-w-[120px] hover:bg-[#f7d27a] transition"
            >
              ثبت نام
            </button>
          </div>

          <div className="flex items-center gap-4 text-white">
            <MessageCircle />
            <Phone />
          </div>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden mt-4 border-t border-white/20 pt-4 flex flex-col gap-4">
          <ul className="flex flex-col gap-4 text-lg font-medium">
            <li>
              <Link href="/">خانه</Link>
            </li>
            <li>
              <Link href="/">محصولات</Link>
            </li>
            <li>
              <Link href="/">تعرفه‌ها</Link>
            </li>
            <li>
              <Link href="/">ارتباط با ما</Link>
            </li>
            <li>
              <Link href="/">پشتیبانی</Link>
            </li>
          </ul>

          <div className="flex flex-col gap-3 mt-4">
            <button className="w-full py-2 border border-[#F6C86A] rounded-full">
              ورود
            </button>

            <button className="w-full py-2 bg-[#F6C86A] text-black rounded-full">
              ثبت نام
            </button>

            <div className="flex justify-center gap-6 mt-2">
              <MessageCircle />
              <Phone />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
