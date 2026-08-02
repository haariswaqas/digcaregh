"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface StepImageProps {
  images: string[];
  alt: string;
}

const StepImage = ({ images, alt }: StepImageProps) => {
  const [hovered, setHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!hovered) {
      setActiveIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 1400);

    return () => clearInterval(interval);
  }, [hovered, images.length]);

  return (
    <div
      className="relative w-full max-w-[300px] h-full flex items-end justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={alt}
          className={`absolute inset-x-0 bottom-0 w-full max-w-[300px] h-auto object-contain transition-opacity duration-700 ease-in-out ${index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
        />
      ))}
    </div>
  );
};

const steps = [
  {
    label: "STEP 1",
    title: "Download DigCare",
    description:
      "Readily available on IOS & Android. Works with your existing NHIS Number - no extra paperwork",
    images: [
      "assets/DownloadAppComp1.png",
      "assets/DownloadAppComp2.png",
      "assets/DownloadAppComp3.png",
    ],
  },
  {
    label: "STEP 2",
    title: "Create Your Profile",
    description:
      "Sign up as a patient, doctor, pharmacist, lab technician or hospital manager.",
    images: [
      "assets/CreateProfileComp1.png",
      "assets/CreateProfileComp2.png",
      "assets/CreateProfileComp3.png",
    ],
  },
  {
    label: "STEP 3",
    title: "Access Your Healthcare",
    description:
      "Book appointments, consult doctors, manage your health card, and more — all in one place.",
    images: [
      "assets/AccessHealthComp1.png",
      "assets/AccessHealthComp2.png",
      "assets/AccessHealthComp3.png",
    ],
  },
];

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
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="bg-[#f4f5f7] pt-10 px-6 rounded-t-3xl flex-grow flex justify-center items-end overflow-hidden h-[420px] mb-8">
                <StepImage images={step.images} alt={step.title} />
              </div>
              {/* Text */}
              <div className="text-left">
                <div className="text-xs font-bold text-gray-500 mb-3 tracking-widest uppercase">{step.label}</div>
                <h3 className="text-[22px] font-heading font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;