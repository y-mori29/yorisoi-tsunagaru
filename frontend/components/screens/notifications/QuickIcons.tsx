import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/lib/icons";

type QuickItem = {
  key: string;
  icon: IconName;
  label: string;
  href: string;
  tone: "terra" | "moss" | "plum" | "gold";
};

/**
 * GRAVITY 画像 11 の上部 4 つのクイックアイコンに対応。
 * ラベルは GRAVITY の「いいね/コメント/フォロワー/足あと」を、
 * 「よりそい つながる」のトーン（うなずき/ことば/お隣/気配）に翻訳。
 *
 * 数字バッジは出さない（数字を強調しない方針 [[feedback-tomizawa-gravity-alignment]] 項 10a 周辺）。
 */
const ITEMS: QuickItem[] = [
  { key: "ack", icon: "acknowledge", label: "うなずき", href: "/notifications", tone: "terra" },
  { key: "chat", icon: "chat", label: "ことば", href: "/notifications", tone: "plum" },
  { key: "neighbor", icon: "flower", label: "お隣", href: "/notifications", tone: "moss" },
  { key: "trace", icon: "leaf", label: "気配", href: "/notifications", tone: "gold" },
];

export function QuickIcons() {
  return (
    <nav className="quick-icons" aria-label="お便りのクイック">
      {ITEMS.map((item) => (
        <Link key={item.key} href={item.href} className="quick-icons__item">
          <span className={`quick-icons__bubble quick-icons__bubble--${item.tone}`}>
            <Icon name={item.icon} size={22} />
          </span>
          <span className="quick-icons__label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
