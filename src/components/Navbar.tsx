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

const NAV_PAGE_LINKS = [
  { label: "Roles", href: "/roles" },
];

const NAV_TEXT = "#0B1120";
const NAV_ACCENT = "#047857";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Navigate to a section on the homepage.
  const goToSection = (id: string) => {
    setOpen(false);

    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      router.push(`/#${id}`);
    }
  };

  // Close the mobile menu when the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close the mobile menu when switching to desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");

    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };

    mq.addEventListener("change", onChange);

    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Close the mobile menu when Escape is pressed.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 bg-white"
      style={{
        backgroundColor: "#FFFFFF",
        boxShadow: "0 1px 3px rgba(11, 17, 32, 0.06)",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between px-6 h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-80"
          >
            <img
              src="/assets/digicareLogo.png"
              alt="DigCare"
              className="h-10"
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSection(item.id)}
                className="text-[14px] font-medium transition-colors duration-200"
                style={{ color: NAV_TEXT }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = NAV_ACCENT;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = NAV_TEXT;
                }}
              >
                {item.label}
              </button>
            ))}

            {NAV_PAGE_LINKS.map((item) => {
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[14px] transition-colors duration-200"
                  style={{
                    color: isActive ? NAV_ACCENT : NAV_TEXT,
                    fontWeight: isActive ? 600 : 500,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = NAV_ACCENT;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isActive
                      ? NAV_ACCENT
                      : NAV_TEXT;
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop waitlist button */}
          <button
            type="button"
            onClick={() => goToSection("footer")}
            className="hidden md:block text-sm py-2 px-6 rounded-full font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            style={{
              background: "linear-gradient(135deg, #10B981, #14B8A6)",
              color: "#071120",
            }}
          >
            Join Waitlist
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden p-2 -mr-2 text-[#0B1120] hover:text-[#047857] transition-colors"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden bg-white transition-all duration-300 ease-in-out ${open
            ? "max-h-[420px] opacity-100 border-t border-[#E2E8F0]"
            : "max-h-0 opacity-0 border-t border-transparent"
          }`}
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <nav className="flex flex-col px-6 py-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSection(item.id)}
              className="text-left py-3 text-[15px] font-medium text-[#0B1120] hover:text-[#047857] border-b border-[#E2E8F0] transition-colors"
            >
              {item.label}
            </button>
          ))}

          {NAV_PAGE_LINKS.map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`py-3 text-[15px] border-b border-[#E2E8F0] transition-colors ${isActive
                    ? "text-[#047857] font-semibold"
                    : "text-[#0B1120] font-medium hover:text-[#047857]"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Mobile waitlist button */}
          <button
            type="button"
            onClick={() => goToSection("footer")}
            className="mt-4 text-sm py-3 rounded-full font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            style={{
              background: "linear-gradient(135deg, #10B981, #14B8A6)",
              color: "#071120",
            }}
          >
            Join Waitlist
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;