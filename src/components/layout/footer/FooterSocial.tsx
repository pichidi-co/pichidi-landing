import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/components/constant/footer";

export function FooterSocial() {
  return (
    <div className="flex flex-col items-start">
      {/* دایره بزرگ با تصویر پس‌زمینه */}
      <div className="relative size-[720px] overflow-hidden rounded-full">
        <Image
          src="/images/footer/upscalemedia-transformed (2).png"
          alt="Footer background"
          width={676}
          height={676}
          className="rounded-full"
        />
      </div>
      {/* آیکون‌های شبکه‌های اجتماعی */}
      <div className="mt-0 flex gap-6">
        {SOCIAL_LINKS.map((social, index) => (
          <Link
            key={index}
            href={social.href}
            aria-label={social.label}
            className="transition-transform hover:scale-110"
          >
            <div className="relative h-[55px] w-[55px]">
              <Image
                src={social.icon}
                alt={social.label}
                fill
                className="object-contain"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
