import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogById, getBlogs } from "@/lib/microcms";

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

    const publishedDate = new Date(blog.publishedAt).toLocaleDateString(
      "ja-JP",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );

    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="min-h-screen w-full max-w-3xl bg-white px-16 py-32 dark:bg-black">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            &larr; Back to Blog
          </Link>

          <article className="mt-8">
            <header className="mb-8">
              <time className="text-sm text-zinc-500 dark:text-zinc-500">
                {publishedDate}
              </time>
              <h1 className="mt-2 text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                {blog.title}
              </h1>
            </header>

            <div
              className="prose prose-zinc dark:prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>
        </main>
      </div>
    );
  } catch {
    notFound();
  }
}
