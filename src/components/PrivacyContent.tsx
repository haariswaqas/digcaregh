"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Search,
  Printer,
  Copy,
  Check,
  FileText,
  Database,
  Lock,
  Share2,
  Eye,
  CreditCard,
  Bell,
  Trash2,
  Scale,
  Shield,
  Cookie,
  UserCheck,
  AlertCircle,
  Mail,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Server,
} from "lucide-react";

const sections = [
  { id: "collect", number: "1", title: "Data We Collect", icon: Database },
  { id: "use", number: "2", title: "How We Use Your Data", icon: Eye },
  { id: "third-parties", number: "3", title: "Third-Party Services", icon: Share2 },
  { id: "health-card", number: "4", title: "Health Card & Consultation Data", icon: FileText },
  { id: "verification", number: "5", title: "Verification Document Data", icon: Lock },
  { id: "payment", number: "6", title: "Payment Data", icon: CreditCard },
  { id: "notification", number: "7", title: "Notification Data", icon: Bell },
  { id: "retention", number: "8", title: "Data Retention & Deletion", icon: Trash2 },
  { id: "rights", number: "9", title: "Your Rights (Act 843)", icon: Scale },
  { id: "security", number: "10", title: "Security Measures", icon: ShieldCheck },
  { id: "children", number: "11", title: "Children's Privacy", icon: UserCheck },
  { id: "cookies", number: "12", title: "Cookies & Local Storage", icon: Cookie },
  { id: "changes", number: "13", title: "Changes to This Policy", icon: Sparkles },
];

export default function PrivacyContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("collect");
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
      <header className="relative bg-gradient-to-b from-[#eaf6f0] via-[#f4faf7] to-[#fcfdfe] border-b border-gray-100 pt-10 pb-12 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#0a9c5a]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-[#31708f]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0a9c5a] bg-[#0a9c5a]/10 px-3.5 py-1.5 rounded-full border border-[#0a9c5a]/20">
              <ShieldCheck size={14} className="text-[#0a9c5a]" />
              <span>Data Protection & Privacy</span>
            </div>


          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            DigCare Privacy Policy
          </h1>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-600 mb-6 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Effective Date: <strong>March 20, 2026</strong></span>
            </div>
            <div className="hidden sm:block text-gray-300">•</div>
            <div>Version: <span className="font-semibold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">1.0</span></div>
            <div className="hidden sm:block text-gray-300">•</div>
            <div>Compliance: <span className="font-semibold text-[#0a9c5a]">Ghana Data Protection Act 2012 (Act 843)</span></div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-5 md:p-6 shadow-xs max-w-3xl">
            <p className="text-gray-700 leading-relaxed text-base">
              This Privacy Policy explains how DigCare collects, uses, stores, and protects your personal and health data. It covers all data collected across every platform feature, including health cards, consultations, prescriptions, lab services, payments, insurance, messaging, and push notifications.
            </p>
          </div>

          {/* Quick Search */}
          <div className="mt-8 max-w-xl relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search privacy topics (e.g., Paystack, Health Card, Cloudinary, Act 843)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 focus:border-[#0a9c5a] focus:ring-2 focus:ring-[#0a9c5a]/10 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 outline-none transition-all shadow-xs"
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
      <div className="max-w-[1200px] mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Sticky Sidebar TOC */}
          <aside className="lg:col-span-4 sticky top-20 z-20">
            <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-xs max-h-[calc(100vh-100px)] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#0a9c5a]" />
                  <span>Privacy Sections</span>
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
                        ? "bg-[#0a9c5a] text-white font-semibold shadow-xs"
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
                  href="/terms"
                  className="flex items-center justify-between text-xs font-semibold text-[#0a9c5a] hover:text-[#08824b] p-2 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileText size={14} />
                    <span>View Terms of Service</span>
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

          {/* Privacy Document Sections */}
          <main className="lg:col-span-8 space-y-12">

            {/* 1. Data We Collect */}
            <section id="collect" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#0a9c5a]/10 text-[#0a9c5a] flex items-center justify-center font-bold">
                  1
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  1. Data We Collect
                </h2>
              </div>

              <div className="space-y-6 text-sm text-gray-700">

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="font-bold text-gray-900 text-base mb-2 flex items-center gap-2">
                    <UserCheck size={18} className="text-[#0a9c5a]" />
                    1.1 Personal Information
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Name, email address, phone number, username</li>
                    <li>Role (Student, Adult, Visitor, Doctor, Pharmacist, Lab Technician)</li>
                    <li>Profile photo (optional)</li>
                    <li>Location data (latitude/longitude — provided at registration, optional)</li>
                  </ul>
                </div>

                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <h3 className="font-bold text-emerald-950 text-base mb-2 flex items-center gap-2">
                    <FileText size={18} className="text-emerald-700" />
                    1.2 Health Information (Patients)
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-emerald-900">
                    <li>Health Card data (card number, allergies, blood type, emergency contacts, medical history)</li>
                    <li>Prescriptions and medication records</li>
                    <li>Lab test orders and test results</li>
                    <li>Appointment and consultation history</li>
                    <li>Encrypted chat messages with healthcare providers</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="font-bold text-gray-900 text-base mb-2 flex items-center gap-2">
                    <Lock size={18} className="text-[#31708f]" />
                    1.3 Provider Information
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Professional credentials and verification documents (uploaded for identity verification)</li>
                    <li>Facility affiliations, specialisations, and shift schedules</li>
                  </ul>
                </div>

                <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-100">
                  <h3 className="font-bold text-teal-950 text-base mb-2 flex items-center gap-2">
                    <Shield size={18} className="text-teal-700" />
                    1.4 Insurance & NHIS Information
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-teal-900">
                    <li>Insurance provider name, policy / membership number</li>
                    <li>Coverage start and end dates, plan type, and coverage tier</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-950 text-base mb-2 flex items-center gap-2">
                    <CreditCard size={18} className="text-blue-700" />
                    1.5 Payment Information
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-blue-900">
                    <li>Transaction amounts, payer email, and phone number</li>
                    <li>Payment method type (Card, MoMo, Bank Transfer)</li>
                    <li>Payment tokens and references handled by Paystack (Card numbers and MoMo PINs are <strong>never stored</strong> by DigCare)</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm mb-1.5 flex items-center gap-2">
                      <Bell size={16} className="text-orange-500" />
                      1.6 Notification & Device Data
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Device tokens (registered via Firebase Cloud Messaging and Expo Push Notifications) and notification preferences.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm mb-1.5 flex items-center gap-2">
                      <Server size={16} className="text-purple-500" />
                      1.7 Technical Data
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      IP addresses (logged for security and consent audit trails) and User-Agent strings (device/browser information).
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* 2. How We Use Your Data */}
            <section id="use" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#0a9c5a]/10 text-[#0a9c5a] flex items-center justify-center font-bold">
                  2
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  2. How We Use Your Data
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-1 text-xs uppercase tracking-wider text-[#0a9c5a]">Service Delivery</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">Facilitating appointments, video consultations, prescriptions, lab orders, billing, and digital health card access.</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-1 text-xs uppercase tracking-wider text-[#0a9c5a]">Identity Verification</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">Verifying provider credentials (doctors, pharmacists, lab techs) through identity document review.</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-1 text-xs uppercase tracking-wider text-[#0a9c5a]">Health Card Access Control</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">Processing remote access requests, OTP verification, PIN scan authorisations, and access revocations.</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-1 text-xs uppercase tracking-wider text-[#0a9c5a]">Communication</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">Sending push notifications for appointments, prescriptions, lab results, access requests, and system updates.</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-1 text-xs uppercase tracking-wider text-[#0a9c5a]">Insurance & Billing</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">Verifying coverage eligibility, submitting claims, and managing provider split payments via Paystack.</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-1 text-xs uppercase tracking-wider text-[#0a9c5a]">Security & Compliance</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">Maintaining permanent audit logs, enforcing access controls, and complying with legal duties under Ghanaian law.</p>
                </div>
              </div>
            </section>

            {/* 3. Third-Party Services Table */}
            <section id="third-parties" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                  3
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  3. Third-Party Services
                </h2>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed mb-6">
                We share data with the following infrastructure providers strictly as needed to deliver platform functionality:
              </p>

              <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs border-b border-gray-200">
                    <tr>
                      <th className="py-3.5 px-4">Service</th>
                      <th className="py-3.5 px-4">Purpose</th>
                      <th className="py-3.5 px-4">Data Shared</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-3.5 px-4 font-bold text-gray-900">Paystack</td>
                      <td className="py-3.5 px-4">Payment processing (Card, Mobile Money, Bank Transfer)</td>
                      <td className="py-3.5 px-4 text-xs text-gray-600">Transaction amounts, payer email, phone number, payment tokens</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-3.5 px-4 font-bold text-gray-900">Cloudinary</td>
                      <td className="py-3.5 px-4">Secure media storage (profile photos, verification docs, lab result uploads)</td>
                      <td className="py-3.5 px-4 text-xs text-gray-600">Uploaded encrypted files</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-3.5 px-4 font-bold text-gray-900">Firebase / Expo Push</td>
                      <td className="py-3.5 px-4">Push notification delivery</td>
                      <td className="py-3.5 px-4 text-xs text-gray-600">Device push tokens, notification alert payloads</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-3.5 px-4 font-bold text-gray-900">Twilio</td>
                      <td className="py-3.5 px-4">Video & audio consultations (WebRTC)</td>
                      <td className="py-3.5 px-4 text-xs text-gray-600">Encrypted audio/video streams, room identifiers</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-purple-900">
                Each third-party service operates under its own strict privacy policy and data protection controls. Video/audio streams are transmitted via Twilio's encrypted infrastructure and are <strong>not</strong> stored by DigCare.
              </div>
            </section>

            {/* 4. Health Card & Consultation Data */}
            <section id="health-card" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#0a9c5a]/10 text-[#0a9c5a] flex items-center justify-center font-bold">
                  4
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  4. Health Card & Consultation Data
                </h2>
              </div>

              <ul className="space-y-3.5 text-sm text-gray-700 leading-relaxed">
                <li className="flex items-start gap-3 p-3 bg-emerald-50/40 rounded-xl border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-[#0a9c5a] mt-1.5 shrink-0" />
                  <span>Health Card data is protected by your user-set 6-digit PIN. Remote access requires both your explicit approval and OTP verification entered by the doctor.</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="w-2 h-2 rounded-full bg-[#0a9c5a] mt-1.5 shrink-0" />
                  <span>Consultation metadata (date, time, duration, participating provider) is logged for billing and audit purposes.</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="w-2 h-2 rounded-full bg-[#0a9c5a] mt-1.5 shrink-0" />
                  <span>All access events (requests, approvals, denials, scans, revocations) are permanently logged in your immutable Data Access Log.</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="w-2 h-2 rounded-full bg-[#0a9c5a] mt-1.5 shrink-0" />
                  <span>Chat messages are stored securely and are accessible only to the participants of the conversation.</span>
                </li>
              </ul>
            </section>

            {/* 5. Verification Document Data */}
            <section id="verification" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  5
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  5. Verification Document Data
                </h2>
              </div>

              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  Verification documents (government IDs, professional licences, facility affiliation proofs) are stored securely via Cloudinary with encryption at rest and in transit.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Documents are accessible strictly to DigCare's credential verification team and platform administrators.</li>
                  <li>Documents are <strong>never</strong> shared with other users, healthcare providers, or commercial third parties.</li>
                  <li>Documents are used <strong>solely</strong> for identity and credential verification — never for marketing, profiling, or analytics.</li>
                </ul>
              </div>
            </section>

            {/* 6. Payment Data */}
            <section id="payment" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                  6
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  6. Payment Data Security
                </h2>
              </div>

              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                  <p className="font-bold text-blue-950 mb-1">PCI-DSS Compliant Payment Handling via Paystack</p>
                  <p className="text-xs text-blue-900">
                    DigCare does <strong>not</strong> store card numbers or Mobile Money PINs. All payment credential collection and processing are handled directly by Paystack.
                  </p>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Billing records (transaction amounts, references, split details) are retained as required by Ghanaian financial regulations.</li>
                  <li>If a payment is debited but fails to verify, related transaction data is retained to assist in prompt dispute resolution.</li>
                </ul>
              </div>
            </section>

            {/* 7. Notification Data */}
            <section id="notification" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                  7
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  7. Notification Data
                </h2>
              </div>

              <ul className="space-y-3 text-sm text-gray-700 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <span>Device tokens are used solely for delivering push notifications and are stored securely on DigCare's servers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <span>Tokens are not shared with third parties beyond the notification delivery services (Firebase Cloud Messaging / Expo Push).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <span>You may opt out of push notifications at any time via app settings. Essential security alerts may still be delivered in-app.</span>
                </li>
              </ul>
            </section>

            {/* 8. Data Retention & Deletion Table */}
            <section id="retention" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
                  8
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  8. Data Retention & Deletion Schedule
                </h2>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs border-b border-gray-200">
                    <tr>
                      <th className="py-3.5 px-4">Data Type</th>
                      <th className="py-3.5 px-4">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-3.5 px-4 font-bold text-gray-900">Active Account Data</td>
                      <td className="py-3.5 px-4">Duration of active account</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-3.5 px-4 font-bold text-gray-900">Personal Data (Deleted Accounts)</td>
                      <td className="py-3.5 px-4 text-rose-700 font-medium">Deleted within 30 days</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-3.5 px-4 font-bold text-gray-900">Chat Messages (Deleted Accounts)</td>
                      <td className="py-3.5 px-4 text-rose-700 font-medium">Removed within 30 days</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-3.5 px-4 font-bold text-gray-900">Completed Prescriptions & Audit Logs</td>
                      <td className="py-3.5 px-4">Retained as required by healthcare regulations</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-3.5 px-4 font-bold text-gray-900">Billing & Payment Records</td>
                      <td className="py-3.5 px-4">Retained as required by financial regulations</td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-3.5 px-4 font-bold text-gray-900">Verification Documents</td>
                      <td className="py-3.5 px-4">Duration of verified account; deleted within 30 days of account closure</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600 flex items-center justify-between gap-4">
                <span>You may request immediate deletion of your verification documents at any time.</span>
                <a href="mailto:support@DigCare.com" className="text-[#0a9c5a] font-bold shrink-0 hover:underline">Contact Support</a>
              </div>
            </section>

            {/* 9. Your Rights (Act 843) */}
            <section id="rights" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#0a9c5a]/10 text-[#0a9c5a] flex items-center justify-center font-bold">
                  9
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  9. Your Rights Under Ghana Data Protection Act 2012 (Act 843)
                </h2>
              </div>

              <p className="text-sm text-gray-700 mb-6">
                Under the <strong>Ghana Data Protection Act 2012 (Act 843)</strong>, you have the following statutory rights regarding your personal and health information:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
                <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl">
                  <h4 className="font-bold text-emerald-950 mb-1">Right to Access</h4>
                  <p className="text-xs text-emerald-900">Request a complete copy of the personal and health data DigCare holds about you.</p>
                </div>

                <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl">
                  <h4 className="font-bold text-emerald-950 mb-1">Right to Rectification</h4>
                  <p className="text-xs text-emerald-900">Correct or update any inaccurate or incomplete personal information.</p>
                </div>

                <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl">
                  <h4 className="font-bold text-emerald-950 mb-1">Right to Erasure</h4>
                  <p className="text-xs text-emerald-900">Request account deletion and data removal (subject to statutory health retention rules).</p>
                </div>

                <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl">
                  <h4 className="font-bold text-emerald-950 mb-1">Data Portability</h4>
                  <p className="text-xs text-emerald-900">Request a structured export of your medical history, prescriptions, and health card records.</p>
                </div>

                <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl sm:col-span-2">
                  <h4 className="font-bold text-emerald-950 mb-1">Right to Withdraw Consent</h4>
                  <p className="text-xs text-emerald-900">Revoke consent for optional data processing features at any time without impacting prior lawful processing.</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 flex items-center justify-between">
                <span>To exercise any of these rights, contact our Data Protection Officer:</span>
                <a href="mailto:support@digcaregh.com" className="text-[#0a9c5a] font-bold underline">support@digcaregh.com</a>
              </div>
            </section>

            {/* 10. Security Measures */}
            <section id="security" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
                  10
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  10. Security Measures
                </h2>
              </div>

              <div className="space-y-3 text-sm text-gray-700">
                {[
                  "All data transmitted between your device and DigCare servers is encrypted using industry-standard HTTPS/TLS protocols.",
                  "Health Cards are protected by user-set 6-digit PINs with OTP-based remote access verification.",
                  "User passwords are cryptographically hashed and never stored in plain text.",
                  "All access to patient data by providers is logged in an immutable, auditable access ledger.",
                  "Verification documents and sensitive media are stored with encryption at rest via Cloudinary.",
                ].map((secItem, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <ShieldCheck size={18} className="text-[#0a9c5a] shrink-0 mt-0.5" />
                    <span>{secItem}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 11. Children's Privacy */}
            <section id="children" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold">
                  11
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  11. Children's Privacy
                </h2>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                Student users under 18 must have parental/guardian consent. We do not knowingly collect personal data from children under 13 without verifiable parental consent, in full compliance with relevant child protection regulations.
              </p>
            </section>

            {/* 12. Cookies & Local Storage */}
            <section id="cookies" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  12
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  12. Cookies & Local Storage
                </h2>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                The DigCare mobile application uses secure local storage (AsyncStorage) to persist authentication tokens and user preferences. <strong>No third-party tracking cookies</strong> or advertising scripts are used across our platform.
              </p>
            </section>

            {/* 13. Changes to This Policy */}
            <section id="changes" className="scroll-mt-24 bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#0a9c5a]/10 text-[#0a9c5a] flex items-center justify-center font-bold">
                  13
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  13. Changes to This Policy
                </h2>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                We will notify you of material changes to this Privacy Policy via in-app notification and require re-acceptance of the updated policy before continuing to use DigCare.
              </p>
            </section>

            {/* Data Protection Officer Contact Card */}
            <div className="bg-gradient-to-br from-[#0a9c5a] to-[#066339] text-white rounded-2xl p-6 md:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <ShieldCheck size={22} />
                  <span>Data Protection Officer</span>
                </h3>
                <p className="text-emerald-100 text-sm max-w-md">
                  Have questions about how your health data is handled, stored, or processed? Reach out directly to our privacy compliance team.
                </p>
              </div>
              <a
                href="mailto:privacy@DigCare.com"
                className="shrink-0 bg-white hover:bg-emerald-50 text-[#0a9c5a] font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm flex items-center gap-2"
              >
                <span>Email privacy@DigCare.com</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
