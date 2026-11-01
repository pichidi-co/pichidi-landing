"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Animated result icon: a ring that draws itself, then the check / cross. */
export function StatusHero({
  variant,
  title,
  subtitle,
}: {
  variant: "success" | "failed";
  title: string;
  subtitle: string;
}) {
  const ok = variant === "success";
  const color = ok ? "#10B981" : "#EF4444";

  return (
    <div className="text-center">
      <div className="relative mx-auto h-28 w-28">
        {ok &&
          [0, 1].map((d) => (
            <motion.span
              key={d}
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{ background: color, opacity: 0.18 }}
              initial={{ scale: 0.8, opacity: 0.35 }}
              animate={{ scale: 1.7, opacity: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, delay: 0.9 + d * 0.9, ease: "easeOut" }}
            />
          ))}
        <motion.svg viewBox="0 0 100 100" className="relative h-full w-full" role="img" aria-label={title}
          animate={ok ? undefined : { x: [0, -6, 6, -4, 4, 0] }}
          transition={ok ? undefined : { delay: 0.9, duration: 0.5 }}>
          <motion.circle cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, ease: EASE }} />
          {ok ? (
            <motion.path d="M30 52 L44 66 L70 36" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.6, ease: EASE }} />
          ) : (
            <>
              <motion.path d="M34 34 L66 66" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.6 }} />
              <motion.path d="M66 34 L34 66" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.8 }} />
            </>
          )}
        </motion.svg>
      </div>

      <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
        className="mt-6 font-nozha text-3xl text-[#1F2965] sm:text-4xl">
        {title}
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}
        className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
        {subtitle}
      </motion.p>
    </div>
  );
}
