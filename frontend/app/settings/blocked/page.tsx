"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { BackButton } from "@/components/ui/BackButton";

/**
 * ブロック詳細画面。
 * 森さんの方針：「ブロックした人の名前は最初は見えないようにする。
 * 名前を見るだけでもブロックした当時の嫌な気持ちが よみがえる可能性があるため」
 * → デフォルト「名前は伏せる」、能動的に「名前を表示する」ボタンを押すと開示。
 */
export default function BlockedPage() {
  const [show, setShow] = useState(false);

  // モック：将来 API に置換
  const blocked = [
    { id: "b1", maskedName: "ある お隣さん", name: "もみじ", blockedAt: "2026年 4月" },
    { id: "b2", maskedName: "ある お隣さん", name: "そら（別の方）", blockedAt: "2026年 3月" },
  ];

  return (
    <>
      <AppHeader
        title="ブロックしている お隣さん"
        left={<BackButton fallbackHref="/settings" />}
      />
      <main className="app-main" style={{ maxWidth: 360, margin: "0 auto" }}>
        <p
          style={{
            font: "400 14px/1.95 var(--font-jp)",
            color: "var(--color-ink-700)",
            marginTop: 24,
            marginBottom: 20,
            letterSpacing: "0.02em",
            whiteSpace: "pre-line",
          }}
        >
          {"いま 2 人を、そっとブロックしています。\n\n名前は、見えないようになっています。\n見たいときだけ、下のボタンで表示できます。"}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {blocked.map((b) => (
            <div
              key={b.id}
              style={{
                background: "var(--color-card)",
                borderRadius: "var(--radius-md)",
                padding: "14px 18px",
                border: "1px solid var(--color-line-soft)",
              }}
            >
              <div
                style={{
                  font: "500 14px/1.4 var(--font-jp)",
                  color: show ? "var(--color-ink-900)" : "var(--color-ink-500)",
                  letterSpacing: "0.02em",
                  marginBottom: 3,
                }}
              >
                {show ? b.name : b.maskedName}
              </div>
              <div
                style={{
                  font: "400 12px/1.5 var(--font-jp)",
                  color: "var(--color-ink-500)",
                }}
              >
                ブロック日: {b.blockedAt}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
          <button
            type="button"
            className="btn btn--quiet btn--sm"
            onClick={() => setShow(!show)}
          >
            {show ? "名前を 隠す" : "名前を 表示する"}
          </button>
        </div>

        <p
          style={{
            font: "400 11px/1.7 var(--font-jp)",
            color: "var(--color-ink-300)",
            textAlign: "center",
            marginTop: 32,
            maxWidth: 280,
            marginLeft: "auto",
            marginRight: "auto",
            letterSpacing: "0.04em",
          }}
        >
          ブロックを 解く ボタンは、これから 整えます。
        </p>
      </main>
    </>
  );
}
