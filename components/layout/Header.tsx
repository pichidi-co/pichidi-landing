"use client";

import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="absolute top-[40px] left-[69px] w-[1302px] h-[87.69091033935547px] rotate-0 opacity-100 rounded-[30px] bg-[#07437A]">
      <nav className="flex flex-row justify-around">
        <ul className="flex flex-row  gap-8 p-6 text-white text-2xl leading-[25px]">
          <li>خانه</li>
          <li>محصولات</li>

          <li>تعرفه ها</li>

          <li>ارتباط با ما</li>

          <li>پشتیبانی</li>
        </ul>
        <ul className="flex flex-row gap-6 p-6 text-white ">
          <li className="flex flex-row absolute top-[8px] left-[225px] 
          w-[261px] h-[50px] rotate-0 opacity-100 rounded-[100px] border-[#F6C86A]">
            <button className="absolute top-[9px] left-[150px] w-[140px] 
            h-[52] rotate-0 opacity-100 border-2 border-[#F6C86A] rounded-[100px] text-2xl">ورود</button>

            <button className="bg-[#F6C86A] text-black text-2xl 
            absolute top-[9px] left-[42px] w-[148px] h-[52px] 
            rotate-0 opacity-100 rounded-[100px] ">ثبت نام</button>

          </li>
          <li><Phone /></li>
          <li><MessageCircle /></li>

        </ul>
      </nav>
    </header>
  );
}
