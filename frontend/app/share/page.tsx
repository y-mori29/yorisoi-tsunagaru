"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { BackButton } from "@/components/ui/BackButton";
import { BottomNav } from "@/components/layout/BottomNav";
import { Icon } from "@/components/ui/Icon";

type Tab = "here" | "all";

/**
 * 「見せる」プレースホルダー画面。
 * よりそい PHR の simple/show.html の構造（2タブ / パネル / 印刷）を踏襲した
 * 見た目を作り、中身は「準備中」プレースホルダーで方向性だけ示す。
 */
export default function SharePage() {
  const [tab, setTab] = useState<Tab>("here");

  return (
    <>
      <AppHeader
        title="見せる"
        titleAlign="left"
        left={<BackButton fallbackHref="/home-v2" />}
      />

      <main className="app-main" style={{ paddingTop: 0 }}>
        {/* タブ */}
        <div
          role="tablist"
          style={{
            position: "sticky",
            top: 0,
            display: "flex",
            background: "var(--color-paper)",
            borderBottom: "1px solid var(--color-line-soft)",
            zIndex: 10,
          }}
        >
          <TabBtn
            label="この病院 向け"
            active={tab === "here"}
            onClick={() => setTab("here")}
          />
          <TabBtn
            label="すべての 科"
            active={tab === "all"}
            onClick={() => setTab("all")}
          />
        </div>

        <div style={{ padding: "16px 16px 32px" }}>
          {/* パネル1: クリニック選択（プレースホルダー） */}
          <Panel
            icon="bookmark"
            title={tab === "here" ? "クリニックを 選ぶ" : "すべての 科"}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              {[
                { name: "クリニックを 登録", dept: "（準備中）" },
                { name: "・・・", dept: "" },
              ].map((c, i) => (
                <span
                  key={i}
                  style={{
                    padding: "12px 10px",
                    borderRadius: 12,
                    border: "1px dashed var(--color-line-soft)",
                    background: "var(--color-paper-soft)",
                    font: "400 12px/1.4 var(--font-jp)",
                    color: "var(--color-ink-300)",
                    letterSpacing: "0.04em",
                  }}
                >
                  <span style={{ display: "block", fontWeight: 500 }}>
                    {c.name}
                  </span>
                  {c.dept && (
                    <span
                      style={{
                        display: "block",
                        font: "400 10px/1.4 var(--font-jp)",
                        marginTop: 2,
                      }}
                    >
                      {c.dept}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </Panel>

          {/* パネル2: 他の科の要約（プレースホルダー） */}
          <Panel icon="chat" title="他の 科の 要約">
            <div style={{ textAlign: "center", padding: "20px 8px" }}>
              <p
                style={{
                  font: "400 13px/1.8 var(--font-jp)",
                  color: "var(--color-ink-500)",
                  letterSpacing: "0.06em",
                  marginBottom: 16,
                }}
              >
                まだ 共有できる 記録が
                <br />
                集まっていません。
              </p>
              <button
                type="button"
                disabled
                style={{
                  appearance: "none",
                  padding: "10px 18px",
                  borderRadius: 14,
                  border: "1px dashed var(--color-line-soft)",
                  background: "var(--color-paper-soft)",
                  font: "400 12px/1 var(--font-jp)",
                  color: "var(--color-ink-300)",
                  letterSpacing: "0.08em",
                  cursor: "not-allowed",
                }}
              >
                AI に まとめてもらう（準備中）
              </button>
            </div>
          </Panel>

          {/* パネル3: 薬と検査（プレースホルダー） */}
          <Panel icon="leaf" title="お薬と 検査">
            <p
              style={{
                font: "400 12px/1.8 var(--font-jp)",
                color: "var(--color-ink-500)",
                letterSpacing: "0.04em",
                padding: "8px 4px",
              }}
            >
              受診の 記録が たまると、
              <br />
              ここに お薬と 検査値が
              <br />
              そっと 並びます。
            </p>
          </Panel>

          {/* 印刷ボタン（disabled） */}
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button
              type="button"
              disabled
              style={{
                appearance: "none",
                padding: "10px 22px",
                borderRadius: 20,
                border: "1px solid var(--color-line-soft)",
                background: "var(--color-paper)",
                font: "400 12px/1 var(--font-jp)",
                color: "var(--color-ink-300)",
                letterSpacing: "0.1em",
                cursor: "not-allowed",
              }}
            >
              印刷して 見せる（準備中）
            </button>
            <p
              style={{
                font: "400 10px/1.5 var(--font-jp)",
                color: "var(--color-ink-300)",
                letterSpacing: "0.08em",
                marginTop: 12,
              }}
            >
              この 機能は いま 準備中です
            </p>
          </div>
        </div>
      </main>

      <BottomNav active={null} />
    </>
  );
}

function TabBtn({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      style={{
        flex: 1,
        appearance: "none",
        border: "none",
        background: active ? "var(--color-paper-soft)" : "transparent",
        padding: "14px 8px",
        font: `${active ? 500 : 400} 13px/1 var(--font-jp)`,
        letterSpacing: "0.1em",
        color: active ? "var(--color-ink-900)" : "var(--color-ink-500)",
        borderBottom: `2px solid ${active ? "var(--color-moss-500)" : "transparent"}`,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function Panel({
  icon,
  title,
  children,
}: {
  icon: "bookmark" | "chat" | "leaf";
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        background: "var(--color-card)",
        border: "1px solid var(--color-line-soft)",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <span
          style={{
            display: "grid",
            placeItems: "center",
            width: 24,
            height: 24,
            color: "var(--color-moss-700)",
          }}
        >
          <Icon name={icon} size={16} />
        </span>
        <h3
          style={{
            font: "500 13px/1.3 var(--font-jp)",
            letterSpacing: "0.1em",
            color: "var(--color-ink-700)",
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>
      {children}
    </section>
  );
}
