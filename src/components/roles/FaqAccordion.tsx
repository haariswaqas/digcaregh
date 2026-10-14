"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  accentColor: string;
}

const FaqAccordion = ({ items, accentColor }: FaqAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white overflow-hidden">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 transition-colors"
            >
              <span
                className="text-[15px] font-semibold text-[#1a2b3c]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {item.q}
              </span>
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300"
                style={{
                  background: `${accentColor}1F`,
                  color: accentColor,
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                <Plus size={15} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p
                    className="px-6 pb-5 text-[14px] leading-[1.7] text-gray-500"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
