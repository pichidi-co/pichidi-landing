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
        "group flex h-[260px] w-full max-w-[330px] flex-col",
        "rounded-[30px]",
        "border border-white/10",
        "bg-primary",
        "p-8",
        "shadow-[0_4px_7px_rgba(0,0,0,0.25)]",
        "backdrop-blur-[4px]",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl",

        className,
      )}
    >
      {/* Icon  */}
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl ">
        <Image src={icon} alt={title} width={28} height={28} />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center text-center">
        <h3 className="line-clamp-2 min-h-[56px] text-2xl font-bold text-white">
          {title}
        </h3>

        <p className="mt-2 line-clamp-4 text-sm leading-6 text-white/80">
          {description}
        </p>
      </div>
    </article>
  );
}
