import { use } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <ErrorBoundary fallback={<div>エラーが発生しました。</div>}>
      <div>{id}</div>
    </ErrorBoundary>
  );
}
