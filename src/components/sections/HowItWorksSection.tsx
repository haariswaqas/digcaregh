"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { Download, Stethoscope, UserRoundPlus, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
  images: string[];
}

const STEPS: Step[] = [
  {
    icon: Download,
    title: "Download DigCare",
    description: "Available on iOS and Android at launch. Works with your existing NHIS number — no extra paperwork.",
    images: ["/assets/DownloadAppComp1.png", "/assets/DownloadAppComp2.png", "/assets/DownloadAppComp3.png"],
  },
  {
    icon: UserRoundPlus,
    title: "Create your profile",
    description: "Sign up as a patient, doctor or facility admin. Verification happens securely in the background.",
    images: ["/assets/CreateProfileComp1.png", "/assets/CreateProfileComp2.png", "/assets/CreateProfileComp3.png"],
  },
  {
    icon: Stethoscope,
    title: "Access your care",
    description: "Book appointments, consult doctors, manage your Health Card and more — all from your phone.",
    images: ["/assets/AccessHealthComp1.png", "/assets/AccessHealthComp2.png", "/assets/AccessHealthComp3.png"],
  },
];

function CyclingScreens({ images, alt, offset }: { images: string[]; alt: string; offset: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => setIndex((i) => (i + 1) % images.length), 2400);
    }, offset);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [inView, reduce, images.length, offset]);

  return (
    <div ref={ref} className="relative h-full w-full">
      <AnimatePresence initial={false}>
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={alt}
          loading="lazy"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-0 mx-auto h-auto w-full max-w-[300px] object-contain"
        />
      </AnimatePresence>
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {images.map((src, i) => (
          <span
            key={src}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-5 bg-emerald-500" : "w-1.5 bg-slate-300"}`}
          />
        ))}
      </div>
    </div>
  );
}

const HowItWorksSection = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 85%", "end 55%"] });
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const [reached, setReached] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setReached(v >= 0.98 ? 3 : v >= 0.45 ? 2 : v > 0.02 ? 1 : 0);
  });

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="pointer-events-none absolute left-[5%] top-[20%] h-[420px] w-[420px] rounded-full bg-emerald-100/70 blur-[130px]" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From download to your <span className="text-gradient-brand">doctor</span> in three steps.
            </>
          }
          subtitle="DigCare puts quality healthcare in your pocket. Set up once, and every service is a tap away."
        />

        <div ref={trackRef} className="relative mt-20">
          {/* Connector */}
          <div className="absolute left-[16.66%] right-[16.66%] top-6 hidden h-[3px] rounded-full bg-slate-100 md:block">
            <motion.div
              className="h-full origin-left rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400"
              style={{ scaleX: line }}
            />
          </div>

          <div className="grid gap-14 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => {
              const lit = reached > i;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative z-10 mb-8">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500 ${
                        lit
                          ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_10px_24px_-8px_rgba(16,185,129,0.7)]"
                          : "bg-white text-slate-400 ring-1 ring-slate-200"
                      }`}
                    >
                      <step.icon size={21} />
                    </span>
                    <span
                      className={`font-manrope absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-extrabold transition-colors duration-500 ${
                        lit ? "bg-[#0B1120] text-white" : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </div>

                  <div className="group relative h-[380px] w-full overflow-hidden rounded-[2rem] border border-slate-100 bg-gradient-to-b from-slate-50 to-emerald-50/60 px-6 pt-10 transition-all duration-500 hover:border-emerald-200 hover:shadow-[0_30px_60px_-30px_rgba(16,185,129,0.4)]">
                    <span className="font-display pointer-events-none absolute left-6 top-4 select-none text-[64px] font-black leading-none text-emerald-600/10">
                      0{i + 1}
                    </span>
                    <CyclingScreens images={step.images} alt={step.title} offset={i * 700} />
                  </div>

                  <h3 className="font-display mt-7 text-[22px] font-bold text-[#0B1120]">{step.title}</h3>
                  <p className="font-manrope mt-2.5 max-w-[320px] text-[15px] leading-[1.7] text-slate-600">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
