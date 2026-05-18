"use client";

import { Icon } from "./Icon";
import type { IconName } from "@/lib/icons";

type ReactionChipProps = {
  icon: IconName;
  label: string;
  active?: boolean;
  onClick?: () => void;
  count?: number;
};

/**
 * リアクションチップ（投稿カード内）。
 * 例: 葉アイコン + 「わかる」、共感アイコン + 「そう」
 * 数字は表示しない方針（GRAVITY 流の数を見せない設計）
 * count を渡しても表示はしないが、a11y のため title 属性に入れる。
 */
export function ReactionChip({ icon, label, active, onClick, count }: ReactionChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`reaction-chip ${active ? "is-active" : ""}`.trim()}
      title={count !== undefined ? `${label}（${count}人）` : label}
    >
      <Icon name={icon} />
      <span>{label}</span>
    </button>
  );
}
