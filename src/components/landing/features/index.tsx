"use client";

import { motion } from "framer-motion";
import { FeatureCard } from "./feature-card";
import { features } from "./data";

export function FeaturesSection() {
  return (
    <section id="features" className="w-full scroll-mt-28 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-5 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 sm:mt-12 md:mt-14 lg:mt-16 text-center"
        >
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-5xl mx-auto px-4 leading-relaxed">
            با «پیچیدی» از هرجا و با هر دستگاهی، حضور کارمندان را ثبت و گزارش‌ها
            را به‌صورت لحظه‌ای مشاهده کنید. سامانه‌ای هوشمند برای نظم، دقت و
            صرفه‌جویی در زمان کسب‌وکار شما.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
