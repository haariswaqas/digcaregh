"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`${centered ? "text-center mx-auto" : ""} max-w-[720px] ${className}`}
    >
      <p
        className={`font-manrope inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[2.2px] mb-4 ${
          dark ? "text-emerald-300" : "text-emerald-700"
        }`}
      >
        <span className={`h-px w-6 ${dark ? "bg-emerald-300/60" : "bg-emerald-600/50"}`} />
        {eyebrow}
        {centered && <span className={`h-px w-6 ${dark ? "bg-emerald-300/60" : "bg-emerald-600/50"}`} />}
      </p>
      <h2
        className={`font-display text-[34px] md:text-[48px] font-bold leading-[1.08] tracking-[-1.2px] ${
          dark ? "text-white" : "text-[#0B1120]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`font-manrope mt-5 text-[16px] md:text-[17px] leading-[1.75] ${
            centered ? "mx-auto max-w-[580px]" : "max-w-[540px]"
          } ${dark ? "text-slate-400" : "text-slate-600"}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
