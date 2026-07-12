interface PricingHeaderProps {
  title?: string;
  description?: string;
}

export function PricingHeader({
  title = "تعرفه‌ها",
  description = "طرح‌های مناسب برای هر نوع کسب‌وکار",
}: PricingHeaderProps) {
  return (
    <div className="mb-12 sm:mb-14 md:mb-16 text-center px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
        {title}
      </h2>
      <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-muted-foreground">
        {description}
      </p>
    </div>
  );
}