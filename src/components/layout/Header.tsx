import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";

export default function Header() {
  const navItems = [
    {
      name: "BLOG",
      href: "/blogs",
    },
    {
      name: "CATEGORY",
      href: "/categories",
    },
    {
      name: "ABOUT",
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
          {navItems.map(({ name, href }) => (
            <Link href={href} key={href}>
              <span className="font-bold">{name}</span>
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
