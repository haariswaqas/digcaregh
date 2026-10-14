"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const roleLinks = [
  { label: "Patients", href: "/roles/patients", accent: "#10B981" },
  { label: "Doctors", href: "/roles/doctors", accent: "#1E3A8A" },
  { label: "Facility Admins", href: "/roles/facility-admins", accent: "#8B5CF6" },
  { label: "Insurance Providers", href: "/roles/insurance-providers", accent: "#6366F1" },
];

interface RolesNavProps {
  accentColor?: string;
}

const RolesNav = ({ accentColor = "#10B981" }: RolesNavProps) => {
  const pathname = usePathname();

  return (
    <nav
      className="overflow-x-auto scrollbar-hide border-b border-gray-100"
      aria-label="Role pages navigation"
    >
      <div className="flex gap-1 min-w-max px-6 py-2 max-w-[1200px] mx-auto">
        {roleLinks.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all duration-200"
              style={{
                fontFamily: "Manrope, sans-serif",
                background: isActive ? item.accent : "transparent",
                color: isActive ? "#fff" : "#64748b",
                ...(isActive ? {} : {}),
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLAnchorElement).style.color = item.accent;
                  (e.currentTarget as HTMLAnchorElement).style.background = `${item.accent}12`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#64748b";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default RolesNav;
