import { getBlogsQueryOptions } from "@/features/blogs/api/get-blogs";
import BlogsList from "@/features/blogs/components/blogs-list";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
export default async function Blogs() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getBlogsQueryOptions());

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <BlogsList />
    </HydrationBoundary>
  );
}
