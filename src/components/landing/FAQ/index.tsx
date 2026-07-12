// components/landing/FAQ/index.tsx
"use client";

import { useState } from "react";
import { FaqItem } from "./FaqItem";
import { FaqHeader } from "./FaqHeader";
import { faqData } from "@/components/constant/faq";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto max-w-6xl px-3 sm:px-4 md:px-6">
        <FaqHeader />

        <div className="space-y-3 sm:space-y-4">
          {faqData.map((item, index) => (
            <FaqItem
              key={item.id}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}