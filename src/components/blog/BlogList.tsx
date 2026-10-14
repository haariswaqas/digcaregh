"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Newspaper, Search, Sparkles, X } from "lucide-react";
import type { BlogCategory, BlogPost } from "../../../services/BlogService";
import { Avatar, CategoryPill, PostStats, accentFor, formatShortDate } from "./BlogMeta";

interface BlogListProps {
    posts: BlogPost[];
    /** "grid": cards in a grid. "magazine": one large story + compact list (homepage teaser). */
    variant?: "grid" | "magazine";
    /** Search box + category filter chips (used on /blogs) */
    showFilters?: boolean;
    /** Promote one post to a large lead card (used on /blogs) */
    featuredLead?: boolean;
}

const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2";

function Cover({ post, className = "" }: { post: BlogPost; className?: string }) {
    if (post.featured_image) {
        return <img src={post.featured_image} alt="" loading="lazy" className={`object-cover ${className}`} />;
    }
    const a = accentFor(post.category.slug);
    return (
        <div
            className={`relative flex items-center justify-center overflow-hidden ${className}`}
            style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}
        >
            <div className="bg-dot-grid-dark absolute inset-0 opacity-80" />
            <svg className="absolute inset-x-0 bottom-0 h-1/2 w-full opacity-30" viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden>
                <path d="M0 70 C 80 40, 160 100, 240 60 S 360 30, 400 50 V100 H0Z" fill="white" />
            </svg>
            <Newspaper className="relative text-white/80" size={44} strokeWidth={1.5} />
        </div>
    );
}

function Byline({ post, tone = "light" }: { post: BlogPost; tone?: "light" | "dark" }) {
    return (
        <div className={`flex items-center gap-2.5 text-[13px] ${tone === "dark" ? "text-white/80" : "text-slate-500"}`}>
            <Avatar name={post.author_name} size={28} />
            <span className={`font-semibold ${tone === "dark" ? "text-white" : "text-slate-800"}`}>{post.author_name}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.published_at}>{formatShortDate(post.published_at)}</time>
        </div>
    );
}

function LeadCard({ post }: { post: BlogPost }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group"
        >
            <Link
                href={`/blogs/${post.id}`}
                className={`relative grid overflow-hidden rounded-[2rem] bg-[#0B1120] shadow-[0_40px_80px_-40px_rgba(11,17,32,0.6)] lg:min-h-[480px] ${focusRing}`}
            >
                <div className="relative aspect-[16/10] overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto">
                    <Cover post={post} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 hidden bg-gradient-to-r from-[#0B1120] via-[#0B1120]/75 to-transparent lg:block" />
                </div>
                <div className="relative flex max-w-[620px] flex-col justify-center p-7 sm:p-10 lg:p-14">
                    <div className="flex flex-wrap items-center gap-3">
                        <CategoryPill category={post.category} variant="glass" />
                        {post.is_featured && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-bold text-amber-300 ring-1 ring-amber-300/30">
                                <Sparkles size={12} /> Featured
                            </span>
                        )}
                    </div>
                    <h2 className="font-display mt-6 text-[30px] font-bold leading-[1.1] tracking-[-0.8px] text-white sm:text-[40px]">
                        {post.title}
                    </h2>
                    <p className="font-manrope mt-4 line-clamp-3 text-[16.5px] leading-relaxed text-slate-300">{post.excerpt}</p>
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                        <Byline post={post} tone="dark" />
                        <span className="font-manrope inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13.5px] font-bold text-[#0B1120] transition-transform group-hover:-translate-y-0.5">
                            Read story <ArrowUpRight size={16} />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ delay: Math.min(index, 6) * 0.05, duration: 0.45 }}
            className="group h-full"
        >
            <Link
                href={`/blogs/${post.id}`}
                className={`flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.35)] ${focusRing}`}
            >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Cover post={post} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.06]" />
                    <div className="absolute left-4 top-4">
                        <CategoryPill category={post.category} variant="glass" />
                    </div>
                    <span className="absolute right-4 top-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-[#0B1120] opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight size={17} />
                    </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display line-clamp-2 text-[20px] font-bold leading-snug text-[#0B1120] transition-colors group-hover:text-emerald-700">
                        {post.title}
                    </h3>
                    <p className="font-manrope mt-2.5 line-clamp-3 text-[14.5px] leading-relaxed text-slate-600">{post.excerpt}</p>
                    <div className="mt-auto pt-6">
                        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                            <div className="flex min-w-0 items-center gap-2.5">
                                <Avatar name={post.author_name} size={32} />
                                <div className="font-manrope min-w-0 leading-tight">
                                    <p className="truncate text-[13px] font-bold text-slate-800">{post.author_name}</p>
                                    <time dateTime={post.published_at} className="text-[12px] text-slate-500">
                                        {formatShortDate(post.published_at)}
                                    </time>
                                </div>
                            </div>
                            <PostStats likes={post.like_count} comments={post.comment_count} />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

function CompactCard({ post, index }: { post: BlogPost; index: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
            className="group"
        >
            <Link
                href={`/blogs/${post.id}`}
                className={`flex gap-5 rounded-[1.5rem] border border-slate-200/80 bg-white p-3 pr-5 transition-all duration-300 hover:border-emerald-200 hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.3)] ${focusRing}`}
            >
                <div className="relative aspect-square w-28 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:w-36">
                    <Cover post={post} className="h-full w-full transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex min-w-0 flex-col justify-center py-1">
                    <div>
                        <CategoryPill category={post.category} />
                    </div>
                    <h3 className="font-display mt-2.5 line-clamp-2 text-[17px] font-bold leading-snug text-[#0B1120] transition-colors group-hover:text-emerald-700">
                        {post.title}
                    </h3>
                    <p className="font-manrope mt-2 text-[12.5px] text-slate-500">
                        {post.author_name} · {formatShortDate(post.published_at)}
                    </p>
                </div>
            </Link>
        </motion.article>
    );
}

function EmptyState({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
    return (
        <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50/60 px-6 py-16 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm ring-1 ring-slate-200">
                <Newspaper size={24} />
            </span>
            <h3 className="font-display mt-5 text-[20px] font-bold text-[#0B1120]">{title}</h3>
            <p className="font-manrope mx-auto mt-2 max-w-[420px] text-[15px] text-slate-600">{body}</p>
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}

function Magazine({ posts }: { posts: BlogPost[] }) {
    const [main, ...side] = posts;
    return (
        <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group"
            >
                <Link
                    href={`/blogs/${main.id}`}
                    className={`relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-[2rem] bg-[#0B1120] ${focusRing}`}
                >
                    <Cover post={main} className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/55 to-transparent" />
                    <div className="relative p-7 sm:p-9">
                        <CategoryPill category={main.category} variant="glass" />
                        <h3 className="font-display mt-4 text-[26px] font-bold leading-tight text-white sm:text-[32px]">{main.title}</h3>
                        <p className="font-manrope mt-3 line-clamp-2 text-[15px] leading-relaxed text-slate-300">{main.excerpt}</p>
                        <div className="mt-6 flex items-center justify-between gap-4">
                            <Byline post={main} tone="dark" />
                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0B1120] transition-transform duration-300 group-hover:rotate-45">
                                <ArrowUpRight size={19} />
                            </span>
                        </div>
                    </div>
                </Link>
            </motion.article>
            {side.length > 0 && (
                <div className="flex flex-col justify-center gap-4">
                    {side.map((p, i) => (
                        <CompactCard key={p.id} post={p} index={i} />
                    ))}
                </div>
            )}
        </div>
    );
}

function matches(post: BlogPost, q: string) {
    const hay = [post.title, post.excerpt, post.author_name, post.category.name, ...post.tags.map((t) => t.name)]
        .join(" ")
        .toLowerCase();
    return q
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
        .every((term) => hay.includes(term));
}

export default function BlogList({ posts, variant = "grid", showFilters = false, featuredLead = false }: BlogListProps) {
    const [active, setActive] = useState("all");
    const [query, setQuery] = useState("");

    const categories = useMemo(() => {
        const map = new Map<string, { category: BlogCategory; count: number }>();
        posts.forEach((p) => {
            const entry = map.get(p.category.slug);
            if (entry) entry.count++;
            else map.set(p.category.slug, { category: p.category, count: 1 });
        });
        return [...map.values()];
    }, [posts]);

    if (posts.length === 0) {
        return <EmptyState title="Stories are on the way" body="Our team is writing the first DigCare guides. Check back soon." />;
    }

    if (variant === "magazine") return <Magazine posts={posts} />;

    const trimmed = query.trim();
    const visible = posts.filter((p) => (active === "all" || p.category.slug === active) && (!trimmed || matches(p, trimmed)));
    const lead = featuredLead && active === "all" && !trimmed ? (visible.find((p) => p.is_featured) ?? visible[0]) : undefined;
    const rest = lead ? visible.filter((p) => p.id !== lead.id) : visible;

    const reset = () => {
        setActive("all");
        setQuery("");
    };

    return (
        <div>
            {showFilters && (
                <div className="sticky top-16 z-30 -mx-6 mb-10 border-b border-slate-200/70 bg-white/85 px-6 py-4 backdrop-blur-xl">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:pb-0" role="group" aria-label="Filter articles by category">
                            {[{ category: { slug: "all", name: "All stories" } as BlogCategory, count: posts.length }, ...categories].map(
                                ({ category: c, count }) => {
                                    const on = active === c.slug;
                                    return (
                                        <button
                                            key={c.slug}
                                            type="button"
                                            aria-pressed={on}
                                            onClick={() => setActive(c.slug)}
                                            className={`font-manrope inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-bold transition-all ${focusRing} ${
                                                on
                                                    ? "bg-[#0B1120] text-white shadow-[0_8px_20px_-8px_rgba(11,17,32,0.6)]"
                                                    : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                                            }`}
                                        >
                                            {c.name}
                                            <span
                                                className={`rounded-full px-1.5 py-0.5 text-[11px] leading-none ${
                                                    on ? "bg-white/20 text-white" : "bg-white text-slate-500"
                                                }`}
                                            >
                                                {count}
                                            </span>
                                        </button>
                                    );
                                }
                            )}
                        </div>

                        <label className="relative block w-full lg:w-[320px]">
                            <span className="sr-only">Search articles</span>
                            <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search guides, topics, authors…"
                                className="font-manrope w-full rounded-full border border-slate-200 bg-white py-2.5 pl-11 pr-10 text-[14px] text-slate-800 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-100 [&::-webkit-search-cancel-button]:hidden"
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery("")}
                                    aria-label="Clear search"
                                    className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
                                >
                                    <X size={13} />
                                </button>
                            )}
                        </label>
                    </div>
                </div>
            )}

            {lead && (
                <div className="mb-12">
                    <LeadCard post={lead} />
                </div>
            )}

            {(trimmed || active !== "all") && visible.length > 0 && (
                <p className="font-manrope mb-6 text-[14px] text-slate-500" aria-live="polite">
                    Showing <span className="font-bold text-slate-800">{visible.length}</span>{" "}
                    {visible.length === 1 ? "story" : "stories"}
                    {trimmed && (
                        <>
                            {" "}
                            for “<span className="font-semibold text-slate-800">{trimmed}</span>”
                        </>
                    )}
                </p>
            )}

            {visible.length === 0 ? (
                <EmptyState
                    title="No stories match"
                    body={trimmed ? `We couldn't find anything for “${trimmed}”. Try a different word or browse all stories.` : "No stories in this category yet."}
                    action={
                        <button
                            type="button"
                            onClick={reset}
                            className="font-manrope rounded-full bg-[#0B1120] px-5 py-2.5 text-[14px] font-bold text-white hover:bg-emerald-700"
                        >
                            Show all stories
                        </button>
                    }
                />
            ) : (
                rest.length > 0 && (
                    <motion.div layout className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
                        <AnimatePresence mode="popLayout">
                            {rest.map((post, i) => (
                                <BlogCard key={post.id} post={post} index={i} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )
            )}
        </div>
    );
}
