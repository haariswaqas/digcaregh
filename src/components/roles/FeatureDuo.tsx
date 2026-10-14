"use client";

import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import AppScreen, { DEFAULT_SCREEN_ASPECT } from "@/components/roles/AppScreen";
import type { DuoSide } from "@/app/roles/patients/_data/features";

interface FeatureDuoProps {
  left: DuoSide;
  right: DuoSide;
  accent: string;
  aspect?: string;
}

function Phone({ side, accent, aspect, delay, tilt }: { side: DuoSide; accent: string; aspect: string; delay: number; tilt: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 32, rotate: tilt }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full max-w-[300px] flex-col items-center"
    >
      <span className="font-manrope mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[1.6px] text-slate-600">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
        {side.role}
      </span>
      <AppScreen
        src={side.screen.src}
        alt={side.screen.alt}
        aspect={aspect}
        sizes="(min-width: 640px) 300px, 70vw"
        className="rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(11,17,32,0.55)]"
      />
      <figcaption className="font-display mt-5 text-center text-[17px] font-bold leading-snug text-[#0B1120]">{side.caption}</figcaption>
    </motion.figure>
  );
}

export default function FeatureDuo({ left, right, accent, aspect = DEFAULT_SCREEN_ASPECT }: FeatureDuoProps) {
  return (
    <div className="relative flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:justify-center sm:gap-6 lg:gap-14">
      <Phone side={left} accent={accent} aspect={aspect} delay={0} tilt={-2} />
      <span
        aria-hidden
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm sm:mt-[48%]"
      >
        <ArrowLeftRight size={18} style={{ color: accent }} />
      </span>
      <Phone side={right} accent={accent} aspect={aspect} delay={0.15} tilt={2} />
    </div>
  );
}
