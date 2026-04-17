import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Providers from "@/components/Providers";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "DigCare — Your Health. Reimagined. | Ghana's Healthcare Platform",
  description: "DigCare is Ghana's next-generation digital healthcare platform. Book appointments, consult doctors, manage your digital health card, and more.",
  openGraph: {
    title: "DigCare — Your Health. Reimagined.",
    description: "Ghana's next-generation healthcare platform — connecting patients, doctors, clinics, pharmacies, and labs.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <TooltipProvider>
            <SidebarProvider>
              <Toaster />
              <Sonner />
              <Layout>
                {children}
              </Layout>
            </SidebarProvider>
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}