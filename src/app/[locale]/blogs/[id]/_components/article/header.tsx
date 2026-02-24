import { Link } from "@/i18n/navigation";
import { Blog } from "@/types/microcms";
import dayjs from "dayjs";
import { Calendar, Clock, Tag } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import readingTime from "reading-time";

type ArticleHeaderProps = {
  title: string;
  publishedAt: string;
  content: string;
  category: Blog["category"];
};

export default function ArticleHeader({
  title,
  publishedAt,
  content,
  category,
}: ArticleHeaderProps) {
  const locale = useLocale();
  const t = useTranslations("blog");
  const publishedDate =
    locale === "ja"
      ? dayjs(publishedAt).format("YYYY年M月D日")
      : dayjs(publishedAt).format("MMMM D, YYYY");

  const stats = readingTime(content);
  const readingTimeText = Math.ceil(stats.minutes);

  return (
    <header className="border-b pb-4">
      <div className="flex flex-wrap gap-4 text-xs mb-4 text-article-muted">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          {publishedDate}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {t("minRead", { minutes: readingTimeText })}
        </span>
      </div>
      <h1 className="my-4 font-bold text-lg lg:text-2xl">{title}</h1>
      <>
        {category && category.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {category
              .filter((cat) => cat.name !== "メモ")
              .map((cat) => (
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
      </>
    </header>
  );
}
