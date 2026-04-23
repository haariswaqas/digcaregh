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
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg">Have a question or want to partner with us? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-card p-12 text-center flex flex-col items-center justify-center"
            >
              <CheckCircle className="w-16 h-16 text-primary mb-4" />
              <h3 className="text-2xl font-heading font-bold mb-2">Message Sent!</h3>
              <p className="text-muted-foreground">We'll get back to you as soon as possible.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="glass-card p-8 space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
                <input
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder="Tell us more..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="gradient-btn w-full text-center disabled:opacity-50"
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
            className="space-y-8"
          >
            <div className="glass-card p-6 flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-heading font-semibold mb-1">Email</h4>
                <p className="text-muted-foreground text-sm">support@digcaregh.com</p>
              </div>
            </div>

            <div className="glass-card p-6 flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-heading font-semibold mb-1">Location</h4>
                <p className="text-muted-foreground text-sm">Accra, Ghana</p>
              </div>
            </div>

            <div className="glass-card p-6">
              <h4 className="font-heading font-semibold mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/digcareofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://x.com/DigcareSoftware?s=20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                >
                  X
                </a>
                <a
                  href="https://www.linkedin.com/company/digcare/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
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
