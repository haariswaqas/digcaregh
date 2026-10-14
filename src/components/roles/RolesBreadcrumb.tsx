"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface RolesBreadcrumbProps {
  items?: BreadcrumbItem[];
}

const RolesBreadcrumb = ({ items = [] }: RolesBreadcrumbProps) => {
  const crumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Who is DigCare For?", href: "/roles" },
    ...items,
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-[13px] py-4 px-6 max-w-[1200px] mx-auto"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      {crumbs.map((crumb, index) => (
        <span key={index} className="flex items-center gap-1.5">
          {index === 0 && <Home size={13} className="text-gray-400 flex-shrink-0" />}
          {crumb.href && index < crumbs.length - 1 ? (
            <Link
              href={crumb.href}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="text-gray-700 font-medium">{crumb.label}</span>
          )}
          {index < crumbs.length - 1 && (
            <ChevronRight size={13} className="text-gray-300 flex-shrink-0" />
          )}
        </span>
      ))}
    </nav>
  );
};

export default RolesBreadcrumb;
