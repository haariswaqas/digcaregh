"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Search,
  Printer,
  Copy,
  Check,
  FileText,
  UserCheck,
  Ban,
  Video,
  CreditCard,
  Pill,
  FlaskConical,
  Shield,
  MessageSquare,
  Bell,
  Scale,
  Building,
  AlertTriangle,
  Mail,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const sections = [
  { id: "eligibility", number: "1", title: "Eligibility & User Roles", icon: UserCheck },
  { id: "verification", number: "2", title: "Account Creation & Verification", icon: Shield },
  { id: "conduct", number: "3", title: "Acceptable Use & Prohibited Conduct", icon: Ban },
  { id: "telehealth", number: "4", title: "Telehealth Services", icon: Video },
  { id: "health-card", number: "5", title: "Health Card & Data Access", icon: FileText },
  { id: "prescriptions", number: "6", title: "Prescriptions & Medications", icon: Pill },
  { id: "lab-services", number: "7", title: "Lab Services", icon: FlaskConical },
  { id: "payments", number: "8", title: "Payments & Billing", icon: CreditCard },
  { id: "insurance", number: "9", title: "Insurance & NHIS", icon: Building },
  { id: "messaging", number: "10", title: "In-App Messaging", icon: MessageSquare },
  { id: "notifications", number: "11", title: "Push Notifications", icon: Bell },
  { id: "ip", number: "12", title: "Intellectual Property", icon: Sparkles },
  { id: "disclaimers", number: "13", title: "Disclaimers", icon: AlertTriangle },
  { id: "liability", number: "14", title: "Limitation of Liability", icon: ShieldAlert },
  { id: "termination", number: "15", title: "Termination & Suspension", icon: Ban },
  { id: "disputes", number: "16", title: "Dispute Resolution & Governing Law", icon: Scale },
  { id: "modifications", number: "17", title: "Modifications", icon: FileText },
];

export default function TermsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("eligibility");
  const [copied, setCopied] = useState(false);

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

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
      <header className="relative bg-gradient-to-b from-[#f0f7fa] via-[#f7fafc] to-[#fcfdfe] border-b border-gray-100 pt-10 pb-12 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#31708f]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-[#0a9c5a]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#31708f] bg-[#31708f]/10 px-3.5 py-1.5 rounded-full border border-[#31708f]/20">
              <Shield size={14} className="text-[#31708f]" />
              <span>Legal Document</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 border border-gray-200 px-3.5 py-2 rounded-lg transition-colors shadow-xs"
              >
                {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                <span>{copied ? "Link Copied" : "Share"}</span>
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-[#31708f] hover:bg-[#255871] px-4 py-2 rounded-lg transition-colors shadow-xs"
              >
                <Printer size={14} />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            DigCare Terms of Service
          </h1>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-600 mb-6 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Effective Date: <strong>March 20, 2026</strong></span>
            </div>
            <div className="hidden sm:block text-gray-300">•</div>
            <div>Version: <span className="font-semibold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">1.0</span></div>
            <div className="hidden sm:block text-gray-300">•</div>
            <div>Jurisdiction: <span className="font-semibold text-gray-900">Republic of Ghana 🇬🇭</span></div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-5 md:p-6 shadow-xs max-w-3xl">
            <p className="text-gray-700 leading-relaxed text-base">
              By creating an account on DigCare, you agree to be bound by these Terms of Service. If you do not agree, you may not use the platform.
            </p>
          </div>

          {/* Quick Search */}
          <div className="mt-8 max-w-xl relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search terms & clauses (e.g., Telehealth, Paystack, Verification)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 focus:border-[#31708f] focus:ring-2 focus:ring-[#31708f]/10 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 outline-none transition-all shadow-xs"
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

      {/* Main Content & Sidebar Grid */}
      <div className="max-w-[1200px] mx-auto px-6 pt-10">
        {/* Emergency Notice Banner */}
        <div className="mb-10 bg-amber-50 border border-amber-200/80 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-xs">
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-700 shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-amber-900 mb-1">
              Medical Emergency Warning
            </h3>
            <p className="text-sm text-amber-800 leading-relaxed">
              DigCare is <strong>NOT</strong> designed or intended for medical emergencies. If you are experiencing a life-threatening medical emergency, call <strong>112</strong> immediately or visit your nearest hospital emergency department.
            </p>
          </div>
          <a
            href="tel:112"
            className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-xs inline-flex items-center gap-2"
          >
            Call 112
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Sticky Table of Contents Sidebar */}
          <aside className="lg:col-span-4 sticky top-20 z-20">
            <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs max-h-[calc(100vh-100px)] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <FileText size={16} className="text-[#31708f]" />
                  <span>Table of Contents</span>
                </h3>
                <span className="text-xs font-semibold text-gray-400">
                  {sections.length} Sections
                </span>
              </div>

              <nav className="space-y-1">
                {filteredSections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${isActive
                        ? "bg-[#31708f] text-white font-semibold shadow-xs"
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

              {/* Quick links to Privacy Policy and Contact */}
              <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                <Link
                  href="/privacy"
                  className="flex items-center justify-between text-xs font-semibold text-[#31708f] hover:text-[#255871] p-2 rounded-lg hover:bg-sky-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Shield size={14} />
                    <span>View Privacy Policy</span>
                  </span>
                  <ArrowUpRight size={14} />
                </Link>
                <a
                  href="mailto:support@digcaregh.com"
                  className="flex items-center justify-between text-xs font-semibold text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Mail size={14} />
                    <span>support@digcaregh.com</span>
                  </span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </aside>

          {/* Detailed Document Content */}
          <main className="lg:col-span-8 space-y-12">

            {/* 1. Eligibility & User Roles */}
            <section id="eligibility" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#31708f]/10 text-[#31708f] flex items-center justify-center font-bold">
                  1
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  1. Eligibility & User Roles
                </h2>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                DigCare serves the following user roles across the platform ecosystem:
              </p>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#31708f]" />
                    Patients (Adults, Students, Visitors)
                  </div>
                  <p className="text-sm text-gray-600 pl-4">
                    Access healthcare services, manage health records, schedule appointments, and consult providers remotely or in person.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0a9c5a]" />
                    Doctors
                  </div>
                  <p className="text-sm text-gray-600 pl-4">
                    Provide consultations, prescribe medications, order lab tests, and access patient health cards with proper authorisation.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                    Pharmacists
                  </div>
                  <p className="text-sm text-gray-600 pl-4">
                    Dispense prescriptions accurately and manage pharmacy inventory seamlessly.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Lab Technicians
                  </div>
                  <p className="text-sm text-gray-600 pl-4">
                    Process lab orders, upload test results securely, and manage lab inventory.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="font-bold text-gray-900 text-sm mb-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    Facility Administrators
                  </div>
                  <p className="text-sm text-gray-600 pl-4">
                    Manage facility information, staff accreditations, and operational settings.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-sky-50/60 border border-sky-100 rounded-xl text-sm text-sky-900 font-medium">
                You must be at least <strong>18 years of age</strong> to register, or have the explicit consent of a parent/guardian if you are a Student user under 18.
              </div>
            </section>

            {/* 2. Account Creation & Verification */}
            <section id="verification" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#31708f]/10 text-[#31708f] flex items-center justify-center font-bold">
                  2
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  2. Account Creation & Verification
                </h2>
              </div>

              <ul className="space-y-4 text-gray-700 leading-relaxed text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#31708f] mt-2 shrink-0" />
                  <span>You must provide accurate and verifiable information during registration (email address, phone number, and selected role).</span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#31708f] mt-2 shrink-0" />
                  <span>
                    Provider roles (<strong>Doctor, Pharmacist, Lab Technician</strong>) require identity and credential verification via document upload before platform access is granted. Your account will remain in <span className="inline-flex items-center font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-xs">pending</span> status until verification is approved.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#31708f] mt-2 shrink-0" />
                  <span>
                    You may be asked to upload: a government-issued photo ID (Ghana Card, Passport, Driver's Licence), a professional licence or certification (Medical & Dental Council, Pharmacy Council, Allied Health Professions Council), and proof of facility affiliation where applicable.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#31708f] mt-2 shrink-0" />
                  <span>
                    Verification documents are stored securely and used <strong>solely</strong> for identity and credential verification. They will not be used for marketing, analytics, or any unrelated purpose.
                  </span>
                </li>
              </ul>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Approved Status
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Your account is activated with full access to role-specific features and clinical tools.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-sm mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    Rejected Status
                  </div>
                  <p className="text-xs text-rose-900 leading-relaxed">
                    You will be notified of the reason and may resubmit updated documents. Verification decisions are made by authorised DigCare staff and are final, subject to resubmission.
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-500 italic bg-gray-50 p-3 rounded-xl">
                You are strictly responsible for maintaining the security of your login credentials and must not share your account under any circumstances.
              </p>
            </section>

            {/* 3. Acceptable Use & Prohibited Conduct */}
            <section id="conduct" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
                  3
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  3. Acceptable Use & Prohibited Conduct
                </h2>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4 text-sm font-semibold">
                You agree NOT to engage in any of the following prohibited activities on DigCare:
              </p>

              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  "Use DigCare for medical emergencies — call 112 or your local emergency services instead.",
                  "Share false medical information, impersonate a provider, or misrepresent your professional credentials.",
                  "Attempt to access another user's health data without explicit authorisation.",
                  "Engage in harassment, abuse, or threatening behaviour via chat or video consultations.",
                  "Interfere with, bypass security controls, or disrupt the platform's operation.",
                  "Share unsolicited promotional or spam content through any platform feature.",
                  "Record any consultation session without the explicit consent of all participating parties.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-rose-50/30 border border-rose-100/50">
                    <Ban size={16} className="text-rose-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 4. Telehealth Services */}
            <section id="telehealth" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#31708f]/10 text-[#31708f] flex items-center justify-center font-bold">
                  4
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  4. Telehealth Services
                </h2>
              </div>

              <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">4.1 Nature of Telehealth</h3>
                  <p>
                    Telehealth involves the delivery of healthcare services remotely using audio and video communication technology (powered by <strong>Twilio WebRTC</strong>). Consultations take place in a private, encrypted video room.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                  <h3 className="font-bold text-gray-900 text-base mb-2">4.2 Limitations</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                    <li>Telehealth is <strong>not</strong> a replacement for in-person examination when a physical exam is medically necessary.</li>
                    <li>Telehealth is <strong>not</strong> suitable for medical emergencies. Call 112 immediately in case of emergency.</li>
                    <li>Consultation quality depends on your internet connection and device capabilities. Audio/video interruptions may occur.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">4.3 Technology Requirements</h3>
                  <p className="mb-2">To participate in a video consultation, you need:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>A stable internet connection (Wi-Fi or mobile data)</li>
                    <li>A device with a working camera and microphone</li>
                    <li>The DigCare app with camera and microphone permissions enabled</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">4.4 Patient Rights</h3>
                  <p className="mb-2">During a telehealth consultation, you have the right to:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-sky-50/50 rounded-lg border border-sky-100">Ask questions about your condition and treatment plan</div>
                    <div className="p-3 bg-sky-50/50 rounded-lg border border-sky-100">Refuse any recommended treatment</div>
                    <div className="p-3 bg-sky-50/50 rounded-lg border border-sky-100">Request a referral for an in-person visit</div>
                    <div className="p-3 bg-sky-50/50 rounded-lg border border-sky-100">End the consultation at any time</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">4.5 Recording Policy</h3>
                  <p>
                    DigCare does <strong>not</strong> record video or audio consultations. Neither the patient nor the provider may record the session without the explicit consent of all parties.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">4.6 Withdrawal of Telehealth Consent</h3>
                  <p>
                    You may withdraw consent for telehealth services at any time by contacting <a href="mailto:support@DigCare.com" className="text-[#31708f] underline font-semibold">support@DigCare.com</a>. Withdrawal will prevent you from accessing future video consultations but will not affect consultations already completed.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Health Card & Data Access */}
            <section id="health-card" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#0a9c5a]/10 text-[#0a9c5a] flex items-center justify-center font-bold">
                  5
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  5. Health Card & Data Access
                </h2>
              </div>

              <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">5.1 Digital Health Card</h3>
                  <p>
                    Upon registration, patients receive a digital Health Card with a unique card number, protected by a <strong>6-digit PIN</strong> set by the patient.
                  </p>
                </div>

                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-2">
                  <h3 className="font-bold text-emerald-900 text-base mb-2">5.2 Remote Access Requests</h3>
                  <p className="text-emerald-950">
                    Doctors may request remote access to your Health Card. You will receive a notification and must approve, deny, or ignore the request.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-emerald-900 text-xs">
                    <li>Remote access is granted for a duration set by you (default 24 hours, maximum 7 days).</li>
                    <li>Access is secured by <strong>OTP verification</strong> — the doctor must enter the OTP sent to them before viewing your data.</li>
                    <li>Approved access can be revoked at any time from the Access Requests screen. Revocation is immediate and the doctor will be notified.</li>
                    <li>When you approve an access request, the doctor may view your Health Card information (card number, allergies, blood type, emergency contacts) and any medical history, prescriptions, and lab results available on the platform.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">5.3 In-Person Scans</h3>
                  <p>
                    When a doctor scans your Health Card in person (e.g., at a clinic), a scan session is created. You must enter your PIN to authorise the scan. The scan event is recorded in your audit log.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">5.4 Audit Trail</h3>
                  <p>
                    All access events (requests, approvals, denials, scans, revocations) are permanently logged and available for review in your <strong>Data Access Log</strong> under Settings.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Prescriptions & Medications */}
            <section id="prescriptions" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                  6
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  6. Prescriptions & Medications
                </h2>
              </div>

              <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">6.1 Prescriptions on DigCare</h3>
                  <p className="mb-2">
                    Prescriptions are issued exclusively by licensed Doctors registered and verified on the platform. Each prescription includes:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Medication name, dosage, frequency, and duration</li>
                    <li>Prescribing doctor's details and facility</li>
                    <li>A unique prescription number for tracking</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50/40 border border-purple-100 rounded-xl">
                  <h3 className="font-bold text-purple-900 text-base mb-2">6.2 Patient Acknowledgement</h3>
                  <p className="text-purple-950 mb-2">By receiving a prescription through DigCare, you acknowledge that:</p>
                  <ul className="list-disc pl-5 space-y-1 text-purple-900 text-xs">
                    <li>You have disclosed all known allergies, current medications, and relevant medical history to your prescribing doctor.</li>
                    <li>It is your responsibility to raise any concerns about a prescribed medication with your doctor.</li>
                    <li>DigCare does not independently verify drug interactions or contraindications.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">6.3 Pharmacy Dispensing</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Prescriptions may be dispensed by any registered pharmacy on DigCare, subject to inventory availability.</li>
                    <li>Pharmacists may contact the prescribing doctor for clarification before dispensing.</li>
                    <li>Partially dispensed prescriptions will be marked accordingly.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">6.4 E-Prescription Validity</h3>
                  <p>
                    Electronic prescriptions are valid per applicable Ghanaian pharmaceutical regulations and have an expiration period set by the prescribing doctor.
                  </p>
                </div>
              </div>
            </section>

            {/* 7. Lab Services */}
            <section id="lab-services" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  7
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  7. Lab Services
                </h2>
              </div>

              <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">7.1 Lab Test Ordering</h3>
                  <p>
                    Lab tests are ordered exclusively by licensed Doctors. Patients cannot self-order lab tests. Each order includes the test name and category, ordering provider's details, priority level, and clinical notes.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">7.2 Result Accuracy & Interpretation</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                    <li>Lab results are uploaded by verified Lab Technicians and are intended as an informational tool.</li>
                    <li>Results must be interpreted by a qualified healthcare provider. Do not make medical decisions based solely on lab results without consulting your doctor.</li>
                    <li>DigCare does not independently verify the accuracy of lab results.</li>
                    <li>Reference ranges displayed alongside results are general guidelines and may vary by laboratory, age, sex, and other factors.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">7.3 Result Delivery</h3>
                  <p>
                    Results are available in-app once uploaded by the lab. You will receive a push notification when results are ready. Delivery timelines depend on the processing laboratory and test complexity.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">7.4 Specimen Handling</h3>
                  <p>
                    DigCare does not handle physical specimens. Specimen collection and processing are performed by the selected laboratory according to their own protocols and regulations.
                  </p>
                </div>
              </div>
            </section>

            {/* 8. Payments & Billing */}
            <section id="payments" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                  8
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  8. Payments & Billing
                </h2>
              </div>

              <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">8.1 Fee Structure</h3>
                  <p className="mb-2">DigCare facilitates payments for:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 mb-3">
                    <li><strong>Video Consultations</strong> — A consultation fee set by the provider, plus a platform service fee.</li>
                    <li><strong>Lab Orders</strong> — Fees for lab tests ordered through the platform.</li>
                    <li><strong>Prescription Services</strong> — Medication costs as set by dispensing pharmacies.</li>
                  </ul>
                  <p className="text-xs font-semibold text-[#31708f]">
                    All fees are displayed in Ghana Cedis (GHS) and are inclusive of applicable platform service fees.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">8.2 Platform Service Fee</h3>
                  <p>
                    A service fee is added to certain transactions to cover platform operations. The current fee rate is transparently shown before payment confirmation.
                  </p>
                </div>

                <div className="p-4 bg-[#f0f7fa] border border-[#31708f]/20 rounded-xl">
                  <h3 className="font-bold text-[#31708f] text-base mb-2">8.3 Payment Processing via Paystack</h3>
                  <p className="text-gray-700 mb-2">
                    Payments are processed securely via <strong>Paystack</strong> (PCI-DSS compliant). Supported payment methods include:
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-medium">
                    <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-800">Debit / Credit Card (Visa, Mastercard)</span>
                    <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-800">MTN Mobile Money</span>
                    <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-800">Vodafone Cash</span>
                    <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-800">AirtelTigo Money</span>
                    <span className="bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-800">Bank Transfer</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 italic">
                    DigCare does not store your card numbers or MoMo PINs. All payment credentials are handled by Paystack.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">8.4 Split Payments</h3>
                  <p>
                    Payments are automatically split between the healthcare provider and the platform via Paystack subaccounts.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">8.5 Refund Policy</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Refunds may be issued for cancelled consultations not attended by either party.</li>
                    <li>Refund requests must be submitted within 7 days of the transaction.</li>
                    <li>Refunds are processed to the original payment method and may take 5–10 business days.</li>
                    <li><strong>Completed consultations are generally non-refundable.</strong></li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">8.6 Failed Transactions</h3>
                  <p className="mb-1">If a payment fails, you will be notified and may retry. Services will not be provided until payment is confirmed.</p>
                  <p className="text-xs text-gray-600">
                    If a payment is debited but fails to verify, contact <a href="mailto:support@DigCare.com" className="text-[#31708f] underline font-medium">support@DigCare.com</a> with your payment reference.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">8.7 Insurance & NHIS Coverage</h3>
                  <p>
                    Where applicable, bills may be partially or fully covered by insurance. Coverage is subject to the terms of your insurance plan. DigCare does not guarantee insurance coverage for any service.
                  </p>
                </div>
              </div>
            </section>

            {/* 9. Insurance & NHIS */}
            <section id="insurance" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold">
                  9
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  9. Insurance & NHIS
                </h2>
              </div>

              <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">9.1 Linking Insurance</h3>
                  <p>
                    When you link an insurance plan or NHIS membership, we collect your insurance provider name, policy/membership number, coverage dates, and plan type. This is used solely to verify coverage for services accessed through the platform.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">9.2 Coverage Verification</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                    <li>Coverage rules are based on data provided by insurers and NHIS. DigCare checks eligibility but does <strong>not</strong> guarantee coverage — actual coverage is determined by your insurer.</li>
                    <li>Pre-authorisation requirements are the responsibility of the patient and provider.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">9.3 Claims Processing</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Claims are submitted through the platform on your behalf where applicable.</li>
                    <li>Processing timelines depend on the insurer. DigCare does not control claim approval or denial decisions.</li>
                    <li>Disputed claims should be raised directly with your insurance provider.</li>
                  </ul>
                </div>

                <div className="p-4 bg-teal-50/50 border border-teal-100 rounded-xl">
                  <h3 className="font-bold text-teal-900 text-base mb-2">9.4 NHIS Integration</h3>
                  <p className="text-teal-950 mb-2">
                    NHIS benefit verification relies on data provided by the National Health Insurance Authority (NHIA). DigCare does not control NHIS system availability or data accuracy.
                  </p>
                  <p className="text-xs text-teal-900">
                    NHIS-covered services are subject to the NHIS benefit package and applicable co-payments.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">9.5 Accredited Facilities</h3>
                  <p>
                    Insurance coverage may be limited to services at accredited facilities. The list on the platform reflects insurer-provided data and may not be exhaustive.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">9.6 Patient Responsibility</h3>
                  <p>
                    It is your responsibility to verify your coverage before receiving services, ensure your insurance information is accurate and up to date, and pay any co-payments, deductibles, or uncovered amounts.
                  </p>
                </div>
              </div>
            </section>

            {/* 10. In-App Messaging */}
            <section id="messaging" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
                  10
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  10. In-App Messaging
                </h2>
              </div>

              <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">10.1 Purpose</h3>
                  <p>
                    DigCare provides secure in-app messaging between patients and their healthcare providers for non-urgent follow-up questions, appointment coordination, and sharing of relevant health information.
                  </p>
                </div>

                <div className="p-4 bg-rose-50 border border-rose-200/80 rounded-xl text-rose-900">
                  <h3 className="font-bold text-base mb-1">10.2 Not for Emergencies</h3>
                  <p className="text-xs font-semibold">
                    Chat is NOT for medical emergencies. DigCare does not monitor chat messages in real-time and cannot guarantee response times. Call 112 for emergencies.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">10.3 Response Times</h3>
                  <p>
                    Healthcare providers are not obligated to respond within any specific timeframe. For time-sensitive matters, schedule a formal consultation.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">10.4 Acceptable Conduct</h3>
                  <p className="mb-2">Prohibited content in messages includes:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Harassment, threats, or abusive language</li>
                    <li>False or misleading medical information</li>
                    <li>Unsolicited promotional or spam content</li>
                    <li>Third-party personal data shared without consent</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">10.5 Confidentiality</h3>
                  <p>
                    Messages are treated as part of your medical record where clinically relevant and are accessible only to conversation participants.
                  </p>
                </div>
              </div>
            </section>

            {/* 11. Push Notifications */}
            <section id="notifications" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                  11
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  11. Push Notifications
                </h2>
              </div>

              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  By enabling push notifications, you may receive alerts for appointments, prescriptions, lab results, video consultations, chat messages, health card access events, and system alerts (security, terms updates, maintenance).
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Your device token is registered via Firebase Cloud Messaging and/or Expo Push Notifications and is used solely for notification delivery.</li>
                  <li>You may opt out at any time via your device system settings or the DigCare app settings.</li>
                  <li>Some notifications are considered essential (e.g., security alerts, terms updates) and may still be delivered via in-app notifications even if push is disabled.</li>
                </ul>
              </div>
            </section>

            {/* 12. Intellectual Property */}
            <section id="ip" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center font-bold">
                  12
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  12. Intellectual Property
                </h2>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                All content, branding, dynamic UI designs, logos, trademarks, and software code on DigCare are exclusively owned by DigCare or its licensors. You may not copy, modify, distribute, reverse-engineer, or create derivative works from platform content without prior written consent.
              </p>
            </section>

            {/* 13. Disclaimers */}
            <section id="disclaimers" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-600 flex items-center justify-center font-bold">
                  13
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  13. Disclaimers
                </h2>
              </div>

              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="w-2 h-2 rounded-full bg-[#31708f] mt-1.5 shrink-0" />
                  <span>DigCare is a technology platform connecting patients with licensed healthcare providers. We do <strong>not</strong> provide medical advice, diagnoses, or clinical treatments directly.</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="w-2 h-2 rounded-full bg-[#31708f] mt-1.5 shrink-0" />
                  <span>DigCare is <strong>not</strong> a substitute for in-person care or emergency medical services.</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="w-2 h-2 rounded-full bg-[#31708f] mt-1.5 shrink-0" />
                  <span>We do not guarantee the availability, accuracy, uninterrupted access, or clinical outcome of any service provided through the platform.</span>
                </li>
              </ul>
            </section>

            {/* 14. Limitation of Liability */}
            <section id="liability" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold">
                  14
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  14. Limitation of Liability
                </h2>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                To the maximum extent permitted by Ghanaian law, DigCare shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform, including but not limited to loss of data, loss of revenue, medication side effects, incorrect dosages prescribed by providers, or pharmacy dispensing errors.
              </p>
            </section>

            {/* 15. Termination & Suspension */}
            <section id="termination" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center font-bold">
                  15
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  15. Termination & Suspension
                </h2>
              </div>

              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  <span>We may suspend or terminate your account if you violate these Terms, fail identity verification, or engage in prohibited conduct.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                  <span>You may delete your account at any time through the app settings. Certain data may be retained as required by law or for legitimate compliance purposes (e.g., audit logs, completed prescriptions).</span>
                </li>
              </ul>
            </section>

            {/* 16. Dispute Resolution & Governing Law */}
            <section id="disputes" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#31708f]/10 text-[#31708f] flex items-center justify-center font-bold">
                  16
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  16. Dispute Resolution & Governing Law
                </h2>
              </div>

              <div className="p-4 bg-sky-50/40 border border-sky-100 rounded-xl text-sm text-gray-700 leading-relaxed">
                These Terms are governed by the laws of the <strong>Republic of Ghana</strong>, including the <strong>Electronic Transactions Act, 2008 (Act 772)</strong>. Any disputes shall be resolved through mediation before the <strong>Ghana Arbitration Centre</strong>, and failing that, before the competent courts of Ghana.
              </div>
            </section>

            {/* 17. Modifications */}
            <section id="modifications" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#0a9c5a]/10 text-[#0a9c5a] flex items-center justify-center font-bold">
                  17
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  17. Modifications
                </h2>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                We may update these Terms at any time. When we do, we will increment the version number and you will be asked to re-accept the updated Terms before continuing to use the DigCare platform.
              </p>
            </section>

            {/* Contact Footer Card */}
            <div className="bg-gradient-to-br from-[#31708f] to-[#1e4a61] text-white rounded-2xl p-6 md:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Mail size={20} />
                  <span>Questions about our Terms?</span>
                </h3>
                <p className="text-sky-100 text-sm max-w-md">
                  Our legal team is available to address any inquiries regarding terms of service, regulatory compliance, or privacy policies.
                </p>
              </div>
              <a
                href="mailto:legal@DigCare.com"
                className="shrink-0 bg-white hover:bg-sky-50 text-[#31708f] font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm flex items-center gap-2"
              >
                <span>Email legal@DigCare.com</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
