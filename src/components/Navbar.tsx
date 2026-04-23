"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const { toggleOpen, toggleCollapsed, isCollapsed } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleWaitlist = () => {
    if (pathname === "/") {
      scrollTo("waitlist");
    } else {
      router.push("/#waitlist");
    }
  };

  return (
    <header
      className={`fixed top-0 right-0 z-30 transition-all duration-300 ${isCollapsed ? "lg:left-0" : "lg:left-64"
        } left-0`}
    >
      <div className="sidebar-glass glow-border border-b">
        <div className="flex items-center justify-between px-4 h-14 max-w-full">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleOpen}
              className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <button
              onClick={toggleCollapsed}
              className="hidden lg:flex p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
            {/* Logo only visible when sidebar is collapsed */}
            <Link
              href="/"
              className={`flex items-center transition-all duration-300 ${isCollapsed ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none lg:opacity-0"
                } lg:block`}
            >
              <img src="/assets/digicareLogo.png" alt="DigCare" className="h-7" />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Features", id: "features" },
              { label: "Health Card", id: "health-card" },
              { label: "How It Works", id: "how-it-works" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-all"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={handleWaitlist}
            className="gradient-btn text-sm py-2 px-4"
          >
            Join the Waitlist
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;