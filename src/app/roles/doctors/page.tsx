import type { Metadata } from "next";
import DoctorsContent from "./DoctorsContent";

export const metadata: Metadata = {
  title: "Doctors — DigCare",
  description:
    "Run consultations, issue prescriptions, manage shifts and appointments, and chat with patients on DigCare.",
  openGraph: {
    title: "Doctors — DigCare",
    description:
      "Run consultations, issue prescriptions, manage shifts and appointments, and chat with patients on DigCare.",
  },
};

export default function DoctorsPage() {
  return <DoctorsContent />;
}
