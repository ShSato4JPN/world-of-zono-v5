import { Bot, Code, Cpu, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FadeIn } from "@/components/animations/FadeIn";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const title = t("aiDevelopmentTitle");
  const description = t("aiDevelopmentDescription");

  return {
    title,
    description,
    openGraph: {
      type: "website",
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

export default async function AiDevelopmentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("aiDevelopment");

  const tools = [
    { icon: Bot, name: "Claude Code (Claude Opus 4)" },
    { icon: Code, name: "Next.js 16 + React 19" },
    { icon: Cpu, name: "TypeScript + Tailwind CSS" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-3xl bg-white px-8 py-24 sm:px-16 sm:py-32 dark:bg-black">
        <FadeIn>
          <header className="mb-16 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
              <Sparkles className="h-8 w-8 text-zinc-600 dark:text-zinc-300" />
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {t("title")}
            </h1>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("subtitle")}
            </p>
          </header>
        </FadeIn>

        <FadeIn delay={0.1}>
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {t("whatIsTitle")}
            </h2>
            <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("whatIsText")}
            </p>
          </section>
        </FadeIn>

        <FadeIn delay={0.2}>
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {t("whyTitle")}
            </h2>
            <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("whyText")}
            </p>
          </section>
        </FadeIn>

        <FadeIn delay={0.3}>
          <section className="mb-12">
            <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {t("toolsTitle")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex flex-col items-center gap-3 rounded-lg border border-zinc-200 p-6 text-center dark:border-zinc-800"
                >
                  <tool.icon className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.4}>
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {t("howTitle")}
            </h2>
            <div className="space-y-4">
              {(["step1", "step2", "step3"] as const).map((key, i) => (
                <div
                  key={key}
                  className="border-l-2 border-zinc-200 pl-4 dark:border-zinc-700"
                >
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-500">
                    Step {i + 1}
                  </p>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    {t(`how.${key}`)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.5}>
          <section className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-center text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("disclaimer")}
            </p>
          </section>
        </FadeIn>
      </main>
    </div>
  );
}
