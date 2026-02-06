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

export type Category = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

export type CategoriesResponse = {
  contents: Category[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type Eyecatch = {
  url: string;
  width: number;
  height: number;
};

export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  categories?: Category[];
  eyecatch?: Eyecatch;
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

export async function getCategories(): Promise<CategoriesResponse> {
  return client.get<CategoriesResponse>({
    endpoint: "categories",
    queries: { limit: 100 },
  });
}

export async function getCategoryById(id: string): Promise<Category> {
  return client.get<Category>({
    endpoint: "categories",
    contentId: id,
  });
}

export async function getBlogsByCategory(
  categoryId: string,
  limit: number = 10,
  offset: number = 0,
): Promise<BlogsResponse> {
  return client.get<BlogsResponse>({
    endpoint: "blogs",
    queries: {
      limit,
      offset,
      filters: `categories[contains]${categoryId}`,
    },
  });
}

export type AdjacentBlogs = {
  prev: Pick<Blog, "id" | "title"> | null;
  next: Pick<Blog, "id" | "title"> | null;
};

export async function getAdjacentBlogs(
  currentId: string,
): Promise<AdjacentBlogs> {
  const { contents: blogs } = await getBlogs(100);

  const currentIndex = blogs.findIndex((blog) => blog.id === currentId);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev =
    currentIndex < blogs.length - 1
      ? { id: blogs[currentIndex + 1].id, title: blogs[currentIndex + 1].title }
      : null;

  const next =
    currentIndex > 0
      ? { id: blogs[currentIndex - 1].id, title: blogs[currentIndex - 1].title }
      : null;

  return { prev, next };
}
