"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ExploreSection = () => {
   return (
      <section className="bg-white py-24 border-t border-gray-100 overflow-hidden">
         <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
               {/* Left Text */}
               <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="lg:w-1/2 max-w-[540px]"
               >
                  <h2 className="text-[44px] md:text-[56px] font-heading font-bold text-[#1a2b3c] mb-6 leading-[1.1]">
                     Explore Digcare
                  </h2>
                  <p className="text-[#5a6a7c] text-[17px] leading-[1.6] mb-8 pr-4">
                     DigCare is Ghana's all-in-one digital healthcare platform — connecting patients, doctors, clinics, pharmacies, and labs in one seamless experience.
                  </p>
                  <Link href="#waitlist" className="inline-block text-[#1a2b3c] font-bold text-[17px] border-b-[2.5px] border-[#1a2b3c] pb-0.5 hover:text-[#0a9c5a] hover:border-[#0a9c5a] transition-colors">
                     Join waitlist
                  </Link>
               </motion.div>

               {/* Right Images */}
               <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="lg:w-1/2 flex justify-center lg:justify-end"
               >
                  <div className="flex items-start gap-6 w-full max-w-[520px]">
                     {/* Left image - main, sits slightly lower */}
                     <div className="w-[44%] aspect-[3/4] mt-24 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)]">
                        <img
                           src="assets/CallScreen1.png"
                           alt="Doctor video consultation"
                           className="w-full h-full object-cover"
                        />
                     </div>

                     {/* Right image - same size, shifted further right and up */}
                     <div className="w-[44%] aspect-[3/4] ml-6 -mt-6 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)]">
                        <img
                           src="assets/CallScreen2.png"
                           alt="Live consultation in progress"
                           className="w-full h-full object-cover"
                        />
                     </div>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>
   );
};

export default ExploreSection;