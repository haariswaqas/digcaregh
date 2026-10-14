"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  FlaskConical,
  Lock,
  MessageSquare,
  Mic,
  Monitor,
  PhoneOff,
  Pill,
  ShieldCheck,
  Video,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import CropAvatar from "@/components/landing/CropAvatar";
import { useNow } from "@/hooks/use-now";

const POINTS: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: ShieldCheck,
    title: "Encrypted video, built in",
    desc: "No third-party apps. Join from your DigCare app with one tap when it's time.",
  },
  {
    icon: Pill,
    title: "Prescriptions during the call",
    desc: "Your doctor issues it straight to your account — and your pharmacy sees it instantly.",
  },
  {
    icon: FlaskConical,
    title: "Lab tests ordered on the spot",
    desc: "Walk into the lab with your Health Card. The order is already waiting.",
  },
  {
    icon: MessageSquare,
    title: "Follow up without rebooking",
    desc: "Questions after the call? Message your doctor privately in the app.",
  },
];

const OUTCOMES: { icon: LucideIcon; color: string; title: string; detail: string }[] = [
  { icon: Pill, color: "#F59E0B", title: "Prescription issued", detail: "Sent to your preferred pharmacy" },
  { icon: FlaskConical, color: "#38BDF8", title: "Lab order created", detail: "Full blood count · Any partner lab" },
  { icon: CalendarClock, color: "#34D399", title: "Follow-up booked", detail: "Teleconsult · Next Tuesday, 10:00" },
];

const CHILD_PATIENT = { src: "/assets/VideoConsultationComp4.png", imgW: 1412, imgH: 1836, cx: 330, cy: 745, r: 160 };

function CallTimer() {
  const now = useNow();
  if (now === null) return <span className="tabular-nums">--:--</span>;
  const s = Math.floor(now / 1000) % 3600;
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return <span className="tabular-nums">{`${mm}:${ss}`}</span>;
}

function CallControl({ icon: Icon, label, danger = false }: { icon: LucideIcon; label: string; danger?: boolean }) {
  return (
    <span
      title={label}
      className={`flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-transform hover:scale-110 sm:h-12 sm:w-12 ${
        danger ? "bg-rose-500 text-white shadow-[0_8px_20px_-6px_rgba(244,63,94,0.7)]" : "bg-white/15 text-white ring-1 ring-white/20"
      }`}
    >
      <Icon size={18} />
    </span>
  );
}

function VideoCall() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      {/* Glow frame */}
      <div className="absolute -inset-4 rounded-[2.6rem] bg-gradient-to-br from-emerald-400/30 via-sky-400/10 to-transparent blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)] sm:aspect-[5/5.4]"
      >
        <img
          src="/assets/FemaleDoctor.png"
          alt="A doctor on a DigCare video consultation"
          className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050A14]/90 via-transparent to-[#050A14]/40" />

        {/* Top bar */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
          <div className="flex flex-col gap-2">
            <span className="font-manrope inline-flex w-fit items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-[12px] font-bold text-white backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-rose-400" />
                <span className="relative h-2 w-2 rounded-full bg-rose-500" />
              </span>
              LIVE · <CallTimer />
            </span>
            <span className="font-manrope inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-400/20 px-3 py-1.5 text-[11.5px] font-semibold text-emerald-200 ring-1 ring-emerald-300/30 backdrop-blur-md">
              <Lock size={12} /> End-to-end encrypted
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="overflow-hidden rounded-2xl border-2 border-white/80 shadow-xl"
          >
            <CropAvatar {...CHILD_PATIENT} size={96} rounded="14px" className="sm:hidden" />
            <CropAvatar {...CHILD_PATIENT} size={118} rounded="14px" className="hidden sm:block" />
          </motion.div>
        </div>

        {/* Bottom: name + controls */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="font-display text-[19px] font-bold text-white sm:text-[22px]">Dr. Ama Mensah</p>
              <p className="font-manrope text-[13px] text-slate-300">General Practitioner · Accra</p>
            </div>
            <span className="flex h-7 items-end gap-[3px]" aria-hidden>
              {[0, 0.25, 0.5, 0.15, 0.35].map((d, i) => (
                <span
                  key={i}
                  className="animate-eq w-[4px] rounded-full bg-emerald-300"
                  style={{ height: "100%", animationDelay: `${d}s`, animationDuration: `${0.8 + i * 0.12}s` }}
                />
              ))}
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 rounded-full bg-black/30 p-2 ring-1 ring-white/10 backdrop-blur-md sm:gap-4">
            <CallControl icon={Mic} label="Microphone" />
            <CallControl icon={Video} label="Camera" />
            <CallControl icon={Monitor} label="Share screen" />
            <CallControl icon={MessageSquare} label="Chat" />
            <CallControl icon={PhoneOff} label="End call" danger />
          </div>
        </div>
      </motion.div>

      {/* Consult outcomes */}
      <div className="relative z-10 -mt-10 flex flex-col gap-2.5 px-3 sm:absolute sm:-left-14 sm:top-[27%] sm:mt-0 sm:w-[270px] sm:px-0">
        {OUTCOMES.map((o, i) => (
          <motion.div
            key={o.title}
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.9 + i * 0.45, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0F1A2E]/90 p-3 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.7)] backdrop-blur-xl"
          >
            <span
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
              style={{ background: `${o.color}22`, color: o.color }}
            >
              <o.icon size={18} />
            </span>
            <div className="font-manrope min-w-0 leading-tight">
              <p className="text-[13px] font-bold text-white">{o.title}</p>
              <p className="truncate text-[11.5px] text-slate-400">{o.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function TelehealthSection() {
  return (
    <section id="telehealth" className="relative overflow-hidden bg-[#0B1120] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-dot-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />
        <div className="absolute -left-[10%] top-[20%] h-[560px] w-[560px] rounded-full bg-emerald-500/15 blur-[150px]" />
        <div className="absolute -right-[10%] bottom-0 h-[520px] w-[520px] rounded-full bg-sky-500/15 blur-[150px]" />
      </div>

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20 [&>*]:min-w-0">
        <div>
          <SectionHeading
            tone="dark"
            align="left"
            eyebrow="Telehealth"
            title={
              <>
                Your doctor,{" "}
                <span className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent">one tap away.</span>
              </>
            }
            subtitle="Skip the traffic and the waiting room. Consult a licensed doctor over secure video, and leave the call with everything you need."
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {POINTS.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition-colors hover:border-emerald-400/30 hover:bg-white/[0.05]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/20 transition-transform group-hover:scale-110">
                  <p.icon size={19} />
                </span>
                <h3 className="font-display mt-4 text-[16px] font-semibold text-white">{p.title}</h3>
                <p className="font-manrope mt-1.5 text-[13.5px] leading-[1.65] text-slate-400">{p.desc}</p>
              </motion.li>
            ))}
          </ul>

          <Link
            href="/roles/patients/appointments"
            className="group font-manrope mt-10 inline-flex items-center gap-2 text-[15px] font-bold text-emerald-300 hover:text-emerald-200"
          >
            How teleconsults work
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <VideoCall />
      </div>
    </section>
  );
}
