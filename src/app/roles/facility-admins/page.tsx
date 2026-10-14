import type { Metadata } from "next";
import FacilityAdminsContent from "./FacilityAdminsContent";

export const metadata: Metadata = {
  title: "Facility Administrators — DigCare",
  description:
    "Manage your clinic, pharmacy or lab on DigCare — billing, staff shifts, appointments, and insurance claims.",
  openGraph: {
    title: "Facility Administrators — DigCare",
    description:
      "Manage your clinic, pharmacy or lab on DigCare — billing, staff shifts, appointments, and insurance claims.",
  },
};

export default function FacilityAdminsPage() {
  return <FacilityAdminsContent />;
}
