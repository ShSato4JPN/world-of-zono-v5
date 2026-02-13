import { LocaleToggle } from "@/components/LocaleToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import DeviceSwitcher from "@/components/utils/DeviceSwitcher";
import { Link } from "@/i18n/navigation";
import { env } from "@/lib/env";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Hamburger from "./Hamburger";

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

function MobileHeader() {
  const t = useTranslations("globalNav");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="font-bold tracking-tight">
          {env.NEXT_PUBLIC_SITE_NAME}
        </div>
        <div className="flex gap-4 justify-center">
          <LocaleToggle />
          <ThemeToggle />
          <Hamburger isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 w-dvw h-dvh bg-background/10 backdrop-blur-[3px] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { delay: 0.15 * navItems.length },
            }}
            key="hamburger-menu"
          >
            <nav className="size-full flex flex-col items-center justify-center text-center">
              {navItems.map(({ key, href }, idx) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 30,
                    transition: { delay: 0.18 * (navItems.length - idx - 1) },
                  }}
                  transition={{ delay: 0.18 * idx }}
                  className="mb-6"
                >
                  <Link href={href}>
                    <span className="text-xl">{t(key)}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PcHeader() {
  const t = useTranslations("globalNav");

  return (
    <nav className="flex items-center justify-between backdrop-blur-[3px] py-4 px-10 border-b">
      <Link href="/">
        <span className="text-xl font-bold tracking-tight">
          {env.NEXT_PUBLIC_SITE_NAME}
        </span>
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
    </nav>
  );
}

export default function Header() {
  return (
    <header>
      <DeviceSwitcher mobile={<MobileHeader />} pc={<PcHeader />} />
    </header>
  );
}
