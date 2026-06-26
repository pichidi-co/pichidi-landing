interface PricingHeaderProps {
  title?: string;
  description?: string;
}

export function PricingHeader({
  title = "تعرفه‌ها",
  description = "طرح‌های مناسب برای هر نوع کسب‌وکار",
}: PricingHeaderProps) {
  return (
    <div className="mb-16 text-center">
      <h2 className="text-4xl font-bold">{title}</h2>
      <p className="mt-4 text-muted-foreground">{description}</p>
    </div>
  );
}