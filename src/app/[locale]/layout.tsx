import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QueryProvider } from "@/components/QueryProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { routing } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://world-of-zono.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "World of Zono",
    template: "%s | World of Zono",
  },
  description: "World of Zono - Personal Blog",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    alternateLocale: "en_US",
    siteName: "World of Zono",
    title: "World of Zono",
    description: "World of Zono - Personal Blog",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "World of Zono",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "World of Zono",
    description: "World of Zono - Personal Blog",
    images: ["/og-image.png"],
  },
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ja" | "en")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <QueryProvider>
      <NextIntlClientProvider messages={messages}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </NextIntlClientProvider>
    </QueryProvider>
  );
}
