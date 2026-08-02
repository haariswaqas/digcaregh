"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, X, Mic, MessageSquare, Phone } from "lucide-react";

interface FeatureImageProps {
  images: string[];
  alt: string;
}

const FeatureImage = ({ images, alt }: FeatureImageProps) => {
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
      className="relative w-full h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
        />
      ))}
    </div>
  );
};

const features = [
  {
    title: "Appointment Booking",
    description: "Book an appointment with a doctor on your phone",
    images: [
      "/assets/BookAppointmentComp1.png",
      "/assets/BookAppointmentComp2.png",
      "/assets/BookAppointmentComp3.png",
      "/assets/BookAppointmentComp4.png",
      "/assets/BookAppointmentComp5.png",
      "/assets/BookAppointmentComp6.png",



    ],
  },
  {
    title: "Video Consultation",
    description: "Online Consultation at the comfort of your home",
    images: [
      "/assets/VideoConsultationComp1.png",
      "/assets/VideoConsultationComp2.png",
      "/assets/VideoConsultationComp3.png",
      "/assets/VideoConsultationComp4.png",

    ],
  },
  {
    title: "Prescription & Pharmacy",
    description: "Order prescriptions & refills from your local pharmacy",
    images: [
      "/assets/Prescription&PharmacyComp1.png",
      "/assets/Prescription&PharmacyComp2.png",
      "/assets/Prescription&PharmacyComp3.png",
    ],
  },
  {
    title: "Insurance & Claims",
    description: "Pay for health services with your phone",
    images: [
      "/assets/Insurance_Claims_Comp1.png",
      "/assets/Insurance_Claims_Comp2.png",
      "/assets/Insurance_Claims_Comp3.png",
    ],
  },
  {
    title: "Digcare Health Card",
    description: "Easily see all your health records in one digital card",
    images: [
      "/assets/DigcareHealthCardComp1.png",
      "/assets/DigcareHealthCardComp2.png",
      "/assets/DigcareHealthCardComp3.png",
    ],
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-[#f4f7f8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-xs font-bold text-gray-500 mb-6 bg-transparent tracking-widest uppercase">
            OUR APP
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1b3a4b] leading-tight">
            Everything You Need for Your Health, <br />
            in <span className="text-[#0d9488]">One App</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">

          {/* Card 1: Appointment Booking */}
          <div className="flex flex-col">
            <div className="bg-white rounded-sm mb-4 h-[420px] overflow-hidden shadow-sm">
              <FeatureImage images={features[0].images} alt={features[0].title} />
            </div>
            <h3 className="text-lg font-bold text-[#1b3a4b] mb-1">{features[0].title}</h3>
            <p className="text-[13px] text-gray-500">{features[0].description}</p>
          </div>

          {/* Card 2: Video Consultation */}
          <div className="flex flex-col">
            <div className="bg-white rounded-sm mb-4 h-[420px] overflow-hidden shadow-sm">
              <FeatureImage images={features[1].images} alt={features[1].title} />
            </div>
            <h3 className="text-lg font-bold text-[#1b3a4b] mb-1">{features[1].title}</h3>
            <p className="text-[13px] text-gray-500">{features[1].description}</p>
          </div>

          {/* Card 3: Prescription & Pharmacy */}
          <div className="flex flex-col">
            <div className="bg-white rounded-sm mb-4 h-[420px] overflow-hidden shadow-sm">
              <FeatureImage images={features[2].images} alt={features[2].title} />
            </div>
            <h3 className="text-lg font-bold text-[#1b3a4b] mb-1">{features[2].title}</h3>
            <p className="text-[13px] text-gray-500">{features[2].description}</p>
          </div>

          {/* Card 4: In-App Messaging */}
          <div className="flex flex-col">
            <div className="bg-white rounded-sm mb-4 h-[420px] relative overflow-hidden shadow-sm">
              <FeatureImage
                images={[
                  "/assets/InAppMessagingComp1.png",
                  "/assets/InAppMessagingComp2.png",

                ]}
                alt="In-App Messaging"
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg pointer-events-none">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="text-[12px] font-bold text-[#1b3a4b]">Live consultation in progress</h5>
                  <X size={14} className="text-red-500 border border-red-500 rounded-full p-0.5" />
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed mb-4">
                  You can view the patient's history, note symptoms, give a diagnosis, plan treatment, prescribe medicine, order tests, and make referrals.
                </p>
                <div className="flex justify-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                    <Mic size={14} className="text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                    <MessageSquare size={14} className="text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                    <Phone size={14} className="text-white fill-white transform rotate-135" />
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-[#1b3a4b] mb-1">In-App Messaging</h3>
            <p className="text-[13px] text-gray-500">Chit chat with your doctor about anything</p>
          </div>

          {/* Card 5: Insurance & Claims */}
          <div className="flex flex-col">
            <div className="bg-white rounded-sm mb-4 h-[420px] overflow-hidden shadow-sm">
              <FeatureImage images={features[3].images} alt={features[3].title} />
            </div>
            <h3 className="text-lg font-bold text-[#1b3a4b] mb-1">{features[3].title}</h3>
            <p className="text-[13px] text-gray-500">{features[3].description}</p>
          </div>

          {/* Card 6: Digcare Health Card */}
          <div className="flex flex-col">
            <div className="bg-white rounded-sm mb-4 h-[420px] overflow-hidden shadow-sm">
              <FeatureImage images={features[4].images} alt={features[4].title} />
            </div>
            <h3 className="text-lg font-bold text-[#1b3a4b] mb-1">{features[4].title}</h3>
            <p className="text-[13px] text-gray-500">{features[4].description}</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;