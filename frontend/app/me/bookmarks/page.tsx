"use client";

import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { BackButton } from "@/components/ui/BackButton";
import { Icon } from "@/components/ui/Icon";
import { explorePosts } from "@/lib/mock/explore";
import type { ExplorePost } from "@/lib/mock/explore";

const bookmarkedPosts = explorePosts.filter((post) => post.saved);

export default function BookmarksPage() {
  return (
    <>
      <AppHeader title="保存した声" left={<BackButton fallbackHref="/me" />} />

      <main
        className="app-main bookmarks-shell"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          paddingBottom: "calc(104px + env(safe-area-inset-bottom))",
        }}
      >
        <section
          className="bookmarks-hero"
          aria-label="保存した声の説明"
          style={{
            padding: 18,
            border: "1px solid rgba(214, 200, 178, 0.78)",
            borderRadius: 20,
            background: "linear-gradient(135deg, rgba(255, 253, 248, 0.96), rgba(248, 242, 232, 0.84))",
            boxShadow: "0 12px 28px rgba(74, 56, 38, 0.06)",
            color: "var(--color-moss-700)",
          }}
        >
          <Icon name="bookmark" size={24} />
          <h1
            style={{
              margin: "10px 0 0",
              color: "var(--color-ink-900)",
              fontFamily: "var(--font-mincho)",
              fontSize: 22,
              fontWeight: 500,
              lineHeight: 1.45,
              letterSpacing: "0.04em",
            }}
          >
            あとで、もう一度読みたい声
          </h1>
          <p
            style={{
              margin: "8px 0 0",
              color: "var(--color-ink-600)",
              fontFamily: "var(--font-jp)",
              fontSize: 12,
              fontWeight: 500,
              lineHeight: 1.75,
            }}
          >
            不安な時に読み返したい体験談や、近いテーマの声をここに残しておけます。
          </p>
        </section>

        {bookmarkedPosts.length > 0 ? (
          <div className="bookmarks-list" style={{ display: "grid", gap: 10 }}>
            {bookmarkedPosts.map((post) => (
              <BookmarkCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div
            className="bookmarks-empty"
            style={{
              display: "grid",
              justifyItems: "center",
              gap: 10,
              padding: "34px 18px",
              border: "1px dashed rgba(190, 172, 145, 0.72)",
              borderRadius: 18,
              background: "rgba(255, 253, 248, 0.66)",
              color: "var(--color-moss-700)",
              textAlign: "center",
            }}
          >
            <Icon name="leaf" size={22} />
            <p style={{ margin: 0, color: "var(--color-ink-700)", fontSize: 13, fontWeight: 600 }}>
              まだ保存した声はありません。
            </p>
            <Link
              href="/home"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                color: "var(--color-moss-700)",
                fontSize: 12,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              近い声を読む
              <Icon name="chevronRight" size={14} />
            </Link>
          </div>
        )}
      </main>

      <BottomNav active="mail" />
    </>
  );
}

function BookmarkCard({ post }: { post: ExplorePost }) {
  return (
    <article className="bookmark-card">
      <Link
        href="/home#feed"
        aria-label={`${post.topic}の保存した声を読む`}
        style={{
          display: "grid",
          gap: 9,
          padding: 13,
          border: "1px solid rgba(214, 200, 178, 0.76)",
          borderRadius: 17,
          background: "rgba(255, 253, 248, 0.86)",
          boxShadow: "0 8px 20px rgba(74, 56, 38, 0.045)",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            minWidth: 0,
          }}
        >
          <span className={`explore-topic-pill explore-topic-pill--${post.topicTone}`}>{post.topic}</span>
          <small
            style={{
              flex: "0 0 auto",
              color: "var(--color-ink-300)",
              fontFamily: "var(--font-jp)",
              fontSize: 10.5,
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            {post.timeLabel}
          </small>
        </header>
        <p
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
            margin: 0,
            color: "var(--color-ink-800)",
            fontFamily: "var(--font-jp)",
            fontSize: 12.5,
            fontWeight: 500,
            lineHeight: 1.75,
          }}
        >
          {post.body}
        </p>
        <footer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            color: "var(--color-ink-400)",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            <Icon name="understand" size={13} />
            {post.viewCount ?? "0"}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 3,
              color: "var(--color-moss-700)",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            読む
            <Icon name="chevronRight" size={13} />
          </span>
        </footer>
      </Link>
    </article>
  );
}
