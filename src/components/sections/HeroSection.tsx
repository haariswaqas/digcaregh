"use client";

import { motion } from "framer-motion";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-start pt-20 overflow-hidden bg-white text-center">
      {/* Decorative Wavy Lines (Simplified SVG Background) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg className="absolute left-[-10%] top-[10%] w-[50%] h-[80%] opacity-40 text-blue-300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" stroke="currentColor" strokeWidth="0.5" d="M41.7,-64C53.7,-57.4,62.8,-43.8,69.5,-29.4C76.2,-15,80.5,0.3,77.9,14.2C75.2,28.1,65.6,40.6,53.8,50.4C42.1,60.1,28.2,67.1,13.6,71.7C-1,76.4,-16.3,78.8,-29.7,73.7C-43,68.6,-54.3,55.9,-61.8,41.9C-69.2,27.8,-72.8,12.3,-72.7,-2.8C-72.6,-18,-68.8,-32.8,-60.1,-44.6C-51.4,-56.3,-37.8,-65.1,-24,-69.1C-10.2,-73.2,3.8,-72.6,17.4,-68.5C30.9,-64.3,29.7,-70.6,41.7,-64Z" transform="translate(100 100) scale(1.5)" />
        </svg>
        <svg className="absolute right-[-10%] top-[30%] w-[50%] h-[80%] opacity-40 text-blue-300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" stroke="currentColor" strokeWidth="0.5" d="M37.3,-58.5C49.9,-48.6,62.6,-39.9,70.5,-27.7C78.4,-15.5,81.4,0.1,76.6,12.7C71.7,25.3,58.9,34.8,47.1,43.4C35.2,52,24.3,59.7,11.3,64C-1.8,68.4,-17,69.5,-30.2,64.2C-43.5,58.9,-54.9,47.2,-61.6,33.5C-68.4,19.8,-70.4,4.2,-67.2,-10.1C-64.1,-24.5,-55.9,-37.5,-45,-47.5C-34.1,-57.4,-20.5,-64.2,-6.3,-64.9C7.8,-65.7,15.6,-60.4,24.7,-68.4C33.7,-76.3,24.7,-68.4,37.3,-58.5Z" transform="translate(100 100) scale(1.5)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col items-center mt-8 lg:mt-12">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-heading font-semibold leading-[1.05] mb-6 tracking-tight">
            <span className="block text-[#1b3a4b]">Your Health.</span>
            <span className="block text-[#30708f]">Reimagined!</span>
          </h1>

          <p className="text-lg md:text-xl text-[#5b7380] max-w-3xl mb-8 leading-relaxed font-medium">
            DigCare is Ghana's all-in-one digital healthcare platform — connecting patients, doctors, clinics, pharmacies, and labs in one seamless experience.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button
              onClick={() => scrollTo("footer")}
              className="px-8 py-3.5 rounded-full bg-[#30708f] text-white font-semibold text-base shadow-sm hover:bg-[#255a73] transition-colors"
            >
              Join Waitlist
            </button>
            <button
              onClick={() => scrollTo("features")}
              className="px-8 py-3.5 rounded-full bg-[#e8f1f5] text-[#30708f] font-semibold text-base hover:bg-[#d5e5ed] transition-colors"
            >
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl mx-auto flex justify-center"
        >
          <div className="relative w-full overflow-hidden flex justify-center">
            <img
              src="/assets/HeroImage.png"
              alt="DigCare Health Platform"
              className="w-full max-w-[320px] md:max-w-[380px] h-auto object-contain drop-shadow-2xl"
            />
            {/* White gradient fade out at the bottom to blend with the background */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;