"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  X,
  ChevronDown,
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
  const { isOpen, isCollapsed, close } = useSidebar();
  const [servicesExpanded, setServicesExpanded] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;
  const isServiceActive = pathname.startsWith("/services/");

  useEffect(() => {
    if (isServiceActive) setServicesExpanded(true);
  }, [isServiceActive]);

  // Close sidebar on route change (mobile UX)
  useEffect(() => {
    close();
  }, [pathname]);

  // Auto-scroll to top when navigating to a service page
  const handleServiceNav = (slug: string) => {
    close();
    router.push(`/services/${slug}`);
    // Scroll to top after navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHashNav = (hash: string) => {
    close();
    if (pathname === "/") {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/?scrollTo=${hash}`);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full w-full">
      {/* Header with logo */}
      <div className="px-4 flex items-center justify-between border-b border-border/30 h-14 shrink-0">
        <Link href="/" onClick={close} className="flex items-center">
          <img
            src="/assets/digicareLogo.png"
            alt="DigCare"
            className="h-7 object-contain"
          />
        </Link>
        <button
          onClick={close}
          className="lg:hidden flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {/* Home */}
        <Link
          href="/"
          onClick={close}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive("/")
              ? "bg-sidebar-accent text-primary border-l-2 border-primary pl-[10px]"
              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            }`}
        >
          <Home size={16} />
          <span>Home</span>
        </Link>

        {/* Services accordion */}
        <div>
          <button
            onClick={() => setServicesExpanded((v) => !v)}
            aria-expanded={servicesExpanded}
            aria-controls="services-menu"
            className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isServiceActive
                ? "bg-sidebar-accent text-primary border-l-2 border-primary pl-[10px]"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
          >
            <span className="flex items-center gap-3">
              <LayoutGrid size={16} />
              <span>Our Services</span>
            </span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${servicesExpanded ? "rotate-180" : ""}`}
            />
          </button>

          <div
            id="services-menu"
            className={`overflow-hidden transition-all duration-300 ${servicesExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <div className="ml-2 mt-1 space-y-0.5 border-l border-border/40 pl-2">
              {services.map((service) => {
                const isCurrentService = pathname === `/services/${service.slug}`;
                return (
                  <button
                    key={service.slug}
                    onClick={() => handleServiceNav(service.slug)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-left transition-all ${isCurrentService
                        ? "text-primary bg-sidebar-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      }`}
                  >
                    <span className="text-sm leading-none">{service.icon}</span>
                    <span>{service.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-2 border-t border-border/20" />

        {/* How It Works */}
        <button
          onClick={() => handleHashNav("how-it-works")}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
        >
          <HelpCircle size={16} />
          <span>How It Works</span>
        </button>

        {/* Contact */}
        <button
          onClick={() => handleHashNav("contact")}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
        >
          <Mail size={16} />
          <span>Contact Us</span>
        </button>
      </nav>

      {/* Footer CTA */}
      <div className="p-3 border-t border-border/30">
        <button
          onClick={() => handleHashNav("waitlist")}
          className="gradient-btn w-full text-center text-sm"
        >
          Join Waitlist
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed top-0 left-0 h-screen w-64 z-40 sidebar-glass glow-border transition-transform duration-300 ${isCollapsed ? "-translate-x-full" : "translate-x-0"
          }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={close}
          />
          <aside className="absolute left-0 top-0 h-full w-72 sidebar-glass glow-border shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default AppSidebar;