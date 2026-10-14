"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const url = process.env.NEXT_PUBLIC_CONTACT_FORM_URL!;
    const nameField = process.env.NEXT_PUBLIC_CONTACT_FORM_NAME!;
    const emailField = process.env.NEXT_PUBLIC_CONTACT_FORM_EMAIL!;
    const subjectField = process.env.NEXT_PUBLIC_CONTACT_FORM_SUBJECT!;
    const messageField = process.env.NEXT_PUBLIC_CONTACT_FORM_MESSAGE!;

    const body = new URLSearchParams();
    body.append(nameField, formData.get("name") as string);
    body.append(emailField, formData.get("email") as string);
    body.append(subjectField, formData.get("subject") as string);
    body.append(messageField, formData.get("message") as string);

    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full px-4 py-3.5 rounded-xl text-[#0f172a] placeholder-[#94A3B8]
    focus:outline-none transition-all
  `;
  const inputStyle = {
    background: "#FFFFFF",
    border: "1px solid rgba(15,23,42,0.12)",
    fontFamily: "Manrope, sans-serif",
    fontSize: "14px",
  };

  const socials = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/digcareofficial",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      label: "X",
      href: "https://x.com/DigcareSoftware?s=20",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/digcare/posts/?feedView=all",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24"
      style={{ background: "#FFFFFF" }}
    >
      {/* Ambient glows */}
      <div
        className="absolute top-[-5%] left-[10%] w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: "rgba(16,185,129,0.14)" }}
      />
      <div
        className="absolute bottom-[-10%] right-[5%] w-[350px] h-[350px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(99,102,241,0.10)" }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p
            className="text-[11px] font-extrabold tracking-[2px] uppercase mb-4"
            style={{ color: "#0F766E", fontFamily: "Manrope, sans-serif" }}
          >
            CONTACT US
          </p>
          <h2
            className="text-4xl md:text-[48px] font-bold text-[#0f172a] mb-4 leading-tight"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "-1px",
            }}
          >
            Get in{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #059669, #0D9488)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Touch.
            </span>
          </h2>
          <p
            className="text-[17px]"
            style={{ color: "#475569", fontFamily: "Manrope, sans-serif" }}
          >
            Have a question or want to partner with us? We&apos;d love to hear from
            you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Form */}
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[460px]"
              style={{
                background: "#F8FAFC",
                border: "1px solid rgba(16,185,129,0.25)",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ background: "rgba(16,185,129,0.15)" }}
              >
                <CheckCircle className="w-8 h-8" style={{ color: "#059669" }} />
              </div>
              <h3
                className="text-2xl font-bold mb-3 text-[#0f172a]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Message Sent!
              </h3>
              <p
                className="text-[15px]"
                style={{ color: "#475569", fontFamily: "Manrope, sans-serif" }}
              >
                We&apos;ll get back to you as soon as possible.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="rounded-3xl p-8 md:p-10 space-y-5"
              style={{
                background: "#F8FAFC",
                border: "1px solid rgba(15,23,42,0.08)",
              }}
            >
              {[
                { name: "name", label: "Name *", placeholder: "Your name", type: "text", required: true },
                { name: "email", label: "Email *", placeholder: "your@email.com", type: "email", required: true },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    className="block text-[13px] font-semibold mb-2"
                    style={{ color: "#475569", fontFamily: "Manrope, sans-serif" }}
                  >
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    className={inputClass}
                    style={inputStyle}
                    placeholder={field.placeholder}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)";
                      e.currentTarget.style.background = "rgba(16,185,129,0.04)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(15,23,42,0.12)";
                      e.currentTarget.style.background = "#FFFFFF";
                    }}
                  />
                </div>
              ))}

              <div>
                <label
                  className="block text-[13px] font-semibold mb-2"
                  style={{ color: "#475569", fontFamily: "Manrope, sans-serif" }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className={inputClass + " resize-none"}
                  style={inputStyle}
                  placeholder="Tell us more..."
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)";
                    e.currentTarget.style.background = "rgba(16,185,129,0.04)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(15,23,42,0.12)";
                    e.currentTarget.style.background = "#FFFFFF";
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-[15px] transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #10B981, #14B8A6)",
                  color: "#071120",
                  fontFamily: "Manrope, sans-serif",
                  boxShadow: "0 8px 20px rgba(16,185,129,0.25)",
                }}
              >
                {loading ? "Sending…" : "Send Message"}
              </button>
            </motion.form>
          )}

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {[
              {
                icon: <Mail size={20} />,
                color: "#059669",
                title: "Email",
                value: "info@digcaregh.com",
              },
              {
                icon: <MapPin size={20} />,
                color: "#0D9488",
                title: "Location",
                value: "Accra, Ghana",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-6 flex items-center gap-5"
                style={{
                  background: "#F8FAFC",
                  border: "1px solid rgba(15,23,42,0.08)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}20` }}
                >
                  <span style={{ color: item.color }}>{item.icon}</span>
                </div>
                <div>
                  <h4
                    className="font-semibold text-[#0f172a] mb-0.5"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-[14px]"
                    style={{ color: "#475569", fontFamily: "Manrope, sans-serif" }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "#F8FAFC",
                border: "1px solid rgba(15,23,42,0.08)",
              }}
            >
              <h4
                className="font-semibold text-[#0f172a] mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Follow Us
              </h4>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200"
                    style={{
                      background: "rgba(15,23,42,0.05)",
                      color: "#475569",
                      fontFamily: "Manrope, sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(16,185,129,0.12)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#047857";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(15,23,42,0.05)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "#475569";
                    }}
                  >
                    {s.icon}
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;