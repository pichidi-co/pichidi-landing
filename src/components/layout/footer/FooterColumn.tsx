// src/components/layout/footer/FooterColumn.tsx (color fix — was white text on a white footer)
import { FooterColumn as FooterColumnType } from "@/components/types/footer";
import Link from "next/link";

interface FooterColumnProps {
  column: FooterColumnType;
}

export function FooterColumn({ column }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-[#07437A]">{column.title}</h3>
      <ul className="space-y-2">
        {column.links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-sm text-gray-600 transition-colors hover:text-[#07437A]"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}