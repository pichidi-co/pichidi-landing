import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  description,
  light,
  align = "center",
  className,
}: {
  title: string;
  description?: string;
  light?: boolean;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-10 sm:mb-14 px-4",
        align === "center" ? "text-center mx-auto max-w-3xl" : "text-right",
        className,
      )}
    >
      <h2
        className={cn(
          "font-nozha text-3xl sm:text-4xl md:text-5xl leading-[1.3]",
          light ? "text-white" : "text-[#1F2965]",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-sm sm:text-base md:text-lg leading-8",
            light ? "text-white/75" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
