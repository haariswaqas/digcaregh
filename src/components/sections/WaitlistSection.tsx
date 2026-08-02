"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const WaitlistSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const url = process.env.NEXT_PUBLIC_WAITLIST_FORM_URL!;
    const nameField = process.env.NEXT_PUBLIC_WAITLIST_FORM_NAME!;
    const emailField = process.env.NEXT_PUBLIC_WAITLIST_FORM_EMAIL!;
    const phoneField = process.env.NEXT_PUBLIC_WAITLIST_FORM_PHONE!;
    const roleField = process.env.NEXT_PUBLIC_WAITLIST_FORM_ROLE!;
    const cityField = process.env.NEXT_PUBLIC_WAITLIST_FORM_CITY!;

    const body = new URLSearchParams();
    body.append(nameField, formData.get("name") as string);
    body.append(emailField, formData.get("email") as string);
    body.append(phoneField, formData.get("phone") as string);
    body.append(roleField, formData.get("role") as string);
    body.append(cityField, formData.get("city") as string);

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

  return (
    <section id="waitlist" className="py-24 relative overflow-hidden bg-[#fafafa]">
      <div className="relative max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-[#1a2b3c]">
            Be the First to Experience{" "}
            <span className="text-[#0a9c5a]">DigCare</span>
          </h2>
          <p className="text-gray-500 text-lg">
            We're preparing to launch in Ghana. Join the waitlist and get early access when we go live.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
          >
            <CheckCircle className="w-16 h-16 text-[#0a9c5a] mx-auto mb-6" />
            <h3 className="text-2xl font-heading font-bold mb-3 text-gray-900">You're on the list!</h3>
            <p className="text-gray-500">We'll notify you when DigCare launches. Thank you for your interest!</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 md:p-12 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Full Name *</label>
              <input
                name="name"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-[#f9fafb] border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0a9c5a] focus:ring-4 focus:ring-[#0a9c5a]/10 transition-all shadow-sm"
                placeholder="Kwame Mensah"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address *</label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-[#f9fafb] border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0a9c5a] focus:ring-4 focus:ring-[#0a9c5a]/10 transition-all shadow-sm"
                placeholder="kwame@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Phone Number</label>
              <div className="flex gap-2">
                <span className="flex items-center px-4 py-3.5 rounded-xl bg-[#f9fafb] border border-gray-200 text-gray-500 text-sm font-medium shadow-sm">
                  🇬🇭 +233
                </span>
                <input
                  name="phone"
                  type="tel"
                  className="flex-1 px-4 py-3.5 rounded-xl bg-[#f9fafb] border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0a9c5a] focus:ring-4 focus:ring-[#0a9c5a]/10 transition-all shadow-sm"
                  placeholder="24 000 0000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">I am a...</label>
              <select
                name="role"
                className="w-full px-4 py-3.5 rounded-xl bg-[#f9fafb] border border-gray-200 text-gray-900 focus:outline-none focus:border-[#0a9c5a] focus:ring-4 focus:ring-[#0a9c5a]/10 transition-all shadow-sm appearance-none"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="clinic">Clinic</option>
                <option value="pharmacy">Pharmacy</option>
                <option value="laboratory">Laboratory</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">City / Region (optional)</label>
              <input
                name="city"
                className="w-full px-4 py-3.5 rounded-xl bg-[#f9fafb] border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0a9c5a] focus:ring-4 focus:ring-[#0a9c5a]/10 transition-all shadow-sm"
                placeholder="Accra"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a2b3c] hover:bg-[#111e2b] text-white py-4 rounded-xl font-bold shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Submitting..." : "Join the Waitlist"}
            </button>

            <p className="text-center text-xs text-gray-400 font-medium">
              No spam. No commitment. Just early access.
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default WaitlistSection;
