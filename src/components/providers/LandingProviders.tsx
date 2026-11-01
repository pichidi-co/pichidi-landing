"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SignUpForm } from "@/components/landing/SignUp/SignUpForm";

export type ConsultSource = "consultation" | "free";

const COPY: Record<ConsultSource, { title: string; description: string; button: string }> = {
  consultation: {
    title: "درخواست مشاوره رایگان",
    description: "اطلاعات خود را وارد کنید تا کارشناسان ما با شما تماس بگیرند",
    button: "ثبت درخواست",
  },
  free: {
    title: "شروع رایگان با پیچیدی",
    description: "اطلاعات خود را وارد کنید تا حساب رایگان شما راه‌اندازی شود",
    button: "شروع رایگان",
  },
};

const ConsultContext = createContext<{ openConsult: (source?: ConsultSource) => void } | null>(null);

export function useConsult() {
  const ctx = useContext(ConsultContext);
  if (!ctx) throw new Error("useConsult must be used inside <LandingProviders>");
  return ctx;
}

export function LandingProviders({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<ConsultSource>("consultation");

  const openConsult = useCallback((s: ConsultSource = "consultation") => {
    setSource(s);
    setOpen(true);
  }, []);

  const copy = COPY[source];

  return (
    // reducedMotion="user" → people with "reduce motion" enabled get no transform animations
    <MotionConfig reducedMotion="user">
      <ConsultContext.Provider value={{ openConsult }}>
        {children}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            dir="rtl"
            className="max-w-md rounded-[30px] border-0 bg-gradient-to-r from-[#0A4C8B] to-[#063A6B] p-8"
          >
            <DialogHeader>
              <DialogTitle className="text-white text-2xl text-center">{copy.title}</DialogTitle>
              <DialogDescription className="text-white/70 text-center">
                {copy.description}
              </DialogDescription>
            </DialogHeader>
            <SignUpForm
              source={source}
              submitButtonText={copy.button}
              onSuccess={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </ConsultContext.Provider>
    </MotionConfig>
  );
}
