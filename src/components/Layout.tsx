"use client";

import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSidebar } from "@/contexts/SidebarContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <Navbar />
      <main
        className={`transition-all duration-300 pt-16 ${
          isCollapsed ? "lg:ml-0" : "lg:ml-64"
        }`}
      >
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
