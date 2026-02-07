"use client";

import { useDebouncedValue } from "@mantine/hooks";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
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
  const t = useTranslations("blog");
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 300);
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [total, setTotal] = useState(totalCount);
  const [hasMore, setHasMore] = useState(initialBlogs.length < totalCount);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (debouncedQuery === "") {
      setBlogs(initialBlogs);
      setTotal(totalCount);
      setHasMore(initialBlogs.length < totalCount);
      return;
    }

    let cancelled = false;
    setIsSearching(true);

    (async () => {
      const params = new URLSearchParams({
        limit: String(limit),
        offset: "0",
        q: debouncedQuery,
      });
      const res = await fetch(`/api/blogs?${params}`);
      const data: BlogsResponse = await res.json();

      if (!cancelled) {
        setBlogs(data.contents);
        setTotal(data.totalCount);
        setHasMore(data.contents.length < data.totalCount);
        setIsSearching(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, initialBlogs, totalCount, limit]);

  const fetchMoreBlogs = useCallback(async () => {
    const offset = blogs.length;
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
    });
    if (debouncedQuery) {
      params.set("q", debouncedQuery);
    }
    const res = await fetch(`/api/blogs?${params}`);
    const data: BlogsResponse = await res.json();

    setBlogs((prev) => [...prev, ...data.contents]);
    setHasMore(blogs.length + data.contents.length < total);
  }, [blogs.length, limit, total, debouncedQuery]);

  const isActive = debouncedQuery !== "";

  return (
    <div>
      <div className="relative mb-8">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pr-4 pl-10 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
        />
      </div>

      {isSearching ? (
        <Loader />
      ) : blogs.length === 0 ? (
        isActive ? (
          <SearchEmptyState message={t("searchNoResults")} />
        ) : (
          <EmptyState />
        )
      ) : (
        <InfiniteScroll
          dataLength={blogs.length}
          next={fetchMoreBlogs}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={<EndMessage />}
        >
          <div className="flex flex-col gap-6">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

function SearchEmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Search className="mb-4 h-8 w-8 text-zinc-400 dark:text-zinc-500" />
      <p className="text-lg text-zinc-600 dark:text-zinc-400">{message}</p>
    </div>
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
