import type { Metadata } from "next";
import PatientsContent from "./PatientsContent";

export const metadata: Metadata = {
  title: "Patients — DigCare",
  description:
    "Book appointments, manage prescriptions, pay bills, and control your health records — all in one app.",
  openGraph: {
    title: "Patients — DigCare",
    description:
      "Book appointments, manage prescriptions, pay bills, and control your health records — all in one app.",
  },
};

export default function PatientsPage() {
  return <PatientsContent />;
}
