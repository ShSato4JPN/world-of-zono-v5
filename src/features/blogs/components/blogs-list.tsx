"use client";

import BlogCard from "@/components/BlogCard";
import { useBlogs } from "../api/get-blogs";

export default function BlogsList() {
  const { data, isLoading } = useBlogs();

  return (
    <main className="flex justify-center">
      <div className="w-full flex flex-col gap-4 max-w-230 p-2 lg:p-4">
        {data?.contents.map((content) => (
          <BlogCard key={content.id} content={content} />
        ))}
      </div>
    </main>
  );
}
