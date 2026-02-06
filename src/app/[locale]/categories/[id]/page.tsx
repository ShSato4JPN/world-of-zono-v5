import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BlogList } from "@/components/blog/BlogList";
import { Link } from "@/i18n/navigation";
import {
  getBlogsByCategory,
  getCategories,
  getCategoryById,
} from "@/lib/microcms";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;

  try {
    const category = await getCategoryById(id);
    const t = await getTranslations({ locale, namespace: "metadata" });

    return {
      title: t("categoryTitle", { name: category.name }),
      description: t("categoryDescription", { name: category.name }),
    };
  } catch {
    return {
      title: "Category Not Found",
    };
  }
}

export async function generateStaticParams() {
  const { contents: categories } = await getCategories();
  return categories.map((category) => ({ id: category.id }));
}

export default async function CategoryPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("category");
  const tBlog = await getTranslations("blog");

  try {
    const category = await getCategoryById(id);
    const { contents: blogs, totalCount } = await getBlogsByCategory(id, 100);

    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="min-h-screen w-full max-w-3xl bg-white px-16 py-32 dark:bg-black">
          <nav className="mb-8">
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {tBlog("backToBlog")}
            </Link>
          </nav>

          <header className="mb-12">
            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              {t("title", { name: category.name })}
            </h1>
            <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              {t("postsCount", { count: totalCount })}
            </p>
          </header>

          <BlogList blogs={blogs} />
        </main>
      </div>
    );
  } catch {
    notFound();
  }
}
