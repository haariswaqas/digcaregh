"use client";

import { motion } from "framer-motion";
import { ChevronLeft, Search, X, Mic, MessageSquare, Phone, Calendar, Clock } from "lucide-react";

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
            <div className="bg-white p-6 pb-0 rounded-sm mb-4 h-[420px] flex flex-col overflow-hidden shadow-sm">
              <div className="flex items-center mb-4 text-[#1b3a4b] font-bold mt-2">
                <ChevronLeft size={20} className="mr-auto text-gray-500" />
                <span className="mx-auto pr-6">Book Appointment</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mb-8 flex">
                <div className="bg-[#2b6a88] w-1/3 h-full rounded-full"></div>
              </div>
              <div className="mb-4">
                <h4 className="text-[15px] font-bold text-[#1b3a4b] mb-1">Select Service Type</h4>
                <p className="text-xs text-gray-400">Choose the type of consultation you need</p>
              </div>

              <div className="border border-[#2b6a88] rounded-lg p-4 mb-3 flex items-start">
                <div className="w-10 h-10 rounded-md bg-[#e8f1f5] text-[#2b6a88] flex items-center justify-center mr-3 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <div className="flex-1">
                  <h5 className="text-[13px] font-bold text-[#2b6a88] mb-0.5">General Consultation</h5>
                  <p className="text-[10px] text-[#2b6a88]/70 mb-2 leading-tight">Primary care and routine checkups</p>
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[10px] font-bold text-[#10b981]">NHIS Covered</span>
                    <span className="text-[10px] text-gray-400">30mins</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-100 bg-gray-50/50 rounded-lg p-4 flex items-start">
                <div className="w-10 h-10 rounded-md bg-gray-200 text-gray-500 flex items-center justify-center mr-3 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <div className="flex-1">
                  <h5 className="text-[13px] font-bold text-gray-600 mb-0.5">Specialist Consultation</h5>
                  <p className="text-[10px] text-gray-400 mb-2 leading-tight">Expert care for specific conditions</p>
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[10px] font-bold text-[#10b981]">Ghc 150</span>
                    <span className="text-[10px] text-gray-400">30mins</span>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-[#1b3a4b] mb-1">Appointment Booking</h3>
            <p className="text-[13px] text-gray-500">Book an appointment with a doctor on your phone</p>
          </div>

          {/* Card 2: Video Consultation */}
          <div className="flex flex-col">
            <div className="bg-white p-6 pb-0 rounded-sm mb-4 h-[420px] flex flex-col overflow-hidden shadow-sm">
              <div className="flex items-center mb-4 text-[#1b3a4b] font-bold mt-2">
                <ChevronLeft size={20} className="mr-auto text-gray-500" />
                <span className="mx-auto pr-6">Telehealth</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mb-8 flex">
                <div className="bg-[#2b6a88] w-1/4 h-full rounded-full"></div>
              </div>
              <div className="mb-6">
                <h4 className="text-[15px] font-bold text-[#1b3a4b] mb-1">Telehealth Consultation</h4>
                <p className="text-xs text-gray-400">Connect with doctors from anywhere</p>
              </div>

              <div className="flex gap-3">
                <div className="flex-1 bg-[#2b6a88] rounded-lg p-4 flex flex-col items-start justify-center shadow-sm">
                  <Clock size={20} className="text-white mb-2" />
                  <h5 className="text-[13px] font-bold text-white mb-1">Available 24/7</h5>
                  <p className="text-[10px] text-white/80">Instant Consultation</p>
                </div>
                <div className="flex-1 border border-[#2b6a88] rounded-lg p-4 flex flex-col items-start justify-center">
                  <Calendar size={20} className="text-[#2b6a88] mb-2" />
                  <h5 className="text-[13px] font-bold text-[#2b6a88] mb-1">Schedule</h5>
                  <p className="text-[10px] text-[#2b6a88]/70">Book for later</p>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-[#1b3a4b] mb-1">Video Consultation</h3>
            <p className="text-[13px] text-gray-500">Online Consultation at the comfort of your home</p>
          </div>

          {/* Card 3: Prescription & Pharmacy */}
          <div className="flex flex-col">
            <div className="bg-white p-6 pb-0 rounded-sm mb-4 h-[420px] flex flex-col overflow-hidden shadow-sm">
              <div className="flex items-center mb-8 text-[#1b3a4b] font-bold mt-2">
                <div className="p-1 border border-gray-200 rounded-md">
                  <ChevronLeft size={16} className="text-gray-500" />
                </div>
                <span className="mx-auto pr-6 text-[15px]">Issue Prescription</span>
              </div>

              <div className="mb-6">
                <label className="text-[11px] text-gray-500 mb-2 flex items-center">
                  Select Patient <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search by name or ID..." className="w-full text-xs py-2.5 pl-9 pr-3 bg-gray-50 border border-gray-100 rounded-md focus:outline-none placeholder:text-gray-300" />
                </div>
              </div>

              <div className="bg-[#f8f9fa] rounded-lg p-3 flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-200 shrink-0">
                  <img src="/assets/hero-health-card.jpg" alt="Patient" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h5 className="text-[13px] font-bold text-[#1b3a4b] leading-tight">Olivia Chun</h5>
                  <p className="text-[10px] text-gray-400">ID: 45357896</p>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-[#1b3a4b] mb-1">Prescription & Pharmacy</h3>
            <p className="text-[13px] text-gray-500">Order prescriptions & refills from your local pharmacy</p>
          </div>

          {/* Card 4: In-App Messaging */}
          <div className="flex flex-col">
            <div className="bg-white rounded-sm mb-4 h-[420px] relative overflow-hidden shadow-sm">
              <img src="/assets/InAppMessagingComp2.png" alt="Video Call" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-black/10"></div>

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
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
            <div className="bg-white p-6 pb-0 rounded-sm mb-4 h-[420px] flex flex-col overflow-hidden shadow-sm">
              <div className="flex items-center mb-4 text-[#1b3a4b] font-bold mt-2">
                <ChevronLeft size={20} className="mr-auto text-gray-500" />
                <span className="mx-auto pr-6">Book Appointment</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mb-8 flex">
                <div className="bg-[#2b6a88] w-2/3 h-full rounded-full"></div>
              </div>
              <div className="mb-4">
                <h4 className="text-[15px] font-bold text-[#1b3a4b] mb-1">Select Payment Method</h4>
                <p className="text-xs text-gray-400">Choose your preferred payment method</p>
              </div>

              <div className="border border-[#2b6a88] rounded-lg p-3 pb-2 mb-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <h5 className="text-[12px] font-bold text-[#2b6a88]">Insurance</h5>
                      <p className="text-[9px] text-[#2b6a88]/70">Pay for consultation service with insurance</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full border-[4px] border-[#2b6a88]"></div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-[8px] bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded">NHIS</span>
                  <span className="text-[8px] bg-purple-50 text-purple-500 px-1.5 py-0.5 rounded">Acacia Health Insurance</span>
                  <span className="text-[8px] bg-cyan-50 text-cyan-500 px-1.5 py-0.5 rounded">Glico Health Insurance</span>
                </div>
              </div>

              <div className="border border-gray-100 bg-gray-50/50 rounded-lg p-3 pb-2 mb-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <h5 className="text-[12px] font-bold text-gray-600">Mobile Money</h5>
                      <p className="text-[9px] text-gray-400">Pay with your mobile money wallet</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-[8px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">MTN Momo</span>
                  <span className="text-[8px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded">Vodafone Cash</span>
                  <span className="text-[8px] bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded">AirtelTigo</span>
                </div>
              </div>

              <div className="border border-gray-100 bg-gray-50/50 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>
                    </div>
                    <h5 className="text-[12px] font-bold text-gray-600">Credit/Debit Card</h5>
                  </div>
                  <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                </div>
              </div>

            </div>
            <h3 className="text-lg font-bold text-[#1b3a4b] mb-1">Insurance & Claims</h3>
            <p className="text-[13px] text-gray-500">Pay for health services with your phone</p>
          </div>

          {/* Card 6: Digcare Health Card */}
          <div className="flex flex-col">
            <div className="bg-white rounded-sm mb-4 h-[420px] flex items-center justify-center p-6 shadow-sm overflow-hidden">
              <div className="w-full bg-gradient-to-br from-[#0088cc] to-[#005588] rounded-2xl p-6 text-white shadow-xl aspect-[4/5] flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-1">Hamdiyyah Ibrahim</h3>
                <p className="text-sm text-white/80 font-mono mb-8">NHS-001234567</p>

                <div className="flex items-center gap-2 mb-10">
                  <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
                  <span className="text-sm font-medium">Status: Active</span>
                </div>

                <div>
                  <p className="text-xs text-white/70 mb-1">Emergency Contact</p>
                  <p className="text-lg font-bold">+233 241 23 56 79</p>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-[#1b3a4b] mb-1">Digcare Health Card</h3>
            <p className="text-[13px] text-gray-500">Easily see all your health records in one digital card</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
