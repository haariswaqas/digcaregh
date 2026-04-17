"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const bullets = [
  { icon: "🪪", title: "Digital Health Card", desc: "Unique card number, card type, and QR code tied to your health identity." },
  { icon: "📲", title: "QR Code Access", desc: "Doctors scan your QR code to securely access your health record." },
  { icon: "🔐", title: "PIN Protection", desc: "You control who sees your data — every scan requires your approval." },
  { icon: "🏥", title: "Remote Access Requests", desc: "Approve or deny every access request from doctors." },
  { icon: "🔑", title: "OTP Verification", desc: "Remote access secured with one-time password verification." },
  { icon: "🏷️", title: "NHIS Integration", desc: "Designed to link with Ghana's National Health Insurance Scheme." },
];

const HealthCardSection = () => {
  return (
    <section id="health-card" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative animate-float">
              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/30 blur-3xl" />
              <img
                src="/assets/hero-health-card.jpg"
                alt="DigCare Health Card"
                loading="lazy"
                width={480}
                height={480}
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-medium text-primary mb-4">
              ⭐ FLAGSHIP FEATURE
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Introducing the{" "}
              <span className="gradient-text">DigCare Health Card</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-3">
              Your complete medical identity. Always in your pocket.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              The DigCare Health Card is your personal, secure digital health identity. It gives healthcare providers instant access to the information they need — safely, quickly, and with your full control.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {bullets.map((b) => (
                <div key={b.title} className="flex gap-3">
                  <span className="text-xl flex-shrink-0">{b.icon}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{b.title}</h4>
                    <p className="text-xs text-muted-foreground">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/services/health-card" className="gradient-btn inline-block text-sm">
              Learn More About Health Card
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HealthCardSection;
