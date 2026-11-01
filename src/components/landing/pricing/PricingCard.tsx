"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, Crown, Gift, Rocket, TrendingUp, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UiFeature, UiPlan } from "@/lib/api/subscription/transformer";
import { useConsult } from "@/components/providers/LandingProviders";

const ICONS: Record<string, LucideIcon> = { free: Gift, basic: Rocket, growth: TrendingUp, pro: Crown };
const PER: Record<string, string> = { ماهانه: "ماه", سالانه: "سال" };
const fa = new Intl.NumberFormat("fa-IR");

/** price counts up once when the card scrolls into view */
function PriceCounter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setV(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setV(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return <span ref={ref}>{fa.format(v)}</span>;
}

function FeatureRow({ f, dark, delay = 0 }: { f: UiFeature; dark: boolean; delay?: number }) {
  const off = f.iconVariant === "x";
  return (
    <motion.li
      initial={{ opacity: 0, x: 14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.35, delay }}
      className={cn("flex items-start gap-3", off && "opacity-50")}
    >
      <span
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
          off
            ? "bg-gray-300/50 text-gray-500"
            : dark
              ? "bg-secondary text-[#063A6B]"
              : "bg-[#0A4C8B]/10 text-[#0A4C8B]",
        )}
      >
        {off ? <X className="h-3 w-3" strokeWidth={3} /> : <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
      <span className={cn("text-sm leading-6", dark ? "text-white/90" : "text-gray-700")}>{f.text}</span>
    </motion.li>
  );
}

export function PricingCard({ plan, index = 0 }: { plan: UiPlan; index?: number }) {
  const { title, description, isFree, isPopular: dark, badge, features, moreFeatures, buttonText, slug, durationLabel, rawPrice } = plan;
  const [showMore, setShowMore] = useState(false);
  const { openConsult } = useConsult();
  const Icon = ICONS[slug] ?? Rocket;

  const ctaClass = cn(
    "block w-full cursor-pointer rounded-full py-3 text-center text-base font-bold transition-colors",
    dark
      ? "bg-secondary text-[#063A6B] shadow-lg hover:bg-secondary/90"
      : "border-2 border-[#0A4C8B] text-[#0A4C8B] hover:bg-[#0A4C8B] hover:text-white",
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.25, delay: 0 } }}
      className={cn(
        "relative flex h-full w-full max-w-[330px] flex-col overflow-hidden rounded-[28px] p-6 sm:p-7",
        dark
          ? "bg-gradient-to-br from-[#0A4C8B] to-[#063A6B] text-white shadow-2xl"
          : "bg-white text-[#1F2965] shadow-md",
      )}
    >
      {dark && (
        <>
          <motion.div
            aria-hidden
            className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-white/5"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-white/5"
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="relative flex items-start justify-between">
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl",
            dark ? "bg-white/15" : "bg-[#0A4C8B]/10 text-[#0A4C8B]",
          )}
        >
          <Icon className="h-6 w-6" />
        </span>
        {badge && !isFree && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.4 + index * 0.1 }}
            className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-[#063A6B]"
          >
            {badge}
          </motion.span>
        )}
      </div>

      <h3 className="relative mt-4 font-nozha text-2xl">{title}</h3>
      <p className={cn("relative mt-1 min-h-[40px] text-sm leading-6", dark ? "text-white/75" : "text-gray-500")}>
        {description}
      </p>

      <div className="relative mt-4 flex items-baseline gap-1.5">
        {isFree ? (
          <span className="font-nozha text-4xl">رایگان</span>
        ) : (
          <>
            <span className="font-nozha text-4xl">
              <PriceCounter to={rawPrice} />
            </span>
            <span className={cn("text-xs", dark ? "text-white/70" : "text-gray-500")}>
              تومان / {PER[durationLabel] ?? durationLabel}
            </span>
          </>
        )}
      </div>

      <div className={cn("relative my-5 h-px", dark ? "bg-white/15" : "bg-gray-100")} />

      <ul className="relative space-y-3">
        {features.map((f, i) => (
          <FeatureRow key={f.key} f={f} dark={dark} delay={0.2 + i * 0.06} />
        ))}
      </ul>

      {moreFeatures.length > 0 && (
        <div className="relative mt-3">
          <button
            onClick={() => setShowMore((v) => !v)}
            aria-expanded={showMore}
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors",
              dark ? "text-white/80 hover:text-white" : "text-[#0A4C8B] hover:text-[#063A6B]",
            )}
          >
            {showMore ? "مشاهده کمتر" : "مشاهده همه ویژگی‌ها"}
            <motion.span animate={{ rotate: showMore ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {showMore && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-3 overflow-hidden pt-3"
              >
                {moreFeatures.map((f) => (
                  <FeatureRow key={f.key} f={f} dark={dark} />
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      )}

      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="relative mt-auto pt-6">
        {isFree ? (
          <button onClick={() => openConsult("free")} className={ctaClass}>
            {buttonText}
          </button>
        ) : (
          <Link href={`/checkout?plan=${slug}`} className={ctaClass}>
            {buttonText}
          </Link>
        )}
      </motion.div>
    </motion.article>
  );
}
