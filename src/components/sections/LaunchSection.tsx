"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useInView, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Check, Rocket } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import EcgLine from "@/components/landing/EcgLine";
import { useNow } from "@/hooks/use-now";
import {
  LAUNCH_DATE,
  LAUNCH_LABEL,
  LAUNCH_LABEL_INLINE,
  MILESTONES,
  PROGRAM_START,
  launchProgress,
  milestoneStatuses,
  timeUntilLaunch,
  type MilestoneStatus,
} from "@/lib/launch";

const RING_SIZE = 232;
const RING_STROKE = 14;
const RING_R = (RING_SIZE - RING_STROKE) / 2;

function RollingDigit({ value }: { value: string }) {
  return (
    <span className="relative inline-flex h-[1em] w-[0.62em] justify-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 text-center leading-none"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function CountTile({ value, label }: { value: number | null; label: string }) {
  const text = value === null ? "--" : String(value).padStart(2, "0");
  return (
    <div className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-2 pb-3 pt-4 sm:px-4">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-white/[0.06]" />
      <span className="font-display flex text-[34px] font-bold tabular-nums text-white sm:text-[44px]">
        {text.split("").map((ch, i) => (
          <RollingDigit key={`${text.length}-${i}`} value={ch} />
        ))}
      </span>
      <span className="font-manrope mt-2 text-[10.5px] font-bold uppercase tracking-[1.8px] text-slate-400">{label}</span>
    </div>
  );
}

function ProgressRing({ progress }: { progress: number | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const pct = useSpring(0, { stiffness: 30, damping: 18 });
  const pctText = useTransform(pct, (v) => `${Math.floor(v)}`);

  useEffect(() => {
    if (inView && progress !== null) pct.set(progress * 100);
  }, [inView, progress, pct]);

  return (
    <div ref={ref} className="relative" style={{ width: RING_SIZE, height: RING_SIZE }}>
      <div className="absolute inset-6 rounded-full bg-emerald-500/10 blur-2xl" />
      <svg width={RING_SIZE} height={RING_SIZE} className="-rotate-90">
        <defs>
          <linearGradient id="launch-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="60%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_R}
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={RING_STROKE}
          fill="none"
        />
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_R}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={1}
          strokeDasharray="2 8"
          fill="none"
          style={{ transform: "scale(0.82)", transformOrigin: "center" }}
        />
        <motion.circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_R}
          stroke="url(#launch-ring)"
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView && progress !== null ? Math.max(progress, 0.01) : 0 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: "drop-shadow(0 0 8px rgba(52,211,153,0.55))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-[54px] font-bold leading-none tracking-tight text-white">
          <motion.span>{pctText}</motion.span>
          <span className="text-[28px] text-emerald-300">%</span>
        </span>
        <span className="font-manrope mt-2 text-[11px] font-bold uppercase tracking-[1.8px] text-slate-400">
          of the way there
        </span>
      </div>
    </div>
  );
}

function StatusIcon({ status }: { status: MilestoneStatus | null }) {
  if (status === "done") {
    return (
      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-[#0B1120] shadow-[0_0_16px_rgba(52,211,153,0.45)]">
        <Check size={16} strokeWidth={3} />
      </span>
    );
  }
  if (status === "active") {
    return (
      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-emerald-400 bg-[#0B1120]">
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </span>
    );
  }
  return (
    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/15 bg-[#0B1120]">
      <span className="h-2 w-2 rounded-full bg-white/20" />
    </span>
  );
}

function tickPosition(date: Date) {
  const span = LAUNCH_DATE.getTime() - PROGRAM_START.getTime();
  return ((date.getTime() - PROGRAM_START.getTime()) / span) * 100;
}

export default function LaunchSection() {
  const now = useNow();
  const progress = now === null ? null : launchProgress(now);
  const left = now === null ? null : timeUntilLaunch(now);
  const statuses = now === null ? null : milestoneStatuses(now);
  const doneCount = statuses?.filter((s) => s === "done").length ?? 0;
  const timelineFill = statuses === null ? 0 : Math.min(1, (doneCount + 0.5) / MILESTONES.length);

  return (
    <section id="launch" className="relative overflow-hidden bg-[#070D1A] py-24 md:py-32">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-dot-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
        <div className="absolute left-1/2 top-[-25%] h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[160px]" />
        <div className="absolute bottom-[-30%] right-[-10%] h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[140px]" />
        <EcgLine
          beats={7}
          className="absolute left-0 top-12 h-16 w-full opacity-50"
          color="rgba(52,211,153,0.7)"
          trackColor="rgba(52,211,153,0.07)"
          strokeWidth={1.25}
          duration={7}
        />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6">
        <SectionHeading
          tone="dark"
          eyebrow="Road to launch"
          title={
            <>
              Launching{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 bg-clip-text text-transparent">
                {LAUNCH_LABEL_INLINE}.
              </span>
            </>
          }
          subtitle="We're in the final stretch. Here's exactly where we are — and how long until DigCare opens to everyone in Ghana."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 shadow-[0_40px_120px_-40px_rgba(16,185,129,0.35)] backdrop-blur-xl sm:p-10"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />

          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* Meter + countdown */}
            <div className="flex flex-col items-center">
              <ProgressRing progress={progress} />

              <div className="mt-10 grid w-full max-w-[440px] grid-cols-4 gap-2 sm:gap-3">
                <CountTile value={left?.days ?? null} label="Days" />
                <CountTile value={left?.hours ?? null} label="Hours" />
                <CountTile value={left?.minutes ?? null} label="Mins" />
                <CountTile value={left?.seconds ?? null} label="Secs" />
              </div>

              <p className="font-manrope mt-5 text-center text-[13px] text-slate-400">
                {left?.isLive ? (
                  <span className="font-semibold text-emerald-300">We&apos;re live. Welcome to DigCare.</span>
                ) : (
                  <>
                    Target launch:{" "}
                    <span className="font-semibold text-slate-200">{LAUNCH_LABEL}</span> · Accra, Ghana
                  </>
                )}
              </p>

              <button
                type="button"
                onClick={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })}
                className="group font-manrope mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 px-7 py-3.5 text-[15px] font-bold text-[#062018] shadow-[0_14px_34px_-10px_rgba(52,211,153,0.6)] transition-transform hover:-translate-y-0.5"
              >
                <Rocket size={17} />
                Reserve early access
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Milestones */}
            <div>
              <h3 className="font-display text-[20px] font-bold text-white">Launch milestones</h3>
              <p className="font-manrope mt-1 text-[14px] text-slate-400">Updated automatically as we hit each one.</p>

              <ol className="relative mt-8">
                <span className="absolute bottom-4 left-[15px] top-4 w-[2px] bg-white/10" aria-hidden />
                <motion.span
                  aria-hidden
                  className="absolute left-[15px] top-4 w-[2px] origin-top bg-gradient-to-b from-emerald-400 to-teal-400"
                  style={{ height: "calc(100% - 2rem)" }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: timelineFill }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                />
                {MILESTONES.map((m, i) => {
                  const status = statuses?.[i] ?? null;
                  return (
                    <motion.li
                      key={m.title}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                      className="relative flex gap-5 pb-7 last:pb-0"
                    >
                      <StatusIcon status={status} />
                      <div className="min-w-0 flex-1 pt-0.5">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h4
                            className={`font-display text-[16px] font-semibold ${
                              status === "upcoming" ? "text-slate-400" : "text-white"
                            }`}
                          >
                            {m.title}
                          </h4>
                          {status === "active" && (
                            <span className="font-manrope rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-emerald-300 ring-1 ring-emerald-400/30">
                              In progress
                            </span>
                          )}
                          <span className="font-manrope ml-auto text-[12px] font-semibold text-slate-500">{m.dateLabel}</span>
                        </div>
                        <p className="font-manrope mt-1 text-[13.5px] leading-[1.6] text-slate-400">{m.description}</p>
                      </div>
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Linear meter */}
          <div className="mt-14 border-t border-white/10 pt-8">
            <div className="font-manrope mb-3 flex items-center justify-between text-[12px] font-semibold text-slate-500">
              <span>
                Development began ·{" "}
                {PROGRAM_START.toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" })}
              </span>
              <span className="text-emerald-300">Launch · {LAUNCH_LABEL}</span>
            </div>
            <div className="relative h-3 rounded-full bg-white/[0.07]">
              <motion.div
                className="absolute inset-y-0 left-0 overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400"
                initial={{ width: 0 }}
                whileInView={{ width: progress === null ? 0 : `${progress * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="animate-shimmer absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </motion.div>
              {MILESTONES.slice(0, -1).map((m, i) => (
                <span
                  key={m.title}
                  title={`${m.title} · ${m.dateLabel}`}
                  className={`absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[#0B1424] ${
                    statuses?.[i] === "done" ? "bg-white" : "bg-white/25"
                  }`}
                  style={{ left: `${tickPosition(m.date)}%` }}
                />
              ))}
              {progress !== null && progress < 1 && (
                <motion.div
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ left: "0%", opacity: 0 }}
                  whileInView={{ left: `${progress * 100}%`, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-300/50" />
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />
                  </span>
                  <span className="font-manrope absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-0.5 text-[10.5px] font-bold text-[#0B1120]">
                    Today
                  </span>
                </motion.div>
              )}
            </div>
            <div className="h-6" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
