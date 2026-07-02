"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { getConditionTopics } from "@/lib/api/conditions";
import type { ConditionMeta, ConditionTopic } from "@/lib/api/types";

type Props = {
  /** Step 1 で選んだ体調メタ（プレビュー表示に使う） */
  selectedMeta: ConditionMeta;
  /** 「送る」を押したとき。topic は選んだお題ラベル、body は本文 */
  onSubmit: (input: { topic?: string; body?: string }) => void;
  /** 「ひとことなしで 送る」 = body 空のまま送信 */
  onSkip: () => void;
};

/**
 * 体調 5 段階を選んだ後の「任意ひとこと」UI。
 * - 上部: 選択した体調のプレビュー（小さく確認）
 * - 中部: AI お題チップ（横スクロール）— 流れ星と同じ仕組み
 * - 下部: textarea + 文字数 + 送信
 *
 * 「書かなくても OK」を強調する：
 * - placeholder で 1 行説明
 * - チップに「ひとこと」（template 空）あり = 自由に書ける
 * - 「書かずに 送る」リンクが下部に常駐
 *
 * AI 連携は Phase 7A スコープ外（モック topics で十分）。
 * 将来は Gemini で `selectedMeta.level + 直近の体調履歴` を踏まえて生成。
 */
export function OneWordPrompt({ selectedMeta, onSubmit, onSkip }: Props) {
  const [topics, setTopics] = useState<ConditionTopic[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [body, setBody] = useState("");

  useEffect(() => {
    getConditionTopics().then(setTopics);
  }, []);

  const pickTopic = (topic: ConditionTopic) => {
    setSelectedTopicId(topic.id);
    // すでに何か書いていたら template は前置せず尊重する
    if (body.length === 0 && topic.template) {
      setBody(topic.template);
    }
  };

  const selectedTopic = topics.find((t) => t.id === selectedTopicId);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 18,
        padding: "0 16px",
      }}
    >
      {/* 選択した体調の確認バー */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 14px",
          background: "var(--color-bg-soft, #F3EDE2)",
          borderRadius: 12,
          color: "var(--color-ink-700)",
        }}
      >
        <span style={{ color: toneToText(selectedMeta.tone) }}>
          <Icon name={selectedMeta.icon} size={20} />
        </span>
        <span
          style={{
            font: "500 13px/1 var(--font-jp)",
            letterSpacing: "0.08em",
          }}
        >
          きょうは「{selectedMeta.label}」
        </span>
      </div>

      <div>
        <div
          style={{
            font: "500 12px/1 var(--font-jp)",
            color: "var(--color-ink-500)",
            letterSpacing: "0.12em",
            marginBottom: 10,
          }}
        >
          よかったら、ひとこと
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 4,
            scrollbarWidth: "none",
          }}
        >
          {topics.map((t) => {
            const active = t.id === selectedTopicId;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => pickTopic(t)}
                aria-pressed={active}
                style={{
                  flexShrink: 0,
                  padding: "8px 14px",
                  borderRadius: 999,
                  border: `1px solid ${toneToBorder(t.tone, active)}`,
                  background: active ? toneToBg(t.tone) : "transparent",
                  color: active
                    ? toneToText(t.tone)
                    : "var(--color-ink-500)",
                  font: `${active ? 500 : 400} 13px/1 var(--font-jp)`,
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="書きたい ことばを、ひとこと だけ。&#10;書かなくても、大丈夫です。"
        maxLength={140}
        style={{
          width: "100%",
          minHeight: 110,
          padding: "12px 14px",
          border: "1px solid var(--color-line-soft, #EAE2D2)",
          borderRadius: 12,
          background: "var(--color-card, #FFFDF8)",
          font: "400 15px/1.7 var(--font-jp)",
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
            letterSpacing: "0.06em",
          }}
        >
          {body.length} / 140
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            type="button"
            onClick={onSkip}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--color-ink-500)",
              font: "400 13px/1 var(--font-jp)",
              letterSpacing: "0.06em",
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            書かずに 送る
          </button>
          <button
            type="button"
            onClick={() =>
              onSubmit({
                topic: selectedTopic?.label,
                body: body.trim() || undefined,
              })
            }
            className="btn btn--primary btn--sm"
          >
            送る
          </button>
        </div>
      </div>
    </div>
  );
}

/* ConditionSelector と同じトーン →色 マッピング。後で共通化しても良いが、
 * 今は依存を増やさず各コンポーネントが自前で持つ。 */
function toneToBg(tone: ConditionTopic["tone"]): string {
  switch (tone) {
    case "terra":
      return "var(--color-terra-50, #F8E8DE)";
    case "moss":
      return "var(--color-moss-50, #ECF1E2)";
    case "plum":
      return "var(--color-plum-50, #F1EBF1)";
    case "gold":
      return "var(--color-gold-50, #FAF4E0)";
  }
}

function toneToBorder(tone: ConditionTopic["tone"], active: boolean): string {
  if (!active) return "var(--color-line-soft, #EAE2D2)";
  switch (tone) {
    case "terra":
      return "var(--color-terra-500, #C97A5A)";
    case "moss":
      return "var(--color-moss-500, #7A9461)";
    case "plum":
      return "var(--color-plum-500, #9078A2)";
    case "gold":
      return "var(--color-gold-500, #D8A93B)";
  }
}

function toneToText(tone: ConditionMeta["tone"] | ConditionTopic["tone"]): string {
  switch (tone) {
    case "terra":
      return "var(--color-terra-600, #A45A3F)";
    case "moss":
      return "var(--color-moss-600, #5E7A4A)";
    case "plum":
      return "var(--color-plum-600, #6F5587)";
    case "gold":
      return "var(--color-gold-600, #B68722)";
    case "default":
      return "var(--color-ink-700, #4A4036)";
  }
}
