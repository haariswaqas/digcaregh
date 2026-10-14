"use client";

import { motion } from "framer-motion";
import FeatureCard from "@/components/roles/FeatureCard";
import RoleCtaBanner from "@/components/roles/RoleCtaBanner";
import {
  ClipboardList,
  PlusCircle,
  FlaskConical,
  CalendarClock,
  TestTubes,
  CalendarDays,
  Video,
  MessageSquare,
  QrCode,
  Building2,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

const ACCENT = "#1E3A8A";
const ACCENT_BG = "#EFF6FF";

/* ─── Dashboard elements ─── */
const dashboardElements = [
  { num: 1, label: "Profile Info Card", desc: "Name, specialty, online/offline status, current time, location, and phone number." },
  { num: 2, label: "Stats Summary", desc: "Live counters for total Appointments, Prescriptions, and Lab Orders — each a direct link." },
  { num: 3, label: "Upcoming Appointments", desc: "Horizontal scroll of next scheduled patient visits with status badges." },
  { num: 4, label: "Upcoming Shifts", desc: "Your next scheduled clinic shifts showing clinic name, day, and shift hours." },
  { num: 5, label: "Quick Actions", desc: "A full grid of clinical tools — prescribe, order labs, start teleconsults, and more." },
  { num: 6, label: "Recent Activity", desc: "Live feed of your latest appointments, prescriptions issued, and lab orders." },
];

/* ─── Quick actions ─── */
const quickActions = [
  { icon: <ClipboardList size={20} />, title: "Prescriptions", description: "View all prescriptions you have issued. Filter by status and search by patient name." },
  { icon: <PlusCircle size={20} />, title: "Issue Prescription", description: "Write and send a digital prescription to a patient's account — visible to them instantly." },
  { icon: <FlaskConical size={20} />, title: "Order Labs", description: "Submit a new lab test order for a patient. The order goes directly to the lab." },
  { icon: <CalendarClock size={20} />, title: "My Shifts", description: "View your current and upcoming work shifts across all registered facilities." },
  { icon: <TestTubes size={20} />, title: "Lab Orders", description: "See all lab orders you have placed, with status tracking through completion." },
  { icon: <CalendarDays size={20} />, title: "Appointments", description: "Full appointment management — view all upcoming and past consultations." },
  { icon: <Video size={20} />, title: "Video Calls", description: "Join or start an encrypted teleconsult session with a patient." },
  { icon: <MessageSquare size={20} />, title: "Messages", description: "Read and reply to patient messages and colleague communications." },
  { icon: <QrCode size={20} />, title: "Scan Health Card", description: "Open the QR scanner to read a patient's DigCare Health Card and pull up their records." },
  { icon: <Building2 size={20} />, title: "Scan Facility Card", description: "Scan a facility's QR card to verify and log into a clinic's system digitally." },
  { icon: <KeyRound size={20} />, title: "Access Requests", description: "Manage pending remote access requests from other providers for patient records." },
];

export default function DoctorsContent() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section
        className="py-20 md:py-28"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, rgba(30,58,138,0.04) 100%)",
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
                style={{ color: ACCENT, fontFamily: "Manrope, sans-serif" }}
              >
                FOR DOCTORS
              </p>
              <h1
                className="text-[36px] md:text-[48px] lg:text-[56px] font-bold text-[#1a2b3c] mb-6 leading-[1.08]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "-1.5px",
                }}
              >
                One screen for the whole consultation.
              </h1>
              <p
                className="text-[17px] leading-[1.7] max-w-[540px]"
                style={{ color: "#475569", fontFamily: "Manrope, sans-serif" }}
              >
                DigCare gives doctors a complete clinical dashboard — from
                managing appointments and shifts to issuing prescriptions and
                running encrypted video consultations.
              </p>
            </motion.div>

            {/* Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:w-1/2 flex justify-center"
            >
              <div className="relative w-[280px] md:w-[320px]">
                <div className="rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] animate-float">
                  <img
                    src="/assets/doctor_dashboard_mockup.png"
                    alt="Doctor dashboard showing profile, appointments, and clinical tools"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Dashboard Breakdown ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2
              className="text-3xl md:text-[40px] font-bold text-[#1a2b3c] leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.5px" }}
            >
              What&apos;s on your Doctor Dashboard.
            </h2>
          </motion.div>

          <div className="space-y-6">
            {dashboardElements.map((el, i) => (
              <motion.div
                key={el.num}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-5 items-start"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-[15px] font-extrabold flex-shrink-0"
                  style={{
                    background: ACCENT_BG,
                    color: ACCENT,
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  {el.num}
                </div>
                <div>
                  <h4
                    className="text-[16px] font-semibold text-[#1a2b3c] mb-1"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {el.label}
                  </h4>
                  <p
                    className="text-[14px] text-gray-500 leading-[1.65]"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {el.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quick Actions Grid ─── */}
      <section className="py-20 bg-[#fafafa]">
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
              Your clinical toolkit — one tap away.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {quickActions.map((action, i) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <FeatureCard
                  icon={action.icon}
                  title={action.title}
                  description={action.description}
                  accentColor={ACCENT}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Teleconsult Callout ─── */}
      <section
        className="py-20"
        style={{
          background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
        }}
      >
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="inline-block px-4 py-1.5 rounded-full text-[12px] font-bold mb-6"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#BFDBFE",
                fontFamily: "Manrope, sans-serif",
              }}
            >
              LIVE CONSULTATION
            </div>
            <h2
              className="text-3xl md:text-[40px] font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.5px" }}
            >
              Everything you need for a full consultation — without leaving the app.
            </h2>
            <p
              className="text-[16px] leading-[1.7] mb-8"
              style={{ color: "#BFDBFE", fontFamily: "Manrope, sans-serif" }}
            >
              View a patient&apos;s history, note symptoms, give a diagnosis,
              plan treatment, prescribe medicine, order tests, and make
              referrals — all within a single teleconsult session.
            </p>

            {/* Two phone mockups side by side */}
            <div className="flex justify-center gap-6 mt-8">
              <div className="w-[160px] md:w-[200px] rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)]">
                <img
                  src="/assets/CallScreen1.png"
                  alt="Video call interface"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="w-[160px] md:w-[200px] rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)] mt-8">
                <img
                  src="/assets/CallScreen2.png"
                  alt="Prescription form during teleconsult"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Verification Note ─── */}
      <section className="py-14 bg-[#fafafa]">
        <div className="max-w-[720px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-4 items-start bg-white rounded-2xl border border-gray-100 p-6"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: ACCENT_BG }}
            >
              <ShieldCheck size={20} style={{ color: ACCENT }} />
            </div>
            <div>
              <h4
                className="text-[15px] font-semibold text-[#1a2b3c] mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Every doctor on DigCare is verified.
              </h4>
              <p
                className="text-[14px] text-gray-500 leading-[1.65]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                We review professional licences and government-issued IDs before
                any account is activated. This is not optional — it is how we
                keep DigCare safe for everyone.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <RoleCtaBanner
        title="Ready to streamline your practice?"
        subtitle="Join DigCare and manage your clinical workflow from one screen."
        buttonText="Join Waitlist"
        buttonHref="/#footer"
      />
    </>
  );
}
