"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Lock,
  MessageSquare,
  Pill,
  ShieldCheck,
  Video,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";

interface Feature {
  key: string;
  icon: LucideIcon;
  label: string;
  title: string;
  desc: string;
  points: string[];
  img: string;
  imgAlt: string;
  accent: string;
  tint: string;
  chip: { icon: LucideIcon; text: string };
  stat: { label: string; value: string };
  href: string;
}

const FEATURES: Feature[] = [
  {
    key: "appointments",
    icon: CalendarCheck,
    label: "Appointments",
    title: "Book a doctor in under a minute.",
    desc: "Search clinics near you, pick a slot, choose in-person or teleconsult — and confirm in seconds. No call centres, no waiting rooms.",
    points: ["Live availability across facilities", "In-person or video, your choice", "Reminders before every visit"],
    img: "/assets/BookAppointmentComp1.png",
    imgAlt: "DigCare appointment booking screen showing consultation types",
    accent: "#10B981",
    tint: "#ECFDF5",
    chip: { icon: CheckCircle2, text: "NHIS covered" },
    stat: { label: "General consultation", value: "30 mins" },
    href: "/roles/patients/appointments",
  },
  {
    key: "video",
    icon: Video,
    label: "Video consultations",
    title: "See your doctor from anywhere.",
    desc: "Encrypted video calls with your doctor. Get a diagnosis, receive a prescription and order lab tests — without leaving home.",
    points: ["End-to-end encrypted calls", "Prescriptions issued during the call", "Lab orders sent straight to the lab"],
    img: "/assets/VideoConsultationComp4.png",
    imgAlt: "DigCare video consultation in progress",
    accent: "#0EA5E9",
    tint: "#F0F9FF",
    chip: { icon: Lock, text: "Encrypted · Connected" },
    stat: { label: "Wait time", value: "No waiting room" },
    href: "/roles/patients/appointments",
  },
  {
    key: "prescriptions",
    icon: Pill,
    label: "Prescriptions & pharmacy",
    title: "Digital prescriptions, instantly.",
    desc: "Doctors issue prescriptions directly to your DigCare account. Your pharmacy sees them immediately — no paper, no room for errors.",
    points: ["Dosage and instructions always on hand", "Track dispensed vs. pending", "Request refills in a tap"],
    img: "/assets/Prescription&PharmacyComp1.png",
    imgAlt: "DigCare prescriptions screen",
    accent: "#F59E0B",
    tint: "#FFFBEB",
    chip: { icon: CheckCircle2, text: "Ready for pickup" },
    stat: { label: "Paper needed", value: "None" },
    href: "/roles/patients/prescriptions",
  },
  {
    key: "insurance",
    icon: ShieldCheck,
    label: "Insurance claims",
    title: "Insurance that actually works.",
    desc: "DigCare submits claims to your insurer automatically when you visit an accredited facility, with real-time status updates and no paperwork.",
    points: ["Claims filed for you at accredited facilities", "Coverage applied to every bill", "Know your expiry date at a glance"],
    img: "/assets/Insurance_Claims_Comp1.png",
    imgAlt: "DigCare insurance claims screen",
    accent: "#6366F1",
    tint: "#EEF2FF",
    chip: { icon: ShieldCheck, text: "Claim approved" },
    stat: { label: "Paperwork", value: "Zero forms" },
    href: "/roles/patients/insurance",
  },
  {
    key: "messaging",
    icon: MessageSquare,
    label: "Secure messaging",
    title: "Always connected to your care team.",
    desc: "Message your doctor, follow up on results and request refills — privately, inside DigCare.",
    points: ["Private threads with each provider", "Share photos and documents", "Every conversation kept with your record"],
    img: "/assets/InAppMessagingComp1.png",
    imgAlt: "DigCare secure messaging with a doctor",
    accent: "#14B8A6",
    tint: "#F0FDFA",
    chip: { icon: Lock, text: "Private & secure" },
    stat: { label: "Doctor status", value: "Online" },
    href: "/roles/patients/messaging",
  },
];

const DURATION_MS = 6500;

function useAutoAdvance(count: number, inView: boolean) {
  const [active, setActive] = useState(0);
  const progress = useMotionValue(0);
  const pausedRef = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !inView) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = t - last;
      last = t;
      if (!pausedRef.current) {
        const next = progress.get() + dt / DURATION_MS;
        if (next >= 1) {
          progress.set(0);
          setActive((a) => (a + 1) % count);
        } else {
          progress.set(next);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count, inView, progress, reduce]);

  const select = (i: number) => {
    progress.set(0);
    setActive(i);
  };
  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return { active, select, progress, pause, resume };
}

function TabProgress({ progress, color }: { progress: MotionValue<number>; color: string }) {
  return (
    <span className="absolute inset-x-0 bottom-0 h-[3px] overflow-hidden rounded-full bg-slate-100">
      <motion.span className="block h-full origin-left" style={{ scaleX: progress, background: color }} />
    </span>
  );
}

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const { active, select, progress, pause, resume } = useAutoAdvance(FEATURES.length, inView);
  const feature = FEATURES[active];

  return (
    <section id="features" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="pointer-events-none absolute right-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-emerald-100/60 blur-[130px]" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="The DigCare app"
          title={
            <>
              Everything healthcare. <span className="text-gradient-brand">One app.</span>
            </>
          }
          subtitle="From booking a doctor to managing prescriptions and insurance — your entire healthcare journey in a single, beautifully simple experience."
        />

        <div
          ref={ref}
          onMouseEnter={pause}
          onMouseLeave={resume}
          className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16"
        >
          {/* Tabs */}
          <div role="tablist" aria-label="DigCare features" className="order-2 flex flex-col gap-2 lg:order-1">
            {FEATURES.map((f, i) => {
              const isActive = i === active;
              const Icon = f.icon;
              return (
                <div
                  key={f.key}
                  className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "border-slate-200 bg-white shadow-[0_18px_40px_-20px_rgba(15,23,42,0.25)]"
                      : "border-transparent hover:bg-slate-50"
                  }`}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="feature-panel"
                    onClick={() => select(i)}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left"
                  >
                    <span
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-300"
                      style={{
                        background: isActive ? f.accent : `${f.accent}14`,
                        color: isActive ? "#fff" : f.accent,
                      }}
                    >
                      <Icon size={20} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="font-manrope block text-[11px] font-bold uppercase tracking-[1.5px]" style={{ color: f.accent }}>
                        {f.label}
                      </span>
                      <span className="font-display block text-[18px] font-bold leading-snug text-[#0B1120]">{f.title}</span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 pl-[84px]">
                          <p className="font-manrope text-[15px] leading-[1.7] text-slate-600">{f.desc}</p>
                          <ul className="mt-4 space-y-2">
                            {f.points.map((p) => (
                              <li key={p} className="font-manrope flex items-center gap-2.5 text-[14px] font-medium text-slate-700">
                                <CheckCircle2 size={16} style={{ color: f.accent }} className="flex-shrink-0" />
                                {p}
                              </li>
                            ))}
                          </ul>
                          <Link
                            href={f.href}
                            className="font-manrope group mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold"
                            style={{ color: f.accent }}
                          >
                            Learn more
                            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isActive && <TabProgress progress={progress} color={f.accent} />}
                </div>
              );
            })}
          </div>

          {/* Stage */}
          <div id="feature-panel" role="tabpanel" className="order-1 lg:order-2">
            <motion.div
              animate={{ backgroundColor: feature.tint }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto flex aspect-[1/1.02] w-full max-w-[560px] items-center justify-center overflow-hidden rounded-[2.5rem] border border-slate-100"
            >
              <div className="bg-dot-grid absolute inset-0 opacity-70" />
              <motion.div
                animate={{ backgroundColor: feature.accent }}
                transition={{ duration: 0.6 }}
                className="absolute h-[60%] w-[60%] rounded-full opacity-25 blur-[80px]"
              />

              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, y: 40, rotate: -3, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, rotate: 3, scale: 0.94 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 w-[58%] max-w-[300px]"
                >
                  <div className="overflow-hidden rounded-[1.75rem] border-[6px] border-white bg-white shadow-[0_40px_80px_-24px_rgba(15,23,42,0.35)]">
                    <img src={feature.img} alt={feature.imgAlt} className="block aspect-[1412/1836] w-full object-cover" />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 20, y: -6 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="font-manrope absolute -right-10 top-8 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[12.5px] font-bold text-slate-800 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.3)] sm:-right-16"
                  >
                    <feature.chip.icon size={15} style={{ color: feature.accent }} />
                    {feature.chip.text}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20, y: 6 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                    className="font-manrope absolute -left-10 bottom-10 rounded-2xl bg-[#0B1120] px-4 py-3 text-white shadow-[0_16px_36px_-12px_rgba(11,17,32,0.5)] sm:-left-16"
                  >
                    <span className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-slate-400">
                      <Clock size={11} /> {feature.stat.label}
                    </span>
                    <span className="font-display mt-0.5 block text-[16px] font-bold">{feature.stat.value}</span>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
