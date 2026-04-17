"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  HelpCircle,
  Mail,
  LayoutGrid,
} from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";

const services = [
  { icon: "📅", label: "Doctor Appointments", slug: "appointments" },
  { icon: "🎥", label: "Video Consultations", slug: "video-consultations" },
  { icon: "💊", label: "Prescriptions & Pharmacy", slug: "prescriptions-pharmacy" },
  { icon: "🧪", label: "Lab Orders & Results", slug: "lab-orders" },
  { icon: "💬", label: "In-App Messaging", slug: "messaging" },
  { icon: "🛡️", label: "Insurance & Claims", slug: "insurance" },
  { icon: "🪪", label: "DigCare Health Card", slug: "health-card" },
  { icon: "🔔", label: "Smart Notifications", slug: "notifications" },
];

const AppSidebar = () => {
  const { isOpen, isCollapsed, toggleCollapsed, close } = useSidebar();
  const [servicesExpanded, setServicesExpanded] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // ✅ FIX: Better active detection
  const isActive = (path: string) => pathname.startsWith(path);
  const isServiceActive = pathname.startsWith("/services/");

  // ✅ FIX: Auto-expand services if active
  useEffect(() => {
    if (isServiceActive) setServicesExpanded(true);
  }, [isServiceActive]);

  // ✅ Optional: close sidebar on route change (mobile UX)
  useEffect(() => {
    close();
  }, [pathname]);

  // ✅ FIX: Reliable hash navigation
  const handleHashNav = (hash: string) => {
    close();

    if (pathname === "/") {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/?scrollTo=${hash}`);
    }
  };

  const navLinks = [
    { label: "Home", path: "/", icon: <Home size={18} /> },
  ];

  const bottomLinks = [
    { label: "How It Works", hash: "how-it-works", icon: <HelpCircle size={18} /> },
    { label: "Contact Us", hash: "contact", icon: <Mail size={18} /> },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="p-3 flex items-center justify-end border-b border-border/30 min-h-[56px]">
        <button
          onClick={close}
          className="lg:hidden flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive(link.path)
              ? "bg-sidebar-accent text-primary border-l-2 border-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
              }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}

        {/* Services */}
        <div>
          <button
            onClick={() => setServicesExpanded((v) => !v)}
            aria-expanded={servicesExpanded}
            aria-controls="services-menu"
            className={`relative w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isServiceActive
              ? "bg-sidebar-accent text-primary border-l-2 border-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
              }`}
          >
            <span className="flex items-center gap-3">
              <LayoutGrid size={18} />
              <span>Our Services</span>
            </span>

            <ChevronDown
              size={16}
              className={`transition-transform ${servicesExpanded ? "rotate-180" : ""
                }`}
            />
          </button>

          <div
            id="services-menu"
            className={`overflow-hidden transition-all duration-300 ${servicesExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <div className="ml-2 mt-1 space-y-0.5 border-l border-border/40 pl-2">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium ${isActive(`/services/${service.slug}`)
                    ? "text-primary bg-sidebar-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                    }`}
                >
                  <span>{service.icon}</span>
                  <span>{service.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom links */}
        {bottomLinks.map((link) => (
          <button
            key={link.hash}
            onClick={() => handleHashNav(link.hash)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
          >
            {link.icon}
            <span>{link.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 space-y-3 border-t border-border/30">
        <button
          onClick={() => handleHashNav("waitlist")}
          className="gradient-btn w-full text-center text-sm"
        >
          Join Waitlist
        </button>

        <div className="flex justify-center">
          <img
            src="/assets/digicareLogo.png"
            alt="DigCare"
            className="h-10 object-contain"
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside
        className={`hidden lg:flex flex-col fixed top-0 left-0 h-screen w-64 z-40 sidebar-glass glow-border transition-transform duration-300 ${isCollapsed ? "-translate-x-full" : "translate-x-0"
          }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={close}
          />
          <aside className="absolute left-0 top-0 h-full w-72 sidebar-glass glow-border">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default AppSidebar;