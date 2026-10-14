import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Layers, RefreshCw, WifiOff } from "lucide-react";
import { fetchBlogs, type BlogPost } from "../../../services/BlogService";
import BlogList from "@/components/blog/BlogList";
import { sortByNewest, timeAgo } from "@/components/blog/BlogMeta";
import EcgLine from "@/components/landing/EcgLine";
import { LAUNCH_LABEL } from "@/lib/launch";

export const metadata: Metadata = {
    title: "Blog | DigCare",
    description: "Practical health guides, privacy tips and product updates from the DigCare team.",
    openGraph: {
        title: "The DigCare Blog",
        description: "Practical health guides, privacy tips and product updates from the DigCare team.",
        type: "website",
    },
};

export const revalidate = 60;

export default async function BlogsPage() {
    let posts: BlogPost[] = [];
    let failed = false;

    try {
        posts = sortByNewest(await fetchBlogs({ next: { revalidate: 60 } }));
    } catch {
        failed = true;
    }

    const topics = new Set(posts.map((p) => p.category.slug)).size;
    const stats = [
        { icon: BookOpen, value: posts.length, label: posts.length === 1 ? "story" : "stories" },
        { icon: Layers, value: topics, label: topics === 1 ? "topic" : "topics" },
    ];

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="relative overflow-hidden bg-[#0B1120] pb-20 pt-20 md:pb-28 md:pt-28">
                <div className="pointer-events-none absolute inset-0">
                    <div className="bg-dot-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000_25%,transparent_75%)]" />
                    <div className="absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full bg-emerald-500/20 blur-[150px]" />
                    <div className="absolute -right-20 top-10 h-[420px] w-[420px] rounded-full bg-sky-500/15 blur-[140px]" />
                    <EcgLine
                        beats={6}
                        className="absolute bottom-6 left-0 h-20 w-full opacity-60"
                        color="rgba(52,211,153,0.6)"
                        trackColor="rgba(52,211,153,0.06)"
                        strokeWidth={1.25}
                        duration={8}
                    />
                </div>

                <div className="relative mx-auto max-w-[1200px] px-6">
                    <p className="font-manrope inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[1.8px] text-emerald-300 ring-1 ring-white/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        The DigCare Journal
                    </p>
                    <h1 className="font-display mt-7 max-w-[820px] text-[44px] font-bold leading-[1.02] tracking-[-1.8px] text-white sm:text-[60px] lg:text-[72px]">
                        Health, made{" "}
                        <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-300 bg-clip-text text-transparent">
                            clearer.
                        </span>
                    </h1>
                    <p className="font-manrope mt-6 max-w-[600px] text-[17px] leading-[1.75] text-slate-400 md:text-[18px]">
                        Practical guides to getting better care, keeping your health information safe, and making the most of
                        every visit — written by the DigCare team.
                    </p>

                    {!failed && posts.length > 0 && (
                        <ul className="mt-10 flex flex-wrap gap-3">
                            {stats.map(({ icon: Icon, value, label }) => (
                                <li
                                    key={label}
                                    className="font-manrope inline-flex items-center gap-2.5 rounded-2xl bg-white/[0.04] px-4 py-2.5 text-[14px] text-slate-300 ring-1 ring-white/10"
                                >
                                    <Icon size={16} className="text-emerald-300" />
                                    <span className="font-display text-[17px] font-bold text-white">{value}</span> {label}
                                </li>
                            ))}
                            <li className="font-manrope inline-flex items-center gap-2.5 rounded-2xl bg-white/[0.04] px-4 py-2.5 text-[14px] text-slate-300 ring-1 ring-white/10">
                                <RefreshCw size={15} className="text-emerald-300" />
                                Updated {timeAgo(posts[0].published_at)}
                            </li>
                        </ul>
                    )}
                </div>
            </section>

            {/* Stories */}
            <section className="relative py-12 md:py-16">
                <div className="mx-auto max-w-[1200px] px-6">
                    {failed ? (
                        <div className="rounded-[2rem] border border-amber-200 bg-amber-50 px-6 py-16 text-center">
                            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-amber-600 shadow-sm ring-1 ring-amber-200">
                                <WifiOff size={24} />
                            </span>
                            <h2 className="font-display mt-5 text-[22px] font-bold text-[#0B1120]">We couldn&apos;t load the articles</h2>
                            <p className="font-manrope mx-auto mt-2 max-w-[420px] text-[15px] text-slate-600">
                                Check your connection and refresh the page to try again.
                            </p>
                        </div>
                    ) : (
                        <BlogList posts={posts} showFilters featuredLead />
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="px-4 pb-20 sm:px-6 md:pb-28">
                <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#047857] via-[#0D9488] to-[#0284C7] px-8 py-14 text-center sm:px-14 md:py-16">
                    <div className="bg-dot-grid-dark pointer-events-none absolute inset-0 opacity-80" />
                    <div className="relative mx-auto max-w-[620px]">
                        <p className="font-manrope text-[12px] font-bold uppercase tracking-[2px] text-emerald-100">
                            Launching {LAUNCH_LABEL}
                        </p>
                        <h2 className="font-display mt-4 text-[32px] font-bold leading-tight tracking-[-1px] text-white md:text-[42px]">
                            Put these guides into practice.
                        </h2>
                        <p className="font-manrope mt-4 text-[16px] leading-relaxed text-emerald-50/90">
                            Join the waitlist and be among the first to book doctors, consult over video and manage your
                            health records in one app.
                        </p>
                        <Link
                            href="/#footer"
                            className="group font-manrope mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-[15px] font-bold text-[#065F46] shadow-[0_16px_30px_-12px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5"
                        >
                            Join the Waitlist
                            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
