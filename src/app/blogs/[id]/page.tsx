import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidElement, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronRight, Clock, Info, MessageCircle, Quote, RefreshCw, Rocket, Tag } from "lucide-react";
import {
    fetchBlogById,
    fetchBlogs,
    BlogServiceError,
    type BlogPost,
    type BlogPostDetail,
} from "../../../../services/BlogService";
import BlogList from "@/components/blog/BlogList";
import {
    Avatar,
    CategoryPill,
    PostStats,
    createHeadingIdFactory,
    extractHeadings,
    formatDate,
    readingTime,
    sortByNewest,
    timeAgo,
} from "@/components/blog/BlogMeta";
import { ArticleProgress, MobileTableOfContents, ShareButtons, TableOfContents } from "@/components/blog/ArticleClient";
import { LAUNCH_LABEL_INLINE } from "@/lib/launch";

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
            modifiedTime: post.updated_at,
            authors: [post.author_name],
            tags: post.tags.map((t) => t.name),
            images: post.featured_image ? [post.featured_image] : undefined,
        },
        twitter: {
            card: post.featured_image ? "summary_large_image" : "summary",
            title: post.title,
            description: post.excerpt,
        },
    };
}

function textOf(node: ReactNode): string {
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(textOf).join("");
    if (isValidElement(node)) return textOf((node.props as { children?: ReactNode }).children);
    return "";
}

function createMarkdownComponents(): Components {
    const idFor = createHeadingIdFactory();

    const Heading = (level: 2 | 3 | 4) =>
        function MdHeading({ children }: { children?: ReactNode }) {
            const id = idFor(textOf(children));
            const HeadingTag = `h${level}` as "h2" | "h3" | "h4";
            const size =
                level === 2
                    ? "mt-14 mb-5 text-[28px] md:text-[30px] tracking-[-0.6px]"
                    : level === 3
                      ? "mt-10 mb-4 text-[22px]"
                      : "mt-8 mb-3 text-[18px]";
            return (
                <HeadingTag id={id} className={`font-display group scroll-mt-28 font-bold leading-tight text-[#0B1120] ${size}`}>
                    {children}
                    <a
                        href={`#${id}`}
                        aria-label="Link to this section"
                        className="ml-2 inline-block text-emerald-500 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                    >
                        #
                    </a>
                </HeadingTag>
            );
        };

    return {
        h1: Heading(2),
        h2: Heading(2),
        h3: Heading(3),
        h4: Heading(4),
        h5: Heading(4),
        h6: Heading(4),
        p: ({ children }) => <p className="font-manrope mb-6 text-[17.5px] leading-[1.85] text-slate-700">{children}</p>,
        ul: ({ children }) => (
            <ul className="font-manrope mb-7 space-y-3 [&>li]:relative [&>li]:pl-7 [&>li]:text-[17.5px] [&>li]:leading-[1.8] [&>li]:text-slate-700 [&>li]:before:absolute [&>li]:before:left-1 [&>li]:before:top-[0.7em] [&>li]:before:h-2 [&>li]:before:w-2 [&>li]:before:rounded-full [&>li]:before:bg-emerald-500 [&>li]:before:ring-4 [&>li]:before:ring-emerald-100 [&>li]:before:content-['']">
                {children}
            </ul>
        ),
        ol: ({ children }) => (
            <ol className="font-manrope mb-7 list-decimal space-y-3 pl-6 text-[17.5px] leading-[1.8] text-slate-700 marker:font-bold marker:text-emerald-600">
                {children}
            </ol>
        ),
        strong: ({ children }) => <strong className="font-bold text-[#0B1120]">{children}</strong>,
        em: ({ children }) => <em className="italic text-slate-800">{children}</em>,
        a: ({ href, children }) => {
            const external = typeof href === "string" && /^https?:\/\//.test(href);
            return (
                <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="font-semibold text-emerald-700 underline decoration-emerald-300 decoration-2 underline-offset-4 transition-colors hover:text-emerald-800 hover:decoration-emerald-500"
                >
                    {children}
                </a>
            );
        },
        blockquote: ({ children }) => (
            <blockquote className="relative my-10 rounded-2xl border-l-4 border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50/40 py-6 pl-14 pr-6 [&_p]:mb-0 [&_p]:text-[18.5px] [&_p]:font-medium [&_p]:text-slate-800">
                <Quote size={22} className="absolute left-5 top-6 text-emerald-500" aria-hidden />
                {children}
            </blockquote>
        ),
        code: ({ children }) => (
            <code className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.88em] text-[#0B1120]">{children}</code>
        ),
        pre: ({ children }) => (
            <pre className="mb-7 overflow-x-auto rounded-2xl bg-[#0B1120] p-5 text-[14px] leading-relaxed text-slate-200 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit">
                {children}
            </pre>
        ),
        img: ({ src, alt }) => (
            <span className="my-10 block">
                <img
                    src={typeof src === "string" ? src : undefined}
                    alt={alt ?? ""}
                    loading="lazy"
                    className="w-full rounded-2xl border border-slate-200 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.4)]"
                />
                {alt && <span className="font-manrope mt-3 block text-center text-[13.5px] text-slate-500">{alt}</span>}
            </span>
        ),
        hr: () => (
            <hr className="my-12 h-px border-0 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        ),
    };
}

function WaitlistCard() {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#047857] via-[#0D9488] to-[#0284C7] p-6 text-white">
            <div className="bg-dot-grid-dark pointer-events-none absolute inset-0 opacity-80" />
            <div className="relative">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
                    <Rocket size={18} />
                </span>
                <p className="font-display mt-4 text-[18px] font-bold leading-snug">DigCare launches {LAUNCH_LABEL_INLINE}.</p>
                <p className="font-manrope mt-2 text-[13.5px] leading-relaxed text-emerald-50/90">
                    Book doctors, consult over video and keep your records in one app.
                </p>
                <Link
                    href="/#footer"
                    className="font-manrope group mt-5 inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-[13.5px] font-bold text-[#065F46] transition-transform hover:-translate-y-0.5"
                >
                    Join the waitlist
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>
        </div>
    );
}

export default async function BlogDetailPage({ params }: Props) {
    const { id } = await params;
    const post = await getPost(id);

    let more: BlogPost[] = [];
    try {
        const all = (await fetchBlogs({ next: { revalidate: 60 } })).filter((p) => p.id !== post.id);
        more = sortByNewest(all)
            .sort((a, b) => Number(b.category.slug === post.category.slug) - Number(a.category.slug === post.category.slug))
            .slice(0, 3);
    } catch {
        /* related posts are optional */
    }

    const toc = extractHeadings(post.content);
    const minutes = readingTime(post.content);
    const wasUpdated = new Date(post.updated_at).toDateString() !== new Date(post.published_at).toDateString();

    return (
        <div className="bg-white text-slate-700">
            <ArticleProgress>
                {/* Header */}
                <header className="relative overflow-hidden bg-[#F6FBF9] pb-40 pt-10 md:pt-14">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-emerald-200/50 blur-[130px]" />
                        <div className="absolute -left-20 top-20 h-[360px] w-[360px] rounded-full bg-sky-200/40 blur-[120px]" />
                        <div className="bg-dot-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
                    </div>

                    <div className="relative mx-auto max-w-[820px] px-6">
                        <nav aria-label="Breadcrumb" className="font-manrope flex flex-wrap items-center gap-1.5 text-[13px] font-semibold text-slate-500">
                            <Link href="/blogs" className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-slate-700 shadow-sm ring-1 ring-slate-200 transition-colors hover:text-emerald-700">
                                <ArrowLeft size={14} /> Blog
                            </Link>
                            <ChevronRight size={14} className="text-slate-300" />
                            <span>{post.category.name}</span>
                        </nav>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <CategoryPill category={post.category} />
                            {post.is_featured && (
                                <span className="font-manrope rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">Featured</span>
                            )}
                        </div>

                        <h1 className="font-display mt-5 text-[36px] font-bold leading-[1.08] tracking-[-1.2px] text-[#0B1120] sm:text-[46px] lg:text-[54px]">
                            {post.title}
                        </h1>
                        <p className="font-manrope mt-6 text-[18px] leading-[1.7] text-slate-600 md:text-[19px]">{post.excerpt}</p>

                        <div className="font-manrope mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 text-[14px] text-slate-500">
                            <div className="flex items-center gap-3">
                                <Avatar name={post.author_name} size={44} />
                                <div className="leading-tight">
                                    <p className="font-bold text-[#0B1120]">{post.author_name}</p>
                                    <p className="text-[12.5px]">DigCare Journal</p>
                                </div>
                            </div>
                            <span className="hidden h-8 w-px bg-slate-200 sm:block" />
                            <span className="inline-flex items-center gap-1.5">
                                <CalendarDays size={16} className="text-emerald-600" />
                                <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Clock size={16} className="text-emerald-600" />
                                {minutes} min read
                            </span>
                            {wasUpdated && (
                                <span className="inline-flex items-center gap-1.5">
                                    <RefreshCw size={15} className="text-emerald-600" />
                                    Updated <time dateTime={post.updated_at}>{formatDate(post.updated_at)}</time>
                                </span>
                            )}
                        </div>
                    </div>
                </header>

                {/* Cover */}
                <div className="relative mx-auto -mt-28 max-w-[1080px] px-6">
                    {post.featured_image ? (
                        <img
                            src={post.featured_image}
                            alt={post.title}
                            className="aspect-[16/8.5] w-full rounded-[2rem] border-4 border-white bg-white object-cover shadow-[0_40px_80px_-40px_rgba(15,23,42,0.5)]"
                        />
                    ) : (
                        <div className="h-px" />
                    )}
                </div>

                {/* Body */}
                <div className="mx-auto grid max-w-[1200px] gap-12 px-6 pb-16 pt-14 xl:grid-cols-[56px_minmax(0,720px)_260px] xl:justify-center">
                    <aside className="hidden xl:block">
                        <div className="sticky top-28">
                            <p className="font-manrope mb-3 text-center text-[10.5px] font-bold uppercase tracking-[1.6px] text-slate-400">Share</p>
                            <ShareButtons title={post.title} orientation="column" />
                        </div>
                    </aside>

                    <article className="min-w-0">
                        <div className="xl:hidden">
                            <MobileTableOfContents items={toc} />
                        </div>

                        <div className="[&>*:first-child]:mt-0">
                            <ReactMarkdown components={createMarkdownComponents()}>{post.content}</ReactMarkdown>
                        </div>

                        {post.tags.length > 0 && (
                            <div className="mt-12 flex flex-wrap items-center gap-2" aria-label="Tags">
                                <Tag size={16} className="mr-1 text-slate-400" />
                                {post.tags.map((t) => (
                                    <span
                                        key={t.id}
                                        className="font-manrope rounded-full bg-slate-100 px-3.5 py-1.5 text-[13px] font-semibold text-slate-600"
                                    >
                                        #{t.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        <aside className="mt-10 flex gap-4 rounded-2xl border border-sky-100 bg-sky-50/60 p-5">
                            <Info size={20} className="mt-0.5 flex-shrink-0 text-sky-600" />
                            <p className="font-manrope text-[14px] leading-relaxed text-slate-600">
                                This article is for general information only and isn&apos;t a substitute for professional medical
                                advice. If you&apos;re unwell, speak to a qualified health professional — and in an emergency,
                                contact emergency services or go to the nearest emergency department.
                            </p>
                        </aside>

                        <div className="mt-10 flex flex-col gap-5 rounded-3xl border border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar name={post.author_name} size={56} />
                                <div className="font-manrope">
                                    <p className="text-[12px] font-bold uppercase tracking-[1.4px] text-slate-400">Written by</p>
                                    <p className="font-display text-[18px] font-bold text-[#0B1120]">{post.author_name}</p>
                                    <p className="text-[13px] text-slate-500">Published {timeAgo(post.published_at)}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 sm:items-end">
                                <PostStats likes={post.like_count} comments={post.comment_count} />
                                <div className="xl:hidden">
                                    <ShareButtons title={post.title} />
                                </div>
                            </div>
                        </div>
                    </article>

                    <aside className="hidden xl:block">
                        <div className="sticky top-28 space-y-8">
                            <TableOfContents items={toc} />
                            <WaitlistCard />
                        </div>
                    </aside>
                </div>
            </ArticleProgress>

            {/* Comments */}
            <section id="comments" className="mx-auto max-w-[760px] px-6 pb-24">
                <div className="flex items-center gap-3">
                    <h2 className="font-display text-[26px] font-bold tracking-tight text-[#0B1120]">Comments</h2>
                    <span className="font-manrope rounded-full bg-slate-100 px-2.5 py-0.5 text-[13px] font-bold text-slate-600">
                        {post.comments.length}
                    </span>
                </div>

                {post.comments.length === 0 ? (
                    <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50/60 p-10 text-center">
                        <MessageCircle size={26} className="mx-auto text-slate-400" />
                        <p className="font-manrope mt-3 text-[15px] text-slate-600">No comments yet.</p>
                    </div>
                ) : (
                    <ul className="mt-6 space-y-4">
                        {post.comments.map((c) => (
                            <li key={c.id} className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-[0_16px_40px_-24px_rgba(15,23,42,0.3)]">
                                <Avatar name={c.author_name} size={42} />
                                <div className="font-manrope min-w-0">
                                    <div className="flex flex-wrap items-baseline gap-x-3">
                                        <span className="font-bold text-[#0B1120]">{c.author_name}</span>
                                        <time dateTime={c.created_at} className="text-[13px] text-slate-500">
                                            {timeAgo(c.created_at)}
                                        </time>
                                    </div>
                                    <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">{c.content}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* More reading */}
            {more.length > 0 && (
                <section className="relative overflow-hidden bg-[#F8FAFC] py-20 md:py-24">
                    <div className="pointer-events-none absolute right-0 top-0 h-[360px] w-[360px] rounded-full bg-emerald-100/70 blur-[120px]" />
                    <div className="relative mx-auto max-w-[1200px] px-6">
                        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <p className="font-manrope text-[11px] font-extrabold uppercase tracking-[2px] text-emerald-700">Keep reading</p>
                                <h2 className="font-display mt-2 text-[32px] font-bold tracking-tight text-[#0B1120]">More from the journal</h2>
                            </div>
                            <Link
                                href="/blogs"
                                className="group font-manrope inline-flex items-center gap-2 text-[14px] font-bold text-emerald-700 hover:text-emerald-800"
                            >
                                All stories <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                        <BlogList posts={more} />
                    </div>
                </section>
            )}
        </div>
    );
}
