import { useTranslations } from "next-intl";
import MainLayout from "../layout/MainLayout";

export default function Fallback() {
  const t = useTranslations("error");

  return (
    <MainLayout>
      <div className="size-full grid place-items-center">{t("fallback")}</div>
    </MainLayout>
  );
}
