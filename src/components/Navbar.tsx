import Link from "next/link";
import { Menu } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";

const Navbar = () => {
  const { toggleOpen, toggleCollapsed, isCollapsed } = useSidebar();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 right-0 z-30 transition-all duration-300 ${
        isCollapsed ? "lg:left-0" : "lg:left-64"
      } left-0`}
    >
      <div className="sidebar-glass glow-border border-b">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleOpen}
              className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
            >
              <Menu size={22} />
            </button>
            <button
              onClick={toggleCollapsed}
              className="hidden lg:flex p-2 rounded-md text-muted-foreground hover:text-foreground"
            >
              <Menu size={22} />
            </button>
            <Link href="/" className="flex items-center">
              <img src="/assets/digicareLogo.png" alt="DigCare" className="h-8" />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollTo("features")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </button>
            <button onClick={() => scrollTo("health-card")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Health Card
            </button>
            <button onClick={() => scrollTo("how-it-works")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </button>
            <button onClick={() => scrollTo("contact")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </button>
          </nav>

          <button onClick={() => scrollTo("waitlist")} className="gradient-btn text-sm py-2 px-4">
            Join the Waitlist
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
