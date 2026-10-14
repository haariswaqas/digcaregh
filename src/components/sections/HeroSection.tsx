"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  HeartPulse,
  Lock,
  Pill,
  PlayCircle,
  Rocket,
  Smartphone,
  Video,
  Wallet,
} from "lucide-react";
import EcgLine from "@/components/landing/EcgLine";
import CropAvatar, { DOCTOR_FACE } from "@/components/landing/CropAvatar";
import { useNow } from "@/hooks/use-now";
import { LAUNCH_LABEL, timeUntilLaunch } from "@/lib/launch";

const ROTATING_PLACES = ["your living room", "campus", "the office", "anywhere in Ghana"];

const TRUST_POINTS = [
  { icon: Lock, label: "Consent-first records" },
  { icon: Wallet, label: "Mobile Money & cards" },
  { icon: BadgeCheck, label: "Works with your NHIS number" },
];

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

function LaunchPill() {
  const now = useNow();
  const t = now === null ? null : timeUntilLaunch(now);

  return (
    <button
      type="button"
      onClick={() => scrollTo("launch")}
      className="group font-manrope inline-flex items-center gap-2.5 rounded-full border border-emerald-200 bg-white/80 py-1.5 pl-1.5 pr-4 text-[12.5px] font-semibold text-slate-700 shadow-[0_4px_16px_-6px_rgba(16,185,129,0.35)] backdrop-blur transition-all hover:border-emerald-300 hover:shadow-[0_6px_20px_-6px_rgba(16,185,129,0.5)]"
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
        <Rocket size={12} />
        {t?.isLive ? "Live" : "Launching"}
      </span>
      <span className="whitespace-nowrap">
        {t?.isLive ? (
          "DigCare is now live in Ghana"
        ) : (
          <>
            <span className="hidden sm:inline">
              {LAUNCH_LABEL}
              <span className="mx-1.5 text-slate-300">•</span>
            </span>
            <span className="tabular-nums text-emerald-700">{t ? `${t.days} days to go` : LAUNCH_LABEL}</span>
          </>
        )}
      </span>
      <ArrowRight size={14} className="text-slate-400 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

function RotatingPlace() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % ROTATING_PLACES.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <span className="relative inline-grid align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={ROTATING_PLACES[index]}
          initial={{ y: "60%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-60%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="whitespace-nowrap font-bold text-emerald-700"
        >
          {ROTATING_PLACES[index]}.
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

interface FloatCardProps {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  delay: number;
  floatDelay: string;
  className: string;
  children: ReactNode;
}

function FloatCard({ mx, my, depth, delay, floatDelay, className, children }: FloatCardProps) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div style={{ x, y }} className={`absolute z-20 ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="animate-float rounded-2xl border border-white/70 bg-white/85 p-3 shadow-[0_18px_40px_-14px_rgba(15,23,42,0.28)] backdrop-blur-xl"
          style={{ animationDelay: floatDelay, animationDuration: "7s" }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

function HeroVisual() {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });
  const phoneX = useTransform(mx, (v) => v * -10);
  const phoneY = useTransform(my, (v) => v * -10);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto flex h-[520px] w-full max-w-[540px] items-center justify-center sm:h-[600px]"
    >
      {/* Pulse rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {[0, 1.05, 2.1].map((d) => (
          <span
            key={d}
            className="animate-ring-pulse absolute h-[330px] w-[330px] rounded-full border border-emerald-400/40 sm:h-[400px] sm:w-[400px]"
            style={{ animationDelay: `${d}s` }}
          />
        ))}
        <div className="absolute h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.22),transparent_65%)] blur-2xl sm:h-[440px] sm:w-[440px]" />
        {/* Orbit */}
        <div className="animate-spin-slow absolute h-[440px] w-[440px] rounded-full border border-dashed border-emerald-500/20 sm:h-[520px] sm:w-[520px]">
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
          <span className="absolute bottom-[14%] left-[3%] h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(14,165,233,0.9)]" />
          <span className="absolute right-[6%] top-[70%] h-2.5 w-2.5 rounded-full bg-teal-300 shadow-[0_0_10px_rgba(45,212,191,0.9)]" />
        </div>
      </div>

      {/* Phone */}
      <motion.div
        style={{ x: phoneX, y: phoneY }}
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <div className="overflow-hidden rounded-t-[40px] [mask-image:linear-gradient(to_bottom,#000_62%,transparent_92%)] sm:rounded-t-[50px]">
          <img
            src="/assets/HeroImage.png"
            alt="DigCare patient app showing the digital Health Card and quick actions"
            className="block h-auto w-[270px] sm:w-[330px]"
          />
        </div>
      </motion.div>

      {/* Video consult */}
      <FloatCard mx={mx} my={my} depth={26} delay={0.7} floatDelay="0s" className="left-0 top-[9%] sm:-left-4">
        <div className="flex items-center gap-3 pr-1">
          <div className="relative">
            <CropAvatar {...DOCTOR_FACE} size={42} />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
          </div>
          <div className="font-manrope leading-tight">
            <p className="text-[12.5px] font-bold text-slate-900">Dr. Ama Mensah</p>
            <p className="text-[11px] text-slate-500">General Practitioner</p>
          </div>
          <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1.5 text-[10.5px] font-bold text-white">
            <Video size={11} /> Join
          </span>
        </div>
      </FloatCard>

      {/* Vitals */}
      <FloatCard mx={mx} my={my} depth={-34} delay={0.95} floatDelay="1.2s" className="right-0 top-[30%] sm:-right-2">
        <div className="w-[150px] font-manrope">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-semibold uppercase tracking-wide text-slate-500">Heart rate</span>
            <HeartPulse size={14} className="text-rose-500" />
          </div>
          <EcgLine beats={2} className="my-1 h-7 w-full" color="#F43F5E" trackColor="rgba(244,63,94,0.15)" duration={1.8} />
          <p className="font-display text-[20px] font-bold leading-none text-slate-900">
            72 <span className="font-manrope text-[11px] font-semibold text-slate-400">bpm</span>
          </p>
        </div>
      </FloatCard>

      {/* Prescription */}
      <FloatCard mx={mx} my={my} depth={30} delay={1.2} floatDelay="2.4s" className="bottom-[22%] left-0 sm:-left-6">
        <div className="flex items-center gap-3 pr-2 font-manrope">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            <Pill size={18} />
          </span>
          <div className="leading-tight">
            <p className="text-[12.5px] font-bold text-slate-900">Prescription ready</p>
            <p className="text-[11px] text-slate-500">Sent to your pharmacy</p>
          </div>
          <CheckCircle2 size={18} className="text-emerald-500" />
        </div>
      </FloatCard>

      {/* Payment */}
      <FloatCard mx={mx} my={my} depth={-22} delay={1.45} floatDelay="3.6s" className="bottom-[8%] right-[2%]">
        <div className="flex items-center gap-3 pr-1 font-manrope">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
            <Smartphone size={18} />
          </span>
          <div className="leading-tight">
            <p className="text-[11px] text-slate-500">Paid with Mobile Money</p>
            <p className="font-display text-[15px] font-bold text-slate-900">GH₵ 150.00</p>
          </div>
        </div>
      </FloatCard>
    </div>
  );
}

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#F6FBF9]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[10%] -top-[20%] h-[680px] w-[680px] rounded-full bg-emerald-300/25 blur-[140px]" />
        <div className="absolute -left-[12%] top-[30%] h-[520px] w-[520px] rounded-full bg-sky-300/20 blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[35%] h-[420px] w-[420px] rounded-full bg-teal-200/30 blur-[120px]" />
        <div className="bg-dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
        <EcgLine
          beats={6}
          className="absolute left-0 top-[58%] h-24 w-full opacity-60"
          color="rgba(16,185,129,0.55)"
          trackColor="rgba(16,185,129,0.08)"
          strokeWidth={1.5}
          duration={6}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1280px] flex-col items-center gap-6 px-6 pb-16 pt-14 lg:flex-row lg:gap-10 lg:pt-10">
        {/* Copy */}
        <div className="flex w-full max-w-[620px] flex-1 flex-col items-start text-left sm:items-center sm:text-center lg:items-start lg:text-left">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <LaunchPill />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-8 text-[clamp(3.25rem,16.5vw,4.75rem)] font-bold leading-[0.9] tracking-[-0.055em] text-[#0B1120] sm:mt-7 sm:text-[64px] sm:leading-[1.02] sm:tracking-[-2px] lg:text-[74px]"
          >
            Your
            <br className="sm:hidden" /> Health.
            <br />
            <span className="relative inline-block">
              <span className="text-gradient-brand">Reimagined.</span>
              <svg
                className="absolute -bottom-3 left-0 w-full sm:-bottom-2"
                viewBox="0 0 300 14"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <motion.path
                  d="M3 10 C 60 2, 120 2, 160 7 S 260 13, 297 4"
                  stroke="url(#hero-underline)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, delay: 0.9, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="hero-underline" x1="0" x2="1">
                    <stop offset="0" stopColor="#10B981" />
                    <stop offset="1" stopColor="#0EA5E9" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-manrope mt-9 max-w-[540px] border-l-[3px] border-emerald-500 pl-4 text-[17px] font-medium leading-[1.65] text-slate-700 sm:mt-8 sm:border-l-0 sm:pl-0 sm:font-normal sm:leading-[1.75] sm:text-slate-600 md:text-[19px]"
          >
            Ghana&apos;s all-in-one digital healthcare platform. Book a doctor, consult over video, get
            prescriptions and pay your bills — from <RotatingPlace />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
          >
            <button
              type="button"
              onClick={() => scrollTo("footer")}
              className="group font-manrope relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-7 py-[18px] text-[16px] font-extrabold text-white shadow-[0_14px_30px_-8px_rgba(16,185,129,0.55)] transition-transform duration-200 hover:-translate-y-0.5 sm:py-4 sm:text-[15px] sm:font-bold"
            >
              <span className="animate-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
              Join the Waitlist
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo("telehealth")}
              className="group font-manrope inline-flex items-center justify-center gap-2.5 rounded-2xl border-2 border-[#0B1120] bg-white/80 px-6 py-[16px] text-[16px] font-bold text-[#0B1120] backdrop-blur transition-all hover:border-emerald-300 hover:text-emerald-700 sm:border sm:border-slate-200 sm:py-4 sm:text-[15px] sm:font-semibold sm:text-slate-800"
            >
              <PlayCircle size={19} className="text-emerald-600 transition-transform group-hover:scale-110" />
              See telehealth in action
            </button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 lg:justify-start"
          >
            {TRUST_POINTS.map(({ icon: Icon, label }) => (
              <li key={label} className="font-manrope inline-flex items-center gap-2 text-[14px] font-semibold text-slate-700 sm:text-[13.5px] sm:font-medium sm:text-slate-600">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <Icon size={14} />
                </span>
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Visual */}
        <div className="w-full flex-1">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
