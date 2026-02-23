import { client } from "@/lib/microcms";
import type { Blog } from "@/types/microcms";
import BlogArticle from "./blog-article";

type Props = {
  id: string;
};

type AdjacentBlogs = {
  next: Blog | null;
  prev: Blog | null;
};

async function getAdjacentBlogs(currentId: string): Promise<AdjacentBlogs> {
  try {
    const response = await client.getList<Blog>({
      endpoint: "blogs",
      queries: { limit: 100, fields: "id,title" },
    });

    const blogs = response.contents;
    const currentIndex = blogs.findIndex((b) => b.id === currentId);

    return {
      next: currentIndex > 0 ? blogs[currentIndex - 1] : null,
      prev:
        currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null,
    };
  } catch {
    return { next: null, prev: null };
  }
}

export default async function Blog({ id }: Props) {
  const res = await fetch(`${process.env.SITE_URL}/api/blogs/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });
  const blog = (await res.json()) as Blog;

  const [adjacentBlogs, { highlightCode }] = await Promise.all([
    getAdjacentBlogs(id),
    import("@/lib/highlight"),
  ]);

  const highlightedContent = await highlightCode(blog.content || "");

  return (
    <BlogArticle
      blog={blog}
      highlightedContent={highlightedContent}
      adjacentBlogs={adjacentBlogs}
    />
  );
}
