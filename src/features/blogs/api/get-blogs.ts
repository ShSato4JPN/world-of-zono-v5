import { Blogs } from "@/types/microcms";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getBlogs = async (): Promise<Blogs> => {
  const res = await fetch("/api/blogs", {
    method: "GET",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return (await res.json()) as Blogs;
};

export const getBlogsQueryOptions = () => {
  return queryOptions({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });
};

export const useBlogs = () => {
  return useQuery({
    ...getBlogsQueryOptions(),
  });
};
