"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Features", id: "features" },
  { label: "Blog", id: "blog" },
  { label: "Health Card", id: "health-card" },
  { label: "How It Works", id: "how-it-works" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Scroll on the home page, otherwise go to the home page and jump to the section
  const goToSection = (id: string) => {
    setOpen(false);
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  };

  // Close the menu when the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close the menu if the screen grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white shadow-sm md:shadow-none transition-all duration-300">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between px-6 h-16">
          <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
            <img src="/assets/digicareLogo.png" alt="DigCare" className="h-10" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => goToSection(item.id)}
                className="text-[14px] font-medium text-gray-600 hover:text-[#0a9c5a] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop waitlist button */}
          <button
            onClick={() => goToSection("footer")}
            className="hidden md:block bg-[#30708f] text-white hover:bg-[#255a73] transition-colors text-sm py-2 px-6 rounded-full font-semibold shadow-sm"
          >
            Join Waitlist
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden p-2 -mr-2 text-gray-700 hover:text-[#0a9c5a] transition-colors"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 ease-in-out ${open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0 border-transparent"
          }`}
      >
        <nav className="flex flex-col px-6 py-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => goToSection(item.id)}
              className="text-left py-3 text-[15px] font-medium text-gray-700 hover:text-[#0a9c5a] border-b border-gray-100 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => goToSection("footer")}
            className="mt-4 bg-[#30708f] text-white hover:bg-[#255a73] transition-colors text-sm py-3 rounded-full font-semibold shadow-sm"
          >
            Join Waitlist
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;