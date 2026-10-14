"use client";

import { useRef } from "react";
import { AnimatePresence, motion, useInView, type MotionValue, type PanInfo } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import AppScreen, { DEFAULT_SCREEN_ASPECT, SCREEN_BACKDROP } from "@/components/roles/AppScreen";
import { useAutoAdvance } from "@/hooks/use-auto-advance";
import type { WalkthroughStep } from "@/app/roles/patients/_data/features";

const STEP_MS = 5000;

interface FeatureWalkthroughProps {
  steps: WalkthroughStep[];
  accent: string;
  backdrop?: string;
  aspect?: string;
  tone?: "light" | "dark";
}

function StepProgress({ progress, accent, dark }: { progress: MotionValue<number>; accent: string; dark: boolean }) {
  return (
    <span className={`absolute inset-x-5 bottom-0 h-[3px] overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-slate-100"}`}>
      <motion.span className="block h-full origin-left rounded-full" style={{ scaleX: progress, background: accent }} />
    </span>
  );
}

export default function FeatureWalkthrough({
  steps,
  accent,
  backdrop = SCREEN_BACKDROP,
  aspect = DEFAULT_SCREEN_ASPECT,
  tone = "light",
}: FeatureWalkthroughProps) {
  const dark = tone === "dark";
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const { index, select, progress, pause, resume } = useAutoAdvance(steps.length, inView, STEP_MS);
  const step = steps[index];

  const onSwipe = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) select(index + 1);
    else if (info.offset.x > 50) select(index - 1);
  };

  const navBtn = dark
    ? "border-white/15 bg-white/5 text-slate-300 hover:border-white/30 hover:text-white"
    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-[#0B1120]";

  return (
    <div
      ref={ref}
      onMouseEnter={pause}
      onMouseLeave={resume}
      className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16"
    >
      {/* Step list (desktop) */}
      <ol className="relative hidden lg:block" aria-label="Steps">
        <span className={`absolute bottom-8 left-[38px] top-8 w-[2px] ${dark ? "bg-white/10" : "bg-slate-100"}`} aria-hidden />
        <motion.span
          aria-hidden
          className="absolute left-[38px] top-8 w-[2px] origin-top"
          style={{ height: "calc(100% - 4rem)", background: accent }}
          animate={{ scaleY: index / (steps.length - 1) }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {steps.map((s, i) => {
          const active = i === index;
          const done = i < index;
          return (
            <li key={s.label} className="relative">
              <button
                type="button"
                onClick={() => select(i)}
                aria-current={active ? "step" : undefined}
                className={`relative flex w-full items-start gap-5 rounded-2xl px-5 py-4 text-left transition-all duration-300 ${
                  active
                    ? dark
                      ? "bg-white/[0.06] ring-1 ring-white/10"
                      : "bg-white shadow-[0_18px_40px_-22px_rgba(15,23,42,0.35)] ring-1 ring-slate-200/80"
                    : dark
                      ? "hover:bg-white/[0.04]"
                      : "hover:bg-white/60"
                }`}
              >
                <span
                  className="font-manrope relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold transition-all duration-300"
                  style={
                    active
                      ? { background: accent, color: "#fff", boxShadow: `0 8px 20px -6px ${accent}` }
                      : done
                        ? { background: `${accent}1F`, color: accent }
                        : dark
                          ? { background: "#0B1120", color: "#64748B", boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.12)" }
                          : { background: "#fff", color: "#94A3B8", boxShadow: "inset 0 0 0 2px #E2E8F0" }
                  }
                >
                  {done ? <Check size={16} strokeWidth={3} /> : i + 1}
                </span>
                <span className="min-w-0 flex-1 pt-0.5">
                  <span
                    className="font-manrope block text-[11px] font-extrabold uppercase tracking-[1.6px]"
                    style={{ color: active || done ? accent : dark ? "#64748B" : "#94A3B8" }}
                  >
                    Step {i + 1} · {s.label}
                  </span>
                  <span
                    className={`font-display mt-0.5 block text-[17px] font-bold leading-snug transition-colors ${
                      active ? (dark ? "text-white" : "text-[#0B1120]") : dark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {s.title}
                  </span>
                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.span
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className={`font-manrope block overflow-hidden text-[14.5px] leading-[1.65] ${dark ? "text-slate-400" : "text-slate-600"}`}
                      >
                        <span className="block pt-2">{s.description}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                {active && <StepProgress progress={progress} accent={accent} dark={dark} />}
              </button>
            </li>
          );
        })}
      </ol>

      {/* Device stage */}
      <div className="mx-auto w-full max-w-[420px]">
        <div
          className={`relative overflow-hidden rounded-[2.5rem] border px-6 pt-6 sm:px-8 sm:pt-8 ${dark ? "border-white/10" : "border-slate-200/70"}`}
          style={{ background: backdrop }}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-1/3 h-[70%] w-[90%] -translate-x-1/2 rounded-full opacity-25 blur-[70px]"
            style={{ background: accent }}
          />
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={onSwipe}
            className="relative mx-auto max-w-[320px] cursor-grab touch-pan-y active:cursor-grabbing"
          >
            {/* Stack every screen so switching is an instant crossfade with nothing left to load. */}
            <div className="relative">
              {steps.map((s, i) => (
                <motion.div
                  key={s.screen.src}
                  initial={false}
                  animate={{
                    opacity: i === index ? 1 : 0,
                    y: i === index ? 0 : i < index ? -16 : 16,
                    scale: i === index ? 1 : 0.97,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={i === 0 ? "relative" : "absolute inset-0"}
                  aria-hidden={i !== index}
                >
                  <AppScreen src={s.screen.src} alt={s.screen.alt} aspect={aspect} sizes="(min-width: 640px) 320px, 80vw" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* On desktop the step list carries this caption */}
        <div className="mt-6 lg:hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="text-center"
            >
              <p className="font-manrope text-[11px] font-extrabold uppercase tracking-[1.6px]" style={{ color: accent }}>
                Step {index + 1} of {steps.length} · {step.label}
              </p>
              <p className={`font-display mt-1.5 text-[20px] font-bold ${dark ? "text-white" : "text-[#0B1120]"}`}>{step.title}</p>
              <p className={`font-manrope mx-auto mt-2 max-w-[360px] text-[14.5px] leading-[1.65] ${dark ? "text-slate-400" : "text-slate-600"}`}>
                {step.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => select(index - 1)}
            aria-label="Previous step"
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${navBtn}`}
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Choose a step">
            {steps.map((s, i) => (
              <button
                key={s.label}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Step ${i + 1}: ${s.label}`}
                onClick={() => select(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 24 : 8,
                  background: i === index ? accent : dark ? "rgba(255,255,255,0.25)" : "#CBD5E1",
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => select(index + 1)}
            aria-label="Next step"
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${navBtn}`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
