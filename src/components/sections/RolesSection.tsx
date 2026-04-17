"use client";

import { motion } from "framer-motion";

const roles = [
  { icon: "🧑‍⚕️", title: "Patients", description: "Access your full health journey digitally — appointments, records, prescriptions, and more." },
  { icon: "👨‍⚕️", title: "Doctors", description: "Manage appointments, consultations, and patient records with modern digital tools." },
  { icon: "🏢", title: "Clinics & Administrators", description: "Streamline clinic operations and patient flow with an integrated platform." },
  { icon: "💊", title: "Pharmacies", description: "Receive and dispense digital prescriptions seamlessly." },
  { icon: "🧪", title: "Laboratories", description: "Receive lab orders and upload results digitally to connected providers." },
];

const RolesSection = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Who Is DigCare <span className="gradient-text">For?</span>
          </h2>
          <p className="text-muted-foreground text-lg">Built for every role in Ghana's healthcare ecosystem.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-6 text-center"
            >
              <span className="text-4xl mb-4 block">{role.icon}</span>
              <h3 className="font-heading font-semibold mb-2 text-foreground">{role.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{role.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RolesSection;
