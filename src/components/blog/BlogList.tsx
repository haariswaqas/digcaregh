"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { BlogCategory, BlogPost } from "../../../services/BlogService";
import { CategoryPill, PostStats, timeAgo } from "./BlogMeta";

interface BlogListProps {
    posts: BlogPost[];
    /** Show category filter chips (used on /blogs) */
    showFilters?: boolean;
    /** Promote one post to a large lead card (used on /blogs) */
    featuredLead?: boolean;
}

const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#30708f] focus-visible:ring-offset-2";

function Cover({ post, className }: { post: BlogPost; className?: string }) {
    return post.featured_image ? (
        <img src={post.featured_image} alt={post.title} loading="lazy" className={`object-cover ${className}`} />
    ) : (
        <div className={`bg-gradient-to-br from-[#30708f] to-[#10b981] ${className}`} />
    );
}

function Posted({ iso }: { iso: string }) {
    return (
        <time dateTime={iso} suppressHydrationWarning className="text-sm text-[#64748b]">
            {timeAgo(iso)}
        </time>
    );
}

function LeadCard({ post }: { post: BlogPost }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group overflow-hidden rounded-2xl border border-[#e2edf3] bg-white shadow-sm transition-shadow hover:shadow-lg"
        >
            <Link href={`/blogs/${post.id}`} className={`grid rounded-2xl lg:grid-cols-2 ${focusRing}`}>
                <div className="aspect-[16/10] overflow-hidden bg-[#f4fafe] lg:aspect-auto lg:min-h-[380px]">
                    <Cover post={post} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                    <div className="flex flex-wrap items-center gap-3">
                        <CategoryPill category={post.category} />
                        {post.is_featured && <span className="text-sm font-semibold text-[#c28b1e]">Featured ⭐</span>}
                    </div>
                    <h3 className="mt-5 font-heading text-3xl font-bold leading-tight tracking-tight text-[#020617]">
                        {post.title}
                    </h3>
                    <p className="mt-4 text-[17px] leading-relaxed text-[#475569]">{post.excerpt}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#64748b]">
                        <span className="font-medium text-[#020617]">{post.author_name}</span>
                        <Posted iso={post.published_at} />
                    </div>
                    <div className="mt-8 flex items-center justify-between border-t border-[#e2edf3] pt-5">
                        <PostStats likes={post.like_count} comments={post.comment_count} />
                        <span className="inline-flex items-center gap-2 font-semibold text-[#30708f]">
                            Read article
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
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
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="group overflow-hidden rounded-2xl border border-[#e2edf3] bg-white shadow-sm transition-shadow hover:shadow-lg"
        >
            <Link href={`/blogs/${post.id}`} className={`flex h-full flex-col rounded-2xl ${focusRing}`}>
                <div className="aspect-[16/10] overflow-hidden bg-[#f4fafe]">
                    <Cover post={post} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                    <div>
                        <CategoryPill category={post.category} />
                    </div>
                    <h3 className="mt-4 line-clamp-2 font-heading text-xl font-bold leading-snug text-[#020617]">
                        {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-[#475569]">{post.excerpt}</p>
                    <div className="mt-auto pt-6">
                        <div className="flex items-center justify-between border-t border-[#e2edf3] pt-4">
                            <Posted iso={post.published_at} />
                            <PostStats likes={post.like_count} comments={post.comment_count} />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

export default function BlogList({ posts, showFilters = false, featuredLead = false }: BlogListProps) {
    const [active, setActive] = useState("all");

    const categories = useMemo(() => {
        const map = new Map<string, BlogCategory>();
        posts.forEach((p) => map.set(p.category.slug, p.category));
        return [...map.values()];
    }, [posts]);

    const visible = active === "all" ? posts : posts.filter((p) => p.category.slug === active);
    const lead = featuredLead && active === "all" ? visible.find((p) => p.is_featured) ?? visible[0] : undefined;
    const rest = lead ? visible.filter((p) => p.id !== lead.id) : visible;

    if (posts.length === 0) {
        return (
            <p className="rounded-2xl border border-dashed border-[#cfe0e9] bg-[#f4fafe] p-12 text-center text-[#475569]">
                No articles yet. New guides are on the way.
            </p>
        );
    }

    return (
        <div>
            {showFilters && categories.length > 1 && (
                <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
                    {[{ slug: "all", name: "All articles" }, ...categories].map((c) => (
                        <button
                            key={c.slug}
                            type="button"
                            aria-pressed={active === c.slug}
                            onClick={() => setActive(c.slug)}
                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${focusRing} ${active === c.slug
                                ? "border-[#30708f] bg-[#30708f] text-white"
                                : "border-[#e2edf3] bg-white text-[#475569] hover:border-[#30708f] hover:text-[#30708f]"
                                }`}
                        >
                            {c.name}
                        </button>
                    ))}
                </div>
            )}

            {lead && (
                <div className="mb-8">
                    <LeadCard post={lead} />
                </div>
            )}

            {visible.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-[#cfe0e9] bg-[#f4fafe] p-12 text-center text-[#475569]">
                    No articles in this category yet.{" "}
                    <button type="button" onClick={() => setActive("all")} className="font-semibold text-[#30708f] underline">
                        Show all articles
                    </button>
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {rest.map((post, i) => (
                        <BlogCard key={post.id} post={post} index={i} />
                    ))}
                </div>
            )}
        </div>
    );
}