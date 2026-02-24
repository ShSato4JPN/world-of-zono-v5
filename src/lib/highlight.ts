import { type BundledLanguage, createHighlighter } from "shiki";

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

const highlighter = await createHighlighter({
  themes: ["night-owl"],
  langs: [
    "javascript",
    "typescript",
    "tsx",
    "jsx",
    "html",
    "css",
    "json",
    "markdown",
    "bash",
    "shell",
    "python",
    "sql",
    "yaml",
    "dockerfile",
  ],
});

export async function highlightCode(html: string): Promise<string> {
  const codeBlockRegex =
    /<pre><code(?:\s+class="language-(\w+)")?>([\s\S]*?)<\/code><\/pre>/g;

  let result = html;
  for (const match of html.matchAll(codeBlockRegex)) {
    const [fullMatch, lang, code] = match;
    const decodedCode = decodeHtmlEntities(code);
    const language = (lang || "plaintext") as BundledLanguage;

    try {
      const highlighted = highlighter.codeToHtml(decodedCode, {
        lang: language,
        theme: "night-owl",
      });
      result = result.replace(fullMatch, highlighted);
    } catch {
      const highlighted = highlighter.codeToHtml(decodedCode, {
        lang: "plaintext",
        theme: "night-owl",
      });
      result = result.replace(fullMatch, highlighted);
    }
  }

  return result;
}
