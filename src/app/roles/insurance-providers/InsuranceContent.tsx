"use client";

import { motion } from "framer-motion";
import FeatureCard from "@/components/roles/FeatureCard";
import StepFlow from "@/components/roles/StepFlow";
import RoleCtaBanner from "@/components/roles/RoleCtaBanner";
import Link from "next/link";
import {
  ClipboardCheck,
  CheckCircle2,
  History,
  ShieldCheck,
  Building2,
  User,
  Receipt,
  ArrowRight,
} from "lucide-react";

const ACCENT = "#6366F1";

/* ─── Feature panels ─── */
const featurePanels = [
  {
    icon: <ClipboardCheck size={20} />,
    title: "Review Claims",
    description:
      "All claims submitted by accredited facilities appear in one list — clinics, pharmacies, and labs.",
  },
  {
    icon: <CheckCircle2 size={20} />,
    title: "Approve or Reject",
    description:
      "Make decisions on each claim. All outcomes — approvals, queries, and rejections — are logged.",
  },
  {
    icon: <History size={20} />,
    title: "Audit Trail",
    description:
      "Every claim and every decision is timestamped and logged. Full transparency at every step.",
  },
];

/* ─── Accreditation flow ─── */
const accreditationSteps = [
  {
    number: 1,
    title: "Insurance Provider",
    description: "Provider accredits a healthcare facility on DigCare.",
  },
  {
    number: 2,
    title: "Facility Accredited",
    description:
      "Facility receives an accreditation level — enabling insurance acceptance.",
  },
  {
    number: 3,
    title: "Patient Uses Insurance",
    description:
      "Covered patients visit the facility and use their insurance to pay.",
  },
  {
    number: 4,
    title: "Claim Submitted",
    description:
      "The facility submits a claim to the insurance provider through DigCare.",
  },
  {
    number: 5,
    title: "Provider Reviews",
    description:
      "The insurance provider reviews, approves, or rejects the claim.",
  },
];

export default function InsuranceContent() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section
        className="py-20 md:py-28"
        style={{
          background:
            "linear-gradient(180deg, #FFFFFF 0%, rgba(99,102,241,0.05) 100%)",
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
                FOR INSURANCE PROVIDERS
              </p>
              <h1
                className="text-[36px] md:text-[48px] lg:text-[56px] font-bold text-[#1a2b3c] mb-6 leading-[1.08]"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "-1.5px",
                }}
              >
                Streamlined claims.{" "}
                <span style={{ color: ACCENT }}>Every time.</span>
              </h1>
              <p
                className="text-[17px] leading-[1.7] max-w-[540px]"
                style={{ color: "#475569", fontFamily: "Manrope, sans-serif" }}
              >
                DigCare gives insurance providers a dedicated portal to review,
                approve, and manage claims submitted by accredited facilities —
                with a full audit trail of every decision.
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
                    src="/assets/insurance_claims_mockup.png"
                    alt="Insurance provider portal showing claims list with approval status badges"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── What Insurance Providers Do ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2
              className="text-3xl md:text-[40px] font-bold text-[#1a2b3c] leading-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "-0.5px",
              }}
            >
              Your Insurance Provider portal.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featurePanels.map((panel, i) => (
              <motion.div
                key={panel.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <FeatureCard
                  icon={panel.icon}
                  title={panel.title}
                  description={panel.description}
                  accentColor={ACCENT}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Accreditation Model ─── */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2
              className="text-3xl md:text-[40px] font-bold text-[#1a2b3c] leading-tight mb-5"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "-0.5px",
              }}
            >
              How facility accreditation works.
            </h2>
            <p
              className="text-[16px] leading-[1.7] text-gray-500 max-w-[720px]"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Facilities apply to be accredited by an insurance provider. Once
              approved at a given accreditation level, that facility can start
              submitting claims on behalf of covered patients. Accreditations can
              be active, inactive, or suspended — and are visible to the
              facility at all times.
            </p>
          </motion.div>

          {/* Accreditation flow diagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <StepFlow steps={accreditationSteps} accentColor={ACCENT} />
          </motion.div>
        </div>
      </section>

      {/* ─── Registration CTA ─── */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(99,102,241,0.02) 100%)",
        }}
      >
        <div className="max-w-[720px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: `${ACCENT}15` }}
            >
              <ShieldCheck size={28} style={{ color: ACCENT }} />
            </div>
            <h2
              className="text-2xl md:text-[32px] font-bold text-[#1a2b3c] mb-4 leading-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "-0.5px",
              }}
            >
              Ready to bring your insurance services to DigCare?
            </h2>
            <p
              className="text-[16px] text-gray-500 mb-8"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Get in touch with our team to set up your provider portal.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-[15px] font-bold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: ACCENT,
                color: "#fff",
                boxShadow: `0 10px 24px ${ACCENT}40`,
                fontFamily: "Manrope, sans-serif",
              }}
            >
              Contact Us
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <RoleCtaBanner
        title="Simplify your claims management."
        subtitle="DigCare gives you a streamlined portal for every claim."
        buttonText="Join Waitlist"
        buttonHref="/#footer"
      />
    </>
  );
}
