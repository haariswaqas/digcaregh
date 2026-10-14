"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface RelatedFeature {
  slug: string;
  title: string;
  tag: string;
  icon: LucideIcon;
}

interface RelatedFeatureLinksProps {
  basePath: string;
  features: RelatedFeature[];
  accentColor: string;
}

const RelatedFeatureLinks = ({ basePath, features, accentColor }: RelatedFeatureLinksProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {features.map((feature, i) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={feature.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <Link
              href={`${basePath}/${feature.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:shadow-lg"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = accentColor;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#f3f4f6";
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${accentColor}1F`, color: accentColor }}
              >
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-[13px] font-semibold text-[#1a2b3c] truncate"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {feature.title}
                </p>
              </div>
              <ArrowRight
                size={16}
                className="flex-shrink-0 text-gray-300 transition-all duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default RelatedFeatureLinks;
