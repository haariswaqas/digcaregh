import type { Metadata } from "next";
import TermsContent from "@/components/TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service | DigCare Ghana",
  description:
    "Review DigCare's Terms of Service governing user eligibility, provider credential verification, telehealth services, health card security, prescriptions, lab results, payments via Paystack, and legal framework.",
  openGraph: {
    title: "Terms of Service — DigCare Healthcare Platform",
    description:
      "Official Terms of Service for DigCare patients, doctors, pharmacists, lab technicians, and facility administrators in Ghana.",
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
