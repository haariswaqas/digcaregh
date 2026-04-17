"use client";

import { motion } from "framer-motion";
import { Users, Stethoscope, HeartPulse } from "lucide-react";

const tiles = [
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "For Patients",
    description: "Book appointments, consult doctors, access your health records, and carry your digital health card — all in one app.",
  },
  {
    icon: <Stethoscope className="w-8 h-8 text-accent" />,
    title: "For Doctors & Clinics",
    description: "Manage schedules, conduct video consultations, issue digital prescriptions, and access patient records with consent.",
  },
  {
    icon: <HeartPulse className="w-8 h-8 text-primary" />,
    title: "For Ghana's Healthcare System",
    description: "A platform designed to digitise and modernise healthcare delivery across Ghana — NHIS-compatible and built locally.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-light py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            What is <span className="text-primary">DigCare</span>?
          </h2>
          <p className="text-lg leading-relaxed opacity-80">
            DigCare is a mobile-first healthcare platform designed to simplify and digitise how Ghanaians access and manage their health. From booking doctor appointments to carrying a secure digital health card in your pocket, DigCare puts your healthcare in your hands.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-background/5 backdrop-blur-sm border border-border/20 rounded-xl p-8 text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">{tile.icon}</div>
              <h3 className="text-xl font-heading font-semibold mb-3">{tile.title}</h3>
              <p className="text-sm opacity-70 leading-relaxed">{tile.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
