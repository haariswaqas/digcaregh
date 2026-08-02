"use client";

import { motion } from "framer-motion";

const roles = [
  {
    title: "Patients",
    image: "assets/icons/patient.png",
    description: "Access your full health journey digitally appointments, records, prescriptions & more.",
  },
  {
    title: "Doctors",
    image: "assets/FemaleDoctor.png",
    description: "Manage appointments, consultations, and patient records with modern digital tools.",
  },
  {
    title: "Clinic Administrators",
    image: "assets/ClinicAdministrators.png",
    description: "Streamline clinic operations and patient flow with an integrated platform.",
  },
  {
    title: "Pharmacists",
    image: "assets/Pharmacists.png",
    description: "Receive and dispense digital prescriptions seamlessly.",
  },
];

const RolesSection = () => {
  return (
    <section className="bg-[#fafafa] py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-[42px] font-heading font-bold text-[#1a2b3c] mb-4">
            Who is Digcare for?
          </h2>
          <p className="text-gray-500 text-[17px] max-w-[320px] mx-auto leading-relaxed">
            Built for every role in Ghana's healthcare system
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-left flex flex-col"
            ><div className="w-full h-80 mb-5 rounded-2xl overflow-hidden bg-gray-200">
                <img
                  src={role.image}
                  alt={role.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3 className="font-heading font-bold text-[19px] text-[#1a2b3c] mb-2">{role.title}</h3>
              <p className="text-[14px] text-gray-500 leading-[1.6] pr-2">{role.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RolesSection;