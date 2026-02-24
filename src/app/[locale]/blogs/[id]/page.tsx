import Loading from "@/components/utils/Loading";
import { Suspense, use } from "react";
import Blog from "./_components/blog";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <Suspense fallback={<Loading />}>
      <Blog id={id} />
    </Suspense>
  );
}
