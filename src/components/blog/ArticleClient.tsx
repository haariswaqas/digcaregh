"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Check, ChevronDown, Link2, ListTree, MessageCircle, Share2 } from "lucide-react";
import type { TocItem } from "./BlogMeta";

/* ─── Reading progress ─── */

export function ArticleProgress({ children }: { children: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 64px", "end end"] });
    const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

    return (
        <>
            <motion.div
                aria-hidden
                className="fixed inset-x-0 top-16 z-40 h-[3px] origin-left bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400"
                style={{ scaleX }}
            />
            <div ref={ref}>{children}</div>
        </>
    );
}

/* ─── Table of contents ─── */

function useActiveHeading(ids: string[]) {
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
        if (els.length === 0) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: "-90px 0px -65% 0px" }
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [ids]);

    return active;
}

function TocLinks({ items, active, onNavigate }: { items: TocItem[]; active: string | null; onNavigate?: () => void }) {
    return (
        <ol className="space-y-0.5 border-l border-slate-200">
            {items.map((item) => {
                const on = item.id === active;
                return (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            onClick={onNavigate}
                            className={`font-manrope -ml-px block border-l-2 py-1.5 text-[13.5px] leading-snug transition-colors ${
                                item.level === 3 ? "pl-7" : "pl-4"
                            } ${
                                on
                                    ? "border-emerald-500 font-bold text-emerald-700"
                                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
                            }`}
                        >
                            {item.text}
                        </a>
                    </li>
                );
            })}
        </ol>
    );
}

export function TableOfContents({ items }: { items: TocItem[] }) {
    const [ids] = useState(() => items.map((i) => i.id));
    const active = useActiveHeading(ids);
    if (items.length < 2) return null;

    return (
        <nav aria-label="On this page">
            <p className="font-manrope mb-4 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[1.8px] text-slate-400">
                <ListTree size={14} /> On this page
            </p>
            <TocLinks items={items} active={active} />
        </nav>
    );
}

export function MobileTableOfContents({ items }: { items: TocItem[] }) {
    const [open, setOpen] = useState(false);
    if (items.length < 2) return null;

    return (
        <div className="mb-10 rounded-2xl border border-slate-200 bg-slate-50/70">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                className="font-manrope flex w-full items-center justify-between px-5 py-4 text-[14px] font-bold text-slate-800"
            >
                <span className="flex items-center gap-2">
                    <ListTree size={16} className="text-emerald-600" /> On this page
                </span>
                <ChevronDown size={18} className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className="px-5 pb-5">
                    <TocLinks items={items} active={null} onNavigate={() => setOpen(false)} />
                </div>
            )}
        </div>
    );
}

/* ─── Share ─── */

const noopSubscribe = () => () => {};

function usePageUrl() {
    return useSyncExternalStore(
        noopSubscribe,
        () => window.location.href,
        () => ""
    );
}

function useCanNativeShare() {
    return useSyncExternalStore(
        noopSubscribe,
        () => typeof navigator.share === "function",
        () => false
    );
}

function XGlyph() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

function LinkedInGlyph() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

export function ShareButtons({ title, orientation = "row" }: { title: string; orientation?: "row" | "column" }) {
    const url = usePageUrl();
    const canShare = useCanNativeShare();
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard unavailable — nothing to do */
        }
    };

    const enc = encodeURIComponent;
    const links = [
        { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`, icon: <XGlyph /> },
        { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`, icon: <LinkedInGlyph /> },
        { label: "Share on WhatsApp", href: `https://wa.me/?text=${enc(`${title} ${url}`)}`, icon: <MessageCircle size={16} /> },
    ];

    const btn =
        "flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md";

    return (
        <div className={`flex items-center gap-2 ${orientation === "column" ? "flex-col" : "flex-wrap"}`}>
            <button type="button" onClick={copy} aria-label={copied ? "Link copied" : "Copy link"} title={copied ? "Copied!" : "Copy link"} className={btn}>
                {copied ? <Check size={16} className="text-emerald-600" /> : <Link2 size={16} />}
            </button>
            {url &&
                links.map((l) => (
                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} title={l.label} className={btn}>
                        {l.icon}
                    </a>
                ))}
            {canShare && (
                <button
                    type="button"
                    onClick={() => navigator.share({ title, url: window.location.href }).catch(() => {})}
                    aria-label="Share"
                    title="Share"
                    className={btn}
                >
                    <Share2 size={16} />
                </button>
            )}
        </div>
    );
}
