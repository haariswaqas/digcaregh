"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  FileText,
  CreditCard,
  Ban,
  Scale,
  Mail,
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
  RefreshCcw,
  Clock,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Receipt,
  Phone
} from "lucide-react";

const sections = [
  { id: "general", number: "1", title: "General Principles", icon: Scale },
  { id: "eligibility", number: "2", title: "Cancellation & Refund Eligibility", icon: CheckCircle2 },
  { id: "request", number: "3", title: "How to Request a Refund", icon: HelpCircle },
  { id: "processing", number: "4", title: "Processing Times & Refund Method", icon: Clock },
  { id: "non-refundable", number: "5", title: "Non-Refundable Items", icon: Ban },
  { id: "contact", number: "6", title: "Contact Us", icon: Mail },
];

export default function RefundContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("general");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const filteredSections = sections.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.number.includes(searchQuery)
  );

  return (
    <div className="bg-[#fcfdfe] text-gray-800 min-h-screen pb-24">
      {/* Header Banner */}
      <header className="relative bg-gradient-to-b from-[#f5f3ff] via-[#faf5ff] to-[#fcfdfe] border-b border-gray-100 pt-10 pb-12 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#8b5cf6]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-[#31708f]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8b5cf6] bg-[#8b5cf6]/10 px-3.5 py-1.5 rounded-full border border-[#8b5cf6]/20">
              <RefreshCcw size={14} className="text-[#8b5cf6]" />
              <span>Payments & Refunds</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            DigCare Refund Policy
          </h1>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-600 mb-6 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6] animate-pulse" />
              <span>Effective Date: <strong>August 7, 2026</strong></span>
            </div>
            <div className="hidden sm:block text-gray-300">•</div>
            <div>Version: <span className="font-semibold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">1.0</span></div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-5 md:p-6 shadow-xs max-w-3xl">
            <p className="text-gray-700 leading-relaxed text-base">
              At DigCare, we aim to make accessing healthcare simple, convenient, and reliable. We understand that plans can change or unexpected circumstances can arise. This Refund Policy outlines the terms and conditions under which refunds are requested, processed, and granted for appointments booked through the DigCare app.
            </p>
          </div>

          {/* Quick Search */}
          <div className="mt-8 max-w-xl relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search refund topics (e.g., Eligibility, Processing Times)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/10 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 outline-none transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-xs font-semibold text-gray-400 hover:text-gray-600 bg-gray-100 px-2 py-1 rounded"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-6 md:pt-10">
        {/* Mobile Sticky Navigation Dropdown Bar */}
        <div className="lg:hidden mb-6 sticky top-16 sm:top-20 z-30">
          <div className="bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-2xl shadow-md p-3.5">
            <button
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              aria-label="Toggle Table of Contents"
              className="w-full flex items-center justify-between text-left font-bold text-gray-900 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2 truncate pr-2">
                <Receipt size={16} className="text-[#8b5cf6] shrink-0" />
                <span className="truncate">
                  {sections.find((s) => s.id === activeSection)?.number}. {sections.find((s) => s.id === activeSection)?.title || "Refund Sections"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#8b5cf6] font-semibold shrink-0 bg-[#8b5cf6]/10 px-2.5 py-1 rounded-lg">
                <span>{mobileTocOpen ? "Close" : "Contents"}</span>
                <ChevronDown className={`transition-transform duration-200 ${mobileTocOpen ? "rotate-180" : ""}`} size={14} />
              </div>
            </button>

            {mobileTocOpen && (
              <div className="mt-3 pt-3 border-t border-gray-100 max-h-[60vh] overflow-y-auto space-y-1">
                {filteredSections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => {
                        scrollToSection(sec.id);
                        setMobileTocOpen(false);
                      }}
                      className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${isActive
                        ? "bg-[#8b5cf6] text-white font-semibold shadow-xs"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                          }`}
                      >
                        {sec.number}
                      </span>
                      <span className="truncate flex-1">{sec.title}</span>
                      <ChevronRight
                        size={14}
                        className={`shrink-0 transition-transform ${isActive ? "translate-x-0.5 text-white" : "text-gray-300"}`}
                      />
                    </button>
                  );
                })}
                <div className="pt-2 border-t border-gray-100">
                  <Link
                    href="/terms-of-service"
                    onClick={() => setMobileTocOpen(false)}
                    className="flex items-center justify-between text-xs font-semibold text-[#8b5cf6] hover:text-[#7c3aed] p-2 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <FileText size={14} />
                      <span>View Terms of Service</span>
                    </span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Desktop Sticky Sidebar TOC */}
          <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 z-20">
            <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs max-h-[calc(100vh-120px)] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <Receipt size={16} className="text-[#8b5cf6]" />
                  <span>Refund Sections</span>
                </h3>
                <span className="text-xs font-semibold text-gray-400">
                  {sections.length} Sections
                </span>
              </div>

              <nav className="space-y-1">
                {filteredSections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${isActive
                        ? "bg-[#8b5cf6] text-white font-semibold shadow-xs"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 ${isActive
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-500"
                          }`}
                      >
                        {sec.number}
                      </span>
                      <span className="truncate flex-1">{sec.title}</span>
                      <ChevronRight
                        size={14}
                        className={`shrink-0 transition-transform ${isActive ? "translate-x-0.5 text-white" : "text-gray-300"
                          }`}
                      />
                    </button>
                  );
                })}
              </nav>

              {/* Cross Links */}
              <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                <Link
                  href="/terms-of-service"
                  className="flex items-center justify-between text-xs font-semibold text-[#8b5cf6] hover:text-[#7c3aed] p-2 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileText size={14} />
                    <span>View Terms of Service</span>
                  </span>
                  <ArrowUpRight size={14} />
                </Link>
                <a
                  href="mailto:support@digcare.com"
                  className="flex items-center justify-between text-xs font-semibold text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Mail size={14} />
                    <span>support@digcare.com</span>
                  </span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </aside>

          {/* Document Sections */}
          <main className="lg:col-span-8 space-y-12">

            {/* 1. General Principles */}
            <section id="general" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center font-bold">
                  1
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  1. General Principles
                </h2>
              </div>

              <div className="space-y-4 text-sm text-gray-700">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="font-bold text-gray-900 text-base mb-2">Platform Role</h3>
                  <p className="text-gray-600 leading-relaxed">
                    DigCare provides a platform connecting users with independent healthcare providers (including doctors, dentists, and specialists). DigCare facilitates appointment bookings and payment processing.
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="font-bold text-gray-900 text-base mb-2">Healthcare Providers and Healthcare Facilities</h3>
                  <p className="text-gray-600 leading-relaxed">
                    All refunds relating to services received from a physician, dentist, pharmacist, or any healthcare facility must be initiated at the facility where the patient received services.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="font-bold text-gray-900 text-base mb-2">Provider Cancellation Rules</h3>
                  <p className="text-gray-600 leading-relaxed">
                    While DigCare establishes standard platform refund guidelines, individual healthcare providers or clinics may set specific cancellation windows which are displayed on their profile prior to booking confirmation.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Cancellation & Refund Eligibility */}
            <section id="eligibility" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#0a9c5a]/10 text-[#0a9c5a] flex items-center justify-center font-bold">
                  2
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  2. Cancellation & Refund Eligibility
                </h2>
              </div>

              <div className="space-y-6 text-sm text-gray-700">
                {/* A */}
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">A. Client-Initiated Cancellations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                      <h4 className="font-bold text-emerald-900 mb-1 flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-600" />
                        Full Refund
                      </h4>
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        You are eligible for a 100% refund of the appointment fee if you cancel your appointment at least 48 hours prior to the scheduled appointment time.
                      </p>
                    </div>
                    <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100">
                      <h4 className="font-bold text-rose-900 mb-1 flex items-center gap-2">
                        <Ban size={16} className="text-rose-600" />
                        Non-Refundable
                      </h4>
                      <p className="text-xs text-rose-800 leading-relaxed">
                        Cancellations made less than 48 hours before the scheduled appointment time, or failure to attend the appointment (No-Show), are non-refundable.
                      </p>
                    </div>
                  </div>
                </div>

                {/* B */}
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">B. Provider-Initiated Cancellations & Technical Issues</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                      <h4 className="font-bold text-blue-900 mb-1">Provider Cancellation</h4>
                      <p className="text-sm text-blue-800 leading-relaxed">
                        If a healthcare provider cancels an appointment or is unavailable at the scheduled time, you will receive a 100% full refund or the option to reschedule at no additional cost.
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                      <h4 className="font-bold text-blue-900 mb-1">Technical Disruptions (Virtual Consultations)</h4>
                      <p className="text-sm text-blue-800 leading-relaxed">
                        If a video or audio consultation cannot be completed due to technical failures originating from the DigCare platform or the provider's connection, you are eligible for a full refund or a complimentary reschedule.
                      </p>
                    </div>
                  </div>
                </div>

                {/* C */}
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">C. Lab Test Orders</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#31708f] mt-2 shrink-0" />
                      <span><strong>Prior to Sample Collection:</strong> If you cancel a lab test order before the sample is collected (either via home visit or at the laboratory facility), you are eligible for a full refund.</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#31708f] mt-2 shrink-0" />
                      <span><strong>Post-Collection:</strong> Once a sample has been collected or the test has been processed, the lab test fee is strictly non-refundable.</span>
                    </li>
                  </ul>
                </div>

                {/* D */}
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">D. Pharmacy & Prescription Drug Orders</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] mt-2 shrink-0" />
                      <span><strong>Prior to Dispensing:</strong> If a medication order is cancelled before the pharmacy has dispensed or dispatched it, a full refund will be provided.</span>
                    </li>
                    <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] mt-2 shrink-0" />
                      <span><strong>Dispensed Medications:</strong> Due to health, safety, and regulatory reasons, all prescription medications and pharmacy items that have been dispensed, picked up, or delivered are entirely non-refundable, even if they remain unopened.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. How to Request a Refund */}
            <section id="request" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center font-bold">
                  3
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  3. How to Request a Refund
                </h2>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                All refund requests must be submitted directly through the DigCare mobile application:
              </p>

              <ol className="list-decimal pl-5 space-y-2 text-gray-600 text-sm mb-6">
                <li>Open the DigCare app and log into your account.</li>
                <li>Navigate to the relevant section for your transaction (e.g., <strong>My Appointments</strong>, <strong>My Lab Tests</strong>, or <strong>My Pharmacy Orders</strong>).</li>
                <li>Select the specific booking, test, or order you wish to refund.</li>
                <li>Tap on the <strong>"Request a Refund"</strong> link.</li>
                <li>Select the reason for your request, attach any supporting details or documentation (if applicable), and submit.</li>
              </ol>

              <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl text-sm text-amber-900 flex gap-3 items-start">
                <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Note:</strong> Requests sent via email or direct message to providers, laboratories, or pharmacies will not trigger the automated refund workflow and must be submitted using the in-app <strong>"Request a Refund"</strong> link.
                </p>
              </div>
            </section>

            {/* 4. Processing Times & Refund Method */}
            <section id="processing" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                  4
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  4. Processing Times & Refund Method
                </h2>
              </div>

              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <Clock size={18} className="text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900">Review Period</h4>
                    <p className="text-gray-600 mt-1">Refund requests submitted via the in-app link are reviewed by our support team within 48 hours.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <RefreshCcw size={18} className="text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900">Payment Return</h4>
                    <p className="text-gray-600 mt-1">Once approved, refunds will be credited back to the original payment method (credit/debit card, mobile wallet, or digital bank transfer) used during booking.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <CreditCard size={18} className="text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900">Timeframe</h4>
                    <p className="text-gray-600 mt-1">Depending on your financial institution, it typically takes 1 to 5 business days for the refunded amount to reflect in your account.</p>
                  </div>
                </li>
              </ul>
            </section>

            {/* 5. Non-Refundable Items */}
            <section id="non-refundable" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
                  5
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  5. Non-Refundable Items
                </h2>
              </div>

              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start gap-3 p-4 bg-rose-50/30 rounded-xl border border-rose-100/50">
                  <Ban size={18} className="text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900">Completed Appointments</h4>
                    <p className="text-gray-600 mt-1">Once a consultation or healthcare service has been delivered by the provider, the booking fee is non-refundable.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-rose-50/30 rounded-xl border border-rose-100/50">
                  <Ban size={18} className="text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900">DigCare Service & Administrative Fees</h4>
                    <p className="text-gray-600 mt-1">Certain nominal platform convenience fees may be non-refundable, except in cases where the provider cancels or a platform error occurs.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Contact Us */}
            <section id="contact" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
                  6
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  6. Contact Us
                </h2>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed mb-6">
                If you encounter issues with the in-app refund request feature or have questions about a pending request, please reach out to our Customer Support team:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex flex-col items-center text-center">
                  <HelpCircle size={24} className="text-indigo-600 mb-2" />
                  <h4 className="font-bold text-indigo-950 mb-1">In-App Support</h4>
                  <p className="text-xs text-indigo-900">Navigate to Help & Support &gt; Contact Support</p>
                </div>
                <a href="mailto:support@digcare.com" className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex flex-col items-center text-center hover:bg-indigo-100 transition-colors">
                  <Mail size={24} className="text-indigo-600 mb-2" />
                  <h4 className="font-bold text-indigo-950 mb-1">Email</h4>
                  <p className="text-xs text-indigo-900">support@digcare.com</p>
                </a>
                <a href="tel:18003442273" className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex flex-col items-center text-center hover:bg-indigo-100 transition-colors">
                  <Phone size={24} className="text-indigo-600 mb-2" />
                  <h4 className="font-bold text-indigo-950 mb-1">Phone</h4>
                  <p className="text-xs text-indigo-900">1-800-DIG-CARE<br/>(1-800-344-2273)</p>
                </a>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
