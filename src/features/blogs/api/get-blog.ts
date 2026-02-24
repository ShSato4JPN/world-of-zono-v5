import { Blog } from "@/types/microcms";
import { queryOptions, useQuery } from "@tanstack/react-query";

const getBlog = async (id: string): Promise<Blog> => {
  const res = await fetch(`${process.env.SITE_URL}/api/blogs/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return (await res.json()) as Blog;
};

export const getBlogQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["blog", id],
    queryFn: () => getBlog(id),
  });
};

export const useBlog = (id: string) => {
  return useQuery({
    ...getBlogQueryOptions(id),
  });
};
