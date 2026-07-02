"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Question = {
  id: string;
  body: string;
  /** 選択肢ベース。textInput=true なら自由記述 */
  options?: { id: string; label: string }[];
  textInput?: boolean;
  placeholder?: string;
};

/**
 * フクロウが「ひとつだけ」聞く質問のセット。
 * 揃うまで周期的に出すが、「答えたくない」を選んだ質問は二度と出さない。
 */
const QUESTIONS: Question[] = [
  {
    id: "symptom-start",
    body: "いつごろから、症状を 感じていますか？",
    options: [
      { id: "lt-3m", label: "ここ 3か月くらい" },
      { id: "lt-1y", label: "1年以内" },
      { id: "1to3y", label: "1〜3年" },
      { id: "gt-3y", label: "3年より 前" },
    ],
  },
  {
    id: "diagnosis-status",
    body: "病気の 診断は どんな 状況ですか？",
    options: [
      { id: "diagnosed", label: "診断 済み" },
      { id: "investigating", label: "検査中" },
      { id: "unknown", label: "わからない" },
    ],
  },
  {
    id: "main-trouble",
    body: "いま いちばん 困っていることは？",
    textInput: true,
    placeholder: "ひとことで 大丈夫",
  },
];

const STORAGE_KEY = "yorisoi-tsunagaru-owl-answers-v1";
const SKIP_KEY = "yorisoi-tsunagaru-owl-skip-v1";
const NEVER_KEY = "yorisoi-tsunagaru-owl-never-v1";
const SKIP_INTERVAL_MS = 24 * 60 * 60 * 1000; // また今度 → 24h は出さない

type Storage = {
  answers: Record<string, string>;
  skip: Record<string, number>; // questionId → timestamp
  never: string[]; // 答えたくない を選んだ question id
};

function readStorage(): Storage {
  if (typeof window === "undefined")
    return { answers: {}, skip: {}, never: [] };
  try {
    return {
      answers: JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"),
      skip: JSON.parse(localStorage.getItem(SKIP_KEY) || "{}"),
      never: JSON.parse(localStorage.getItem(NEVER_KEY) || "[]"),
    };
  } catch {
    return { answers: {}, skip: {}, never: [] };
  }
}

function writeAnswer(id: string, value: string) {
  const s = readStorage();
  s.answers[id] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s.answers));
}

function writeSkip(id: string) {
  const s = readStorage();
  s.skip[id] = Date.now();
  localStorage.setItem(SKIP_KEY, JSON.stringify(s.skip));
}

function writeNever(id: string) {
  const s = readStorage();
  if (!s.never.includes(id)) s.never.push(id);
  localStorage.setItem(NEVER_KEY, JSON.stringify(s.never));
}

/** 次に出すべき質問を選ぶ。なければ null */
function pickNextQuestion(): Question | null {
  const { answers, skip, never } = readStorage();
  const now = Date.now();
  for (const q of QUESTIONS) {
    if (answers[q.id]) continue;
    if (never.includes(q.id)) continue;
    const lastSkip = skip[q.id];
    if (lastSkip && now - lastSkip < SKIP_INTERVAL_MS) continue;
    return q;
  }
  return null;
}

/**
 * フクロウが下から現れて1問だけ聞く。
 * - 答える → 保存して閉じる
 * - また今度 → 24h は再出題なし
 * - 答えたくない → 二度と出さない
 */
export function OwlPopup() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      const q = pickNextQuestion();
      if (q) {
        setQuestion(q);
        setVisible(true);
      }
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  if (!question) return null;

  const close = () => setVisible(false);

  const onPickOption = (label: string) => {
    writeAnswer(question.id, label);
    close();
  };

  const onTextSubmit = () => {
    if (!text.trim()) return;
    writeAnswer(question.id, text.trim());
    close();
  };

  const onLater = () => {
    writeSkip(question.id);
    close();
  };

  const onNever = () => {
    writeNever(question.id);
    close();
  };

  return (
    <>
      {/* 半透明オーバーレイ */}
      <div
        onClick={onLater}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(40, 32, 28, 0.32)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: "opacity 240ms ease",
          zIndex: 90,
        }}
      />

      {/* 下から出るシート */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="フクロウからの ひとこと"
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          margin: "0 auto",
          maxWidth: 480,
          padding: "20px 18px 28px",
          background: "var(--color-paper)",
          borderRadius: "24px 24px 0 0",
          boxShadow: "0 -8px 32px rgba(40, 32, 28, 0.16)",
          transform: visible ? "translateY(0)" : "translateY(110%)",
          transition: "transform 320ms cubic-bezier(0.22, 0.61, 0.36, 1)",
          zIndex: 100,
        }}
      >
        {/* フクロウのイラスト */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: -56,
            marginBottom: 6,
          }}
        >
          <span
            style={{
              display: "block",
              width: 96,
              height: 96,
              borderRadius: 48,
              background: "var(--color-paper)",
              padding: 6,
              boxShadow: "0 4px 12px rgba(40, 32, 28, 0.08)",
            }}
          >
            <Image
              src="/assets/animals/owl-popup.png"
              alt="フクロウ"
              width={84}
              height={84}
              style={{ display: "block" }}
            />
          </span>
        </div>

        {/* 質問本文 */}
        <p
          style={{
            font: "500 17px/1.7 var(--font-mincho)",
            letterSpacing: "0.04em",
            color: "var(--color-ink-900)",
            textAlign: "center",
            margin: "8px 8px 18px",
          }}
        >
          {question.body}
        </p>

        {/* 選択肢 or テキスト入力 */}
        {question.options && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {question.options.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => onPickOption(o.label)}
                style={{
                  appearance: "none",
                  border: "1px solid var(--color-line-soft)",
                  background: "var(--color-card)",
                  borderRadius: 14,
                  padding: "14px 18px",
                  font: "400 14px/1.4 var(--font-jp)",
                  letterSpacing: "0.06em",
                  color: "var(--color-ink-700)",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}

        {question.textInput && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={question.placeholder}
              rows={3}
              style={{
                appearance: "none",
                border: "1px solid var(--color-line-soft)",
                background: "var(--color-card)",
                borderRadius: 14,
                padding: "12px 14px",
                font: "400 14px/1.6 var(--font-jp)",
                letterSpacing: "0.04em",
                color: "var(--color-ink-900)",
                resize: "none",
                outline: "none",
              }}
            />
            <button
              type="button"
              onClick={onTextSubmit}
              disabled={!text.trim()}
              style={{
                appearance: "none",
                border: "1px solid var(--color-moss-300)",
                background: "var(--color-moss-50)",
                borderRadius: 14,
                padding: "12px 18px",
                font: "500 14px/1.2 var(--font-jp)",
                letterSpacing: "0.08em",
                color: "var(--color-moss-700)",
                cursor: text.trim() ? "pointer" : "not-allowed",
                opacity: text.trim() ? 1 : 0.5,
              }}
            >
              送る
            </button>
          </div>
        )}

        {/* 二次アクション（また今度 / 答えたくない） */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 18,
            marginTop: 18,
            paddingTop: 14,
            borderTop: "1px solid var(--color-line-soft)",
          }}
        >
          <button
            type="button"
            onClick={onLater}
            style={{
              appearance: "none",
              border: "none",
              background: "transparent",
              font: "400 12px/1 var(--font-jp)",
              letterSpacing: "0.08em",
              color: "var(--color-ink-500)",
              cursor: "pointer",
              padding: "6px 8px",
            }}
          >
            また今度
          </button>
          <button
            type="button"
            onClick={onNever}
            style={{
              appearance: "none",
              border: "none",
              background: "transparent",
              font: "400 12px/1 var(--font-jp)",
              letterSpacing: "0.08em",
              color: "var(--color-ink-300)",
              cursor: "pointer",
              padding: "6px 8px",
            }}
          >
            答えたくない
          </button>
        </div>
      </div>
    </>
  );
}
