"use client";

import { useQuery } from "@tanstack/react-query";
import type { Blog, BlogsResponse, Category } from "@/lib/microcms";

const MICROCMS_SERVICE_DOMAIN = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN;
const MICROCMS_API_KEY = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

async function fetchBlogs(
  limit: number = 10,
  offset: number = 0,
): Promise<BlogsResponse> {
  const res = await fetch(
    `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/blogs?limit=${limit}&offset=${offset}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": MICROCMS_API_KEY || "",
      },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

async function fetchBlogById(id: string): Promise<Blog> {
  const res = await fetch(
    `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/blogs/${id}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": MICROCMS_API_KEY || "",
      },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
}

async function fetchBlogsByCategory(
  categoryId: string,
  limit: number = 10,
  offset: number = 0,
): Promise<BlogsResponse> {
  const res = await fetch(
    `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/blogs?limit=${limit}&offset=${offset}&filters=category[contains]${categoryId}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": MICROCMS_API_KEY || "",
      },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch blogs by category");
  return res.json();
}

async function fetchCategories(): Promise<{ contents: Category[] }> {
  const res = await fetch(
    `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/categories?limit=100`,
    {
      headers: {
        "X-MICROCMS-API-KEY": MICROCMS_API_KEY || "",
      },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

async function fetchCategoryById(id: string): Promise<Category> {
  const res = await fetch(
    `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/categories/${id}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": MICROCMS_API_KEY || "",
      },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch category");
  return res.json();
}

export function useBlogs(limit: number = 10, offset: number = 0) {
  return useQuery({
    queryKey: ["blogs", limit, offset],
    queryFn: () => fetchBlogs(limit, offset),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useBlog(id: string) {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
}

export function useBlogsByCategory(
  categoryId: string,
  limit: number = 10,
  offset: number = 0,
) {
  return useQuery({
    queryKey: ["blogs", "category", categoryId, limit, offset],
    queryFn: () => fetchBlogsByCategory(categoryId, limit, offset),
    staleTime: 5 * 60 * 1000,
    enabled: !!categoryId,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes for categories
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => fetchCategoryById(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}
