import { getBlogQueryOptions } from "@/features/blogs/api/get-blog";
import { highlightCode } from "@/lib/highlight";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ArticleContent from "./article/content";
import ArticleHeader from "./article/header";
import ArticleLayout from "./article/layout";
import ArticleNav from "./article/nav";

const preloadBlogData = async (id: string) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getBlogQueryOptions(id));

  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
    queryClient,
  };
};

type Props = {
  id: string;
};

export default async function Blog({ id }: Props) {
  const { dehydratedState, queryClient } = await preloadBlogData(id);
  const blog = queryClient.getQueryData(getBlogQueryOptions(id).queryKey);

  if (!blog?.content) return <div>Blog not found</div>;

  const { title, publishedAt, content, category } = blog;

  const highlightedContent = await highlightCode(content);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ArticleLayout
        nav={<ArticleNav />}
        header={
          <ArticleHeader
            title={title}
            publishedAt={publishedAt}
            content={content}
            category={category}
          />
        }
        content={<ArticleContent content={highlightedContent} />}
        footer={<div></div>}
        // footer={<ArticleFooter />}
      />
    </HydrationBoundary>
  );
}
