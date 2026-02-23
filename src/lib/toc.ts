export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function extractToc(html: string): TocItem[] {
  const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h\1>/gi;
  const items: TocItem[] = [];
  const matches = html.matchAll(headingRegex);

  for (const match of matches) {
    const level = Number.parseInt(match[1], 10);
    const text = match[2].replace(/<[^>]*>/g, "").trim();
    const id = generateSlug(text);
    items.push({ id, text, level });
  }

  return items;
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}
