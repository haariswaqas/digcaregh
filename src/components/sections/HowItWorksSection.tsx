"use client";

import { motion } from "framer-motion";

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Pill */}
          <div className="inline-block px-5 py-2 rounded-full border border-gray-200 text-xs font-semibold text-gray-600 mb-8 uppercase tracking-widest">
            How It Works
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-heading font-bold text-[#1a2b3c] mb-6 leading-[1.1]">
            From zero to your <span className="text-[#0a9c5a]">doctor</span> in <br className="hidden md:block" /> three easy steps
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            DigCare puts quality healthcare in your pocket. Download the app, build <br className="hidden md:block" /> your health profile, and unlock a full suite of services — all from your phone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* STEP 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col h-full"
          >
            {/* Image Container */}
            <div className="bg-[#f4f5f7] pt-10 px-6 rounded-t-3xl flex-grow flex justify-center items-end overflow-hidden h-[420px] mb-8">
              {/* Screenshot for Step 1: Download */}
              <img
                src="assets/DownloadAppComp1.png"
                alt="Download DigCare app screen"
                className="w-full max-w-[300px] h-auto object-contain"
              />
            </div>
            {/* Text */}
            <div className="text-left">
              <div className="text-xs font-bold text-gray-500 mb-3 tracking-widest uppercase">STEP 1</div>
              <h3 className="text-[22px] font-heading font-bold text-gray-900 mb-3">Download DigCare</h3>
              <p className="text-gray-500 leading-relaxed text-[15px]">Readily available on IOS & Android. Works with your existing NHIS Number - no extra paperwork</p>
            </div>
          </motion.div>

          {/* STEP 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col h-full"
          >
            <div className="bg-[#f4f5f7] pt-10 px-6 rounded-t-3xl flex-grow flex justify-center items-end overflow-hidden h-[420px] mb-8">
              {/* Screenshot for Step 2: Create Account */}
              <img
                src="assets/CreateProfileComp1.png"
                alt="Create your DigCare profile screen"
                className="w-full max-w-[300px] h-auto object-contain"
              />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-gray-500 mb-3 tracking-widest uppercase">STEP 2</div>
              <h3 className="text-[22px] font-heading font-bold text-gray-900 mb-3">Create Your Profile</h3>
              <p className="text-gray-500 leading-relaxed text-[15px]">Sign up as a patient, doctor, pharmacist, lab technician or hospital manager.</p>
            </div>
          </motion.div>

          {/* STEP 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col h-full"
          >
            <div className="bg-[#f4f5f7] pt-10 px-6 rounded-t-3xl flex-grow flex justify-center items-end overflow-hidden h-[420px] mb-8">
              {/* Screenshot for Step 3: Appointments */}
              <img
                src="assets/AccessHealthComp1.png"
                alt="Appointments screen"
                className="w-full max-w-[300px] h-auto object-contain"
              />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-gray-500 mb-3 tracking-widest uppercase">STEP 3</div>
              <h3 className="text-[22px] font-heading font-bold text-gray-900 mb-3">Access Your Healthcare</h3>
              <p className="text-gray-500 leading-relaxed text-[15px]">Book appointments, consult doctors, manage your health card, and more — all in one place.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;