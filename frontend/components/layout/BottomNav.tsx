"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

export type NavTab = "home" | "stroll" | "mail" | "profile";

const ITEMS: Array<{ tab: NavTab; href: string; label: string; icon: "home" | "stroll" | "bookmark" | "profile" }> = [
  { tab: "home", href: "/home", label: "ホーム", icon: "home" },
  { tab: "stroll", href: "/find", label: "探す", icon: "stroll" },
  { tab: "mail", href: "/me/bookmarks", label: "ブックマーク", icon: "bookmark" },
  { tab: "profile", href: "/me", label: "マイページ", icon: "profile" },
];

type BottomNavProps = {
  active?: NavTab | null;
};

export function BottomNav({ active }: BottomNavProps = {}) {
  const pathname = usePathname();
  const isActive = (tab: NavTab, href: string) => {
    if (active !== undefined && active !== null) return active === tab;
    if (active === null) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const left = ITEMS.slice(0, 2);
  const right = ITEMS.slice(2);

  return (
    <nav className="bottom-nav" aria-label="メインナビゲーション">
      {left.map((item) => (
        <NavItem key={item.tab} {...item} active={isActive(item.tab, item.href)} />
      ))}

      <div className="bottom-nav__center">
        <Link href="/post" className="fab-center" aria-label="声を置く">
          <Icon name="plus" />
        </Link>
      </div>

      {right.map((item) => (
        <NavItem key={item.tab} {...item} active={isActive(item.tab, item.href)} />
      ))}
    </nav>
  );
}

function NavItem({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: "home" | "stroll" | "bookmark" | "profile";
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`bottom-nav__item ${active ? "is-active" : ""}`.trim()}
      aria-current={active ? "page" : undefined}
    >
      <Icon name={icon} />
      <span>{label}</span>
    </Link>
  );
}
