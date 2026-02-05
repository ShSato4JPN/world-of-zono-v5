import dayjs from "dayjs";
import "dayjs/locale/ja";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import readingTime from "reading-time";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { getBlogById, getBlogs } from "@/lib/microcms";
import { extractToc } from "@/lib/toc";

dayjs.locale("ja");

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const blog = await getBlogById(id);
    return {
      title: `${blog.title} | Blog | World of Zono`,
      description: blog.content.replace(/<[^>]*>/g, "").slice(0, 160),
    };
  } catch {
    return {
      title: "Blog Post Not Found",
    };
  }
}

export async function generateStaticParams() {
  const { contents: blogs } = await getBlogs(100);
  return blogs.map((blog) => ({ id: blog.id }));
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;

  try {
    const blog = await getBlogById(id);

    const publishedDate = dayjs(blog.publishedAt).format("YYYY年M月D日");

    const stats = readingTime(blog.content);
    const readingTimeText = Math.ceil(stats.minutes);

    const tocItems = extractToc(blog.content);

    return (
      <div className="min-h-screen bg-linear-to-b from-zinc-50 to-white font-sans dark:from-zinc-950 dark:to-black">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-16 lg:px-12">
          {/* Navigation */}
          <nav className="mb-8 sm:mb-12">
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>
          </nav>

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_280px] xl:gap-12">
            {/* Main Content */}
            <article className="min-w-0">
              {/* Header */}
              <header className="mb-8 sm:mb-12">
                <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-zinc-500 sm:mb-6 sm:gap-4 dark:text-zinc-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {publishedDate}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {readingTimeText} min read
                  </span>
                </div>

                <h1 className="text-xl font-bold leading-snug tracking-tight text-zinc-900 sm:text-2xl md:text-3xl dark:text-zinc-50">
                  {blog.title}
                </h1>

                {/* Decorative line */}
                <div className="mt-6 h-px w-full bg-linear-to-r from-zinc-200 via-zinc-300 to-transparent sm:mt-8 dark:from-zinc-800 dark:via-zinc-700" />
              </header>

              {/* Content */}
              <ArticleContent content={blog.content} />

              {/* Footer */}
              <footer className="mt-12 border-t border-zinc-200 pt-6 sm:mt-16 sm:pt-8 dark:border-zinc-800">
                <Link
                  href="/blogs"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to all posts
                </Link>
              </footer>
            </article>

            {/* Desktop TOC - Hidden on mobile, shown in sidebar on xl */}
            <div className="hidden xl:block">
              <TableOfContents items={tocItems} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
