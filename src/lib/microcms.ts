const MICROCMS_SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const MICROCMS_API_KEY = process.env.MICROCMS_API_KEY;

if (!MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

const baseUrl = `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1`;

const headers = {
  "X-MICROCMS-API-KEY": MICROCMS_API_KEY,
};

// Cache revalidation time in seconds
const CACHE_REVALIDATE = 60; // 1 minute

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
  category?: Category[];
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
  const res = await fetch(`${baseUrl}/blogs?limit=${limit}&offset=${offset}`, {
    headers,
    next: { revalidate: CACHE_REVALIDATE },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

export async function getBlogById(id: string): Promise<Blog> {
  const res = await fetch(`${baseUrl}/blogs/${id}`, {
    headers,
    next: { revalidate: CACHE_REVALIDATE },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return res.json();
}

export async function getCategories(): Promise<CategoriesResponse> {
  const res = await fetch(`${baseUrl}/categories?limit=100`, {
    headers,
    next: { revalidate: CACHE_REVALIDATE * 5 }, // Categories change less frequently
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export async function getCategoryById(id: string): Promise<Category> {
  const res = await fetch(`${baseUrl}/categories/${id}`, {
    headers,
    next: { revalidate: CACHE_REVALIDATE * 5 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch category");
  }

  return res.json();
}

export async function getBlogsByCategory(
  categoryId: string,
  limit: number = 10,
  offset: number = 0,
): Promise<BlogsResponse> {
  const res = await fetch(
    `${baseUrl}/blogs?limit=${limit}&offset=${offset}&filters=category[contains]${categoryId}`,
    {
      headers,
      next: { revalidate: CACHE_REVALIDATE },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs by category");
  }

  return res.json();
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
