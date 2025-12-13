// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Menu, X, Phone, MessageCircle } from "lucide-react";
// import Lego from "../../public/logos/IMG_7066 1.svg";
// import { Button } from "../ui/button";

// export default function Header() {
//   const [open, setOpen] = useState(false);

//   return (
//     <header
//     style={{direction:'rtl'}}
//       className="fixed top-4 left-1/2 -translate-x-1/2 w-[80%]  bg-[#07437A] text-white  text-right
//     rounded-full shadow-lg z-50 px-6 py-4 max-h-20"
//     >
//         <div className="flex items-center gap-3">
//           <Image
//             src={Lego}
//             alt="Logo"
//             // width={103}
//             // height={154}
//             // fill
//             className="w-12 h-12 md:w-16 md:h-16"
//           />
//         </div>
//       <nav className="flex items-center justify-between">

//         <ul className="hidden md:flex items-center gap-8 md:gap-4 text-lg font-medium">
//           <li className="hover:text-[#F6C86A] transition">
//             <Link href="/">خانه</Link>
//           </li>
//           <li className="hover:text-[#F6C86A] transition">
//             <Link href="/">محصولات</Link>
//           </li>
//           <li className="hover:text-[#F6C86A] transition">
//             <Link href="/">تعرفه‌ها</Link>
//           </li>
//           <li className="hover:text-[#F6C86A] transition">
//             <Link href="/">ارتباط با ما</Link>
//           </li>
//           <li className="hover:text-[#F6C86A] transition">
//             <Link href="/">پشتیبانی</Link>
//           </li>
//         </ul>

//         <div className="hidden md:flex items-center gap-6">
//           <div
//             className="flex bg-[#07437A] border-2 border-[#F6C86A] items-center
//             rounded-full "
//           >
//             <Button
//               className="px-6 py-2  text-xl rounded-full
//                hover:bg-white/20 transition"
//             >
//               ورود
//             </Button>

//             <Button
//               className="px-6 py-2 bg-[#F6C86A] text-black text-xl rounded-full
//               min-w-[120px] hover:bg-[#f7d27a] transition"
//             >
//               ثبت نام
//             </Button>
//           </div>

//           <div className="flex items-center gap-4 text-white">
//             <MessageCircle />
//             <Phone />
//           </div>
//         </div>

//         <button className="md:hidden" onClick={() => setOpen(!open)}>
//           {open ? <X size={30} /> : <Menu size={30} />}
//         </button>
//       </nav>

//       {open && (
//         <div className="md:hidden mt-4 border-t border-white/20 pt-4 flex flex-col gap-4">
//           <ul className="flex flex-col gap-4 text-lg font-medium">
//             <li>
//               <Link href="/">خانه</Link>
//             </li>
//             <li>
//               <Link href="/">محصولات</Link>
//             </li>
//             <li>
//               <Link href="/">تعرفه‌ها</Link>
//             </li>
//             <li>
//               <Link href="/">ارتباط با ما</Link>
//             </li>
//             <li>
//               <Link href="/">پشتیبانی</Link>
//             </li>
//           </ul>

//           <div className="flex flex-col gap-3 mt-4">
//             <button className="w-full py-2 border border-[#F6C86A] rounded-full">
//               ورود
//             </button>

//             <button className="w-full py-2 bg-[#F6C86A] text-black rounded-full">
//               ثبت نام
//             </button>

//             <div className="flex justify-center gap-6 mt-2">
//               <MessageCircle />
//               <Phone />
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Search, CheckCircle2, MessageCircle } from "lucide-react";
import Image from "next/image";
import Lego from "../../public/logos/IMG_7066 1.svg";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[85%] max-w-6xl"
    >
      <div className="flex h-20 items-center justify-between rounded-full bg-gradient-to-r from-[#0A4C8B] to-[#063A6B] px-6 py-3 shadow-xl overflow-hidden relative">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          className="ml-4  flex items-center overflow-hidden w-12 h-12 md:w-24 md:h-24"
        >
          <Image
            src={Lego}
            alt="Logo"
            className="w-full h-full object-contain transform scale-125"
          />
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white">
          {[
            "خانه",
            "محصولات",
            "تعرفه ها",
            "ارتباط با ما",
            "پشتیبانی",
            "ورود",
          ].map((item) => (
            <Link
              key={item}
              href="#"
              className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all hover:after:w-full text-xl"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Register button */}
        <motion.div
          className="flex bg-[#07437A] border-2 border-[#F6C86A] items-center rounded-full "
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className="rounded-full text-xl text-white ">ورود</Button>
          <Button className="rounded-full text-xl bg-[#FFD166] text-black hover:bg-[#FFC233]">
            ثبت نام
          </Button>
        </motion.div>

        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
            <MessageCircle className="h-8 w-8 text-white" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer">
            <Phone className="h-8 w-8 text-white" />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
