import { ArticleContent } from "@/components/blog/ArticleContent";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Link } from "@/i18n/navigation";
import { extractToc } from "@/lib/toc";
import type { Blog } from "@/types/microcms";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import readingTime from "reading-time";

dayjs.extend(utc);

type AdjacentBlogs = {
  next: Blog | null;
  prev: Blog | null;
};

type Props = {
  blog: Blog;
  highlightedContent: string;
  adjacentBlogs: AdjacentBlogs;
};

export default async function BlogArticle({
  blog,
  highlightedContent,
  adjacentBlogs,
}: Props) {
  const [t, locale] = await Promise.all([getTranslations("blog"), getLocale()]);

  const publishedDate =
    locale === "ja"
      ? dayjs.utc(blog.publishedAt).format("YYYY年M月D日")
      : dayjs.utc(blog.publishedAt).format("MMMM D, YYYY");

  const stats = readingTime(blog.content || "");
  const readingTimeText = Math.ceil(stats.minutes);

  const tocItems = extractToc(blog.content || "");

  return (
    <div className="mx-auto max-w-6xl px-2 py-2 sm:px-6 sm:py-8 lg:px-12">
      <nav className="mb-8 sm:mb-12">
        <Link
          href="/blogs"
          className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {t("backToBlog")}
        </Link>
      </nav>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_280px] xl:gap-12">
        <article className="min-w-0">
          <header className="mb-8 sm:mb-12">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-zinc-500 sm:mb-6 sm:gap-4 dark:text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {publishedDate}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {t("minRead", { minutes: readingTimeText })}
              </span>
            </div>

            <h1 className="text-xl font-bold leading-snug tracking-tight text-zinc-900 sm:text-2xl md:text-3xl dark:text-zinc-50">
              {blog.title}
            </h1>

            {blog.category && blog.category.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {blog.category
                  .filter((cat) => cat.name !== "メモ")
                  .map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-sm transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                    >
                      <Tag className="h-3.5 w-3.5" />
                      {cat.name}
                    </Link>
                  ))}
              </div>
            )}

            <div className="mt-6 h-px w-full bg-linear-to-r from-zinc-200 via-zinc-300 to-transparent sm:mt-8 dark:from-zinc-800 dark:via-zinc-700" />
          </header>

          {tocItems.length > 0 && (
            <div className="mb-8 xl:hidden">
              <TableOfContents items={tocItems} variant="inline" />
            </div>
          )}

          <ArticleContent content={highlightedContent} />

          <footer className="mt-12 border-t border-zinc-200 pt-6 sm:mt-16 sm:pt-8 dark:border-zinc-800">
            <nav className="flex items-stretch justify-between gap-4">
              <div className="flex-1">
                {adjacentBlogs.next ? (
                  <Link
                    href={`/blogs/${adjacentBlogs.next.id}`}
                    className="group flex h-full flex-col items-start gap-1 rounded-lg border border-zinc-200 p-4 transition-all hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                  >
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                      <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
                      {t("nextPost")}
                    </span>
                    <span className="line-clamp-2 text-sm font-medium text-zinc-700 transition-colors group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-zinc-100">
                      {adjacentBlogs.next.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>

              <div className="flex-1">
                {adjacentBlogs.prev ? (
                  <Link
                    href={`/blogs/${adjacentBlogs.prev.id}`}
                    className="group flex h-full flex-col items-end gap-1 rounded-lg border border-zinc-200 p-4 text-right transition-all hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                  >
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                      {t("prevPost")}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="line-clamp-2 text-sm font-medium text-zinc-700 transition-colors group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-zinc-100">
                      {adjacentBlogs.prev.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </nav>
          </footer>
        </article>

        <div className="hidden xl:block">
          <TableOfContents items={tocItems} />
        </div>
      </div>
    </div>
  );
}
