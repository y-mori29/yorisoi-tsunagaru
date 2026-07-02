"use client";

import type { MouseEvent } from "react";
import { Icon } from "./Icon";
import type { IconName } from "@/lib/icons";

type ReactionChipProps = {
  icon: IconName;
  label: string;
  active?: boolean;
  /** ボタンを押した時のハンドラ（イベントを受ける）。 */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  count?: number;
  /** AI 候補など、通常チップと区別したい時に true（軽い ✦ アクセント） */
  accent?: boolean;
};

/**
 * リアクションチップ（投稿カード内）。
 * 例: 葉アイコン + 「わかる」、共感アイコン + 「そう」
 * 数字は表示しない方針（GRAVITY 流の数を見せない設計）
 * count を渡しても表示はしないが、a11y のため title 属性に入れる。
 *
 * accent=true は AI 候補用の見た目（plum 系の細いボーダー + 小さな ✦）。
 */
export function ReactionChip({
  icon,
  label,
  active,
  onClick,
  count,
  accent,
}: ReactionChipProps) {
  // AI 候補（accent）は dashed plum ボーダーで通常チップと区別。
  // CSS HMR キャッシュに左右されないよう inline で当てる。
  const accentStyle =
    accent && !active
      ? {
          borderColor: "var(--color-plum-500, var(--color-plum-600))",
          borderStyle: "dashed" as const,
          color: "var(--color-plum-600)",
        }
      : undefined;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`reaction-chip ${active ? "is-active" : ""}`.trim()}
      style={accentStyle}
      title={count !== undefined ? `${label}（${count}人）` : label}
      aria-pressed={active}
    >
      {accent && (
        <span
          aria-hidden="true"
          style={{
            color: "var(--color-plum-600)",
            fontSize: 10,
            marginRight: 2,
          }}
        >
          ✦
        </span>
      )}
      <Icon name={icon} />
      <span>{label}</span>
    </button>
  );
}
