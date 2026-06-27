interface FaqHeaderProps {
  title?: string;
  subtitle?: string;
}

export function FaqHeader({ 
  title = "سوالات متداول", 
  subtitle = "پاسخ سوالات پرتکرار شما" 
}: FaqHeaderProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-lg">{subtitle}</p>
    </div>
  );
}