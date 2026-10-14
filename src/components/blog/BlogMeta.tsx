import { Heart, MessageCircle } from "lucide-react";
import type { BlogCategory, BlogPost } from "../../../services/BlogService";

/* Accent palette from the site theme (emerald / sky / amber / violet) */
const ACCENTS = [
    { solid: "#10B981", text: "#047857", tint: "#10B9811A", from: "#059669", to: "#14B8A6" },
    { solid: "#0EA5E9", text: "#0369A1", tint: "#0EA5E91A", from: "#0284C7", to: "#22D3EE" },
    { solid: "#F59E0B", text: "#B45309", tint: "#F59E0B1F", from: "#D97706", to: "#FBBF24" },
    { solid: "#8B5CF6", text: "#6D28D9", tint: "#8B5CF61A", from: "#7C3AED", to: "#A78BFA" },
];

/** Stable accent per key, so a category always keeps the same colour. */
export function accentFor(key: string) {
    const sum = [...key].reduce((s, c) => s + c.charCodeAt(0), 0);
    return ACCENTS[sum % ACCENTS.length];
}

export function timeAgo(iso: string): string {
    const diff = (new Date(iso).getTime() - Date.now()) / 1000;
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const units: [Intl.RelativeTimeFormatUnit, number][] = [
        ["year", 31536000],
        ["month", 2592000],
        ["week", 604800],
        ["day", 86400],
        ["hour", 3600],
        ["minute", 60],
    ];
    for (const [unit, secs] of units) {
        if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit);
    }
    return "just now";
}

export function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    });
}

export function formatShortDate(iso: string): string {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export function readingTime(text: string): number {
    return Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));
}

export function initials(name: string): string {
    return name
        .split(/[.\s_-]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0].toUpperCase())
        .join("");
}

export function sortByNewest(posts: BlogPost[]): BlogPost[] {
    return [...posts].sort(
        (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );
}

export function slugify(text: string): string {
    return text
        .normalize("NFKD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/** Assigns unique ids to headings in document order (`intro`, `intro-2`, …). */
export function createHeadingIdFactory() {
    const seen = new Map<string, number>();
    return (text: string) => {
        const base = slugify(text) || "section";
        const count = (seen.get(base) ?? 0) + 1;
        seen.set(base, count);
        return count === 1 ? base : `${base}-${count}`;
    };
}

export interface TocItem {
    id: string;
    text: string;
    level: 2 | 3;
}

function stripInlineMarkdown(s: string): string {
    return s
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/[*_`~]/g, "")
        .replace(/\s+#+\s*$/, "")
        .trim();
}

/** All headings in document order, ids assigned the same way the renderer assigns them. */
export function extractHeadings(markdown: string): TocItem[] {
    const idFor = createHeadingIdFactory();
    const items: TocItem[] = [];
    let inFence = false;
    for (const line of markdown.split(/\r?\n/)) {
        if (/^\s*(```|~~~)/.test(line)) {
            inFence = !inFence;
            continue;
        }
        if (inFence) continue;
        const m = /^(#{1,6})\s+(.+)$/.exec(line);
        if (!m) continue;
        const text = stripInlineMarkdown(m[2]);
        const id = idFor(text);
        const level = m[1].length;
        if (level === 2 || level === 3) items.push({ id, text, level });
    }
    return items;
}

export function CategoryPill({ category, variant = "tint" }: { category: BlogCategory; variant?: "tint" | "glass" }) {
    const a = accentFor(category.slug);
    if (variant === "glass") {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#0B1120] shadow-sm backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: a.solid }} />
                {category.name}
            </span>
        );
    }
    return (
        <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
            style={{ background: a.tint, color: a.text }}
        >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: a.solid }} />
            {category.name}
        </span>
    );
}

export function Avatar({ name, size = 40 }: { name: string; size?: number }) {
    const a = accentFor(name);
    return (
        <span
            aria-hidden
            className="flex flex-shrink-0 items-center justify-center rounded-full font-bold text-white"
            style={{
                width: size,
                height: size,
                fontSize: Math.round(size * 0.36),
                background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
            }}
        >
            {initials(name)}
        </span>
    );
}

export function PostStats({ likes, comments, tone = "light" }: { likes: number; comments: number; tone?: "light" | "dark" }) {
    return (
        <div className={`flex items-center gap-4 text-sm ${tone === "dark" ? "text-white/80" : "text-slate-500"}`}>
            <span className="inline-flex items-center gap-1.5" aria-label={`${likes} likes`}>
                <Heart size={15} className="text-rose-500" />
                {likes}
            </span>
            <span className="inline-flex items-center gap-1.5" aria-label={`${comments} comments`}>
                <MessageCircle size={15} className={tone === "dark" ? "text-sky-300" : "text-sky-600"} />
                {comments}
            </span>
        </div>
    );
}
