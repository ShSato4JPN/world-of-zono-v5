"use client";

import { Link } from "@/i18n/navigation";
import { Blog } from "@/types/microcms";
import dayjs from "dayjs";
import { Calendar, Clock, Tag } from "lucide-react";
import { useTranslations } from "next-intl";
import readingTime from "reading-time";
import { stripHtml } from "string-strip-html";

type Props = {
  content: Blog;
};

export default function BlogCard({ content }: Props) {
  const t = useTranslations("blog");
  const publishedAt = dayjs(content.publishedAt).format("YYYY-MM-DD");
  const stripedArticle = stripHtml(content.content).result.replace(/\n/g, " ");
  const readingTimeText = Math.ceil(readingTime(content.content).minutes);

  return (
    <article className="relative flex flex-col border rounded-lg backdrop-blur-xs p-4 gap-2 lg:cursor-pointer shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="flex flex-wrap gap-4 text-xs text-article-muted">
        <time className="inline-flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {publishedAt}
        </time>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {t("minRead", { minutes: readingTimeText })}
        </span>
      </div>
      <h2 className="font-bold text-lg leading-10">
        <Link
          href={`/blogs/${content.id}`}
          className="after:absolute after:inset-0"
        >
          {content.title}
        </Link>
      </h2>
      {content.category.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-2">
          {content.category.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.id}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              <Tag className="h-3.5 w-3.5" />
              {cat.name}
            </Link>
          ))}
        </div>
      )}
      <hr />
      <p className="line-clamp-3 text-sm leading-7">{stripedArticle}</p>
    </article>
  );
}
