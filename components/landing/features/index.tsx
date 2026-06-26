import { FeatureCard } from "./feature-card";
import { features } from "./data";

export function FeaturesSection() {
  return (
    <section className="container py-24">
      <div className="grid gap-0 md:grid-cols-2 xl:grid-cols-4 justify-items-center">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
      <div className="mb-12 text-center">
        <p className="mt-8 text-muted-foreground">
          با «پیچیدی» از هرجا و با هر دستگاهی، حضور کارمندان را ثبت و گزارش‌ها
          را به‌صورت لحظه‌ای مشاهده کنید. سامانه‌ای هوشمند برای نظم، دقت و
          صرفه‌جویی در زمان کسب‌وکار شما.
        </p>
      </div>
    </section>
  );
}
