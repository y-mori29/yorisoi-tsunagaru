"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { BackButton } from "@/components/ui/BackButton";
import { Icon } from "@/components/ui/Icon";

/**
 * /reflect — 病気を 見つめなおす（Phase 7H）。
 *
 * 5/21 森さん提案：「病気を見つめなおすみたいなもの」を新規ページとして実装。
 *
 * 性格：
 *  - ひとりで、ゆっくり、自分に問いかける時間
 *  - 答えは 外に 出ない（投稿・共有しない）
 *  - 月 1〜2 回 触れる程度の頻度を想定
 *  - 「主治医に伝えたいこと」が自然に整理される副次効果
 *
 * 構成：
 *  - ヘッダーカード（雰囲気）
 *  - 5 つの 問い カード（それぞれに textarea + ローカル保存）
 *  - 「主治医に 伝える メモを つくる」CTA（モック）
 *  - 「ゆっくり、また 今度」リード
 *
 * ローカル保存（モック・localStorage）。次回開いたとき続きから書ける。
 */

type Question = {
  id: string;
  label: string;
  prompt: string;
  hint?: string;
  /** 主治医に伝えるメモへ取り込む対象か */
  forDoctor?: boolean;
};

const QUESTIONS: Question[] = [
  {
    id: "q-good",
    label: "うれしかった こと",
    prompt: "この 1ヶ月で、いちばん 嬉しかった ことは、ありますか。",
    hint: "ちいさな ことで、構いません。",
  },
  {
    id: "q-body",
    label: "気になる からだの こと",
    prompt: "いま、いちばん 気になって いる からだの ことは、ありますか。",
    hint: "症状でも、薬の こと でも、気にかかる ことなら 何でも。",
    forDoctor: true,
  },
  {
    id: "q-question",
    label: "主治医に 聞きたい こと",
    prompt: "次の 診察で、聞いて おきたい ことは、ありますか。",
    hint: "後回しに しがちな ことを、ここで メモ。",
    forDoctor: true,
  },
  {
    id: "q-wish",
    label: "病気との 距離",
    prompt: "病気と どう つきあって いけたら、嬉しいですか。",
    hint: "正しい 答えは ありません。",
  },
  {
    id: "q-self",
    label: "いまの 自分",
    prompt: "いまの 自分を、ひとことで 例えると、どんな ふうですか。",
    hint: "天気・季節・色・動物・植物 など、何でも。",
  },
];

const STORAGE_KEY = "yorisoi-reflect-draft-v1";

export default function ReflectPage() {
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [saved, setSaved] = useState<"idle" | "saving" | "saved">("idle");


  const updateAnswer = (id: string, body: string) => {
    setAnswers((prev) => ({ ...prev, [id]: body }));
  };

  const persist = () => {
    setSaved("saving");
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
      setTimeout(() => setSaved("saved"), 300);
      setTimeout(() => setSaved("idle"), 2000);
    } catch {
      setSaved("idle");
    }
  };

  const buildDoctorMemo = (): string => {
    return QUESTIONS.filter((q) => q.forDoctor && answers[q.id]?.trim())
      .map((q) => `■ ${q.label}\n${answers[q.id].trim()}`)
      .join("\n\n");
  };

  const doctorMemo = buildDoctorMemo();

  return (
    <>
      <AppHeader
        title="病気を 見つめなおす"
        left={<BackButton fallbackHref="/me/voices" />}
      />

      <main className="app-main">
        <section
          style={{
            margin: "0 16px 22px",
            padding: "18px 18px",
            background: "var(--color-plum-50, #F1EBF1)",
            border: "1px solid var(--color-plum-200, #D3C5DE)",
            borderRadius: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span
              aria-hidden="true"
              style={{
                display: "grid",
                placeItems: "center",
                width: 36,
                height: 36,
                borderRadius: 12,
                background: "var(--color-card, #FFFDF8)",
                color: "var(--color-plum-600, #6F5587)",
              }}
            >
              <Icon name="moon" size={20} />
            </span>
            <span
              style={{
                font: "500 14px/1.3 var(--font-jp)",
                color: "var(--color-ink-900)",
                letterSpacing: "0.06em",
              }}
            >
              ゆっくり 自分に 問いかける 時間
            </span>
          </div>
          <p
            style={{
              font: "400 13px/1.85 var(--font-jp)",
              color: "var(--color-ink-700)",
              letterSpacing: "0.04em",
              margin: 0,
              whiteSpace: "pre-line",
            }}
          >
            ここに 書いた ことは、{"\n"}
            外には 出ません。{"\n"}
            あなたの 中だけに、残ります。
          </p>
        </section>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {QUESTIONS.map((q, idx) => (
            <QuestionCard
              key={q.id}
              index={idx + 1}
              question={q}
              answer={answers[q.id] ?? ""}
              onChange={(body) => updateAnswer(q.id, body)}
            />
          ))}
        </div>

        <section
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            padding: "24px 16px 8px",
          }}
        >
          <button
            type="button"
            onClick={persist}
            className="btn btn--primary btn--sm"
            disabled={saved === "saving"}
          >
            {saved === "saved"
              ? "✓ 残しました"
              : saved === "saving"
                ? "残して います…"
                : "ここまでを 残す"}
          </button>
        </section>

        {doctorMemo && (
          <section
            style={{
              margin: "20px 16px 8px",
              padding: "16px 16px",
              background: "var(--color-card, #FFFDF8)",
              border: "1px solid var(--color-line-soft, #EAE2D2)",
              borderRadius: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 10,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  color: "var(--color-moss-600, #5E7A4A)",
                }}
              >
                <Icon name="leaf" size={16} />
              </span>
              <span
                style={{
                  font: "500 12px/1 var(--font-jp)",
                  color: "var(--color-ink-700)",
                  letterSpacing: "0.12em",
                }}
              >
                主治医に 伝えられる メモ（自動で 整理）
              </span>
            </div>
            <pre
              style={{
                font: "400 13px/1.85 var(--font-jp)",
                color: "var(--color-ink-700)",
                letterSpacing: "0.04em",
                whiteSpace: "pre-wrap",
                background: "var(--color-bg-soft, #F3EDE2)",
                padding: "12px 14px",
                borderRadius: 10,
                margin: 0,
              }}
            >
              {doctorMemo}
            </pre>
            <p
              style={{
                font: "400 11px/1.6 var(--font-jp)",
                color: "var(--color-ink-300)",
                letterSpacing: "0.04em",
                margin: "10px 0 0",
              }}
            >
              診察の とき、これを 見ながら 話す と スムーズです。
            </p>
          </section>
        )}

        <p
          style={{
            font: "400 11px/1.7 var(--font-jp)",
            color: "var(--color-ink-300)",
            letterSpacing: "0.06em",
            textAlign: "center",
            padding: "30px 24px 16px",
          }}
        >
          ぜんぶ 書く 必要は、ありません。
          <br />
          途中で 閉じても、次に 開いた とき 残って います。
        </p>
      </main>
    </>
  );
}

function QuestionCard({
  index,
  question,
  answer,
  onChange,
}: {
  index: number;
  question: Question;
  answer: string;
  onChange: (body: string) => void;
}) {
  return (
    <article
      style={{
        margin: "0 16px",
        padding: "16px 16px",
        background: "var(--color-card, #FFFDF8)",
        border: "1px solid var(--color-line-soft, #EAE2D2)",
        borderRadius: 14,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <span
          style={{
            font: "500 11px/1 var(--font-mincho)",
            color: "var(--color-plum-600, #6F5587)",
            letterSpacing: "0.18em",
          }}
        >
          {String(index).padStart(2, "0")}
        </span>
        <span
          style={{
            font: "500 12px/1 var(--font-jp)",
            color: "var(--color-ink-700)",
            letterSpacing: "0.12em",
          }}
        >
          {question.label}
        </span>
        {question.forDoctor && (
          <span
            style={{
              marginLeft: "auto",
              padding: "2px 7px",
              borderRadius: 999,
              background: "var(--color-moss-50, #ECF1E2)",
              color: "var(--color-moss-600, #5E7A4A)",
              font: "500 10px/1 var(--font-jp)",
              letterSpacing: "0.08em",
            }}
          >
            診察に 持っていく
          </span>
        )}
      </div>
      <p
        style={{
          font: "400 16px/1.85 var(--font-mincho)",
          color: "var(--color-ink-900)",
          letterSpacing: "0.04em",
          margin: "0 0 12px",
          whiteSpace: "pre-line",
        }}
      >
        {question.prompt}
      </p>
      {question.hint && (
        <p
          style={{
            font: "400 11px/1.6 var(--font-jp)",
            color: "var(--color-ink-300)",
            letterSpacing: "0.04em",
            margin: "0 0 10px",
          }}
        >
          {question.hint}
        </p>
      )}
      <textarea
        value={answer}
        onChange={(e) => onChange(e.target.value)}
        placeholder="書きたい ぶんだけ、書いて 構いません。"
        rows={3}
        style={{
          width: "100%",
          padding: "10px 12px",
          border: "1px solid var(--color-line-soft, #EAE2D2)",
          borderRadius: 10,
          background: "var(--color-bg-soft, #F3EDE2)",
          font: "400 14px/1.8 var(--font-jp)",
          color: "var(--color-ink-900)",
          letterSpacing: "0.04em",
          resize: "vertical",
          outline: "none",
        }}
      />
    </article>
  );
}
