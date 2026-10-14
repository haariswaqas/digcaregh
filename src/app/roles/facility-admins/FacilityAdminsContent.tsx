"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FeatureCard from "@/components/roles/FeatureCard";
import StatusBadge from "@/components/roles/StatusBadge";
import RoleCtaBanner from "@/components/roles/RoleCtaBanner";
import {
  Building2,
  CalendarDays,
  CalendarClock,
  CreditCard as CardIcon,
  Pill,
  FlaskConical,
  Receipt,
  ShieldCheck,
  ClipboardList,
  Package,
  Truck,
  TestTubes,
} from "lucide-react";

const ACCENT = "#8B5CF6";

/* ─── Tab definitions ─── */
type TabId = "clinic" | "pharmacy" | "lab";

const tabs: { id: TabId; label: string }[] = [
  { id: "clinic", label: "Clinic Admin" },
  { id: "pharmacy", label: "Pharmacy Admin" },
  { id: "lab", label: "Lab Admin" },
];

/* ─── Quick actions per tab ─── */
const clinicActions = [
  { icon: <Building2 size={20} />, title: "My Facility", description: "View and edit your clinic's profile — name, address, contact details, type, and services." },
  { icon: <CalendarDays size={20} />, title: "Appointments", description: "View all appointments booked at this facility across all doctors. Filter by date, doctor, or status." },
  { icon: <CalendarClock size={20} />, title: "Shifts", description: "View and manage the work schedule for all medical professionals at this facility." },
  { icon: <CardIcon size={20} />, title: "Facility Cards", description: "Manage digital health cards — issue, deactivate, or review facility QR cards for doctors." },
  { icon: <Pill size={20} />, title: "Pharmacy", description: "Shortcut to pharmacy administration — only visible if pharmacy services are enabled." },
  { icon: <FlaskConical size={20} />, title: "Laboratory", description: "Shortcut to lab administration — only visible if laboratory services are enabled." },
  { icon: <Receipt size={20} />, title: "Facility Bills", description: "View and manage all bills generated for patients across consultations, prescriptions, and labs." },
  { icon: <ShieldCheck size={20} />, title: "Insurance Claims", description: "View and manage insurance claims submitted through this facility. Requires active accreditation." },
];

const pharmacyActions = [
  { icon: <Pill size={20} />, title: "Pharmacy Inventory", description: "Browse, search, add, and update all medications and consumables. Get low-stock alerts." },
  { icon: <ClipboardList size={20} />, title: "Prescription Queue", description: "View all prescriptions sent to this pharmacy awaiting dispensing. Track progress." },
  { icon: <Truck size={20} />, title: "Drug Dispenses", description: "Full log of dispensed medications — patient names, doctors, dates, and quantities." },
  { icon: <Building2 size={20} />, title: "My Facility", description: "View and edit the pharmacy's registered profile on DigCare." },
  { icon: <Receipt size={20} />, title: "Facility Bills", description: "View all bills generated through this pharmacy for patients." },
  { icon: <ShieldCheck size={20} />, title: "Insurance Claims", description: "Manage insurance claims submitted through this pharmacy. Requires accreditation." },
];

const labActions = [
  { icon: <FlaskConical size={20} />, title: "Lab Inventory", description: "Manage the full catalogue of tests and services — add types, set availability, track stock." },
  { icon: <Building2 size={20} />, title: "My Facility", description: "View and edit the laboratory's full profile on DigCare." },
  { icon: <TestTubes size={20} />, title: "Lab Orders", description: "View all lab test orders from all doctors who have sent orders here. Filter and manage." },
  { icon: <Receipt size={20} />, title: "Facility Bills", description: "View all bills generated for patients through this laboratory." },
  { icon: <ShieldCheck size={20} />, title: "Insurance Claims", description: "View and manage claims submitted through this lab. Requires accreditation." },
];

const tabContent: Record<TabId, {
  intro: string;
  accent: string;
  actions: typeof clinicActions;
  callout?: { type: "accreditation" | "paystack"; text: string };
}> = {
  clinic: {
    intro:
      "Clinic Admins oversee the day-to-day operations of a medical clinic — appointments, staff shifts, patient bills, insurance claims, and facility health cards. If the facility also offers pharmacy or lab services, those are highlighted as separate badges on the header.",
    accent: "#8B5CF6",
    actions: clinicActions,
    callout: {
      type: "accreditation",
      text: "Accredited facilities can accept insurance plans from partnered providers. Contact DigCare support to apply for accreditation.",
    },
  },
  pharmacy: {
    intro:
      "Pharmacy Admins manage the operations of a registered pharmacy on DigCare — from stock management to prescription fulfilment and billing. Every prescription is received, processed, and confirmed digitally.",
    accent: "#10B981",
    actions: pharmacyActions,
    callout: {
      type: "paystack",
      text: "Complete your Paystack payment sub-account setup to start receiving patient payments directly through DigCare.",
    },
  },
  lab: {
    intro:
      "Lab Admins manage the operations of a registered laboratory — overseeing test inventory, incoming lab orders, billing, and payment setup. Doctors order tests digitally, and patients are notified of results automatically.",
    accent: "#3B82F6",
    actions: labActions,
  },
};

export default function FacilityAdminsContent() {
  const [activeTab, setActiveTab] = useState<TabId>("clinic");
  const current = tabContent[activeTab];

  return (
    <>
      {/* ─── Hero ─── */}
      <section
        className="py-20 md:py-28"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, rgba(139,92,246,0.04) 100%)",
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
                FOR FACILITY ADMINS
              </p>
              <h1
                className="text-[36px] md:text-[48px] lg:text-[56px] font-bold text-[#1a2b3c] mb-6 leading-[1.08]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "-1.5px",
                }}
              >
                Run your facility smarter.
              </h1>
              <p
                className="text-[17px] leading-[1.7] max-w-[540px]"
                style={{ color: "#475569", fontFamily: "Manrope, sans-serif" }}
              >
                Whether you manage a clinic, pharmacy, or laboratory, DigCare
                gives you a complete operational dashboard — from staff shifts to
                patient bills and insurance claims.
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
                    src="/assets/facility_admin_mockup.png"
                    alt="Facility admin dashboard showing clinic management tools and accreditation badges"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Tabs ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Tab buttons */}
          <div
            className="flex gap-2 mb-12 overflow-x-auto scrollbar-hide"
            role="tablist"
            aria-label="Facility type tabs"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-6 py-2.5 rounded-full text-[14px] font-semibold whitespace-nowrap transition-all duration-200"
                style={{
                  fontFamily: "Manrope, sans-serif",
                  background: activeTab === tab.id ? ACCENT : "#F3F4F6",
                  color: activeTab === tab.id ? "#fff" : "#475569",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Intro */}
            <p
              className="text-[16px] leading-[1.7] text-gray-500 max-w-[720px] mb-10"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {current.intro}
            </p>

            {/* Quick actions grid */}
            <h3
              className="text-2xl font-bold text-[#1a2b3c] mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
              {current.actions.map((action) => (
                <FeatureCard
                  key={action.title}
                  icon={action.icon}
                  title={action.title}
                  description={action.description}
                  accentColor={current.accent}
                />
              ))}
            </div>

            {/* Callout */}
            {current.callout && (
              <div
                className="rounded-2xl p-6 flex gap-4 items-start"
                style={{
                  background:
                    current.callout.type === "accreditation"
                      ? `${ACCENT}0D`
                      : "#FEF3C740",
                  border:
                    current.callout.type === "accreditation"
                      ? `1px solid ${ACCENT}30`
                      : "1px solid #F59E0B40",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background:
                      current.callout.type === "accreditation"
                        ? `${ACCENT}1A`
                        : "#FEF3C7",
                  }}
                >
                  {current.callout.type === "accreditation" ? (
                    <ShieldCheck size={20} style={{ color: ACCENT }} />
                  ) : (
                    <Package size={20} style={{ color: "#D97706" }} />
                  )}
                </div>
                <p
                  className="text-[14px] leading-[1.65]"
                  style={{
                    color:
                      current.callout.type === "accreditation"
                        ? "#475569"
                        : "#92400E",
                    fontFamily: "Manrope, sans-serif",
                  }}
                >
                  {current.callout.text}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── Payment Setup ─── */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-[800px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-[36px] font-bold text-[#1a2b3c] mb-5 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.5px" }}
            >
              Getting paid through DigCare.
            </h2>
            <p
              className="text-[16px] leading-[1.7] text-gray-500 mb-8"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Every facility that charges patients needs a Paystack sub-account.
              This is a one-time setup that takes minutes — and once complete,
              patient payments flow directly to your account. Card numbers and
              Mobile Money PINs are never stored by DigCare.
            </p>

            {/* Visual flow */}
            <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
              {[
                { icon: <Building2 size={20} />, label: "Your Facility" },
                { icon: <Package size={20} />, label: "Paystack" },
                { icon: <Receipt size={20} />, label: "Your Bank Account" },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: `${ACCENT}15` }}
                    >
                      <span style={{ color: ACCENT }}>{step.icon}</span>
                    </div>
                    <span
                      className="text-[12px] font-semibold text-gray-500"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <svg
                      width="32"
                      height="16"
                      viewBox="0 0 32 16"
                      fill="none"
                      className="text-gray-300 hidden md:block"
                    >
                      <path
                        d="M0 8h28M24 3l4 5-4 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Insurance Accreditation ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-[36px] font-bold text-[#1a2b3c] mb-5 leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.5px" }}
            >
              Accept insurance at your facility.
            </h2>
            <p
              className="text-[16px] leading-[1.7] text-gray-500 mb-8"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              If your facility is accredited by an insurance provider, patients
              covered by that provider can use their insurance to pay for
              services at your facility. DigCare manages the claim submission
              process automatically.
            </p>

            {/* Status badge examples */}
            <div className="flex flex-wrap gap-3">
              <StatusBadge status="active" />
              <StatusBadge status="inactive" />
              <StatusBadge status="suspended" />
              <StatusBadge status="pending" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <RoleCtaBanner
        title="Modernise your facility operations."
        subtitle="Manage everything from one dashboard on DigCare."
        buttonText="Join Waitlist"
        buttonHref="/#footer"
      />
    </>
  );
}
