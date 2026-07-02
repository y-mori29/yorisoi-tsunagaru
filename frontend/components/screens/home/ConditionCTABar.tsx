"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  getConditionMetaList,
  getMyConditionToday,
} from "@/lib/api/conditions";
import type { ConditionMeta, ConditionPost } from "@/lib/api/types";

/**
 * ホーム上部の「きょうの 体調」CTA バー（Phase 7A）。
 *
 * 5/20 冨澤 MTG で「投稿ハードルを下げる入口」として常設する案で出た UI。
 *
 * 2 つの状態：
 *  - 未投稿: 「きょうの 体調、ひとつ えらぶ ✦」CTA。タップで /post/condition
 *  - 投稿済: 選んだ 5 段階のプレビュー（ラベル + アイコン + 任意の ひとこと）
 *
 * モック API はメモリ保持なので、ページ遷移で戻ると状態が活きる。
 * 将来 RSC に書き直すなら、サーバー側で `getMyConditionToday()` を呼ぶだけで OK。
 */
export function ConditionCTABar() {
  const [post] = useState<ConditionPost | null>(() => getMyConditionToday());

  if (post) {
    return <PostedView post={post} />;
  }
  return <NotPostedView />;
}

function NotPostedView() {
  return (
    <Link
      href="/post/condition"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        margin: "0 16px 18px",
        padding: "16px 18px",
        background: "var(--color-card, #FFFDF8)",
        border: "1px dashed var(--color-terra-300, #E6B69A)",
        borderRadius: 16,
        textDecoration: "none",
        color: "var(--color-ink-900)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          display: "grid",
          placeItems: "center",
          width: 40,
          height: 40,
          borderRadius: 999,
          background: "var(--color-terra-50, #F8E8DE)",
          color: "var(--color-terra-600, #A45A3F)",
        }}
      >
        <Icon name="sparkle" size={22} />
      </span>
      <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <span
          style={{
            font: "500 14px/1.3 var(--font-jp)",
            letterSpacing: "0.06em",
            color: "var(--color-ink-900)",
          }}
        >
          きょうの 体調を、ひとつ。
        </span>
        <span
          style={{
            font: "400 12px/1.4 var(--font-jp)",
            letterSpacing: "0.04em",
            color: "var(--color-ink-500)",
          }}
        >
          ワンタップでも、ひとこと 添えても、どちらでも。
        </span>
      </span>
      <span
        aria-hidden="true"
        style={{ color: "var(--color-ink-300)" }}
      >
        <Icon name="chevronRight" size={20} />
      </span>
    </Link>
  );
}

function PostedView({ post }: { post: ConditionPost }) {
  const meta = getConditionMetaList().find((m) => m.level === post.level);
  if (!meta) return null;

  return (
    <div
      style={{
        margin: "0 16px 18px",
        padding: "14px 16px",
        background: toneToBg(meta.tone),
        border: `1px solid ${toneToBorder(meta.tone)}`,
        borderRadius: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: post.body ? 8 : 0,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: "grid",
            placeItems: "center",
            width: 32,
            height: 32,
            color: toneToText(meta.tone),
          }}
        >
          <Icon name={meta.icon} size={22} />
        </span>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <span
            style={{
              font: "500 11px/1 var(--font-jp)",
              letterSpacing: "0.14em",
              color: toneToText(meta.tone),
            }}
          >
            きょうの あなた
          </span>
          <span
            style={{
              font: "500 14px/1.3 var(--font-jp)",
              letterSpacing: "0.06em",
              color: "var(--color-ink-900)",
            }}
          >
            {meta.label}
          </span>
        </div>
        <span
          style={{
            font: "400 11px/1 var(--font-jp)",
            color: "var(--color-ink-300)",
            letterSpacing: "0.04em",
          }}
        >
          {post.timeLabel}
        </span>
      </div>
      {post.body && (
        <p
          style={{
            font: "400 14px/1.7 var(--font-jp)",
            color: "var(--color-ink-700)",
            letterSpacing: "0.04em",
            whiteSpace: "pre-line",
            margin: 0,
            paddingLeft: 44,
          }}
        >
          {post.body}
        </p>
      )}
    </div>
  );
}

function toneToBg(tone: ConditionMeta["tone"]): string {
  switch (tone) {
    case "gold":
      return "var(--color-gold-50, #FAF4E0)";
    case "moss":
      return "var(--color-moss-50, #ECF1E2)";
    case "default":
      return "var(--color-bg-soft, #F3EDE2)";
    case "plum":
      return "var(--color-plum-50, #F1EBF1)";
    case "terra":
      return "var(--color-terra-50, #F8E8DE)";
  }
}

function toneToBorder(tone: ConditionMeta["tone"]): string {
  switch (tone) {
    case "gold":
      return "var(--color-gold-300, #E8CB7E)";
    case "moss":
      return "var(--color-moss-300, #B5C8A1)";
    case "default":
      return "var(--color-ink-300, #B4A99A)";
    case "plum":
      return "var(--color-plum-300, #C4B4D3)";
    case "terra":
      return "var(--color-terra-300, #E6B69A)";
  }
}

function toneToText(tone: ConditionMeta["tone"]): string {
  switch (tone) {
    case "gold":
      return "var(--color-gold-600, #B68722)";
    case "moss":
      return "var(--color-moss-600, #5E7A4A)";
    case "default":
      return "var(--color-ink-700, #4A4036)";
    case "plum":
      return "var(--color-plum-600, #6F5587)";
    case "terra":
      return "var(--color-terra-600, #A45A3F)";
  }
}
