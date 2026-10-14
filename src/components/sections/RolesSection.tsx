"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Building2, Check, HeartPulse, ShieldCheck, Stethoscope, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";

interface Role {
  title: string;
  sub: string;
  description: string;
  accent: string;
  tint: string;
  icon: LucideIcon;
  points: string[];
  href: string;
  img?: string;
  layout: string;
}

const ROLES: Role[] = [
  {
    title: "Patients",
    sub: "Adult · Student · Visitor",
    description: "Book appointments, consult doctors, manage prescriptions and pay bills — with full control over who sees your records.",
    accent: "#059669",
    tint: "#ECFDF5",
    icon: HeartPulse,
    points: ["Teleconsults & bookings", "Digital Health Card", "Mobile Money payments"],
    href: "/roles/patients",
    img: "/assets/HeroImage.png",
    layout: "lg:col-span-4",
  },
  {
    title: "Doctors",
    sub: "GPs · Specialists",
    description: "Run consultations, issue digital prescriptions, order labs and video-call patients from one clinical dashboard.",
    accent: "#2563EB",
    tint: "#EFF6FF",
    icon: Stethoscope,
    points: ["Consult workspace", "E-prescriptions & lab orders", "Shift management"],
    href: "/roles/doctors",
    img: "/assets/doctor_dashboard_mockup.png",
    layout: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Facility Admins",
    sub: "Clinics · Pharmacies · Labs",
    description: "Run appointments, staff shifts, billing and claims from one operational dashboard.",
    accent: "#7C3AED",
    tint: "#F5F3FF",
    icon: Building2,
    points: ["Staff & schedules", "Billing & payments"],
    href: "/roles/facility-admins",
    layout: "lg:col-span-2",
  },
  {
    title: "Insurance Providers",
    sub: "Claims · Accreditation",
    description: "Review and approve claims from accredited facilities, with a full audit trail of every decision.",
    accent: "#4F46E5",
    tint: "#EEF2FF",
    icon: ShieldCheck,
    points: ["Real-time claims queue", "Audit-ready decisions"],
    href: "/roles/insurance-providers",
    layout: "lg:col-span-2",
  },
];

function RoleCard({ role, index }: { role: Role; index: number }) {
  const wide = role.layout.includes("col-span-4");
  const tall = role.layout.includes("row-span-2");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={role.layout}
    >
      <Link
        href={role.href}
        className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200/70 p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.35)] sm:p-8"
        style={{ background: `linear-gradient(160deg, #FFFFFF 0%, ${role.tint} 100%)` }}
      >
        <role.icon
          aria-hidden
          size={180}
          strokeWidth={1}
          className="pointer-events-none absolute -bottom-10 -right-10 opacity-[0.06] transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110"
          style={{ color: role.accent }}
        />

        <div className={`relative flex h-full ${wide ? "flex-col gap-6 md:flex-row md:items-center" : "flex-col"}`}>
          <div className={wide ? "md:w-[52%]" : ""}>
            <div className="flex items-center justify-between">
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:scale-110"
                style={{ background: role.accent, boxShadow: `0 12px 24px -10px ${role.accent}` }}
              >
                <role.icon size={22} />
              </span>
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-all duration-300 group-hover:rotate-45"
                style={{ borderColor: `${role.accent}30`, color: role.accent }}
              >
                <ArrowUpRight size={18} />
              </span>
            </div>
            <p className="font-manrope mt-6 text-[11px] font-extrabold uppercase tracking-[1.6px]" style={{ color: role.accent }}>
              {role.sub}
            </p>
            <h3 className="font-display mt-1.5 text-[26px] font-bold text-[#0B1120]">{role.title}</h3>
            <p className="font-manrope mt-3 text-[15px] leading-[1.7] text-slate-600">{role.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {role.points.map((p) => (
                <li
                  key={p}
                  className="font-manrope inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12.5px] font-semibold text-slate-700 ring-1 ring-slate-200/80"
                >
                  <Check size={13} style={{ color: role.accent }} strokeWidth={3} />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {role.img && (
            <div
              className={`relative overflow-hidden ${
                wide ? "-mb-8 h-[260px] md:mb-0 md:h-[300px] md:flex-1" : tall ? "-mb-8 mt-8 h-[320px] flex-1" : ""
              }`}
            >
              <img
                src={role.img}
                alt={`${role.title} dashboard in the DigCare app`}
                loading="lazy"
                className="absolute left-1/2 top-0 w-[115%] max-w-none -translate-x-1/2 mix-blend-multiply transition-transform duration-700 group-hover:-translate-y-3"
              />
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

const RolesSection = () => {
  return (
    <section id="roles" className="relative overflow-hidden bg-[#F8FAFC] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-[-5%] h-[420px] w-[420px] rounded-full bg-violet-200/40 blur-[140px]" />
        <div className="absolute bottom-[-5%] left-0 h-[380px] w-[380px] rounded-full bg-emerald-200/40 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="Who is DigCare for?"
          title={
            <>
              One platform. <span className="text-gradient-brand">Every role in care.</span>
            </>
          }
          subtitle="Patients, doctors, facilities and insurers share one connected record — each with tools built for how they work."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-6 lg:auto-rows-fr">
          {ROLES.map((role, i) => (
            <RoleCard key={role.title} role={role} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/roles"
            className="group font-manrope inline-flex items-center gap-2 rounded-2xl bg-[#0B1120] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_30px_-12px_rgba(11,17,32,0.6)] transition-transform hover:-translate-y-0.5"
          >
            Explore all roles
            <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RolesSection;
