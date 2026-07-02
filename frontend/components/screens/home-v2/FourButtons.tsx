import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/lib/icons";

type Surface = {
  bg: string;
  border: string;
  fg: string;
  cardBorder: string;
};

type Btn = {
  href: string;
  label: string;
  caption: string;
  icon: IconName;
  surface: Surface;
};

const TONE = {
  terra: {
    bg: "var(--color-terra-50)",
    border: "var(--color-terra-100)",
    fg: "var(--color-terra-700)",
    cardBorder: "var(--color-terra-100)",
  },
  plum: {
    bg: "var(--color-plum-50)",
    border: "var(--color-plum-100)",
    fg: "var(--color-plum-600)",
    cardBorder: "var(--color-plum-100)",
  },
  neutral: {
    bg: "var(--color-paper-soft)",
    border: "var(--color-line-soft)",
    fg: "var(--color-ink-700)",
    cardBorder: "var(--color-line-soft)",
  },
  moss: {
    bg: "var(--color-moss-50)",
    border: "var(--color-moss-100)",
    fg: "var(--color-moss-700)",
    cardBorder: "var(--color-moss-100)",
  },
} as const;

const BUTTONS: Btn[] = [
  {
    href: "/home",
    label: "記録する",
    caption: "そっと 残す",
    icon: "flower",
    surface: TONE.terra,
  },
  {
    href: "/home",
    label: "ふりかえる",
    caption: "これまでの 自分",
    icon: "moon",
    surface: TONE.plum,
  },
  {
    href: "/home",
    label: "見せる",
    caption: "家族や 主治医に",
    icon: "mail",
    surface: TONE.neutral,
  },
  {
    href: "/home",
    label: "つながる",
    caption: "みんなの 声",
    icon: "leaf",
    surface: TONE.moss,
  },
];

/**
 * シンプルホームの 4 つの大ボタン（縦並び）。
 * 5/20 副田MTG「3〜4 個の大きなボタン」を、よりそい PHR の big-button 構造に
 * 揃えた版（横長カード × 縦並び 4 個）。
 */
export function FourButtons() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        margin: "0 16px 24px",
      }}
    >
      {BUTTONS.map((b) => (
        <Link
          key={b.label}
          href={b.href}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            padding: "20px 18px",
            background: "var(--color-card)",
            border: `2px solid ${b.surface.cardBorder}`,
            borderRadius: 22,
            textDecoration: "none",
            color: "var(--color-ink-900)",
            boxShadow: "0 2px 6px rgba(40, 32, 28, 0.04)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              display: "grid",
              placeItems: "center",
              background: b.surface.bg,
              color: b.surface.fg,
              border: `1px solid ${b.surface.border}`,
              flexShrink: 0,
            }}
          >
            <Icon name={b.icon} size={28} />
          </span>
          <span style={{ flex: 1 }}>
            <span
              style={{
                display: "block",
                font: "500 21px/1.2 var(--font-mincho)",
                letterSpacing: "0.1em",
                color: "var(--color-ink-900)",
              }}
            >
              {b.label}
            </span>
            <span
              style={{
                display: "block",
                font: "400 12px/1.4 var(--font-jp)",
                color: "var(--color-ink-500)",
                letterSpacing: "0.06em",
                marginTop: 6,
              }}
            >
              {b.caption}
            </span>
          </span>
          <span
            aria-hidden="true"
            style={{ color: "var(--color-ink-300)" }}
          >
            <Icon name="chevronRight" size={20} />
          </span>
        </Link>
      ))}
    </div>
  );
}
