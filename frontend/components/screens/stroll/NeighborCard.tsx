"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import type { Neighbor } from "@/lib/api/types";

type NeighborCardProps = {
  neighbor: Neighbor;
};

type CardState = "idle" | "composing" | "sent" | "passed";

/**
 * /stroll に並ぶ お隣さんカード。
 *
 * 5/21 UX 修正：ボタンを機能化。
 *  - 「すれ違う」→ カードを「✦ また 今度」状態に（行動なし）
 *  - 「声を かける」→ ひとこと テキスト入力 + 送信 → 「✦ 声を 預けました」
 *
 * 送信はモック（実 DM 生成はせず、UI で受け取りフィードバックのみ）。
 * 誤タップで知らない人と接続される事故を避けるため、送信前に必ず文章入力を挟む。
 */
export function NeighborCard({ neighbor }: NeighborCardProps) {
  const [state, setState] = useState<CardState>("idle");
  const [body, setBody] = useState("");

  const handlePass = () => setState("passed");
  const handleStartCompose = () => setState("composing");
  const handleCancel = () => {
    setState("idle");
    setBody("");
  };
  const handleSend = () => {
    if (!body.trim()) return;
    // モック：実送信はしない（流れ星と同じ位置づけで将来 API 化）
    setState("sent");
  };

  return (
    <article className="neighbor-card">
      <div className="neighbor-card__main">
        <Avatar
          animal={neighbor.avatar}
          src={neighbor.avatarSrc}
          alt={neighbor.name}
          tone={neighbor.avatarTone}
          size={56}
        />
        <div className="neighbor-card__text">
          <p className="neighbor-card__name">{neighbor.name}</p>
          <p className="neighbor-card__attr">{neighbor.attributes}</p>
        </div>
      </div>

      {state === "idle" && (
        <div className="neighbor-card__actions">
          <button
            type="button"
            className="btn btn--quiet btn--sm"
            onClick={handlePass}
          >
            すれ違う
          </button>
          <button
            type="button"
            className="btn btn--primary btn--sm"
            onClick={handleStartCompose}
          >
            声を かける
          </button>
        </div>
      )}

      {state === "composing" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: "12px 14px 14px",
            background: "var(--color-bg-soft, #F3EDE2)",
            borderTop: "1px dashed var(--color-line-soft, #EAE2D2)",
          }}
        >
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={`${neighbor.name} さんに、ひとこと だけ。`}
            maxLength={140}
            rows={3}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid var(--color-line-soft, #EAE2D2)",
              borderRadius: 10,
              background: "var(--color-card, #FFFDF8)",
              font: "400 14px/1.7 var(--font-jp)",
              color: "var(--color-ink-900)",
              letterSpacing: "0.04em",
              resize: "vertical",
              outline: "none",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                font: "400 11px/1 var(--font-jp)",
                color: "var(--color-ink-300)",
                letterSpacing: "0.04em",
              }}
            >
              {body.length} / 140
            </span>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn--ghost btn--sm"
              >
                やめる
              </button>
              <button
                type="button"
                onClick={handleSend}
                className="btn btn--primary btn--sm"
                disabled={!body.trim()}
              >
                そっと 送る
              </button>
            </div>
          </div>
        </div>
      )}

      {state === "sent" && (
        <FeedbackBar
          icon="✦"
          text={`${neighbor.name} さんに、声を 預けました。`}
          subtext="返事は、来るかも しれません。"
        />
      )}

      {state === "passed" && (
        <FeedbackBar
          icon="—"
          text="また、今度。"
          subtext="気が向いたら、ホームから また 出会えます。"
          tone="quiet"
        />
      )}
    </article>
  );
}

function FeedbackBar({
  icon,
  text,
  subtext,
  tone = "primary",
}: {
  icon: string;
  text: string;
  subtext?: string;
  tone?: "primary" | "quiet";
}) {
  const color =
    tone === "quiet"
      ? "var(--color-ink-300)"
      : "var(--color-terra-600, #A45A3F)";
  const bg =
    tone === "quiet"
      ? "var(--color-bg-soft, #F3EDE2)"
      : "var(--color-terra-50, #F8E8DE)";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "12px 14px",
        background: bg,
        borderTop: "1px solid var(--color-line-soft, #EAE2D2)",
      }}
    >
      <span
        style={{
          font: "500 13px/1.4 var(--font-jp)",
          color,
          letterSpacing: "0.06em",
        }}
      >
        <span aria-hidden="true" style={{ marginRight: 6 }}>
          {icon}
        </span>
        {text}
      </span>
      {subtext && (
        <span
          style={{
            font: "400 11px/1.6 var(--font-jp)",
            color: "var(--color-ink-500)",
            letterSpacing: "0.04em",
          }}
        >
          {subtext}
        </span>
      )}
    </div>
  );
}

// Icon import を残す（将来 ✦ アイコン化する想定）
void Icon;
