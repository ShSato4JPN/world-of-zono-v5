import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <main>
      <Link href="/blogs">{t("title")}</Link>
    </main>
  );
}
