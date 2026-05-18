"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

export type NavTab = "home" | "stroll" | "mail" | "profile";

const ITEMS: Array<{ tab: NavTab; href: string; label: string; icon: "home" | "stroll" | "mail" | "profile" }> = [
  { tab: "home", href: "/home", label: "ホーム", icon: "home" },
  { tab: "stroll", href: "/stroll", label: "めぐる", icon: "stroll" },
  { tab: "mail", href: "/notifications", label: "お知らせ", icon: "mail" },
  { tab: "profile", href: "/me", label: "プロフィール", icon: "profile" },
];

type BottomNavProps = {
  /** 強制的に active を指定する場合（指定しなければ pathname から判定） */
  active?: NavTab | null;
};

/**
 * 5 タブのボトムナビ：ホーム / めぐる / [+] / お知らせ / プロフィール
 * 中央は FAB の「声を残す」ボタン（/post へリンク）。
 * Active state は pathname から自動判定する。
 */
export function BottomNav({ active }: BottomNavProps = {}) {
  const pathname = usePathname();
  const isActive = (tab: NavTab, href: string) => {
    if (active !== undefined && active !== null) {
      return active === tab;
    }
    if (active === null) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const items = ITEMS;
  // ホーム / めぐる / [+ FAB] / お知らせ / プロフィール
  const left = items.slice(0, 2);
  const right = items.slice(2);

  return (
    <nav className="bottom-nav" aria-label="メインナビゲーション">
      {left.map((it) => (
        <NavItem key={it.tab} {...it} active={isActive(it.tab, it.href)} />
      ))}

      <div className="bottom-nav__center">
        <Link href="/post" className="fab-center" aria-label="声を残す">
          <Icon name="plus" />
        </Link>
      </div>

      {right.map((it) => (
        <NavItem key={it.tab} {...it} active={isActive(it.tab, it.href)} />
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
  icon: "home" | "stroll" | "mail" | "profile";
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
