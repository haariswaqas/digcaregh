"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import FeatureCard from "@/components/roles/FeatureCard";
import StepFlow from "@/components/roles/StepFlow";
import FeatureWalkthrough from "@/components/roles/FeatureWalkthrough";
import FeatureDuo from "@/components/roles/FeatureDuo";
import AppScreen, { SCREEN_BACKDROP } from "@/components/roles/AppScreen";
import FaqAccordion from "@/components/roles/FaqAccordion";
import RelatedFeatureLinks from "@/components/roles/RelatedFeatureLinks";
import RoleCtaBanner from "@/components/roles/RoleCtaBanner";
import { getFeatureBySlug, getFeatureSlugs } from "../_data/features";

interface FeatureDetailContentProps {
  slug: string;
}

export default function FeatureDetailContent({ slug }: FeatureDetailContentProps) {
  const feature = getFeatureBySlug(slug);

  if (!feature) return null;

  const Icon = feature.icon;
  const accent = feature.accent;
  const darkWalkthrough = feature.walkthrough?.tone === "dark";

  const relatedFeatures = feature.related
    .map((relatedSlug) => getFeatureBySlug(relatedSlug))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  const allSlugs = getFeatureSlugs();
  const currentIndex = allSlugs.indexOf(feature.slug);
  const nextSlug = allSlugs[(currentIndex + 1) % allSlugs.length];
  const nextFeature = getFeatureBySlug(nextSlug);

  return (
    <>
      {/* ─── Sub-nav: back to Patients ─── */}
      <div className="max-w-[1200px] mx-auto px-6 pt-2">
        <Link
          href="/roles/patients"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-400 hover:text-gray-600 transition-colors"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          <ArrowLeft size={14} />
          All patient features
        </Link>
      </div>

      {/* ─── Hero ─── */}
      <section className="py-14 md:py-20">
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
                style={{ color: accent, fontFamily: "Manrope, sans-serif" }}
              >
                FOR PATIENTS · {feature.tag}
              </p>
              <h1
                className="text-[32px] md:text-[44px] lg:text-[48px] font-bold text-[#1a2b3c] mb-6 leading-[1.1]"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-1.2px" }}
              >
                {feature.heroHeadline}
              </h1>
              <p
                className="text-[16px] leading-[1.75] max-w-[520px] mb-8"
                style={{ color: "#475569", fontFamily: "Manrope, sans-serif" }}
              >
                {feature.heroSubhead}
              </p>

              {/* Stat chips */}
              <div className="flex flex-wrap gap-3">
                {feature.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-gray-100 bg-white px-4 py-3"
                    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                  >
                    <p
                      className="text-[15px] font-bold text-[#1a2b3c] leading-tight"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {stat.value}
                    </p>
                    <p
                      className="text-[11.5px] text-gray-400 mt-0.5"
                      style={{ fontFamily: "Manrope, sans-serif" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:w-1/2 flex justify-center"
            >
              {feature.heroScreen ? (
                <div className="relative w-[270px] md:w-[320px]">
                  <div
                    className="absolute -top-10 -right-12 h-48 w-48 rounded-full opacity-30 blur-3xl"
                    style={{ background: accent }}
                  />
                  <div className="absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-sky-300 opacity-20 blur-3xl" />
                  <div
                    className="relative overflow-hidden rounded-[2.25rem] border border-slate-200/70 px-5 pt-5"
                    style={{ background: feature.screenBackdrop ?? SCREEN_BACKDROP, boxShadow: `0 40px 80px -30px ${accent}55` }}
                  >
                    <AppScreen
                      src={feature.heroScreen.src}
                      alt={feature.heroScreen.alt}
                      aspect={feature.screenAspect}
                      sizes="(min-width: 768px) 280px, 230px"
                      priority
                    />
                  </div>
                  {feature.heroChips && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="absolute -left-6 bottom-[11%] md:-left-16"
                      >
                        <div className="animate-float font-manrope flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_18px_40px_-14px_rgba(15,23,42,0.35)]" style={{ animationDuration: "7s" }}>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full text-white" style={{ background: accent }}>
                            <feature.heroChips.light.icon size={16} strokeWidth={3} />
                          </span>
                          <span className="leading-tight">
                            <span className="block text-[12.5px] font-bold text-[#0B1120]">{feature.heroChips.light.title}</span>
                            {feature.heroChips.light.detail && (
                              <span className="block text-[11px] text-slate-500">{feature.heroChips.light.detail}</span>
                            )}
                          </span>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.85, duration: 0.5 }}
                        className="absolute -right-4 -top-5 md:-right-12"
                      >
                        <div className="animate-float font-manrope flex items-center gap-2 rounded-2xl bg-[#0B1120] px-3.5 py-2.5 text-white shadow-[0_18px_40px_-14px_rgba(11,17,32,0.55)]" style={{ animationDuration: "8s", animationDelay: "1.4s" }}>
                          <feature.heroChips.dark.icon size={15} style={{ color: accent }} />
                          <span className="text-[12px] font-bold">{feature.heroChips.dark.title}</span>
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>
              ) : (
              <div className="relative w-[280px] md:w-[320px] aspect-square">
                {/* Blurred accent orbs */}
                <div
                  className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl opacity-30"
                  style={{ background: accent }}
                />
                <div
                  className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full blur-3xl opacity-20"
                  style={{ background: accent }}
                />
                {/* Frame */}
                <div
                  className="relative w-full h-full rounded-[2rem] flex items-center justify-center animate-float"
                  style={{
                    background: `linear-gradient(145deg, ${accent}10, ${accent}24)`,
                    border: `1px solid ${accent}30`,
                    boxShadow: `0 20px 60px -12px ${accent}33`,
                  }}
                >
                  <div
                    className="w-28 h-28 md:w-32 md:h-32 rounded-[1.5rem] flex items-center justify-center"
                    style={{
                      background: "#fff",
                      boxShadow: `0 12px 32px -8px ${accent}55`,
                    }}
                  >
                    <Icon size={48} style={{ color: accent }} strokeWidth={1.75} />
                  </div>
                </div>
              </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Capabilities ─── */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 max-w-[640px]"
          >
            <p
              className="text-[11px] font-extrabold tracking-[2px] uppercase mb-3"
              style={{ color: accent, fontFamily: "Manrope, sans-serif" }}
            >
              CAPABILITIES
            </p>
            <h2
              className="text-3xl md:text-[36px] font-bold text-[#1a2b3c] leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.5px" }}
            >
              What you can do with {feature.title}.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {feature.capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <FeatureCard
                  icon={<cap.icon size={20} />}
                  title={cap.title}
                  description={cap.description}
                  accentColor={accent}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section
        className={`relative overflow-hidden py-20 ${darkWalkthrough ? "bg-[#040415]" : "bg-white"}`}
      >
        {darkWalkthrough && (
          <div className="pointer-events-none absolute inset-0">
            <div className="bg-dot-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />
            <div className="absolute right-[-10%] top-[10%] h-[520px] w-[520px] rounded-full opacity-20 blur-[150px]" style={{ background: accent }} />
          </div>
        )}
        <div className="relative max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 max-w-[640px]"
          >
            <p
              className="text-[11px] font-extrabold tracking-[2px] uppercase mb-3"
              style={{ color: accent, fontFamily: "Manrope, sans-serif" }}
            >
              HOW IT WORKS
            </p>
            <h2
              className={`text-3xl md:text-[36px] font-bold leading-tight ${darkWalkthrough ? "text-white" : "text-[#1a2b3c]"}`}
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.5px" }}
            >
              {feature.walkthrough?.title ?? "From start to finish."}
            </h2>
            {feature.walkthrough && (
              <p
                className={`mt-4 text-[16px] leading-[1.7] ${darkWalkthrough ? "text-slate-400" : "text-gray-500"}`}
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {feature.walkthrough.subtitle}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {feature.walkthrough ? (
              <FeatureWalkthrough
                steps={feature.walkthrough.steps}
                accent={accent}
                backdrop={feature.screenBackdrop}
                aspect={feature.screenAspect}
                tone={feature.walkthrough.tone}
              />
            ) : (
              feature.steps && <StepFlow steps={feature.steps} accentColor={accent} />
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── Two-sided flow ─── */}
      {feature.duo && (
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14 max-w-[640px]"
            >
              <p
                className="text-[11px] font-extrabold tracking-[2px] uppercase mb-3"
                style={{ color: accent, fontFamily: "Manrope, sans-serif" }}
              >
                {feature.duo.eyebrow}
              </p>
              <h2
                className="text-3xl md:text-[36px] font-bold text-[#1a2b3c] leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.5px" }}
              >
                {feature.duo.title}
              </h2>
              <p
                className="mt-4 text-[16px] leading-[1.7] text-gray-500"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {feature.duo.subtitle}
              </p>
            </motion.div>

            <FeatureDuo left={feature.duo.left} right={feature.duo.right} accent={accent} aspect={feature.screenAspect} />
          </div>
        </section>
      )}

      {/* ─── Good to know ─── */}
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
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={16} style={{ color: accent }} />
              <p
                className="text-[11px] font-extrabold tracking-[2px] uppercase"
                style={{ color: accent, fontFamily: "Manrope, sans-serif" }}
              >
                GOOD TO KNOW
              </p>
            </div>

            <div className="space-y-5">
              {feature.goodToKnow.map((point, i) => (
                <motion.div
                  key={point.text}
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
                    <span style={{ color: accent }}>
                      <point.icon size={18} />
                    </span>
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

      {/* ─── FAQ ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-[760px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2
              className="text-3xl md:text-[36px] font-bold text-[#1a2b3c] leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.5px" }}
            >
              Frequently asked questions.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <FaqAccordion items={feature.faqs} accentColor={accent} />
          </motion.div>
        </div>
      </section>

      {/* ─── Related features ─── */}
      {relatedFeatures.length > 0 && (
        <section className="py-20 bg-[#fafafa]">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2
                className="text-2xl md:text-[28px] font-bold text-[#1a2b3c] leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.5px" }}
              >
                Works hand in hand with
              </h2>
            </motion.div>

            <RelatedFeatureLinks
              basePath="/roles/patients"
              accentColor={accent}
              features={relatedFeatures.map((f) => ({
                slug: f.slug,
                title: f.title,
                tag: f.tag,
                icon: f.icon,
              }))}
            />
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <RoleCtaBanner
        title="Take your health journey digital."
        subtitle="Join thousands of Ghanaians on DigCare."
        buttonText="Join Waitlist"
        buttonHref="/#footer"
      />

      {/* ─── Next feature nav ─── */}
      {nextFeature && (
        <div className="border-t border-gray-100 py-6">
          <div className="max-w-[1200px] mx-auto px-6 flex justify-end">
            <Link
              href={`/roles/patients/${nextFeature.slug}`}
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-gray-500 hover:text-gray-700 transition-colors"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Next: {nextFeature.title}
              <ArrowLeft size={14} className="rotate-180" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
