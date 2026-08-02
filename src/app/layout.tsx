import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MainWrapper from "@/components/MainWrapper";

export const metadata: Metadata = {
  title: "DigCare — Your Health. Reimagined. | Ghana's Healthcare Platform",
  description:
    "DigCare is Ghana's next-generation digital healthcare platform. Book appointments, consult doctors, manage your digital health card, and more.",
  icons: {
    icon: "/assets/digicare_app_icon.png",
    shortcut: "/assets/digicare_app_icon.png",
    apple: "/assets/digicare_app_icon.png",
  },
  openGraph: {
    title: "DigCare — Your Health. Reimagined.",
    description:
      "Ghana's next-generation healthcare platform — connecting patients, doctors, clinics, pharmacies, and labs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <div className="min-h-screen bg-background">
              <Navbar />
              <MainWrapper>
                {children}
                <Footer />
              </MainWrapper>
            </div>
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}