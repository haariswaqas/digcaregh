"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  accentColor: string;
  href?: string;
}

const FeatureCard = ({ icon, title, description, accentColor, href }: FeatureCardProps) => {
  const content = (
    <>
      {/* Icon circle */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-4"
        style={{ background: `${accentColor}1F` }}
      >
        <span style={{ color: accentColor }}>{icon}</span>
      </div>

      {/* Title */}
      <h4
        className="text-[17px] font-semibold text-[#1a2b3c] mb-2 flex items-center justify-between gap-2"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {title}
        {href && (
          <ArrowRight
            size={16}
            className="flex-shrink-0 text-gray-300 transition-all duration-300 group-hover:translate-x-1"
            style={{ color: accentColor, opacity: 0.6 }}
          />
        )}
      </h4>

      {/* Description */}
      <p
        className="text-[14px] leading-[1.65] text-gray-500"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        {description}
      </p>
    </>
  );

  const sharedProps = {
    className: `group block h-full rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 ${
      href ? "cursor-pointer" : "cursor-default"
    }`,
    style: { boxShadow: "0 2px 8px rgba(0,0,0,0.05)" },
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      el.style.borderColor = accentColor;
      el.style.transform = "translateY(-2px)";
      el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.10)";
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      el.style.borderColor = "#f3f4f6";
      el.style.transform = "translateY(0)";
      el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
    },
  };

  if (href) {
    return (
      <Link href={href} {...sharedProps}>
        {content}
      </Link>
    );
  }

  return <div {...sharedProps}>{content}</div>;
};

export default FeatureCard;
