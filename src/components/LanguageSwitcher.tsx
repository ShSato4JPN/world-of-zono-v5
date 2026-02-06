"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === "ja" ? "en" : "ja";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleLocale}>
      <span className="text-xs font-medium">
        {locale === "ja" ? "EN" : "JA"}
      </span>
      <span className="sr-only">Switch language</span>
    </Button>
  );
}
