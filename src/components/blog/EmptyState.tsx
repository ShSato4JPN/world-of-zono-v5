export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        No blog posts yet.
      </p>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
        Check back later for new content.
      </p>
    </div>
  );
}
