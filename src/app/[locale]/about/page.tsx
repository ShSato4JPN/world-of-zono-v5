import { getTranslations } from "next-intl/server";
import ComingSoon from "@/components/ComingSoon";

export default async function Page() {
  const t = await getTranslations("about");

  return (
    <div className="grid place-items-center text-3xl">
      <ComingSoon label={t("notYet")} />
    </div>
  );
}
