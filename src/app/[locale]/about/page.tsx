import { Github, Mail, Twitter } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const title = t("aboutTitle");
  const description = t("aboutDescription");

  return {
    title,
    description,
    openGraph: {
      type: "profile",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xl bg-white px-8 py-24 sm:px-16 sm:py-32 dark:bg-black">
        {/* Profile Section */}
        <section className="mb-16 flex flex-col items-center text-center">
          <div className="relative mb-6 h-32 w-32 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
            <Image
              src="/profile.svg"
              alt={t("name")}
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t("name")}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {t("title")}
          </p>
        </section>

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {t("introTitle")}
          </h2>
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t("introText")}
          </p>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {t("skillsTitle")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {["TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS"].map(
              (skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {skill}
                </span>
              ),
            )}
          </div>
        </section>

        {/* Career */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {t("careerTitle")}
          </h2>
          <div className="space-y-4">
            <div className="border-l-2 border-zinc-200 pl-4 dark:border-zinc-700">
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                2020 - {t("present")}
              </p>
              <p className="font-medium text-zinc-900 dark:text-zinc-50">
                {t("careerItem1Title")}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {t("careerItem1Description")}
              </p>
            </div>
            <div className="border-l-2 border-zinc-200 pl-4 dark:border-zinc-700">
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                2018 - 2020
              </p>
              <p className="font-medium text-zinc-900 dark:text-zinc-50">
                {t("careerItem2Title")}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {t("careerItem2Description")}
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {t("contactTitle")}
          </h2>
          <div className="flex gap-4">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              <Twitter className="h-5 w-5" />
              <span>Twitter</span>
            </a>
            <a
              href="mailto:example@example.com"
              className="flex items-center gap-2 text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              <Mail className="h-5 w-5" />
              <span>Email</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
