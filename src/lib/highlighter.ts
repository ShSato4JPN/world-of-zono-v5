import { type BundledLanguage, createHighlighter } from "shiki";

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
    "rust",
    "go",
    "sql",
    "yaml",
    "dockerfile",
  ],
});

export async function highlightCode(html: string): Promise<string> {
  const codeBlockRegex =
    /<pre><code(?:\s+class="language-(\w+)")?>([\s\S]*?)<\/code><\/pre>/g;

  let result = html;
  let match: RegExpExecArray | null = codeBlockRegex.exec(html);

  while (match !== null) {
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
      // If language is not supported, keep original
    }

    match = codeBlockRegex.exec(html);
  }

  return result;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}
