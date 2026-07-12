interface FaqHeaderProps {
  title?: string;
  subtitle?: string;
}

export function FaqHeader({ 
  title = "سوالات متداول", 
  subtitle = "پاسخ سوالات پرتکرار شما" 
}: FaqHeaderProps) {
  return (
    <div className="mb-8 sm:mb-10 md:mb-12 text-center px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        {title}
      </h2>
      <p className="mt-2 sm:mt-3 text-base sm:text-lg md:text-xl text-muted-foreground">{subtitle}</p>
    </div>
  );
}