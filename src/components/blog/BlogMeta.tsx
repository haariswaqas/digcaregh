import { Heart, MessageCircle } from "lucide-react";
import type { BlogCategory, BlogPost } from "../../../services/BlogService";

/* Accent palette taken from the site theme (teal / amber / green) */
const ACCENTS = [
    { solid: "#30708f", text: "#30708f", tint: "#30708f14" },
    { solid: "#f59e0b", text: "#b45309", tint: "#f59e0b1f" },
    { solid: "#10b981", text: "#047857", tint: "#10b9811a" },
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
    });
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

export function CategoryPill({ category }: { category: BlogCategory }) {
    const a = accentFor(category.slug);
    return (
        <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: a.tint, color: a.text }}
        >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: a.solid }} />
            {category.name}
        </span>
    );
}

export function PostStats({ likes, comments }: { likes: number; comments: number }) {
    return (
        <div className="flex items-center gap-4 text-sm text-[#475569]">
            <span className="inline-flex items-center gap-1.5" aria-label={`${likes} likes`}>
                <Heart size={16} className="text-rose-500" />
                {likes}
            </span>
            <span className="inline-flex items-center gap-1.5" aria-label={`${comments} comments`}>
                <MessageCircle size={16} className="text-[#30708f]" />
                {comments}
            </span>
        </div>
    );
}