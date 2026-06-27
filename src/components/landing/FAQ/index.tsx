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
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        {/* هدر بخش */}
        <FaqHeader />

        {/* لیست سوالات */}
        <div className="mx-auto max-w-7xl space-y-4">
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
