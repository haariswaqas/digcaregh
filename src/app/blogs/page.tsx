import type { Metadata } from "next";
import { fetchBlogs, type BlogPost } from "../../../services/BlogService";
import BlogList from "@/components/blog/BlogList";
import { sortByNewest } from "@/components/blog/BlogMeta";

export const metadata: Metadata = {
    title: "Blog | DigCare",
    description:
        "Practical guides, privacy tips and product updates from the DigCare team.",
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

    return (
        <>
            <section className="bg-[#f4fafe] pb-16 pt-32">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-3 flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-[#c28b1e]">
                        The DigCare blog
                    </div>
                    <h1 className="mb-5 max-w-3xl font-heading text-4xl font-bold leading-tight tracking-tight text-[#020617] lg:text-[3.25rem]">
                        Health guides and updates from the DigCare team
                    </h1>
                    <p className="max-w-2xl text-[17px] leading-relaxed text-[#475569]">
                        Learn how to use DigCare, keep your health information safe, and get the most from every visit.
                    </p>
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-6">
                    {failed ? (
                        <div className="rounded-2xl border border-[#f3d9a4] bg-[#fffbeb] p-10 text-center">
                            <h2 className="mb-2 font-heading text-xl font-bold text-[#020617]">We couldn't load the articles</h2>
                            <p className="text-[#475569]">Check your connection and refresh the page to try again.</p>
                        </div>
                    ) : (
                        <BlogList posts={posts} showFilters featuredLead />
                    )}
                </div>
            </section>
        </>
    );
}