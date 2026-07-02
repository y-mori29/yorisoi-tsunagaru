"use client";

import { Avatar } from "./Avatar";
import { Icon } from "./Icon";
import { getConditionMetaList } from "@/lib/api/conditions";
import type { ConditionMeta, ConditionPost } from "@/lib/api/types";

type Props = {
  post: ConditionPost;
};

/**
 * 体調投稿カード（Phase 7A）。
 * タイムラインで VoiceCard と並んで流れる軽量カード。
 *
 * VoiceCard とは別ファイル：
 *  - 体調投稿は「ワンタップで送れる」のがコアなのでレイアウトも軽量
 *  - リアクション機能は付けない（共感は通常投稿側で）
 *  - 数字非表示原則は同じ
 *
 * インラインスタイル中心（CSS HMR キャッシュ問題回避）。
 */
export function ConditionCard({ post }: Props) {
  const meta = getConditionMetaList().find((m) => m.level === post.level);
  if (!meta) return null;

  return (
    <article
      style={{
        margin: "0 16px",
        padding: "14px 16px",
        background: "var(--color-card, #FFFDF8)",
        border: "1px solid var(--color-line-soft, #EAE2D2)",
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Avatar
          animal={post.authorAvatar}
          src={post.authorAvatarSrc}
          alt={post.authorName}
          tone={post.authorAvatarTone}
          size={36}
        />
        <span
          style={{
            font: "500 14px/1 var(--font-jp)",
            letterSpacing: "0.04em",
            color: "var(--color-ink-900)",
          }}
        >
          {post.authorName}
        </span>
        <ConditionBadge meta={meta} />
        <span
          style={{
            marginLeft: "auto",
            font: "400 11px/1 var(--font-jp)",
            color: "var(--color-ink-300)",
            letterSpacing: "0.04em",
          }}
        >
          {post.timeLabel}
        </span>
      </header>

      {post.body && (
        <p
          style={{
            font: "400 15px/1.8 var(--font-jp)",
            color: "var(--color-ink-700)",
            letterSpacing: "0.04em",
            whiteSpace: "pre-line",
            margin: 0,
          }}
        >
          {post.body}
        </p>
      )}
    </article>
  );
}

function ConditionBadge({ meta }: { meta: ConditionMeta }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 8px 3px 6px",
        borderRadius: 999,
        background: toneToBg(meta.tone),
        color: toneToText(meta.tone),
        font: "500 11px/1 var(--font-jp)",
        letterSpacing: "0.06em",
      }}
    >
      <Icon name={meta.icon} size={14} />
      {meta.label}
    </span>
  );
}

function toneToBg(tone: ConditionMeta["tone"]): string {
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

function toneToText(tone: ConditionMeta["tone"]): string {
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
