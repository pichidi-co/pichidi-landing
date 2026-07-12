import Image from "next/image";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  className,
}: FeatureCardProps) {
  return (
    <article
      className={cn(
        "group flex h-[220px] sm:h-[240px] md:h-[260px] w-full max-w-[280px] sm:max-w-[300px] md:max-w-[330px] flex-col",
        "rounded-[20px] sm:rounded-[25px] md:rounded-[30px]",
        "border border-white/10",
        "bg-primary",
        "p-4 sm:p-6 md:p-8",
        "shadow-[0_4px_7px_rgba(0,0,0,0.25)]",
        "backdrop-blur-[4px]",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl",
        className,
      )}
    >
      {/* Icon */}
      <div className="mx-auto mb-3 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl">
        <Image src={icon} alt={title} width={24} height={24} className="sm:w-7 sm:h-7" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center text-center">
        <h3 className="line-clamp-2 min-h-[44px] sm:min-h-[50px] md:min-h-[56px] text-lg sm:text-xl md:text-2xl font-bold text-white">
          {title}
        </h3>

        <p className="mt-1.5 sm:mt-2 line-clamp-3 sm:line-clamp-4 text-xs sm:text-sm leading-5 sm:leading-6 text-white/80">
          {description}
        </p>
      </div>
    </article>
  );
}