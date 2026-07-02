"use client";

import { use } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { VoiceCard } from "@/components/ui/VoiceCard";
import { HealthContextSummaryCard } from "@/components/screens/me/HealthContextSummaryCard";
import { getCurrentUser, getMyVoices } from "@/lib/api/me";
import { explorePosts } from "@/lib/mock/explore";
import type { ExplorePost } from "@/lib/mock/explore";

const savedPosts = explorePosts.filter((post) => post.saved).slice(0, 2);

export default function MePage() {
  const currentUser = use(getCurrentUser());
  const myVoices = use(getMyVoices());
  const recentVoices = myVoices.slice(0, 2);

  return (
    <>
      <AppHeader
        title="マイページ"
        titleAlign="left"
        right={
          <Link href="/settings" aria-label="設定を開く">
            <IconButton icon="settings" label="設定" />
          </Link>
        }
      />

      <main className="app-main me-hub" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <section
          className="me-quiet-hero"
          aria-label="マイページの概要"
          style={{
            display: "grid",
            gridTemplateColumns: "auto minmax(0, 1fr)",
            alignItems: "center",
            gap: 13,
            padding: 15,
            border: "1px solid rgba(214, 200, 178, 0.78)",
            borderRadius: 18,
            background: "linear-gradient(135deg, rgba(255, 253, 248, 0.94), rgba(239, 241, 230, 0.72))",
            boxShadow: "0 10px 24px rgba(74, 56, 38, 0.052)",
          }}
        >
          <Avatar
            animal={currentUser.avatar}
            src={currentUser.avatarSrc}
            tone={currentUser.avatarTone}
            size={44}
            alt={currentUser.name}
          />
          <div>
            <p style={{ margin: 0, color: "var(--color-ink-900)", font: "700 14px/1.55 var(--font-jp)" }}>
              読むことも、置くことも、自分のペースで。
            </p>
            <span
              style={{
                display: "block",
                marginTop: 4,
                color: "var(--color-ink-500)",
                font: "500 11.5px/1.7 var(--font-jp)",
              }}
            >
              ここでは自分の状態、保存した声、置いた声、安心設定をまとめて確認できます。
            </span>
          </div>
        </section>

        <nav
          className="me-action-grid"
          aria-label="マイページの主な操作"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }}
        >
          <HubAction href="/onboarding/condition" icon="leaf" title="自分の状態" body="病気・症状・不安を見直す" />
          <HubAction href="/me/bookmarks" icon="bookmark" title="保存した声" body="あとで読み返す声を見る" />
          <HubAction href="/me/voices" icon="whisper" title="置いた声" body="自分の投稿を振り返る" />
          <HubAction href="/settings" icon="shield" title="安心設定" body="公開範囲や通知を整える" />
        </nav>

        <HealthContextSummaryCard />

        <section className="me-section" aria-labelledby="me-saved-heading" style={{ display: "grid", gap: 10 }}>
          <div
            className="me-section__head"
            style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}
          >
            <div>
              <p style={{ margin: 0, color: "var(--color-moss-700)", font: "700 10.5px/1.4 var(--font-jp)", letterSpacing: "0.12em" }}>
                保存した声
              </p>
              <h2 id="me-saved-heading" style={{ margin: "2px 0 0", color: "var(--color-ink-900)", font: "700 15px/1.45 var(--font-jp)" }}>
                あとで読み返したい声
              </h2>
            </div>
            <Link
              href="/me/bookmarks"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 3,
                color: "var(--color-moss-700)",
                font: "700 12px/1 var(--font-jp)",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              すべて見る
              <Icon name="chevronRight" size={14} />
            </Link>
          </div>
          <div className="me-saved-list" style={{ display: "grid", gap: 10 }}>
            {savedPosts.map((post) => (
              <SavedVoiceItem key={post.id} post={post} />
            ))}
          </div>
        </section>

        <section className="me-section" aria-labelledby="me-voices-heading" style={{ display: "grid", gap: 10 }}>
          <div
            className="me-section__head"
            style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}
          >
            <div>
              <p style={{ margin: 0, color: "var(--color-moss-700)", font: "700 10.5px/1.4 var(--font-jp)", letterSpacing: "0.12em" }}>
                置いた声
              </p>
              <h2 id="me-voices-heading" style={{ margin: "2px 0 0", color: "var(--color-ink-900)", font: "700 15px/1.45 var(--font-jp)" }}>
                自分が書いたこと
              </h2>
            </div>
            <Link
              href="/me/voices"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 3,
                color: "var(--color-moss-700)",
                font: "700 12px/1 var(--font-jp)",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              振り返る
              <Icon name="chevronRight" size={14} />
            </Link>
          </div>
          <div className="me-voice-stack" style={{ display: "grid", gap: 10 }}>
            {recentVoices.map((voice) => (
              <VoiceCard
                key={voice.id}
                voiceId={voice.id}
                href={`/voice/${voice.id}`}
                author={{
                  name: voice.authorName,
                  avatar: voice.authorAvatar,
                  avatarSrc: voice.authorAvatarSrc,
                  tone: voice.authorAvatarTone,
                }}
                roomName={voice.roomName}
                roomTone={voice.roomTone}
                time={voice.timeLabel}
                body={voice.body}
                reactions={voice.reactions.map((reaction) => ({
                  icon: reaction.kind,
                  label: reaction.label,
                  active: reaction.mine,
                  count: reaction.count,
                }))}
                showChat
              />
            ))}
          </div>
        </section>

        <section
          className="me-safety-note"
          aria-label="安心して使うための設定"
          style={{
            display: "grid",
            gridTemplateColumns: "auto minmax(0, 1fr) auto",
            alignItems: "center",
            gap: 10,
            padding: "13px 14px",
            border: "1px solid rgba(117, 127, 85, 0.24)",
            borderRadius: 18,
            background: "rgba(239, 241, 230, 0.72)",
            color: "var(--color-moss-700)",
          }}
        >
          <Icon name="lock" size={18} />
          <div>
            <p style={{ margin: 0, color: "var(--color-ink-900)", font: "700 12.5px/1.45 var(--font-jp)" }}>
              公開範囲はあとから変えられます
            </p>
            <span style={{ display: "block", marginTop: 3, color: "var(--color-ink-500)", font: "500 10.5px/1.55 var(--font-jp)" }}>
              病気や症状、投稿の見え方は、設定からいつでも見直せます。
            </span>
          </div>
          <Link
            href="/settings"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 2,
              minHeight: 31,
              paddingInline: 12,
              borderRadius: 999,
              background: "rgba(255, 253, 248, 0.72)",
              color: "var(--color-moss-700)",
              font: "700 11px/1 var(--font-jp)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            設定
            <Icon name="chevronRight" size={14} />
          </Link>
        </section>
      </main>

      <BottomNav active="profile" />
    </>
  );
}

function HubAction({
  href,
  icon,
  title,
  body,
}: {
  href: string;
  icon: "leaf" | "bookmark" | "whisper" | "shield";
  title: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="me-action"
      style={{
        minHeight: 104,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 7,
        padding: 13,
        border: "1px solid rgba(214, 200, 178, 0.78)",
        borderRadius: 16,
        background: "rgba(255, 253, 248, 0.82)",
        color: "var(--color-ink-900)",
        textDecoration: "none",
        boxShadow: "0 7px 18px rgba(74, 56, 38, 0.04)",
      }}
    >
      <span
        style={{
          width: 32,
          height: 32,
          display: "grid",
          placeItems: "center",
          borderRadius: 999,
          background: "var(--color-moss-50)",
          color: "var(--color-moss-700)",
        }}
      >
        <Icon name={icon} size={18} />
      </span>
      <strong style={{ color: "var(--color-ink-900)", font: "700 13px/1.35 var(--font-jp)" }}>{title}</strong>
      <small style={{ color: "var(--color-ink-500)", font: "500 10.5px/1.55 var(--font-jp)" }}>{body}</small>
    </Link>
  );
}

function SavedVoiceItem({ post }: { post: ExplorePost }) {
  return (
    <Link
      href="/home#feed"
      className="me-saved-item"
      style={{
        display: "grid",
        gap: 9,
        padding: 13,
        border: "1px solid rgba(214, 200, 178, 0.76)",
        borderRadius: 17,
        background: "rgba(255, 253, 248, 0.84)",
        color: "inherit",
        textDecoration: "none",
        boxShadow: "0 8px 20px rgba(74, 56, 38, 0.045)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, minWidth: 0 }}>
        <span className={`explore-topic-pill explore-topic-pill--${post.topicTone}`}>{post.topic}</span>
        <small style={{ flex: "0 0 auto", color: "var(--color-ink-300)", font: "600 10.5px/1 var(--font-jp)" }}>{post.timeLabel}</small>
      </div>
      <p
        style={{
          display: "-webkit-box",
          overflow: "hidden",
          margin: 0,
          color: "var(--color-ink-800)",
          font: "500 12.5px/1.75 var(--font-jp)",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
        }}
      >
        {post.body}
      </p>
      <footer style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, minWidth: 0 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--color-ink-400)", font: "600 11px/1 var(--font-jp)" }}>
          <Icon name="understand" size={13} />
          {post.viewCount ?? "0"}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--color-ink-400)", font: "600 11px/1 var(--font-jp)" }}>
          読む
          <Icon name="chevronRight" size={13} />
        </span>
      </footer>
    </Link>
  );
}
