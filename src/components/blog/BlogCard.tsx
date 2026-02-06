import { Link } from "@/i18n/navigation";
import type { Blog } from "@/lib/microcms";

type BlogCardProps = {
  blog: Blog;
};

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x([0-9A-Fa-f]+);/g, (_, hex) =>
      String.fromCharCode(Number.parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, dec) =>
      String.fromCharCode(Number.parseInt(dec, 10)),
    );
}

export function BlogCard({ blog }: BlogCardProps) {
  const excerpt = decodeHtmlEntities(
    blog.content.replace(/<[^>]*>/g, ""),
  ).trim();

  const publishedDate = new Date(blog.publishedAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group relative rounded-lg border border-zinc-200 p-6 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700">
      <div className="flex items-center gap-3">
        <time className="text-sm text-zinc-500 dark:text-zinc-500">
          {publishedDate}
        </time>
        {blog.categories &&
          blog.categories.length > 0 &&
          blog.categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="relative z-10 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            >
              {category.name}
            </Link>
          ))}
      </div>
      <h2 className="mt-2 text-xl font-semibold leading-8 tracking-tight text-black group-hover:text-zinc-700 dark:text-zinc-50 dark:group-hover:text-zinc-300">
        <Link
          href={`/blogs/${blog.id}`}
          className="after:absolute after:inset-0"
        >
          {blog.title}
        </Link>
      </h2>
      <p className="mt-2 line-clamp-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
        {excerpt}
      </p>
    </article>
  );
}
