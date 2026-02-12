import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LocaleToggle } from "../LocaleToggle";
import { ThemeToggle } from "../ThemeToggle";

export default function Header() {
  const t = useTranslations("globalNav");

  const navItems = [
    {
      key: "blog",
      href: "/blogs",
    },
    {
      key: "category",
      href: "/categories",
    },
    {
      key: "about",
      href: "/about",
    },
  ];

  return (
    <header className="py-4 px-10 border-b">
      <div className="flex items-center justify-between">
        <Link href="/">
          <span className="text-xl font-bold">WORLD-OF-ZONO</span>
        </Link>
        <div className="flex items-center gap-8">
          {navItems.map(({ key, href }) => (
            <Link href={href} key={href}>
              <span>{t(key)}</span>
            </Link>
          ))}
          <LocaleToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
