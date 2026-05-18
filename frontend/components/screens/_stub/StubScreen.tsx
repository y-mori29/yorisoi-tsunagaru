"use client";

import { AppHeader } from "@/components/layout/AppHeader";
import { IconButton } from "@/components/ui/IconButton";

type StubScreenProps = {
  title: string;
  summary?: string;
};

/**
 * 詳細画面のスタブ。
 * Phase 3 で UX を本実装するまでのプレースホルダ。
 * 戻る矢印 + 「これから整えます」メッセージ。
 */
export function StubScreen({ title, summary }: StubScreenProps) {
  return (
    <>
      <AppHeader title={title} left={<IconButton icon="back" label="戻る" />} />
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
