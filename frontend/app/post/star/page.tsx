"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signInGateHref } from "@/lib/auth/require-sign-in";
import { AppHeader } from "@/components/layout/AppHeader";
import { IconButton } from "@/components/ui/IconButton";
import { StarTopicChips } from "@/components/screens/star/StarTopicChips";
import { mockStarTopics } from "@/lib/mock/star-topics";
import type { StarTopic } from "@/lib/api/types";

/**
 * /post/star — 流れ星投稿（GRAVITY 画像 06）。
 *
 * 流れ：
 *   お題チップから 1 つ選ぶ
 *     → 本文 textarea にテンプレが入る（編集可能）
 *     → 「ランダムに 送る」で誰か 1 人に DM が飛ぶ（擬似実装）
 *
 * Phase 6B 時点の擬似実装：
 *   送信ボタンで完了画面を出して、/notifications（やりとりタブ）へ。
 *   永続化はしない（次フェーズで Context or localStorage に保存）。
 */
export default function StarPostPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [topic, setTopic] = useState<StarTopic | null>(null);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const gate = signInGateHref(pathname);
    if (gate) router.replace(gate);
  }, [pathname, router]);

  const handleSelectTopic = (next: StarTopic) => {
    setTopic(next);
    setBody(next.template);
  };

  const handleSend = () => {
    if (!topic || !body.trim()) return;
    setSending(true);
    // 擬似的に送信遅延（らしさ）
    setTimeout(() => {
      setDone(true);
      // 送信後はやりとりタブに戻す（DM 系なので messages タブが自然）
      setTimeout(() => router.push("/notifications?tab=messages"), 1200);
    }, 600);
  };

  return (
    <>
      <AppHeader
        title="流れ星"
        left={
          <Link href="/post" aria-label="戻る">
            <IconButton icon="back" label="戻る" />
          </Link>
        }
      />

      <main className="app-main star-page">
        {done ? (
          <div className="star-done">
            <p className="star-done__mark" aria-hidden="true">✦</p>
            <p className="star-done__body">
              そっと、夜空に 放ちました。
              <br />
              いつか、誰かに、届きますように。
            </p>
          </div>
        ) : (
          <>
            <section
              style={{
                margin: "0 16px 18px",
                padding: "14px 14px",
                background: "var(--color-card, #FFFDF8)",
                border: "1px solid var(--color-line-soft, #EAE2D2)",
                borderRadius: 12,
                display: "flex",
                gap: 10,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background: "var(--color-plum-50, #F1EBF1)",
                  color: "var(--color-plum-600, #6F5587)",
                  flexShrink: 0,
                  marginTop: 1,
                  font: "400 14px/1 var(--font-mincho)",
                }}
              >
                ✦
              </span>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    font: "500 12px/1.6 var(--font-jp)",
                    color: "var(--color-ink-700)",
                    letterSpacing: "0.06em",
                    margin: "0 0 4px",
                  }}
                >
                  流れ星 とは？
                </p>
                <p
                  style={{
                    font: "400 12px/1.7 var(--font-jp)",
                    color: "var(--color-ink-500)",
                    letterSpacing: "0.04em",
                    margin: 0,
                  }}
                >
                  お題から ひとことだけ 選んで、知らない 誰かに ランダムに 流す しくみ。
                  返事が 来るかも しれないし、来ないかも しれません。
                </p>
              </div>
            </section>

            <p className="star-page__intro">
              ひとつ お題を 選んで、
              <br />
              誰かに、そっと 流してみる。
            </p>

            <StarTopicChips
              topics={mockStarTopics}
              selectedId={topic?.id ?? null}
              onSelect={handleSelectTopic}
            />

            {topic && (
              <>
                <textarea
                  className="star-page__textarea"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={5}
                  aria-label="メッセージ本文"
                />
                <p className="star-page__hint">
                  ランダムに、お隣さん 1 人に 届きます。
                  <br />
                  返事は、来るかも しれないし、来ないかも しれません。
                </p>

                <button
                  type="button"
                  className="btn btn--primary btn--full star-page__submit"
                  onClick={handleSend}
                  disabled={!body.trim() || sending}
                >
                  {sending ? "送っています…" : "ランダムに 送る"}
                </button>
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}
