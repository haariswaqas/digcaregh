"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import StepFlow from "@/components/roles/StepFlow";
import RoleCtaBanner from "@/components/roles/RoleCtaBanner";
import {
  Bell,
  Moon,
  ShieldCheck,
  WifiOff,
  User,
  Lock,
} from "lucide-react";

/* ─── Role category cards ─── */
const roleCategories = [
  {
    title: "Patients",
    emoji: "🏥",
    accent: "#10B981",
    description:
      "Book appointments, manage prescriptions, pay bills, and control your health records — all from your phone.",
    href: "/roles/patients",
  },
  {
    title: "Doctors",
    emoji: "🩺",
    accent: "#1E3A8A",
    description:
      "Run consultations, issue prescriptions, order lab tests, manage shifts, and video-call patients — all from one screen.",
    href: "/roles/doctors",
  },
  {
    title: "Facility Admins",
    emoji: "🏢",
    accent: "#8B5CF6",
    description:
      "Manage your clinic, pharmacy, or laboratory — staff shifts, billing, insurance claims, and payment setup.",
    href: "/roles/facility-admins",
  },
  {
    title: "Insurance Providers",
    emoji: "🛡️",
    accent: "#6366F1",
    description:
      "Review and manage claims from accredited healthcare facilities with a full audit trail of every decision.",
    href: "/roles/insurance-providers",
  },
];

/* ─── Platform features ─── */
const platformFeatures = [
  { icon: Bell, label: "Push Notifications" },
  { icon: Moon, label: "Dark Mode" },
  { icon: ShieldCheck, label: "Secure Auth" },
  { icon: WifiOff, label: "Offline Resilience" },
  { icon: User, label: "Profile Management" },
  { icon: Lock, label: "Data Privacy" },
];

/* ─── Registration steps ─── */
const registrationSteps = [
  {
    number: 1,
    title: "Download the app",
    description:
      "Available on iOS and Android. Works with your existing NHIS number.",
  },
  {
    number: 2,
    title: "Choose your role",
    description:
      "Patient, Doctor, Facility Admin, or Insurance Provider — pick what matches you.",
  },
  {
    number: 3,
    title: "Complete registration",
    description:
      "Fill in your details, verify your phone number via OTP, and set a secure password.",
  },
  {
    number: 4,
    title: "Verification",
    description:
      "Medical professionals and facility admins go through a manual verification step.",
  },
  {
    number: 5,
    title: "Access your dashboard",
    description:
      "Once verified, you land directly on your personalised home screen.",
  },
];

export default function RolesOverviewContent() {
  return (
    <>
      {/* ─── Section 1: Hero ─── */}
      <section
        className="relative overflow-hidden py-24 md:py-32"
        style={{
          background: "linear-gradient(135deg, #0B1120 0%, #0F172A 50%, #1A2234 100%)",
        }}
      >
        {/* Ambient orbs */}
        <div
          className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{
            background: "rgba(16,185,129,0.12)",
            animation: "float-slow 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none"
          style={{
            background: "rgba(139,92,246,0.10)",
            animation: "float-slow 4s ease-in-out infinite 2s",
          }}
        />

        <div className="relative z-10 max-w-[820px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-[11px] font-extrabold tracking-[2px] uppercase mb-5"
              style={{ color: "#14B8A6", fontFamily: "Manrope, sans-serif" }}
            >
              WHO IS DIGCARE FOR?
            </p>
            <h1
              className="text-[40px] md:text-[56px] lg:text-[64px] font-bold text-white mb-6 leading-[1.08]"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "-1.5px",
              }}
            >
              Built for{" "}
              <span style={{ color: "#10B981" }}>every role</span> in
              Ghana&apos;s healthcare system.
            </h1>
            <p
              className="text-[17px] md:text-[18px] leading-[1.7] max-w-[660px] mx-auto mb-10"
              style={{ color: "#94A3B8", fontFamily: "Manrope, sans-serif" }}
            >
              From patients booking their first appointment to doctors running
              full consultations on their phone — DigCare has a home for
              everyone.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById("role-cards")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-7 py-3.5 rounded-2xl text-[15px] font-bold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #10B981, #14B8A6)",
                  color: "#0B1120",
                  boxShadow: "0 10px 24px rgba(16,185,129,0.30)",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                Explore All Roles
              </button>
              <Link
                href="/#footer"
                className="px-7 py-3.5 rounded-2xl text-[15px] font-semibold transition-all duration-200 hover:bg-[rgba(16,185,129,0.08)]"
                style={{
                  background: "transparent",
                  color: "#10B981",
                  border: "1.5px solid #10B981",
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                Join Waitlist
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 2: Role category cards ─── */}
      <section id="role-cards" className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {roleCategories.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={role.href} className="block group h-full">
                  <div
                    className="h-full rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300"
                    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)";
                      el.style.borderColor = role.accent;
                      el.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                      el.style.borderColor = "#f3f4f6";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                      style={{ background: `${role.accent}1A` }}
                    >
                      {role.emoji}
                    </div>
                    <h3
                      className="text-[22px] font-bold text-[#1a2b3c] mb-3"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {role.title}
                    </h3>
                    <p
                      className="text-[15px] leading-[1.65] text-gray-500 mb-5"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {role.description}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 text-[14px] font-semibold"
                      style={{ color: role.accent, fontFamily: "Manrope, sans-serif" }}
                    >
                      Learn More
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 3: Platform-wide features ─── */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p
              className="text-[11px] font-extrabold tracking-[2px] uppercase mb-4"
              style={{ color: "#14B8A6", fontFamily: "Manrope, sans-serif" }}
            >
              EVERY USER GETS
            </p>
            <h2
              className="text-3xl md:text-[40px] font-bold text-[#1a2b3c] leading-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "-0.5px",
              }}
            >
              Platform features every DigCare user enjoys.
            </h2>
          </motion.div>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-4">
            {platformFeatures.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group flex items-center gap-2.5 px-5 py-3 rounded-full bg-white border border-gray-200 transition-all duration-200 hover:border-[#10B981] hover:shadow-sm cursor-default"
                >
                  <Icon
                    size={18}
                    className="text-gray-400 group-hover:text-[#10B981] transition-colors"
                  />
                  <span
                    className="text-[14px] font-medium text-gray-600 group-hover:text-[#1a2b3c] transition-colors"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {feat.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Section 4: Registration steps ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl md:text-[40px] font-bold text-[#1a2b3c] leading-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "-0.5px",
              }}
            >
              How to join DigCare.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <StepFlow steps={registrationSteps} accentColor="#10B981" />
          </motion.div>
        </div>
      </section>

      {/* ─── Section 5: CTA Banner ─── */}
      <RoleCtaBanner
        title="Ready to take control of your health?"
        subtitle="DigCare is for you."
        buttonText="Join Waitlist"
        buttonHref="/#footer"
      />
    </>
  );
}
