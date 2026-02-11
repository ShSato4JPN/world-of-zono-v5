import { ErrorBoundary } from "react-error-boundary";

export default function Page() {
  return (
    <ErrorBoundary fallback={<div>エラーが発生しました。</div>}>
      <div>page</div>
    </ErrorBoundary>
  );
}
