import { use } from "react";
import Blog from "./_components/blog";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return <Blog id={id} />;
}
