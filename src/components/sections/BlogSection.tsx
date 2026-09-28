import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchBlogs, type BlogPost } from "../../../services/BlogService";
import BlogList from "@/components/blog/BlogList";
import { sortByNewest } from "@/components/blog/BlogMeta";

export default async function BlogSection() {
    let posts: BlogPost[] = [];
    try {
        posts = await fetchBlogs({ next: { revalidate: 60 } });
    } catch {
        return null; // never break the homepage if the API is down
    }

    const latest = sortByNewest(posts).slice(0, 3);
    if (latest.length === 0) return null;

    return (
        <section id="blog" className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <div className="mb-3 flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-[#c28b1e]">
                            From the DigCare blog
                        </div>
                        <h2 className="mb-4 font-heading text-4xl font-bold leading-tight tracking-tight text-[#020617] lg:text-[2.75rem]">
                            Guides to help you get more from your care
                        </h2>
                        <p className="text-[17px] leading-relaxed text-[#475569]">
                            Practical how-tos, privacy tips and product updates from the DigCare team.
                        </p>
                    </div>
                    <Link
                        href="/blogs"
                        className="group inline-flex items-center gap-2 font-semibold text-[#30708f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#30708f] focus-visible:ring-offset-2"
                    >
                        View all articles
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <BlogList posts={latest} />
            </div>
        </section>
    );
}