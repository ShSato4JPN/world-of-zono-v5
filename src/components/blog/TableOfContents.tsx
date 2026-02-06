"use client";

import { useScrollSpy } from "@mantine/hooks";
import type { TocItem } from "@/lib/toc";

type Props = {
  items: TocItem[];
  variant?: "sidebar" | "inline";
};

export function TableOfContents({ items, variant = "sidebar" }: Props) {
  const spy = useScrollSpy({
    selector: "h2[id], h3[id], h4[id]",
    offset: 80,
  });

  if (items.length === 0) {
    return null;
  }

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (variant === "inline") {
    return (
      <nav className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          目次
        </p>
        <ul className="space-y-1">
          {items.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleClick(item.id)}
                className={`block w-full rounded-md px-3 py-1.5 text-left text-sm leading-relaxed transition-colors ${
                  item.level === 3 ? "pl-6" : ""
                } ${
                  spy.active === index
                    ? "bg-blue-50 font-medium text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                <span className="line-clamp-2">{item.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav className="sticky top-24">
      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
        目次
      </p>
      <ul className="border-l border-zinc-200 dark:border-zinc-700">
        {items.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => handleClick(item.id)}
              className={`block w-full py-2 pl-4 text-left text-sm leading-relaxed transition-colors ${
                item.level === 3 ? "pl-7" : ""
              } ${
                spy.active === index
                  ? "-ml-px border-l-2 border-blue-500 font-medium text-blue-600 dark:text-blue-400"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              <span className="line-clamp-2">{item.text}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
