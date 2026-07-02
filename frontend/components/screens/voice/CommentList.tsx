"use client";

import { Avatar } from "@/components/ui/Avatar";
import type { Comment } from "@/lib/api/types";

type Props = {
  comments: Comment[];
};

/**
 * 投稿への コメントリスト（Phase 7C）。
 *
 * - 1 階層のみ（コメントへのコメントは出さない）
 * - 医師/薬剤師/看護師バッジで信頼性を可視化（冨澤 MTG 5/20: 「顔と名前で信頼を作る」）
 * - 数字は出さない（GRAVITY 流）
 *
 * インラインスタイル中心。
 */
export function CommentList({ comments }: Props) {
  if (comments.length === 0) {
    return (
      <p
        style={{
          font: "400 13px/1.7 var(--font-jp)",
          color: "var(--color-ink-300)",
          letterSpacing: "0.06em",
          padding: "16px 4px",
          textAlign: "center",
        }}
      >
        まだ ことばが ありません。
        <br />
        あなたが、いちばん 最初の ひとり。
      </p>
    );
  }

  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {comments.map((c) => (
        <CommentRow key={c.id} comment={c} />
      ))}
    </ul>
  );
}

function CommentRow({ comment }: { comment: Comment }) {
  return (
    <li
      style={{
        display: "flex",
        gap: 10,
        padding: "12px 14px",
        background: "var(--color-card, #FFFDF8)",
        border: "1px solid var(--color-line-soft, #EAE2D2)",
        borderRadius: 14,
      }}
    >
      <Avatar
        animal={comment.authorAvatar}
        src={comment.authorAvatarSrc}
        alt={comment.authorName}
        tone={comment.authorAvatarTone}
        size={36}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 4,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              font: "500 13px/1 var(--font-jp)",
              color: "var(--color-ink-900)",
              letterSpacing: "0.04em",
            }}
          >
            {comment.authorName}
          </span>
          {comment.roleBadge && <RoleBadge label={comment.roleBadge} />}
          {comment.roomName && (
            <span
              style={{
                font: "400 11px/1 var(--font-jp)",
                color: "var(--color-ink-300)",
                letterSpacing: "0.06em",
              }}
            >
              {comment.roomName}
            </span>
          )}
          <span
            style={{
              marginLeft: "auto",
              font: "400 11px/1 var(--font-jp)",
              color: "var(--color-ink-300)",
              letterSpacing: "0.04em",
            }}
          >
            {comment.timeLabel}
          </span>
        </div>
        <p
          style={{
            font: "400 14px/1.7 var(--font-jp)",
            color: "var(--color-ink-700)",
            letterSpacing: "0.04em",
            whiteSpace: "pre-line",
            margin: 0,
          }}
        >
          {comment.body}
        </p>
      </div>
    </li>
  );
}

function RoleBadge({ label }: { label: NonNullable<Comment["roleBadge"]> }) {
  const tone =
    label === "医師"
      ? { bg: "var(--color-plum-50, #F1EBF1)", fg: "var(--color-plum-600, #6F5587)" }
      : label === "薬剤師"
        ? { bg: "var(--color-moss-50, #ECF1E2)", fg: "var(--color-moss-600, #5E7A4A)" }
        : { bg: "var(--color-gold-50, #FAF4E0)", fg: "var(--color-gold-600, #B68722)" };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 8px",
        borderRadius: 999,
        background: tone.bg,
        color: tone.fg,
        font: "500 10px/1 var(--font-jp)",
        letterSpacing: "0.08em",
      }}
    >
      {label}
    </span>
  );
}
