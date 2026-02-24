import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ArticleNav() {
  const t = useTranslations("blog");

  return (
    <nav>
      <Link
        href="/blogs"
        className="group inline-flex items-center gap-2 py-4 ml-4 text-sm font-medium text-article-muted transition-all hover:text-zinc-900 dark:hover:text-zinc-50"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {t("backToBlog")}
      </Link>
    </nav>
  );
}
