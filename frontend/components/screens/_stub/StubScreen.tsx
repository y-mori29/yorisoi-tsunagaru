"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { BackButton } from "@/components/ui/BackButton";

type StubScreenProps = {
  title: string;
  summary?: string;
  /** 直リンクで開かれた場合に戻る先（デフォルト：/settings） */
  fallbackHref?: string;
};

/**
 * 詳細画面のスタブ。
 * Phase 3 で UX を本実装するまでのプレースホルダ。
 * 戻る矢印 + 「これから整えます」メッセージ。
 */
export function StubScreen({ title, summary, fallbackHref = "/settings" }: StubScreenProps) {
  return (
    <>
      <AppHeader title={title} left={<BackButton fallbackHref={fallbackHref} />} />
      <main
        className="app-main"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          paddingTop: 80,
          minHeight: "60vh",
        }}
      >
        <p
          style={{
            font: "400 14px/1.85 var(--font-jp)",
            color: "var(--color-ink-500)",
            maxWidth: 300,
            whiteSpace: "pre-line",
            marginBottom: 24,
            letterSpacing: "0.02em",
          }}
        >
          {summary || "このページは、これから整えます。\nもう少し、お待ちください。"}
        </p>
        <p
          style={{
            font: "400 11px/1 var(--font-jp)",
            color: "var(--color-ink-300)",
            letterSpacing: "0.18em",
          }}
        >
          PREPARING
        </p>
      </main>
    </>
  );
}
