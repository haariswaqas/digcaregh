"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const features = [
  { icon: "📅", title: "Doctor Appointments", slug: "appointments", description: "Book, manage, and track appointments with doctors and clinics across Ghana." },
  { icon: "🎥", title: "Video Consultations", slug: "video-consultations", description: "Connect face-to-face with your doctor from anywhere in Ghana — secure, real-time telehealth." },
  { icon: "💊", title: "Prescriptions & Pharmacy", slug: "prescriptions-pharmacy", description: "Receive digital prescriptions and connect with pharmacies for seamless dispensing." },
  { icon: "🧪", title: "Lab Orders & Results", slug: "lab-orders", description: "Doctors request lab tests digitally; patients receive results directly in the app." },
  { icon: "💬", title: "In-App Messaging", slug: "messaging", description: "Communicate directly and securely with your healthcare provider through built-in chat." },
  { icon: "🛡️", title: "Insurance & Claims", slug: "insurance", description: "Manage your health insurance and submit claims digitally. NHIS-compatible." },
  { icon: "🔔", title: "Smart Notifications", slug: "notifications", description: "Stay informed about appointments, prescriptions, lab results, and more." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Everything You Need.{" "}
            <span className="gradient-text">One App.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            DigCare brings together every aspect of your healthcare journey into one seamless platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/services/${feature.slug}`}
                className="glass-card-hover block p-6 h-full group"
              >
                <span className="text-3xl mb-4 block">{feature.icon}</span>
                <h3 className="text-lg font-heading font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {feature.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Learn More <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
