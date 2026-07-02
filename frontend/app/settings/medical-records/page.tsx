"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { BackButton } from "@/components/ui/BackButton";
import { Icon } from "@/components/ui/Icon";

/**
 * /settings/medical-records — 診察の 記録（便利機能・Phase 7H）。
 *
 * 5/16 MTG「コミュニティ継続利用者が自然に気づいて使う便利機能」と位置づけられ、
 * 能動的に押し売りしない設計。声で簡単にメモを残し、次の通院に持っていけるようにする。
 *
 * MVP 範囲：
 *  - 録音ボタン（モック・実音声録音はしない・状態だけ進める）
 *  - 録音後の文字起こし結果（モック）
 *  - 過去のメモ一覧（編集 / 削除はまだ）
 *
 * 将来：Web Speech API or サーバー側 STT に差し替える前提のスタブ。
 */

type RecordedMemo = {
  id: string;
  date: string;
  /** 短いタイトル（自動抽出 想定） */
  headline: string;
  body: string;
};

const initialMemos: RecordedMemo[] = [
  {
    id: "m-001",
    date: "2026 . 05 . 15",
    headline: "朝の お腹、夜は 落ち着く",
    body:
      "朝、お腹の 調子が 悪い 日が 続いて います。\n夜は 落ち着く。\n薬は 朝・晩 のみ忘れ なし。\n体重 変わらず。",
  },
  {
    id: "m-002",
    date: "2026 . 05 . 10",
    headline: "腰の 張り、軽い 運動で 改善",
    body:
      "腰の 張りが 強い。\n軽く 散歩すると、すこし マシに なる 感じ。",
  },
  {
    id: "m-003",
    date: "2026 . 05 . 03",
    headline: "眠りが 浅い 日が 続く",
    body:
      "夜、寝つきは いいけれど、2 時間で 起きてしまう。\nまた 寝直す ことが できないことも。",
  },
];

type RecState = "idle" | "recording" | "transcribing" | "done";

export default function MedicalRecordsPage() {
  const [memos, setMemos] = useState<RecordedMemo[]>(initialMemos);
  const [state, setState] = useState<RecState>("idle");
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [draft, setDraft] = useState("");

  // タイマー（録音中だけ進む・モック）
  const handleStartRecording = () => {
    setState("recording");
    setSecondsElapsed(0);
    const handle = setInterval(() => {
      setSecondsElapsed((current) => current + 1);
    }, 1000);
    // 30 秒で 自動停止（モック）
    setTimeout(() => {
      clearInterval(handle);
      stopRecording();
    }, 30_000);
    // メモリ的に handle を保持（簡易のため省略・停止時に clearInterval されなくても 30 秒で止まる）
  };

  const stopRecording = () => {
    setState("transcribing");
    // 文字起こしモック（1.2 秒の遅延）
    setTimeout(() => {
      setDraft(
        "今日は、朝 から すこし お腹が 重い。\n薬は ちゃんと のんだ。\n昨日 ヒュミラを 打った ところが 少し 赤い。\n次の 診察の とき、伝える。",
      );
      setState("done");
    }, 1200);
  };

  const saveMemo = () => {
    if (!draft.trim()) return;
    const today = new Date();
    const date = `${today.getFullYear()} . ${String(today.getMonth() + 1).padStart(
      2,
      "0",
    )} . ${String(today.getDate()).padStart(2, "0")}`;
    const newMemo: RecordedMemo = {
      id: `m-${today.getTime()}`,
      date,
      headline: draft.split("\n")[0].slice(0, 20),
      body: draft.trim(),
    };
    setMemos((prev) => [newMemo, ...prev]);
    setDraft("");
    setState("idle");
    setSecondsElapsed(0);
  };

  const discard = () => {
    setDraft("");
    setState("idle");
    setSecondsElapsed(0);
  };

  return (
    <>
      <AppHeader
        title="診察の 記録"
        left={<BackButton fallbackHref="/settings" />}
      />

      <main className="app-main">
        <p
          style={{
            font: "400 14px/1.95 var(--font-mincho)",
            color: "var(--color-ink-700)",
            letterSpacing: "0.04em",
            padding: "8px 16px 18px",
            whiteSpace: "pre-line",
          }}
        >
          ふと 気づいた からだの こと。{"\n"}
          話す ように、メモして おけます。
        </p>

        {/* 録音 UI */}
        <section
          style={{
            margin: "0 16px 22px",
            padding: "22px 16px",
            background: "var(--color-card, #FFFDF8)",
            border: "1px solid var(--color-line-soft, #EAE2D2)",
            borderRadius: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          {state === "idle" && (
            <>
              <RecordButton onClick={handleStartRecording} variant="start" />
              <p
                style={{
                  font: "400 12px/1.7 var(--font-jp)",
                  color: "var(--color-ink-500)",
                  letterSpacing: "0.04em",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                話したい ことを、そのまま どうぞ。
                <br />
                あとで 文字に なります。
              </p>
            </>
          )}

          {state === "recording" && (
            <>
              <RecordButton onClick={stopRecording} variant="stop" />
              <RecordingIndicator seconds={secondsElapsed} />
            </>
          )}

          {state === "transcribing" && (
            <>
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 80,
                  height: 80,
                  borderRadius: 999,
                  background: "var(--color-bg-soft, #F3EDE2)",
                  color: "var(--color-ink-500)",
                }}
              >
                <Icon name="sparkle" size={32} />
              </div>
              <p
                style={{
                  font: "400 13px/1.7 var(--font-jp)",
                  color: "var(--color-ink-500)",
                  letterSpacing: "0.04em",
                  margin: 0,
                }}
              >
                話して くれた ことばを、ゆっくり 文字に しています…
              </p>
            </>
          )}

          {state === "done" && (
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
              <p
                style={{
                  font: "500 12px/1 var(--font-jp)",
                  color: "var(--color-ink-700)",
                  letterSpacing: "0.12em",
                  margin: 0,
                }}
              >
                文字に なりました
              </p>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                style={{
                  width: "100%",
                  minHeight: 130,
                  padding: "12px 14px",
                  border: "1px solid var(--color-line-soft, #EAE2D2)",
                  borderRadius: 12,
                  background: "var(--color-bg-soft, #F3EDE2)",
                  font: "400 14px/1.8 var(--font-jp)",
                  color: "var(--color-ink-900)",
                  letterSpacing: "0.04em",
                  resize: "vertical",
                  outline: "none",
                }}
              />
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="button"
                  onClick={discard}
                  className="btn btn--ghost btn--sm"
                >
                  消す
                </button>
                <button
                  type="button"
                  onClick={saveMemo}
                  className="btn btn--primary btn--sm"
                  disabled={!draft.trim()}
                >
                  ✓ 残す
                </button>
              </div>
            </div>
          )}
        </section>

        {/* 過去のメモ */}
        <section style={{ padding: "0 16px 16px" }}>
          <h3
            style={{
              font: "500 12px/1 var(--font-jp)",
              color: "var(--color-ink-700)",
              letterSpacing: "0.14em",
              margin: "0 0 12px",
            }}
          >
            これまでの メモ
          </h3>
          {memos.length === 0 ? (
            <p
              style={{
                font: "400 13px/1.7 var(--font-jp)",
                color: "var(--color-ink-300)",
                letterSpacing: "0.06em",
                padding: "12px 4px",
              }}
            >
              まだ メモは ありません。
            </p>
          ) : (
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {memos.map((m) => (
                <MemoRow key={m.id} memo={m} />
              ))}
            </ul>
          )}
        </section>

        <p
          style={{
            font: "400 11px/1.7 var(--font-jp)",
            color: "var(--color-ink-300)",
            letterSpacing: "0.06em",
            textAlign: "center",
            padding: "12px 24px 16px",
          }}
        >
          メモは、あなたの 中に だけ 残ります。
          <br />
          外には 出ません。次の 通院の とき、お役立て ください。
        </p>
      </main>
    </>
  );
}

function RecordButton({
  onClick,
  variant,
}: {
  onClick: () => void;
  variant: "start" | "stop";
}) {
  const isStop = variant === "stop";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isStop ? "録音を 止める" : "録音を 始める"}
      style={{
        width: 80,
        height: 80,
        borderRadius: 999,
        border: "none",
        background: isStop ? "var(--color-terra-500, #C97A5A)" : "var(--color-terra-600, #A45A3F)",
        color: "var(--color-card, #FFFDF8)",
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        boxShadow: isStop
          ? "0 0 0 8px var(--color-terra-50, #F8E8DE)"
          : "0 2px 8px rgba(0,0,0,0.06)",
        transition: "all 0.18s ease",
      }}
    >
      <Icon name={isStop ? "close" : "mic"} size={isStop ? 28 : 32} />
    </button>
  );
}

function RecordingIndicator({ seconds }: { seconds: number }) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <span
        style={{
          font: "500 22px/1 var(--font-num, var(--font-jp))",
          color: "var(--color-terra-600, #A45A3F)",
          letterSpacing: "0.04em",
        }}
      >
        {mm}:{ss}
      </span>
      <div
        style={{
          display: "flex",
          gap: 4,
          alignItems: "center",
          height: 16,
        }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            style={{
              width: 3,
              height: 4 + ((seconds + i) % 4) * 3,
              background: "var(--color-terra-500, #C97A5A)",
              borderRadius: 1.5,
              transition: "height 0.2s ease",
            }}
          />
        ))}
      </div>
      <p
        style={{
          font: "400 12px/1 var(--font-jp)",
          color: "var(--color-ink-500)",
          letterSpacing: "0.08em",
          margin: 0,
        }}
      >
        ゆっくり、話して ください
      </p>
    </div>
  );
}

function MemoRow({ memo }: { memo: RecordedMemo }) {
  return (
    <li
      style={{
        padding: "12px 14px",
        background: "var(--color-card, #FFFDF8)",
        border: "1px solid var(--color-line-soft, #EAE2D2)",
        borderRadius: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          marginBottom: 6,
        }}
      >
        <span
          style={{
            font: "500 13px/1.3 var(--font-jp)",
            color: "var(--color-ink-900)",
            letterSpacing: "0.04em",
            flex: 1,
          }}
        >
          {memo.headline}
        </span>
        <span
          style={{
            font: "400 11px/1 var(--font-jp)",
            color: "var(--color-ink-300)",
            letterSpacing: "0.06em",
          }}
        >
          {memo.date}
        </span>
      </div>
      <p
        style={{
          font: "400 13px/1.7 var(--font-jp)",
          color: "var(--color-ink-700)",
          letterSpacing: "0.04em",
          whiteSpace: "pre-line",
          margin: 0,
        }}
      >
        {memo.body}
      </p>
    </li>
  );
}
