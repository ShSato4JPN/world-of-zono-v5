import type { Metadata } from "next";
import { BlogList } from "@/components/blog/BlogList";
import { getBlogs } from "@/lib/microcms";

export const metadata: Metadata = {
  title: "Blog | World of Zono",
  description: "Read the latest blog posts",
};

export default async function BlogsPage() {
  const { contents: blogs } = await getBlogs();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xl bg-white px-16 py-32 dark:bg-black">
        <header className="mb-12">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Blog
          </h1>
          <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Thoughts, ideas, and stories.
          </p>
        </header>

        <BlogList blogs={blogs} />
      </main>
    </div>
  );
}
