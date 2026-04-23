"use client";

import { motion } from "framer-motion";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] flex items-center justify-center overflow-hidden">
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-[100px] animate-float" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-blue/8 blur-[80px] animate-float-slow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-semibold text-primary mb-6 tracking-wide">
            NEXT-GEN HEALTHCARE · COMING TO GHANA
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold leading-[1.05] mb-6">
            Your Health.{" "}
            <span className="gradient-text">Reimagined.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
            DigCare is Ghana's all-in-one digital healthcare platform — connecting patients, doctors, clinics, pharmacies, and labs in one seamless experience.
          </p>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => scrollTo("waitlist")} className="gradient-btn text-base">
              Join the Waitlist
            </button>
            <button onClick={() => scrollTo("about")} className="ghost-btn text-base">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative animate-float">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
            <img
              src="/assets/hero-health-card.jpg"
              alt="DigCare Health Platform"
              width={480}
              height={480}
              className="relative rounded-3xl shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border/30 bg-card/20 backdrop-blur-sm py-2.5 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-8 text-xs text-muted-foreground font-medium tracking-wide">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex gap-8 items-center">
              <span>Appointments</span><span className="text-primary/40">·</span>
              <span>Video Consultations</span><span className="text-primary/40">·</span>
              <span>Digital Health Card</span><span className="text-primary/40">·</span>
              <span>Prescriptions</span><span className="text-primary/40">·</span>
              <span>Lab Orders</span><span className="text-primary/40">·</span>
              <span>Insurance</span><span className="text-primary/40">·</span>
              <span>Pharmacy</span><span className="text-primary/40">·</span>
              <span>Smart Notifications</span><span className="text-primary/40">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;