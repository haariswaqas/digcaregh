"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckCircle } from "lucide-react";

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const Footer = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const url = process.env.NEXT_PUBLIC_WAITLIST_FORM_URL;
    const emailField = process.env.NEXT_PUBLIC_WAITLIST_FORM_EMAIL;
    const nameField = process.env.NEXT_PUBLIC_WAITLIST_FORM_NAME;

    if (!url || !emailField) {
      setSubmitted(true);
      setLoading(false);
      return;
    }

    const body = new URLSearchParams();
    if (nameField) body.append(nameField, formData.get("email") as string);
    body.append(emailField, formData.get("email") as string);

    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="footer" className="bg-[#fdfdfd] pt-16 pb-8 overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Logo & Socials */}
          <div className="md:col-span-6">
            <img src="/assets/digicareLogo.png" alt="DigCare" className="h-6 mb-6" />
            <div className="flex gap-3">
              <a href="https://www.instagram.com/digcareofficial" target="_blank"
                rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-[#f4f5f7] flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                <InstagramIcon />
              </a>
              <a href="https://x.com/DigcareSoftware" target="_blank"
                rel="noopener noreferrer" aria-label="X (Twitter)" className="w-9 h-9 rounded-full bg-[#f4f5f7] flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                <XIcon />
              </a>
              <a href="https://www.linkedin.com/company/digcare/" target="_blank"
                rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-[#f4f5f7] flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                <LinkedInIcon />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-semibold text-gray-800 mb-5 text-[15px]">Quick Links</h4>
            <ul className="space-y-3.5">
              <li><Link href="/#features" className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">App Features</Link></li>
              <li><Link href="/#how-it-works" className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">How it works</Link></li>
              <li><Link href="/services/health-card" className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Health Card</Link></li>
              <li><Link href="/#contact" className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal & Policy */}
          <div className="md:col-span-3">
            <h4 className="font-semibold text-gray-800 mb-5 text-[15px]">Legal & Compliance</h4>
            <ul className="space-y-3.5">
              <li><Link href="/terms" className="text-[14px] font-medium text-[#31708f] hover:text-[#255871] transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/#contact" className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">Support & Disputes</Link></li>
              <li><a href="mailto:legal@DigCare.com" className="text-[14px] text-gray-500 hover:text-gray-900 transition-colors">legal@DigCare.com</a></li>
            </ul>
          </div>
        </div>

        {/* Waitlist Section */}
        <div className="mb-20 max-w-[640px]">
          <p className="text-[14px] text-gray-600 mb-3 font-medium">Add your mail to be informed first when we launch digcare</p>
          {submitted ? (
            <div className="flex items-center gap-3 bg-[#e6f5ef] border border-[#a3e0c4] text-[#0a9c5a] px-5 py-3 rounded-full">
              <CheckCircle size={20} />
              <span className="text-sm font-medium">Thanks for joining our waitlist! We'll be in touch.</span>
            </div>
          ) : (
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="flex-1 bg-white border border-gray-200 rounded-full px-5 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#31708f] shadow-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#31708f] text-white rounded-full px-10 py-3 text-sm font-medium hover:bg-[#255871] transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? "Joining..." : "Join Waitlist"}
              </button>
            </form>
          )}
        </div>

        {/* Bottom copyright & watermark */}
        <div className="border-t border-gray-100 pt-8 flex justify-between items-end relative overflow-visible">
          <p className="text-[13px] text-gray-500 font-medium z-10 pb-4">
            ©2025,Digcare. All Rights Reserved
          </p>

          <div className="absolute right-0 bottom-[-20px] pointer-events-none select-none z-0 overflow-hidden">
            <span className="text-[140px] md:text-[200px] font-bold text-[#f0f4f8] leading-[0.75] tracking-tighter block mr-[-20px]">DigCare</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;