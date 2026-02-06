export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          &copy; {currentYear} World of Zono. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
