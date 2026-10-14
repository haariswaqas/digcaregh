"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bell, Lock, Smartphone } from "lucide-react";
import { useNow } from "@/hooks/use-now";
import { LAUNCH_LABEL, timeUntilLaunch } from "@/lib/launch";

function MiniCountdown() {
  const now = useNow();
  const t = now === null ? null : timeUntilLaunch(now);
  if (t?.isLive) return null;

  const units: [string, number | undefined][] = [
    ["days", t?.days],
    ["hrs", t?.hours],
    ["min", t?.minutes],
  ];

  return (
    <div className="mt-8 inline-flex items-center gap-1 rounded-2xl bg-white/15 p-1.5 ring-1 ring-white/25 backdrop-blur">
      {units.map(([label, value]) => (
        <div key={label} className="min-w-[64px] rounded-xl bg-white/90 px-3 py-2 text-center">
          <p className="font-display text-[22px] font-bold leading-none tabular-nums text-[#064E3B]">
            {value === undefined ? "--" : String(value).padStart(2, "0")}
          </p>
          <p className="font-manrope mt-1 text-[10px] font-bold uppercase tracking-[1.4px] text-emerald-700/70">{label}</p>
        </div>
      ))}
      <span className="font-manrope px-3 text-[12.5px] font-semibold text-white">until launch</span>
    </div>
  );
}

const ExploreSection = () => {
  return (
    <section className="relative bg-white px-4 py-20 sm:px-6 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#047857] via-[#0D9488] to-[#0284C7] px-7 pt-14 shadow-[0_50px_100px_-40px_rgba(4,120,87,0.6)] sm:px-12 md:pt-16 lg:px-16"
      >
        <div className="bg-dot-grid-dark pointer-events-none absolute inset-0 opacity-80" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[380px] w-[380px] rounded-full bg-white/15 blur-[90px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-sky-300/25 blur-[90px]" />

        <div className="relative grid items-end gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div className="pb-14 md:pb-16">
            <p className="font-manrope inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[1.5px] text-white ring-1 ring-white/25">
              <Bell size={13} /> Launching {LAUNCH_LABEL}
            </p>
            <h2 className="font-display mt-6 text-[38px] font-bold leading-[1.05] tracking-[-1.2px] text-white md:text-[54px]">
              Healthcare that moves at your speed.
            </h2>
            <p className="font-manrope mt-5 max-w-[480px] text-[16.5px] leading-[1.75] text-emerald-50/90">
              Join the waitlist to be first in line when DigCare opens — and help shape how Ghana experiences healthcare.
            </p>

            <MiniCountdown />

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })}
                className="group font-manrope inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-[15px] font-bold text-[#065F46] shadow-[0_16px_30px_-12px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5"
              >
                Join the Waitlist
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </button>
              <span className="font-manrope inline-flex items-center gap-2 rounded-xl bg-black/20 px-3.5 py-2.5 text-[13px] font-semibold text-white/90 ring-1 ring-white/15">
                <Smartphone size={15} /> iOS & Android at launch
              </span>
            </div>
          </div>

          <div className="relative flex h-[360px] items-end justify-center sm:h-[440px]">
            <div className="absolute bottom-0 left-1/2 h-[80%] w-[80%] -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />
            <motion.img
              src="/assets/CallScreen1.png"
              alt="A DigCare video consultation in progress"
              loading="lazy"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative -mb-16 w-[78%] max-w-[340px] [mask-image:linear-gradient(to_bottom,#000_60%,transparent_80%)]"
            />
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute bottom-[22%] left-0 sm:left-[2%]"
            >
              <div className="animate-float font-manrope flex items-center gap-2.5 rounded-2xl bg-white/90 px-3.5 py-2.5 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.4)] backdrop-blur" style={{ animationDuration: "7s" }}>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[12.5px] font-bold text-slate-800">Doctor connected</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.95, duration: 0.6 }}
              className="absolute right-0 top-[42%] sm:right-[2%]"
            >
              <div className="animate-float font-manrope flex items-center gap-2.5 rounded-2xl bg-[#0B1120]/85 px-3.5 py-2.5 text-white shadow-[0_18px_40px_-14px_rgba(0,0,0,0.5)] backdrop-blur" style={{ animationDuration: "8s", animationDelay: "1.5s" }}>
                <Lock size={14} className="text-emerald-300" />
                <span className="text-[12.5px] font-bold">End-to-end encrypted</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExploreSection;
