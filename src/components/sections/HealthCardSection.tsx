"use client";

import { motion } from "framer-motion";
import { IdCard, QrCode, Hand } from "lucide-react";

const bullets = [
  {
    icon: <IdCard size={20} className="text-white" />,
    bgColor: "bg-[#30708f]",
    title: "Your Digital Identity",
    desc: "A unique health card linked to your complete medical profile"
  },
  {
    icon: <QrCode size={20} className="text-white" />,
    bgColor: "bg-[#f59e0b]",
    title: "Instant QR Access",
    desc: "Doctors scan your QR Code to access your records in seconds"
  },
  {
    icon: <Hand size={20} className="text-white" />,
    bgColor: "bg-[#10b981]",
    title: "You're in Control",
    desc: "Every access requires your approval - your data, your rules"
  },
];

const HealthCardSection = () => {
  return (
    <section id="health-card" className="py-24 bg-[#f4fafe] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <img
              src="/assets/LadyImage_FlagshipFeature.png"
              alt="DigCare Health Card"
              loading="lazy"
              className="w-full max-w-[600px] h-auto rounded-lg shadow-md object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="text-[#c28b1e] font-bold text-sm tracking-wide mb-3 flex items-center gap-1.5 uppercase">
              FLAGSHIP FEATURE ⭐
            </div>

            <h2 className="text-4xl lg:text-[2.75rem] font-heading font-bold mb-5 text-[#020617] leading-tight tracking-tight">
              Introducing Digcare's Health Card
            </h2>

            <p className="text-[#475569] mb-10 leading-relaxed text-[17px] max-w-[34rem]">
              Your personal, secure digital health identity — giving healthcare providers instant access to what they need, while keeping you fully in control.
            </p>

            <div className="space-y-8">
              {bullets.map((b) => (
                <div key={b.title} className="flex gap-5 items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${b.bgColor}`}>
                    {b.icon}
                  </div>
                  <div className="pt-0.5">
                    <h4 className="text-[17px] font-bold text-[#020617] mb-1">{b.title}</h4>
                    <p className="text-[#475569] text-[15px]">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HealthCardSection;