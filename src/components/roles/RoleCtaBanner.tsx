"use client";

import Link from "next/link";

interface RoleCtaBannerProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonHref: string;
}

const RoleCtaBanner = ({ title, subtitle, buttonText, buttonHref }: RoleCtaBannerProps) => {
  return (
    <section
      className="py-20"
      style={{
        background: "linear-gradient(135deg, #0B1120 0%, #0F172A 50%, #1A2234 100%)",
      }}
    >
      <div className="max-w-[720px] mx-auto px-6 text-center">
        <h2
          className="text-3xl md:text-[40px] font-bold text-white mb-4 leading-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.5px" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="text-[16px] text-gray-400 leading-relaxed mb-8"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {subtitle}
          </p>
        )}
        <Link
          href={buttonHref}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-[15px] font-bold transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg, #10B981, #14B8A6)",
            color: "#0B1120",
            boxShadow: "0 10px 24px rgba(16,185,129,0.30)",
            fontFamily: "Manrope, sans-serif",
          }}
        >
          {buttonText}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default RoleCtaBanner;
