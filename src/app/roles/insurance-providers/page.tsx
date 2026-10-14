import type { Metadata } from "next";
import InsuranceContent from "./InsuranceContent";

export const metadata: Metadata = {
  title: "Insurance Providers — DigCare",
  description:
    "Review and manage healthcare insurance claims from accredited DigCare facilities.",
  openGraph: {
    title: "Insurance Providers — DigCare",
    description:
      "Review and manage healthcare insurance claims from accredited DigCare facilities.",
  },
};

export default function InsuranceProvidersPage() {
  return <InsuranceContent />;
}
