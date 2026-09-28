"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleWaitlist = () => {
    if (pathname === "/") {
      scrollTo("footer");
    } else {
      router.push("/#footer");
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white transition-all duration-300">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
              <img src="/assets/digicareLogo.png" alt="DigCare" className="h-10" />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Features", id: "features" },
              { label: "Blog", id: "blog" },
              { label: "Health Card", id: "health-card" },
              { label: "How It Works", id: "how-it-works" },
              { label: "Contact", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-[14px] font-medium text-gray-600 hover:text-[#0a9c5a] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={handleWaitlist}
            className="bg-[#30708f] text-white hover:bg-[#255a73] transition-colors text-sm py-2 px-6 rounded-full font-semibold shadow-sm"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
// deploye