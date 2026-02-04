import { createClient } from "microcms-js-sdk";

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
};

export type BlogsResponse = {
  contents: Blog[];
  totalCount: number;
  offset: number;
  limit: number;
};

export async function getBlogs(
  limit: number = 10,
  offset: number = 0,
): Promise<BlogsResponse> {
  return client.get<BlogsResponse>({
    endpoint: "blogs",
    queries: { limit, offset },
  });
}

export async function getBlogById(id: string): Promise<Blog> {
  return client.get<Blog>({
    endpoint: "blogs",
    contentId: id,
  });
}
