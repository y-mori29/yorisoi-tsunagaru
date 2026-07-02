"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { BackButton } from "@/components/ui/BackButton";
import { VoiceCard } from "@/components/ui/VoiceCard";
import { ConditionCard } from "@/components/ui/ConditionCard";
import { getMyVoices } from "@/lib/api/me";
import { getConditionMetaList } from "@/lib/api/conditions";
import { recentConditions } from "@/lib/mock/conditions";
import type { ConditionPost, Voice } from "@/lib/api/types";

/**
 * /me/voices — 記録を振り返る（Phase 7H）。
 *
 * 5/20 冨澤 MTG の文脈 + 森さん「病気を見つめなおすみたいなもの」の一部を担う画面。
 *
 * 「記録を振り返る」は GRAVITY 路線ではなく、PHR 系の「自分の積み重ね」を可視化する画面。
 * ただし数字や勝ち負けは出さず、月ごとに ことばと体調を そっと 並べる。
 *
 * 構成：
 *   - 「ゆっくり、ふりかえる」イントロ
 *   - 月別セクション（最新月から）
 *     - 各月のサマリ（その月の体調の傾向を 5 段階アイコンで色分け）
 *     - 投稿カード（自分の声 + 自分の体調投稿）
 *   - 末尾の「もっと前は…」スキ案内
 */

type Item =
  | { kind: "voice"; key: string; createdAt: string; voice: Voice }
  | { kind: "condition"; key: string; createdAt: string; condition: ConditionPost };

/** 月キー（"2026-05"）でグループ化 */
function monthKey(iso: string): string {
  return iso.slice(0, 7);
}

function formatMonth(key: string): string {
  const [y, m] = key.split("-");
  return `${y} 年 ${parseInt(m, 10)} 月`;
}

const MY_ID = "u-mori";

export default function MyVoicesPage() {
  const myVoices = use(getMyVoices());
  // 自分の体調投稿だけを抽出
  const myConditions = useMemo(
    () => recentConditions.filter((c) => c.authorId === MY_ID),
    [],
  );

  // 月別に統合
  const grouped = useMemo(() => {
    const items: Item[] = [
      ...myVoices.map((v) => ({
        kind: "voice" as const,
        key: v.id,
        createdAt: v.createdAt,
        voice: v,
      })),
      ...myConditions.map((c) => ({
        kind: "condition" as const,
        key: c.id,
        createdAt: c.createdAt,
        condition: c,
      })),
    ];
    items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const map = new Map<string, Item[]>();
    for (const it of items) {
      const k = monthKey(it.createdAt);
      const list = map.get(k) ?? [];
      list.push(it);
      map.set(k, list);
    }
    return Array.from(map.entries()).sort(([a], [b]) => b.localeCompare(a));
  }, [myVoices, myConditions]);

  return (
    <>
      <AppHeader
        title="記録を 振り返る"
        left={<BackButton fallbackHref="/me" />}
      />

      <main className="app-main">
        <p
          style={{
            font: "400 14px/1.95 var(--font-mincho)",
            color: "var(--color-ink-700)",
            letterSpacing: "0.04em",
            padding: "8px 16px 22px",
            whiteSpace: "pre-line",
          }}
        >
          ことばと、すごした 月日を、{"\n"}
          そっと 並べて みました。
        </p>

        {grouped.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            {grouped.map(([key, items]) => (
              <MonthSection key={key} monthKey={key} items={items} />
            ))}
          </div>
        )}

        <p
          style={{
            font: "400 11px/1.7 var(--font-jp)",
            color: "var(--color-ink-300)",
            letterSpacing: "0.06em",
            textAlign: "center",
            padding: "20px 24px 16px",
          }}
        >
          記録は、あなたの 中に だけ 残ります。
          <br />
          外には 出ません。
        </p>
      </main>
    </>
  );
}

function MonthSection({ monthKey, items }: { monthKey: string; items: Item[] }) {
  // その月の体調の傾向（5 段階を集計してドット表示）
  const conditions = items.flatMap((i) =>
    i.kind === "condition" ? [i.condition] : [],
  );
  const metaList = getConditionMetaList();

  return (
    <section>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "0 16px 12px",
        }}
      >
        <h3
          style={{
            font: "500 13px/1 var(--font-mincho)",
            color: "var(--color-ink-900)",
            letterSpacing: "0.12em",
            margin: 0,
          }}
        >
          {formatMonth(monthKey)}
        </h3>
        <div style={{ flex: 1, height: 1, background: "var(--color-line-soft, #EAE2D2)" }} />
        {conditions.length > 0 && (
          <div style={{ display: "flex", gap: 3 }}>
            {conditions.map((c) => {
              const meta = metaList.find((m) => m.level === c.level);
              if (!meta) return null;
              return (
                <span
                  key={c.id}
                  title={meta.label}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: toneToColor(meta.tone),
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((it) =>
          it.kind === "voice" ? (
            <VoiceCard
              key={it.key}
              voiceId={it.voice.id}
              href={`/voice/${it.voice.id}`}
              author={{
                name: it.voice.authorName,
                avatar: it.voice.authorAvatar,
                avatarSrc: it.voice.authorAvatarSrc,
                tone: it.voice.authorAvatarTone,
              }}
              roomName={it.voice.roomName}
              roomTone={it.voice.roomTone}
              time={it.voice.timeLabel}
              body={it.voice.body}
              reactions={it.voice.reactions.map((r) => ({
                icon: r.kind,
                label: r.label,
                active: r.mine,
                count: r.count,
              }))}
              showChat
            />
          ) : (
            <ConditionCard key={it.key} post={it.condition} />
          ),
        )}
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          font: "400 14px/1.85 var(--font-jp)",
          color: "var(--color-ink-500)",
          letterSpacing: "0.04em",
        }}
      >
        まだ、置いた ことばは ありません。
        <br />
        ひとつめの ことばを、待って います。
      </p>
    </div>
  );
}

function toneToColor(tone: "gold" | "moss" | "default" | "plum" | "terra"): string {
  switch (tone) {
    case "gold":
      return "var(--color-gold-500, #D8A93B)";
    case "moss":
      return "var(--color-moss-500, #7A9461)";
    case "default":
      return "var(--color-ink-300, #B4A99A)";
    case "plum":
      return "var(--color-plum-500, #9078A2)";
    case "terra":
      return "var(--color-terra-500, #C97A5A)";
  }
}
