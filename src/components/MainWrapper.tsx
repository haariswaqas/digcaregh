"use client";

import { useSidebar } from "@/contexts/SidebarContext";

export default function MainWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isCollapsed } = useSidebar();

    return (
        <main
            className={`transition-all duration-300 pt-14 ${isCollapsed ? "lg:ml-0" : "lg:ml-64"
                }`}
        >
            {children}
        </main>
    );
}