// src/components/layout/Header.tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsult } from "@/components/providers/LandingProviders";
import { FOOTER_TEXT } from "@/components/constant/footer";
import { scrollToId } from "@/lib/scroll";
import Lego from "../../../public/logos/IMG_7066 1.svg";

const NAV = [
  { label: "خانه", id: "home" },
  { label: "محصولات", id: "features" },
  { label: "تعرفه ها", id: "pricing" },
  { label: "ارتباط با ما", id: "contact" },
  { label: "پشتیبانی", id: "faq" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { openConsult } = useConsult();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  // scroll-spy: highlight the section that's in the middle of the viewport
  useEffect(() => {
    if (!isHome) return;
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  const handleNav = (e: React.MouseEvent, id: string) => {
    setMenuOpen(false);
    // on the landing page → smooth scroll; on other pages (checkout…) → normal navigation to /#id
    if (isHome && scrollToId(id)) {
      e.preventDefault();
      history.replaceState(null, "", id === "home" ? "/" : `/#${id}`);
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[85%] max-w-6xl"
    >
      <div className="relative flex h-16 md:h-20 items-center justify-between rounded-full bg-gradient-to-r from-[#0A4C8B] to-[#063A6B] px-4 md:px-6 py-3 shadow-xl">
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => handleNav(e, "home")}
          aria-label="پیچیدی"
          className="ml-2 flex items-center overflow-hidden w-12 h-12 md:w-24 md:h-24"
        >
          <Image
            src={Lego}
            alt="Logo"
            className="w-full h-full object-contain transform scale-125"
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-white">
          {NAV.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              onClick={(e) => handleNav(e, item.id)}
              aria-current={isHome && active === item.id ? "true" : undefined}
              className={`relative text-xl after:absolute after:-bottom-1 after:right-0 after:h-[2px] after:bg-secondary after:transition-all ${
                isHome && active === item.id
                  ? "after:w-full text-secondary"
                  : "after:w-0 hover:after:w-full"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => openConsult("consultation")}
              className="rounded-full text-sm sm:text-base md:text-xl bg-secondary text-black px-4 md:px-8 h-9 md:h-10 border-2 border-[#F6C86A]"
            >
              درخواست مشاوره
            </Button>
          </motion.div>

          <div className="hidden sm:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.15, rotate: 8 }}
              onClick={() => openConsult("consultation")}
              aria-label="ارسال پیام"
              className="cursor-pointer"
            >
              <MessageCircle className="h-7 w-7 md:h-8 md:w-8 text-white" />
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.15, rotate: -8 }}
              href={`tel:${FOOTER_TEXT.phone}`}
              aria-label="تماس تلفنی"
            >
              <Phone className="h-7 w-7 md:h-8 md:w-8 text-white" />
            </motion.a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 overflow-hidden rounded-3xl bg-gradient-to-b from-[#0A4C8B] to-[#063A6B] p-3 shadow-xl"
          >
            {NAV.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                onClick={(e) => handleNav(e, item.id)}
                className={`block rounded-2xl px-4 py-3 text-lg text-white transition-colors hover:bg-white/10 ${
                  isHome && active === item.id ? "bg-white/10 text-secondary" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
