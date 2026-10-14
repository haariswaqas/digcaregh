import type { Metadata } from "next";
import RolesOverviewContent from "./RolesOverviewContent";

export const metadata: Metadata = {
  title: "Who is DigCare for? · DigCare",
  description:
    "DigCare serves every person in Ghana's healthcare system — patients, doctors, pharmacists, lab technicians, administrators, and insurers.",
  openGraph: {
    title: "Who is DigCare for? — DigCare",
    description:
      "DigCare serves every person in Ghana's healthcare system — patients, doctors, pharmacists, lab technicians, administrators, and insurers.",
  },
};

export default function RolesPage() {
  return <RolesOverviewContent />;
}
