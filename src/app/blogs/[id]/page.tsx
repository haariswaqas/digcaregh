import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import { ArrowLeft, CalendarDays, Clock, RefreshCw } from "lucide-react";
import {
    fetchBlogById,
    fetchBlogs,
    BlogServiceError,
    type BlogPost,
    type BlogPostDetail,
} from "../../../../services/BlogService";
import BlogList from "@/components/blog/BlogList";
import {
    CategoryPill,
    PostStats,
    accentFor,
    formatDate,
    initials,
    readingTime,
    sortByNewest,
    timeAgo,
} from "@/components/blog/BlogMeta";

type Props = { params: Promise<{ id: string }> };

async function getPost(id: string): Promise<BlogPostDetail> {
    try {
        return await fetchBlogById(id, { next: { revalidate: 60 } });
    } catch (e) {
        if (e instanceof BlogServiceError && e.status === 404) notFound();
        throw e;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const post = await getPost(id);
    return {
        title: `${post.title} | DigCare`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.published_at,
            authors: [post.author_name],
            images: post.featured_image ? [post.featured_image] : undefined,
        },
    };
}

const md: Components = {
    h2: ({ children }) => (
        <h2 className="mb-4 mt-12 font-heading text-2xl font-bold tracking-tight text-[#020617]">{children}</h2>
    ),
    h3: ({ children }) => (
        <h3 className="mb-3 mt-8 font-heading text-xl font-bold text-[#020617]">{children}</h3>
    ),
    p: ({ children }) => <p className="mb-5 text-[17px] leading-8 text-[#334155]">{children}</p>,
    ul: ({ children }) => (
        <ul className="mb-6 space-y-3 [&>li]:relative [&>li]:pl-6 [&>li]:text-[17px] [&>li]:leading-8 [&>li]:text-[#334155] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-3 [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-full [&>li]:before:bg-[#30708f] [&>li]:before:content-['']">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="mb-6 list-decimal space-y-3 pl-6 text-[17px] leading-8 text-[#334155] marker:font-semibold marker:text-[#30708f]">
            {children}
        </ol>
    ),
    strong: ({ children }) => <strong className="font-semibold text-[#020617]">{children}</strong>,
    a: ({ href, children }) => (
        <a href={href} className="font-medium text-[#30708f] underline underline-offset-2 hover:text-[#255870]">
            {children}
        </a>
    ),
    blockquote: ({ children }) => (
        <blockquote className="mb-6 border-l-4 border-[#f59e0b] bg-[#fffbeb] py-3 pl-5 pr-4 text-[#475569]">
            {children}
        </blockquote>
    ),
};

function Avatar({ name, size = 40 }: { name: string; size?: number }) {
    const a = accentFor(name);
    return (
        <span
            aria-hidden
            className="flex flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
            style={{ width: size, height: size, background: a.tint, color: a.text }}
        >
            {initials(name)}
        </span>
    );
}

export default async function BlogDetailPage({ params }: Props) {
    const { id } = await params;
    const post = await getPost(id);

    // More reading: same category first, then newest
    let more: BlogPost[] = [];
    try {
        const all = (await fetchBlogs({ next: { revalidate: 60 } })).filter((p) => p.id !== post.id);
        more = sortByNewest(all)
            .sort((a, b) => Number(b.category.slug === post.category.slug) - Number(a.category.slug === post.category.slug))
            .slice(0, 3);
    } catch {
        /* related posts are optional */
    }

    const wasUpdated = new Date(post.updated_at).toDateString() !== new Date(post.published_at).toDateString();

    return (
        <div className="bg-white text-[#334155]">
            {/* Header */}
            <header className="bg-[#f4fafe] pb-36 pt-10">
                <div className="mx-auto max-w-3xl px-6">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 rounded text-sm font-semibold text-[#30708f] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#30708f] focus-visible:ring-offset-2"
                    >
                        <ArrowLeft size={16} /> All articles
                    </Link>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <CategoryPill category={post.category} />
                        {post.is_featured && <span className="text-sm font-semibold text-[#c28b1e]">Featured ⭐</span>}
                    </div>

                    <h1 className="mt-5 font-heading text-4xl font-bold leading-tight tracking-tight text-[#020617] lg:text-[2.75rem]">
                        {post.title}
                    </h1>
                    <p className="mt-5 text-[17px] leading-relaxed text-[#475569]">{post.excerpt}</p>

                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#475569]">
                        <div className="flex items-center gap-3">
                            <Avatar name={post.author_name} />
                            <span className="font-semibold text-[#020617]">{post.author_name}</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5">
                            <CalendarDays size={16} className="text-[#30708f]" />
                            <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Clock size={16} className="text-[#30708f]" />
                            {readingTime(post.content)} min read
                        </span>
                        {wasUpdated && (
                            <span className="inline-flex items-center gap-1.5">
                                <RefreshCw size={16} className="text-[#30708f]" />
                                Updated <time dateTime={post.updated_at}>{formatDate(post.updated_at)}</time>
                            </span>
                        )}
                    </div>
                </div>
            </header>

            {/* Cover image overlapping the header */}
            {post.featured_image && (
                <div className="mx-auto -mt-24 max-w-5xl px-6">
                    <img
                        src={post.featured_image}
                        alt={post.title}
                        className="aspect-[16/9] w-full rounded-2xl border border-[#e2edf3] bg-white object-cover shadow-lg"
                    />
                </div>
            )}

            {/* Article */}
            <article className="mx-auto max-w-3xl px-6 pb-12 pt-14">
                <ReactMarkdown components={md}>{post.content}</ReactMarkdown>

                {post.tags.length > 0 && (
                    <div className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
                        {post.tags.map((t) => (
                            <span
                                key={t.id}
                                className="rounded-full border border-[#e2edf3] bg-[#f4fafe] px-3 py-1 text-sm font-medium text-[#475569]"
                            >
                                {t.name}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-8 flex items-center justify-between border-y border-[#e2edf3] py-4">
                    <PostStats likes={post.like_count} comments={post.comment_count} />
                    <span className="text-sm text-[#64748b]">Published {timeAgo(post.published_at)}</span>
                </div>
            </article>

            {/* Comments */}
            <section id="comments" className="mx-auto max-w-3xl px-6 pb-20">
                <h2 className="mb-6 font-heading text-2xl font-bold tracking-tight text-[#020617]">
                    Comments <span className="text-[#64748b]">({post.comments.length})</span>
                </h2>

                {post.comments.length === 0 ? (
                    <p className="rounded-2xl border border-dashed border-[#cfe0e9] bg-[#f4fafe] p-8 text-center text-[#475569]">
                        No comments yet.
                    </p>
                ) : (
                    <ul className="space-y-4">
                        {post.comments.map((c) => (
                            <li key={c.id} className="flex gap-4 rounded-2xl border border-[#e2edf3] bg-white p-5 shadow-sm">
                                <Avatar name={c.author_name} />
                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-baseline gap-x-3">
                                        <span className="font-semibold text-[#020617]">{c.author_name}</span>
                                        <time dateTime={c.created_at} className="text-sm text-[#64748b]">
                                            {timeAgo(c.created_at)}
                                        </time>
                                    </div>
                                    <p className="mt-1 leading-relaxed text-[#475569]">{c.content}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* More reading */}
            {more.length > 0 && (
                <section className="bg-[#f4fafe] py-20">
                    <div className="mx-auto max-w-7xl px-6">
                        <h2 className="mb-10 font-heading text-3xl font-bold tracking-tight text-[#020617]">Keep reading</h2>
                        <BlogList posts={more} />
                    </div>
                </section>
            )}
        </div>
    );
}