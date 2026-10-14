"use client";

import { motion } from "framer-motion";
import FeatureCard from "@/components/roles/FeatureCard";
import RoleCtaBanner from "@/components/roles/RoleCtaBanner";
import {
  Calendar,
  Pill,
  FlaskConical,
  CreditCard,
  ShieldCheck,
  CreditCard as CardIcon,
  Lock,
  MessageSquare,
  Bell,
  User,
  Shield,
  QrCode,
  KeyRound,
} from "lucide-react";

/* ─── Patient subtypes ─── */
const patientTypes = [
  {
    type: "Adult Patient",
    accent: "#2563EB",
    greeting: "Welcome back,",
    description:
      "Adult patients are working-age individuals managing their personal healthcare journey. The adult dashboard is themed in electric blue — conveying trust, clarity, and professionalism.",
    actions: [
      { icon: "📅", label: "Book Appointment", desc: "Choose a facility, doctor, date, time, and type." },
      { icon: "💬", label: "Chat", desc: "Start or continue a conversation with your doctors." },
      { icon: "🧾", label: "My Bills", desc: "View and pay bills using Mobile Money or card." },
      { icon: "🔏", label: "Access Requests", desc: "Approve or deny record access requests." },
    ],
  },
  {
    type: "Student Patient",
    accent: "#7C3AED",
    greeting: "Hey there,",
    description:
      "Student patients are enrolled at educational institutions with campus health services. The student dashboard is themed in deep violet — reflecting youth and energy.",
    actions: [
      { icon: "📅", label: "Book Appointment", desc: "Book at your campus clinic or partnered facility." },
      { icon: "💬", label: "Chat", desc: "Message providers for follow-ups and renewals." },
      { icon: "🧾", label: "My Bills", desc: "Track and pay campus or off-campus medical bills." },
      { icon: "🔏", label: "Access Requests", desc: "Control exactly who sees your records." },
    ],
  },
  {
    type: "Visitor Patient",
    accent: "#059669",
    greeting: "Welcome,",
    description:
      "Visitor patients are individuals seeking care away from their regular facility — whether visiting a different city, travelling, or new to a facility. The visitor dashboard is themed in emerald green.",
    actions: [
      { icon: "📅", label: "Book Appointment", desc: "Quickly find and book available doctors." },
      { icon: "💬", label: "Chat", desc: "Message a healthcare provider directly." },
      { icon: "🧾", label: "My Bills", desc: "View and pay bills generated during your visit." },
      { icon: "🔏", label: "Access Requests", desc: "Control records access across facilities." },
    ],
  },
];

/* ─── Core patient features ─── */
const coreFeatures = [
  { slug: "appointments", icon: <Calendar size={20} />, title: "Appointments", description: "Book in-person or teleconsult appointments, view your schedule, and join video calls — all from the app.", accent: "#10B981" },
  { slug: "prescriptions", icon: <Pill size={20} />, title: "Prescriptions", description: "View all prescriptions issued by doctors. Track which have been dispensed and which are still pending.", accent: "#10B981" },
  { slug: "lab-orders", icon: <FlaskConical size={20} />, title: "Lab Orders", description: "View lab test orders and track the status of each test — ordered, in-progress, or results available.", accent: "#10B981" },
  { slug: "billing", icon: <CreditCard size={20} />, title: "Billing & Payments", description: "View itemised bills and pay using Mobile Money, card, or bank transfer — all powered by Paystack.", accent: "#10B981" },
  { slug: "insurance", icon: <ShieldCheck size={20} />, title: "Insurance", description: "Link your insurance plan, view coverage details, check real-time status, and see days until expiry.", accent: "#10B981" },
  { slug: "health-card", icon: <CardIcon size={20} />, title: "Health Card", description: "Your unique digital health identity — card number, QR code, card type, and expiry date, always with you.", accent: "#10B981" },
  { slug: "access-control", icon: <Lock size={20} />, title: "Access Control", description: "See every provider who has requested or accessed your records. Approve or deny access — your data, your rules.", accent: "#10B981" },
  { slug: "messaging", icon: <MessageSquare size={20} />, title: "In-App Messaging", description: "Secure, private messaging with your doctors. Continue conversations, ask questions, or request refills.", accent: "#10B981" },
  { slug: "notifications", icon: <Bell size={20} />, title: "Notifications", description: "Real-time push notifications for appointment confirmations, new messages, bill updates, and more.", accent: "#10B981" },
  { slug: "profile", icon: <User size={20} />, title: "Profile", description: "Update your personal information, upload a profile photo, and manage account settings.", accent: "#10B981" },
];

/* ─── Privacy bullets ─── */
const privacyPoints = [
  { icon: <Shield size={18} />, text: "Consent-based access — a doctor can only view your records if you approve." },
  { icon: <QrCode size={18} />, text: "QR-gated entry — every health card scan creates a logged access event." },
  { icon: <Lock size={18} />, text: "Full access history — see who accessed your records, when, and from where." },
  { icon: <KeyRound size={18} />, text: "PIN and OTP verification — sensitive actions require additional confirmation." },
];

export default function PatientsContent() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section
        className="py-20 md:py-28"
        style={{
          background: "linear-gradient(180deg, #F8FAFC 0%, #ECFDF5 100%)",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <p
                className="text-[11px] font-extrabold tracking-[2px] uppercase mb-4"
                style={{ color: "#14B8A6", fontFamily: "Manrope, sans-serif" }}
              >
                FOR PATIENTS
              </p>
              <h1
                className="text-[36px] md:text-[48px] lg:text-[56px] font-bold text-[#1a2b3c] mb-6 leading-[1.08]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "-1.5px",
                }}
              >
                Your complete health journey, in your pocket.
              </h1>
              <p
                className="text-[17px] leading-[1.7] max-w-[540px] mb-0"
                style={{ color: "#475569", fontFamily: "Manrope, sans-serif" }}
              >
                DigCare gives every patient — adult, student, or visitor — a
                personalised dashboard with all their health records,
                appointments, prescriptions, and insurance, in one secure app.
              </p>
            </motion.div>

            {/* Mockup visual */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:w-1/2 flex justify-center"
            >
              <div className="relative w-[280px] md:w-[320px]">
                <div className="rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] animate-float">
                  <img
                    src="/assets/patient_dashboard_mockup.png"
                    alt="Patient dashboard showing health card, appointments, and quick actions"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Patient Subtypes ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl md:text-[40px] font-bold text-[#1a2b3c] leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.5px" }}
            >
              Three patient types, one powerful experience.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {patientTypes.map((pt, i) => (
              <motion.div
                key={pt.type}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-gray-100 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = pt.accent;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#f3f4f6";
                }}
              >
                {/* Accent strip */}
                <div className="h-2 w-full" style={{ background: pt.accent }} />

                <div className="p-7">
                  <h3
                    className="text-[20px] font-bold text-[#1a2b3c] mb-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {pt.type}
                  </h3>

                  {/* Greeting pill */}
                  <span
                    className="inline-block px-3 py-1 rounded-full text-[12px] font-semibold mb-4"
                    style={{
                      background: `${pt.accent}15`,
                      color: pt.accent,
                      fontFamily: "Manrope, sans-serif",
                    }}
                  >
                    {pt.greeting}
                  </span>

                  <p
                    className="text-[14px] leading-[1.65] text-gray-500 mb-6"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {pt.description}
                  </p>

                  {/* Quick actions */}
                  <div className="space-y-3">
                    {pt.actions.map((action) => (
                      <div key={action.label} className="flex gap-3">
                        <span className="text-[16px] mt-0.5 flex-shrink-0">{action.icon}</span>
                        <div>
                          <p
                            className="text-[14px] font-semibold text-[#1a2b3c]"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                          >
                            {action.label}
                          </p>
                          <p
                            className="text-[13px] text-gray-400"
                            style={{ fontFamily: "Manrope, sans-serif" }}
                          >
                            {action.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Core features grid ─── */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl md:text-[40px] font-bold text-[#1a2b3c] leading-tight mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.5px" }}
            >
              Everything every patient can do.
            </h2>
            <p
              className="text-[15px] text-gray-500"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Tap any feature below for the full breakdown.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <FeatureCard
                  icon={feat.icon}
                  title={feat.title}
                  description={feat.description}
                  accentColor={feat.accent}
                  href={`/roles/patients/${feat.slug}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Privacy Callout ─── */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #0B1120 0%, #0F172A 100%)" }}
      >
        <div className="max-w-[800px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-[40px] font-bold text-white mb-8 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.5px" }}
            >
              Your data.{" "}
              <span style={{ color: "#10B981" }}>Your rules.</span>
            </h2>

            <div className="space-y-5">
              {privacyPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-4 items-start"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(16,185,129,0.15)" }}
                  >
                    <span style={{ color: "#10B981" }}>{point.icon}</span>
                  </div>
                  <p
                    className="text-[15px] leading-[1.65]"
                    style={{ color: "#CBD5E1", fontFamily: "Manrope, sans-serif" }}
                  >
                    {point.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <RoleCtaBanner
        title="Take your health journey digital."
        subtitle="Join thousands of Ghanaians on DigCare."
        buttonText="Join Waitlist"
        buttonHref="/#footer"
      />
    </>
  );
}
