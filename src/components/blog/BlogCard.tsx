import Link from "next/link";
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
    <Link href={`/blogs/${blog.id}`} className="group block">
      <article className="rounded-lg border border-zinc-200 p-6 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700">
        <time className="text-sm text-zinc-500 dark:text-zinc-500">
          {publishedDate}
        </time>
        <h2 className="mt-2 text-xl font-semibold leading-8 tracking-tight text-black group-hover:text-zinc-700 dark:text-zinc-50 dark:group-hover:text-zinc-300">
          {blog.title}
        </h2>
        <p className="mt-2 line-clamp-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
          {excerpt}
        </p>
      </article>
    </Link>
  );
}
