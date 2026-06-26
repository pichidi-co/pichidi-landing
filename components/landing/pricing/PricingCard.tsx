import { cn } from "@/lib/utils";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular: boolean;
  badge?: string | null;
  className?: string;
}

export function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  isPopular,
  badge,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex w-full max-w-[378px] flex-col",
        "rounded-[30px]",
        "bg-[#F6F5F5]",
        "p-8",
        "shadow-[14px_14px_10px_rgba(0,0,0,0.25)]",
        "transition-all duration-300",
        "hover:-translate-y-2 hover:shadow-[20px_20px_15px_rgba(0,0,0,0.3)]",
        isPopular && "ring-2 ring-primary",
        className,
      )}
    >
      {/* نشان در بالای سمت راست */}
      {badge && (
        <div
          className="absolute right-0 top-0 flex items-center justify-center rounded-bl-[30px] rounded-tr-[30px] bg-secondary px-6 py-3 text-sm font-bold text-primary"
          style={{
            width: "179px",
            height: "54px",
            borderTopRightRadius: "30px",
            borderBottomLeftRadius: "50px",
          }}
        >
          {badge}
        </div>
      )}

      <div className="mb-6 mt-5 text-center">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
        <div className="mt-4">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          <span className="text-sm text-gray-500"> / ماه</span>
        </div>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-700">
            <svg
              className="mt-1 h-5 w-5 flex-shrink-0 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={cn(
          "w-full rounded-full py-3 font-semibold transition-all duration-300",
          isPopular
            ? "bg-primary text-secondary hover:bg-primary/90 cursor-pointer"
            : "border-2 border-primary text-primary hover:bg-primary hover:text-secondary cursor-pointer",
        )}
      >
        {buttonText}
      </button>
    </div>
  );
}
