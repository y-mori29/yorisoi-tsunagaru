"use client";

import { Icon } from "@/components/ui/Icon";
import { getConditionMetaList } from "@/lib/api/conditions";
import type { ConditionLevel, ConditionMeta } from "@/lib/api/types";

type Props = {
  value?: ConditionLevel;
  onSelect: (level: ConditionLevel) => void;
};

/**
 * 体調 5 段階セレクタ。
 * 5/20 冨澤 MTG「ワンタップで体調投稿」の中核 UI。
 * - 縦並びの大きなタップターゲット（指で押しやすく）
 * - 数字は出さない（GRAVITY 原則）
 * - アイコン + 日本語ラベル + 微かなトーン背景で位置付け
 *
 * インラインスタイル中心。CSS HMR キャッシュ問題（既知）を回避する目的。
 */
export function ConditionSelector({ value, onSelect }: Props) {
  const list = getConditionMetaList();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: "0 16px",
        marginTop: 8,
      }}
    >
      {list.map((meta) => (
        <ConditionRow
          key={meta.level}
          meta={meta}
          selected={value === meta.level}
          onClick={() => onSelect(meta.level)}
        />
      ))}
    </div>
  );
}

function ConditionRow({
  meta,
  selected,
  onClick,
}: {
  meta: ConditionMeta;
  selected: boolean;
  onClick: () => void;
}) {
  const toneBg = toneToBg(meta.tone, selected);
  const toneBorder = toneToBorder(meta.tone, selected);
  const toneText = toneToText(meta.tone, selected);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        width: "100%",
        minHeight: 60,
        padding: "14px 18px",
        background: toneBg,
        border: `1.5px solid ${toneBorder}`,
        borderRadius: 16,
        cursor: "pointer",
        textAlign: "left",
        transition: "border-color 0.18s ease, background 0.18s ease",
      }}
    >
      <span
        style={{
          display: "grid",
          placeItems: "center",
          width: 36,
          height: 36,
          color: toneText,
        }}
      >
        <Icon name={meta.icon} size={26} />
      </span>
      <span
        style={{
          flex: 1,
          font: `${selected ? 500 : 400} 16px/1.4 var(--font-jp)`,
          color: selected ? "var(--color-ink-900)" : "var(--color-ink-700)",
          letterSpacing: "0.06em",
        }}
      >
        {meta.label}
      </span>
      {selected && (
        <span
          aria-hidden="true"
          style={{ color: toneText, display: "grid", placeItems: "center" }}
        >
          <Icon name="check" size={20} />
        </span>
      )}
    </button>
  );
}

/* トーン → 色のマッピング。CSS 変数を直接参照することで Tailwind / globals.css 双方と整合。 */
function toneToBg(tone: ConditionMeta["tone"], selected: boolean): string {
  if (!selected) return "var(--color-card)";
  switch (tone) {
    case "gold":
      return "var(--color-gold-50, #FAF4E0)";
    case "moss":
      return "var(--color-moss-50, #ECF1E2)";
    case "default":
      return "var(--color-bg-soft, #F3EDE2)";
    case "plum":
      return "var(--color-plum-50, #F1EBF1)";
    case "terra":
      return "var(--color-terra-50, #F8E8DE)";
  }
}

function toneToBorder(tone: ConditionMeta["tone"], selected: boolean): string {
  if (!selected) return "var(--color-line-soft, #EAE2D2)";
  switch (tone) {
    case "gold":
      return "var(--color-gold-500, #D8A93B)";
    case "moss":
      return "var(--color-moss-500, #7A9461)";
    case "default":
      return "var(--color-ink-300, #B4A99A)";
    case "plum":
      return "var(--color-plum-500, #9078A2)";
    case "terra":
      return "var(--color-terra-500, #C97A5A)";
  }
}

function toneToText(tone: ConditionMeta["tone"], selected: boolean): string {
  if (!selected) return "var(--color-ink-500)";
  switch (tone) {
    case "gold":
      return "var(--color-gold-600, #B68722)";
    case "moss":
      return "var(--color-moss-600, #5E7A4A)";
    case "default":
      return "var(--color-ink-700, #4A4036)";
    case "plum":
      return "var(--color-plum-600, #6F5587)";
    case "terra":
      return "var(--color-terra-600, #A45A3F)";
  }
}
