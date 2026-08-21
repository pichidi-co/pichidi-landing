// src/components/layout/footer/FooterColumn.tsx
import { FooterColumn as FooterColumnType } from "@/components/types/footer";
import Link from "next/link";

interface FooterColumnProps {
  column: FooterColumnType;
}

export function FooterColumn({ column }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-[#07437A] relative inline-block md:inline">
        {column.title}
        <span className="absolute -bottom-1 right-0 w-8 h-0.5 bg-[#0A4C8B]/40 rounded-full" />
      </h3>
      <ul className="space-y-2.5 mt-4">
        {column.links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-sm text-gray-500 transition-all duration-200 hover:text-[#0A4C8B] hover:pr-1 block"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}