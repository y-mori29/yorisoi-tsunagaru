"use client";

import type { CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import type { ReplySuggestion } from "@/lib/api/types";

type ReplySuggestionBarProps = {
  suggestions: ReplySuggestion[];
  loading?: boolean;
  error?: string | null;
  onPick: (suggestion: ReplySuggestion) => void;
};

const TONE_LABEL: Record<ReplySuggestion["tone"], string> = {
  empathy: "そっと寄り添う",
  question: "聞いてみる",
  thanks: "ありがとうを返す",
};

const TONE_BORDER: Record<ReplySuggestion["tone"], string> = {
  empathy: "var(--color-terra-500)",
  question: "var(--color-moss-500, var(--color-moss-700))",
  thanks: "var(--color-plum-500, var(--color-plum-600))",
};

const TONE_BG: Record<ReplySuggestion["tone"], string> = {
  empathy: "var(--color-terra-50)",
  question: "var(--color-moss-50)",
  thanks: "var(--color-plum-50)",
};

/* ----- styles (inline — Turbopack の global CSS HMR キャッシュに左右されないため) ----- */
const containerStyle: CSSProperties = {
  padding: "8px 14px 6px",
  background: "var(--color-bg-paper)",
  borderTop: "1px dashed var(--color-line-soft)",
};
const titleStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 5,
  font: "400 10px/1.4 var(--font-jp)",
  color: "var(--color-plum-600)",
  letterSpacing: "0.08em",
  margin: "0 0 6px",
  paddingLeft: 2,
};
const listStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: 8,
  overflowX: "auto",
  paddingBottom: 4,
  WebkitOverflowScrolling: "touch",
};
const itemBaseStyle: CSSProperties = {
  flex: "0 0 220px",
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: "10px 12px",
  borderRadius: 12,
  background: "var(--color-bg-card)",
  border: "1px solid var(--color-line-soft)",
  color: "var(--color-ink-900)",
  textAlign: "left",
  cursor: "pointer",
  transition: "background 200ms, border-color 200ms",
};
const toneLabelStyle: CSSProperties = {
  font: "500 10px/1.2 var(--font-jp)",
  color: "var(--color-ink-500)",
  letterSpacing: "0.08em",
};
const bodyStyle: CSSProperties = {
  font: "400 12px/1.6 var(--font-jp)",
  color: "var(--color-ink-700)",
  letterSpacing: "0.04em",
  whiteSpace: "pre-line",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};
const loadingStyle: CSSProperties = {
  font: "400 11px/1.6 var(--font-jp)",
  color: "var(--color-ink-300)",
  letterSpacing: "0.06em",
  paddingLeft: 2,
};
const errorStyle: CSSProperties = {
  ...loadingStyle,
  color: "var(--color-ink-500)",
};

/**
 * AI 返信アシスト（GRAVITY 画像 05・Gemini 3.1 Flash Lite で実生成）。
 * composer の真上に置き、3 つの候補を横スクロールで表示。タップで入力欄に反映。
 *
 * loading / error / 空配列 のそれぞれで適切なメッセージを出す。
 */
export function ReplySuggestionBar({
  suggestions,
  loading = false,
  error = null,
  onPick,
}: ReplySuggestionBarProps) {
  if (loading) {
    return (
      <div style={containerStyle} aria-label="返信の候補（生成中）">
        <p style={titleStyle}>
          <Icon name="sparkle" size={13} />
          返信の候補を考えています…
        </p>
      </div>
    );
  }

  if (error && suggestions.length === 0) {
    return (
      <div style={containerStyle}>
        <p style={titleStyle}>
          <Icon name="sparkle" size={13} />
          返信の候補
        </p>
        <p style={errorStyle}>{error}</p>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div style={containerStyle} aria-label="返信の候補">
      <p style={titleStyle}>
        <Icon name="sparkle" size={13} />
        返信の候補（タップで入力欄へ）
      </p>
      <div style={listStyle}>
        {suggestions.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onPick(s)}
            style={{
              ...itemBaseStyle,
              borderColor: TONE_BORDER[s.tone],
              background: TONE_BG[s.tone],
            }}
          >
            <span style={toneLabelStyle}>{TONE_LABEL[s.tone]}</span>
            <span style={bodyStyle}>{s.body}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
