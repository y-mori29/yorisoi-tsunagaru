"use client";

import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { IconButton } from "@/components/ui/IconButton";
import { VoiceCard } from "@/components/ui/VoiceCard";
import { ProfileCover } from "@/components/screens/me/ProfileCover";
import { LifeLogCard } from "@/components/screens/me/LifeLogCard";
import { currentUser, myVoices } from "@/lib/mock/me";

/**
 * /me — プロフィール画面。
 * - 上部：ProfileCover（アバター + 名前 + ルーム + 一言 + タグ）
 * - 中部：LifeLogCard（あなたの 暮らしの 傾向・時間不変）
 * - 下部：自分が 置いた ことば のリスト
 *
 * BottomNav は profile タブ active。
 */
export default function MePage() {
  return (
    <>
      <AppHeader
        title="プロフィール"
        titleAlign="left"
        right={
          <Link href="/settings" aria-label="設定">
            <IconButton icon="settings" label="設定" />
          </Link>
        }
      />

      <main className="app-main">
        <ProfileCover user={currentUser} />

        <LifeLogCard />

        <div style={{ marginTop: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <h3
              style={{
                font: "500 13px/1 var(--font-jp)",
                color: "var(--color-ink-700)",
                letterSpacing: "0.12em",
              }}
            >
              置いた ことば
            </h3>
            <Link
              href="/me/voices"
              style={{
                font: "400 12px/1 var(--font-jp)",
                color: "var(--color-ink-500)",
                letterSpacing: "0.04em",
                textDecoration: "none",
              }}
            >
              ぜんぶ 見る
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {myVoices.map((v) => (
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
        </div>
      </main>

      <BottomNav active="profile" />
    </>
  );
}
