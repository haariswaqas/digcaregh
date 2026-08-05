import type { Metadata } from "next";
import PrivacyContent from "@/components/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | DigCare Ghana",
  description:
    "DigCare Privacy Policy explaining data collection, health card security, Ghana Data Protection Act 2012 (Act 843) rights, Paystack billing protection, and Cloudinary encrypted storage.",
  openGraph: {
    title: "Privacy Policy — DigCare Healthcare Platform",
    description:
      "Comprehensive data protection & privacy policies for DigCare patients, doctors, pharmacists, labs, and facilities in Ghana.",
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
