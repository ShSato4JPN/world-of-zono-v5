"use client";

import { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import type { Blog, BlogsResponse } from "@/lib/microcms";
import { BlogCard } from "./BlogCard";
import { EmptyState } from "./EmptyState";

type InfiniteBlogListProps = {
  initialBlogs: Blog[];
  totalCount: number;
  limit?: number;
};

export function InfiniteBlogList({
  initialBlogs,
  totalCount,
  limit = 10,
}: InfiniteBlogListProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [hasMore, setHasMore] = useState(initialBlogs.length < totalCount);

  const fetchMoreBlogs = useCallback(async () => {
    const offset = blogs.length;
    const res = await fetch(`/api/blogs?limit=${limit}&offset=${offset}`);
    const data: BlogsResponse = await res.json();

    setBlogs((prev) => [...prev, ...data.contents]);
    setHasMore(blogs.length + data.contents.length < totalCount);
  }, [blogs.length, limit, totalCount]);

  if (blogs.length === 0) {
    return <EmptyState />;
  }

  return (
    <InfiniteScroll
      dataLength={blogs.length}
      next={fetchMoreBlogs}
      hasMore={hasMore}
      loader={<Loader />}
      endMessage={<EndMessage />}
    >
      <div className="flex flex-col gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

function Loader() {
  return (
    <div className="flex justify-center py-8">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-600 dark:border-zinc-700 dark:border-t-zinc-400" />
    </div>
  );
}

function EndMessage() {
  return (
    <p className="py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
      すべての記事を読み込みました
    </p>
  );
}
