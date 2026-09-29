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

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-[#1a2b3c]">
            Get in <span className="text-[#0a9c5a]">Touch</span>
          </h2>
          <p className="text-gray-500 text-lg">Have a question or want to partner with us? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-12 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-center h-[500px]"
            >
              <CheckCircle className="w-16 h-16 text-[#0a9c5a] mb-6" />
              <h3 className="text-2xl font-heading font-bold mb-3 text-gray-900">Message Sent!</h3>
              <p className="text-gray-500">We'll get back to you as soon as possible.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 md:p-10 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Name *</label>
                <input
                  name="name"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-[#f9fafb] border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0a9c5a] focus:ring-4 focus:ring-[#0a9c5a]/10 transition-all shadow-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Email *</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-[#f9fafb] border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0a9c5a] focus:ring-4 focus:ring-[#0a9c5a]/10 transition-all shadow-sm"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#f9fafb] border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0a9c5a] focus:ring-4 focus:ring-[#0a9c5a]/10 transition-all resize-none shadow-sm"
                  placeholder="Tell us more..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a2b3c] hover:bg-[#111e2b] text-white py-4 rounded-xl font-bold shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </motion.form>
          )}

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-start gap-5">
              <div className="p-3 rounded-2xl bg-[#e6f5ef] text-[#0a9c5a]">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-gray-900 mb-1 text-lg">Email</h4>
                <p className="text-gray-500 text-sm">info@digcaregh.com</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-start gap-5">
              <div className="p-3 rounded-2xl bg-[#e6f5ef] text-[#0a9c5a]">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-gray-900 mb-1 text-lg">Location</h4>
                <p className="text-gray-500 text-sm">Accra, Ghana</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
              <h4 className="font-heading font-bold text-gray-900 mb-4 text-lg">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/digcareofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#f4f5f7] text-gray-600 hover:text-gray-900 hover:bg-gray-200 text-sm font-semibold transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://x.com/DigcareSoftware?s=20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#f4f5f7] text-gray-600 hover:text-gray-900 hover:bg-gray-200 text-sm font-semibold transition-colors"
                >
                  X
                </a>
                <a
                  href="https://www.linkedin.com/company/digcare/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#f4f5f7] text-gray-600 hover:text-gray-900 hover:bg-gray-200 text-sm font-semibold transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
