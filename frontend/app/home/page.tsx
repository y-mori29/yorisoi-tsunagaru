"use client";

import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { IconButton } from "@/components/ui/IconButton";
import { DotBadge } from "@/components/ui/DotBadge";
import { Segment } from "@/components/ui/Segment";
import { VoiceCard, SpecialVoiceCard } from "@/components/ui/VoiceCard";
import { GreetingBlock } from "@/components/screens/home/GreetingBlock";
import { mockVoices, todayVoice } from "@/lib/mock/voices";

/**
 * ホーム画面 — output_v02/02-home.png を忠実に再現。
 * - ステータスバー
 * - AppHeader（タイトル「ホーム」+ bell + dot badge）
 * - 挨拶ブロック（日付 + 「おはようございます、もりさん。」）
 * - セグメント（みんな / お隣）
 * - 「今日のひとこと」特別カード
 * - 投稿カード ×2
 * - ボトムナビ（ホーム active）
 * - home indicator
 */
export default function HomePage() {
  const [tab, setTab] = useState<"all" | "neighbor">("all");

  return (
    <>
      <AppHeader
        title="ホーム"
        titleAlign="left"
        right={
          <span style={{ position: "relative" }}>
            <IconButton icon="bell" label="お知らせ" />
            <span style={{ position: "absolute", top: 4, right: 4, pointerEvents: "none" }}>
              <DotBadge />
            </span>
          </span>
        }
      />

      <main className="app-main">
        <GreetingBlock date="2026 . 05 . 16" greeting="おはようございます、もりさん。" />

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <Segment
            options={[
              { value: "all", label: "みんな" },
              { value: "neighbor", label: "お隣" },
            ]}
            value={tab}
            onChange={setTab}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <SpecialVoiceCard
            eyebrow={todayVoice.eyebrow}
            body={todayVoice.body}
            authorName={todayVoice.authorName}
            authorAvatar={todayVoice.authorAvatar}
            authorAvatarSrc={todayVoice.authorAvatarSrc}
            authorTone={todayVoice.authorTone}
          />

          {mockVoices.map((v) => (
            <VoiceCard
              key={v.id}
              author={{
                name: v.authorName,
                avatar: v.authorAvatar,
                avatarSrc: v.authorAvatarSrc,
                tone: v.authorAvatarTone,
              }}
              roomName={v.roomName}
              roomTone={v.roomTone}
              time={v.timeLabel}
              body={v.body}
              photoSrc={v.photoSrc}
              photoAlt={v.photoAlt}
              reactions={v.reactions.map((r) => ({
                icon: r.kind,
                label: r.label,
                active: r.mine,
                count: r.count,
              }))}
              showChat
            />
          ))}
        </div>
      </main>

      <BottomNav active="home" />
    </>
  );
}
