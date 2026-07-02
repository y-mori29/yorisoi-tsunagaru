"use client";

import { useEffect, useState, type CSSProperties } from "react";
import {
  getCommentSuggestions,
  invalidateCommentSuggestions,
  postComment,
} from "@/lib/api/comments";
import type { Comment, CommentSuggestion } from "@/lib/api/types";

type Props = {
  parentId: string;
  /** 投稿後に呼ばれる。リスト更新トリガに使う。 */
  onPosted: (comment: Comment) => void;
};

const TONE_LABEL: Record<CommentSuggestion["tone"], string> = {
  empathy: "そっと 寄り添う",
  question: "聞いて みる",
  thanks: "ありがとう を 返す",
};

const TONE_BORDER: Record<CommentSuggestion["tone"], string> = {
  empathy: "var(--color-terra-500, #C97A5A)",
  question: "var(--color-moss-500, #7A9461)",
  thanks: "var(--color-plum-500, #9078A2)",
};

const TONE_BG: Record<CommentSuggestion["tone"], string> = {
  empathy: "var(--color-terra-50, #F8E8DE)",
  question: "var(--color-moss-50, #ECF1E2)",
  thanks: "var(--color-plum-50, #F1EBF1)",
};

const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: "14px 14px 16px",
  background: "var(--color-bg-soft, #F3EDE2)",
  borderRadius: 14,
  marginTop: 16,
};

const titleStyle: CSSProperties = {
  font: "500 11px/1 var(--font-jp)",
  color: "var(--color-ink-500)",
  letterSpacing: "0.12em",
  margin: 0,
};

const listStyle: CSSProperties = {
  display: "flex",
  gap: 8,
  overflowX: "auto",
  paddingBottom: 4,
  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "none",
};

const chipBaseStyle: CSSProperties = {
  flex: "0 0 200px",
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: "10px 12px",
  borderRadius: 12,
  background: "var(--color-card, #FFFDF8)",
  textAlign: "left",
  cursor: "pointer",
};

/**
 * 投稿への コメント送信フォーム（Phase 7C）。
 *
 * - AI 候補（Gemini 3.1 Flash Lite）3 案を横スクロール
 * - 候補タップで textarea に反映（編集可能）
 * - 送信で postComment → onPosted コールバック
 * - 投稿後は候補をリフレッシュ（既存コメントを踏まえた新候補）
 *
 * 冨澤 MTG 5/20「AI は候補提案までで止める」原則：
 *   ユーザーがボタンで選んで送るところまでで AI の介在は止める。
 *   AI が直接コメントを書くわけではない。
 */
export function CommentComposer({ parentId, onPosted }: Props) {
  const [suggestions, setSuggestions] = useState<CommentSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const list = await getCommentSuggestions(parentId);
        if (!cancelled) setSuggestions(list);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "候補が 出せませんでした。");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [parentId]);

  const pickSuggestion = (s: CommentSuggestion) => {
    setBody(s.body);
  };

  const submit = async () => {
    const trimmed = body.trim();
    if (!trimmed || sending) return;
    setSending(true);
    try {
      const c = await postComment({ parentId, body: trimmed });
      setBody("");
      onPosted(c);
      // 候補は次の文脈に合わせて作り直す
      invalidateCommentSuggestions(parentId);
      const next = await getCommentSuggestions(parentId);
      setSuggestions(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : "送信に 失敗しました。");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={containerStyle}>
      <p style={titleStyle}>
        <span aria-hidden="true">✦ </span>
        ことばを 添える（タップで 入力欄へ）
      </p>

      {loading && (
        <p
          style={{
            font: "400 12px/1.6 var(--font-jp)",
            color: "var(--color-ink-300)",
            letterSpacing: "0.06em",
            margin: 0,
          }}
        >
          候補を 考えています…
        </p>
      )}

      {!loading && suggestions.length > 0 && (
        <div style={listStyle}>
          {suggestions.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => pickSuggestion(s)}
              style={{
                ...chipBaseStyle,
                border: `1px solid ${TONE_BORDER[s.tone]}`,
                background: TONE_BG[s.tone],
              }}
            >
              <span
                style={{
                  font: "500 10px/1 var(--font-jp)",
                  color: "var(--color-ink-500)",
                  letterSpacing: "0.08em",
                }}
              >
                {TONE_LABEL[s.tone]}
              </span>
              <span
                style={{
                  font: "400 12px/1.6 var(--font-jp)",
                  color: "var(--color-ink-700)",
                  letterSpacing: "0.04em",
                  whiteSpace: "pre-line",
                }}
              >
                {s.body}
              </span>
            </button>
          ))}
        </div>
      )}

      {!loading && error && (
        <p
          style={{
            font: "400 11px/1.6 var(--font-jp)",
            color: "var(--color-ink-500)",
            letterSpacing: "0.06em",
            margin: 0,
          }}
        >
          {error}
        </p>
      )}

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="ひとこと、添えて みる。"
        maxLength={140}
        style={{
          width: "100%",
          minHeight: 70,
          padding: "10px 12px",
          border: "1px solid var(--color-line-soft, #EAE2D2)",
          borderRadius: 10,
          background: "var(--color-card, #FFFDF8)",
          font: "400 14px/1.7 var(--font-jp)",
          letterSpacing: "0.04em",
          color: "var(--color-ink-900)",
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
        <button
          type="button"
          className="btn btn--primary btn--sm"
          disabled={!body.trim() || sending}
          onClick={submit}
        >
          {sending ? "送って います…" : "そっと、置く"}
        </button>
      </div>
    </div>
  );
}
