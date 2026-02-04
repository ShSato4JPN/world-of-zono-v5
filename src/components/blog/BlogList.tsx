import type { Blog } from "@/lib/microcms";
import { BlogCard } from "./BlogCard";
import { EmptyState } from "./EmptyState";

type BlogListProps = {
  blogs: Blog[];
};

export function BlogList({ blogs }: BlogListProps) {
  if (blogs.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
