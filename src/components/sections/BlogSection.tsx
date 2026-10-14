import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { fetchBlogs, type BlogPost } from "../../../services/BlogService";
import BlogList from "@/components/blog/BlogList";
import { sortByNewest } from "@/components/blog/BlogMeta";
import SectionHeading from "@/components/landing/SectionHeading";

export default async function BlogSection() {
  let posts: BlogPost[] = [];
  try {
    posts = await fetchBlogs({ next: { revalidate: 60 } });
  } catch {
    return null;
  }

  const latest = sortByNewest(posts).slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section id="blog" className="relative overflow-hidden bg-[#F8FAFC] py-24 md:py-32">
      <div className="pointer-events-none absolute right-[5%] top-[5%] h-[380px] w-[380px] rounded-full bg-amber-200/30 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 left-[10%] h-[320px] w-[320px] rounded-full bg-sky-200/30 blur-[120px]" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="From the DigCare blog"
            title={
              <>
                Guides for a <span className="text-gradient-brand">healthier you.</span>
              </>
            }
            subtitle="Practical how-tos, privacy tips and product news from the DigCare team."
          />
          <Link
            href="/blogs"
            className="group font-manrope inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-5 py-3 text-[14px] font-bold text-slate-800 shadow-sm transition-all hover:border-emerald-300 hover:text-emerald-700 md:self-auto"
          >
            View all articles
            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <BlogList posts={latest} variant="magazine" />
      </div>
    </section>
  );
}
