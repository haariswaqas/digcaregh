"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const bullets = [
  { icon: "🪪", title: "Your Digital Identity", desc: "A unique health card linked to your complete medical profile." },
  { icon: "📲", title: "Instant QR Access", desc: "Doctors scan your QR code to access your records in seconds." },
  { icon: "🔐", title: "You're in Control", desc: "Every access requires your approval — your data, your rules." },
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
            <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
              Your personal, secure digital health identity — giving healthcare providers instant access to what they need, while keeping you fully in control.
            </p>

            <div className="space-y-5 mb-8">
              {bullets.map((b) => (
                <div key={b.title} className="flex gap-4 items-start">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{b.icon}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-0.5">{b.title}</h4>
                    <p className="text-sm text-muted-foreground">{b.desc}</p>
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