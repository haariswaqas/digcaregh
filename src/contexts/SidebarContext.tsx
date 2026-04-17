"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface SidebarContextType {
  isOpen: boolean;
  isCollapsed: boolean;
  toggleOpen: () => void;
  toggleCollapsed: () => void;
  close: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  isCollapsed: false,
  toggleOpen: () => { },
  toggleCollapsed: () => { },
  close: () => { },
});

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        isCollapsed,
        toggleOpen: () => setIsOpen((v) => !v),
        toggleCollapsed: () => setIsCollapsed((v) => !v),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
