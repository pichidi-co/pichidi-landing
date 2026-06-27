"use client";

import { useState } from "react";
import { FaqItem as FaqItemType } from "@/components/types/faq";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItemProps {
  item: FaqItemType;
  isOpen: boolean;
  onToggle: () => void;
}

export function FaqItem({ item, isOpen, onToggle }: FaqItemProps) {
  return (
    <div
      className="rounded-lg border border-white/30 shadow-[3px_5px_10.2px_rgba(26,0,0,0.1)] transition-all duration-300 hover:shadow-[3px_5px_15px_rgba(26,0,0,0.15)]"
      style={{
        background: "rgba(57,133,179,0.2)",
        backdropFilter: "blur(39.5px)",
        WebkitBackdropFilter: "blur(39.5px)",
      }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-6 text-right cursor-pointer"
      >
        <span>{item.question}</span>
        <span className="ml-4 transition-transform duration-300">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 " />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </span>
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-base leading-relaxed ">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}
