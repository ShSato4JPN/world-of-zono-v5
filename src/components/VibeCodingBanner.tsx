"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function VibeCodingBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const t = useTranslations("banner");

  if (!isVisible) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 dark:bg-amber-950/50 dark:border-amber-800">
      <div className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            {t("vibeCoding")}
          </p>
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="shrink-0 rounded p-1 text-amber-600 transition-colors hover:bg-amber-100 hover:text-amber-800 dark:text-amber-400 dark:hover:bg-amber-900 dark:hover:text-amber-200"
            aria-label={t("close")}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
