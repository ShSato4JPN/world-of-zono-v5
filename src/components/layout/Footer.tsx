import dayjs from "dayjs";

export default function Footer() {
  const currentYear = dayjs().year();

  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <p className="text-center text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
          &copy; {currentYear} World of Zono. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
