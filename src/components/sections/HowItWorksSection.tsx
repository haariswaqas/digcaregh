"use client";

import { motion } from "framer-motion";
import { Download, UserPlus, HeartPulse } from "lucide-react";

const steps = [
  {
    icon: <Download className="w-8 h-8" />,
    step: 1,
    title: "Download DigCare",
    description: "Available on Android & iOS — coming soon.",
  },
  {
    icon: <UserPlus className="w-8 h-8" />,
    step: 2,
    title: "Create Your Profile",
    description: "Sign up as a patient, doctor, clinic, pharmacy, or lab.",
  },
  {
    icon: <HeartPulse className="w-8 h-8" />,
    step: 3,
    title: "Access Your Healthcare",
    description: "Book appointments, consult doctors, manage your health card, and more — all in one place.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-light py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            How It Works
          </h2>
          <p className="opacity-70 text-lg">Three simple steps to transform your healthcare experience.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="text-center relative"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                {s.icon}
              </div>
              <div className="text-xs font-bold text-primary mb-2">STEP {s.step}</div>
              <h3 className="text-xl font-heading font-semibold mb-3">{s.title}</h3>
              <p className="text-sm opacity-70 leading-relaxed">{s.description}</p>

              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(100%_-_16px)] w-8 h-0.5 bg-primary/30" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
