"use client";

import Link, { useLinkStatus } from "next/link";
import { useEffect, useState, useSyncExternalStore, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

type NavItem =
  | { label: string; href: string; section: string; route?: never }
  | { label: string; href: string; route: string; section?: never };

// Section links always point at the homepage: other pages reuse ids like
// "health-card" and "contact", so we only scroll in place when already on "/".
const NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "/#features", section: "features" },
  { label: "Health Card", href: "/#health-card", section: "health-card" },
  { label: "How It Works", href: "/#how-it-works", section: "how-it-works" },
  { label: "Roles", href: "/roles", route: "/roles" },
  { label: "Blog", href: "/blogs", route: "/blogs" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

const SECTION_IDS = NAV_ITEMS.flatMap((item) => (item.section ? [item.section] : []));

/* ─── Hooks ─── */

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function useScrolled() {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 8,
    () => false
  );
}

/** Which homepage section sits in the middle of the viewport. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    const observe = () =>
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    observe();
    // Some sections stream in after first paint; pick them up once they exist.
    const late = setTimeout(observe, 1500);
    return () => {
      clearTimeout(late);
      observer.disconnect();
    };
  }, [enabled]);

  return enabled ? active : null;
}

/**
 * After arriving on the homepage with a hash (e.g. from another page),
 * scroll to the section once it has rendered.
 */
function useScrollToHashOnArrival(pathname: string) {
  useEffect(() => {
    if (pathname !== "/") return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    let tries = 0;
    const timer = setInterval(() => {
      const el = document.getElementById(id);
      if (el || ++tries > 50) {
        clearInterval(timer);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
    return () => clearInterval(timer);
  }, [pathname]);
}

/** Rendered inside a <Link>: a shimmering underline while that link's navigation is in flight. */
function PendingBar() {
  const { pending } = useLinkStatus();
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-x-3 bottom-1 h-[2px] overflow-hidden rounded-full bg-emerald-100 transition-opacity duration-200 ${
        pending ? "opacity-100" : "opacity-0"
      }`}
    >
      {pending && <span className="animate-shimmer absolute inset-y-0 left-0 w-1/2 rounded-full bg-emerald-500" />}
    </span>
  );
}

/* ─── Navbar ─── */

const Navbar = () => {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const onHome = pathname === "/";
  const scrolled = useScrolled();
  const activeSection = useActiveSection(onHome);
  useScrollToHashOnArrival(pathname);

  // Tied to the path it was opened on, so any navigation closes it.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const closeMenu = () => setMenuPath(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuPath(null);
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = (e: MediaQueryListEvent) => e.matches && setMenuPath(null);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open]);

  const isActive = (item: NavItem) =>
    item.route ? pathname === item.route || pathname.startsWith(`${item.route}/`) : onHome && activeSection === item.section;

  const onItemClick = (e: MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    closeMenu();
    if (!item.section || !onHome) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const el = document.getElementById(item.section);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.history.replaceState(window.history.state, "", `#${item.section}`);
  };

  const onLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (!onHome) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    window.history.replaceState(window.history.state, "", "/");
  };

  // The footer (and its waitlist form) is on every page, so stay where you are.
  const joinWaitlist = () => {
    closeMenu();
    const footer = document.getElementById("footer");
    if (!footer) return;
    footer.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.setTimeout(
      () => footer.querySelector<HTMLInputElement>('input[type="email"]')?.focus({ preventScroll: true }),
      reduce ? 0 : 700
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open
          ? "border-slate-200/80 bg-white/85 shadow-[0_6px_24px_-12px_rgba(11,17,32,0.18)] backdrop-blur-xl"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="flex h-16 items-center justify-between gap-6 px-6">
          <Link href="/" onClick={onLogoClick} className="flex items-center transition-opacity hover:opacity-80" aria-label="DigCare home">
            <img src="/assets/digicareLogo.png" alt="DigCare" className="h-10" />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  scroll={!item.section}
                  onClick={(e) => onItemClick(e, item)}
                  aria-current={active ? (item.route ? "page" : "location") : undefined}
                  className={`font-manrope relative rounded-full px-3.5 py-2 text-[14px] transition-colors duration-200 ${
                    active ? "font-bold text-emerald-700" : "font-medium text-[#0B1120] hover:text-emerald-700"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-emerald-50 ring-1 ring-emerald-100"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  {item.label}
                  <PendingBar />
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={joinWaitlist}
            className="group font-manrope hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2 text-[14px] font-bold text-white shadow-[0_8px_20px_-8px_rgba(16,185,129,0.6)] transition-all duration-200 hover:-translate-y-0.5 md:inline-flex"
          >
            Join Waitlist
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuPath(open ? null : pathname)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 rounded-xl p-2 text-[#0B1120] transition-colors hover:bg-slate-100 hover:text-emerald-700 md:hidden"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
          >
            <nav aria-label="Main" className="flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto px-6 pb-6 pt-2">
              {NAV_ITEMS.map((item, i) => {
                const active = isActive(item);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      scroll={!item.section}
                      onClick={(e) => onItemClick(e, item)}
                      aria-current={active ? (item.route ? "page" : "location") : undefined}
                      className={`font-manrope relative flex items-center justify-between border-b border-slate-100 py-3.5 text-[16px] transition-colors ${
                        active ? "font-bold text-emerald-700" : "font-medium text-[#0B1120] hover:text-emerald-700"
                      }`}
                    >
                      {item.label}
                      {active && <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />}
                      <PendingBar />
                    </Link>
                  </motion.div>
                );
              })}

              <button
                type="button"
                onClick={joinWaitlist}
                className="font-manrope mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-[15px] font-bold text-white shadow-[0_8px_20px_-8px_rgba(16,185,129,0.6)]"
              >
                Join Waitlist
                <ArrowRight size={16} />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
