"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { animations } from "@/lib/design-system";

export default function HeroImage() {
  return (
    <motion.div
      initial={animations.slideInLeft.initial}
      animate={animations.slideInLeft.animate}
      transition={animations.slideInLeft.transition}
      className="absolute left-[113px] top-[248px] z-10"
    >
      <Image
        src="/IMG_7113 1.svg"
        alt="Hero Phone"
        width={559}
        height={560}
        className="object-contain"
        priority
      />
    </motion.div>
  );
}