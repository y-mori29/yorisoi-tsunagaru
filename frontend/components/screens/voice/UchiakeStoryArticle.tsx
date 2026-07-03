"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signInGateHref } from "@/lib/auth/require-sign-in";
import { AppHeader } from "@/components/layout/AppHeader";
import { BackButton } from "@/components/ui/BackButton";
import { IconButton } from "@/components/ui/IconButton";
import { Avatar } from "@/components/ui/Avatar";
import { ReactionChip } from "@/components/ui/ReactionChip";
import { CommentList } from "@/components/screens/voice/CommentList";
import { CommentComposer } from "@/components/screens/voice/CommentComposer";
import { getComments } from "@/lib/api/comments";
import type { Comment } from "@/lib/api/types";
import type { AvatarTone } from "@/lib/api/types";
import type { AnimalName } from "@/lib/icons";

export type UchiakeStory = {
  id: string;
  authorName: string;
  authorAvatar: AnimalName;
  authorAvatarTone: AvatarTone;
  topic: string;
  timeLabel: string;
  title?: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  age?: string;
  gender?: string;
  voice?: string;
};

type Reaction = {
  key: "ack" | "leaf" | "thanks";
  icon: "acknowledge" | "leaf" | "thanks";
  label: string;
};

const REACTIONS: Reaction[] = [
  { key: "ack", icon: "acknowledge", label: "そう" },
  { key: "leaf", icon: "leaf", label: "わかる" },
  { key: "thanks", icon: "thanks", label: "ありがとう" },
];

const SECTIONS: Array<{ key: keyof Pick<UchiakeStory, "q1" | "q2" | "q3" | "q4" | "q5">; label: string }> = [
  { key: "q1", label: "いまの状態のこと" },
  { key: "q2", label: "かかえている気持ち" },
  { key: "q3", label: "気づいてから、これまで" },
  { key: "q4", label: "薬や治療のこと" },
  { key: "q5", label: "いま、困っていること" },
];

const cardStyle: CSSProperties = {
  border: "1px solid rgba(214,200,178,0.76)",
  borderRadius: 18,
  background: "rgba(255,253,248,0.86)",
  padding: "20px 18px",
};

export function UchiakeStoryArticle({ story }: { story: UchiakeStory }) {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState<Reaction["key"] | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    let cancelled = false;
    getComments(story.id).then((list) => {
      if (!cancelled) setComments(list);
    });
    return () => {
      cancelled = true;
    };
  }, [story.id]);

  const toggle = (key: Reaction["key"]) => {
    const gate = signInGateHref(pathname);
    if (gate) {
      router.push(gate);
      return;
    }
    setSelected((prev) => (prev === key ? null : key));
  };

  const handlePosted = (c: Comment) => {
    setComments((prev) => [...prev, c]);
  };

  const genderLabel = story.gender === "女" ? "女性" : story.gender === "男" ? "男性" : story.gender;
  const demographic = [story.age, genderLabel].filter(Boolean).join("・");

  return (
    <>
      <AppHeader
        title="そっと、届いた声"
        left={<BackButton fallbackHref="/home" />}
        right={
          <button
            type="button"
            aria-label="そっと閉じる"
            onClick={() => router.push("/home")}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--color-ink-500)",
              cursor: "pointer",
            }}
          >
            <IconButton icon="close" label="閉じる" />
          </button>
        }
      />

      <main className="app-main">
        <article style={{ ...cardStyle, marginBottom: 20 }}>
          <header
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              marginBottom: story.title ? 16 : 12,
            }}
          >
            <Avatar
              animal={story.authorAvatar}
              src={`/assets/animals/${story.authorAvatar}.png`}
              alt={story.authorName}
              tone={story.authorAvatarTone}
              size={44}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "6px 8px",
                }}
              >
                <span
                  style={{
                    font: "500 14px/1.4 var(--font-jp)",
                    color: "var(--color-ink-800)",
                  }}
                >
                  {story.authorName}
                </span>
                <span className="explore-topic-pill explore-topic-pill--soft">{story.topic}</span>
              </div>
              {demographic && (
                <p
                  style={{
                    margin: "6px 0 0",
                    font: "400 11px/1.5 var(--font-jp)",
                    color: "var(--color-ink-400)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {demographic}
                </p>
              )}
            </div>
            <time
              style={{
                font: "400 11px/1.4 var(--font-jp)",
                color: "var(--color-ink-300)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {story.timeLabel}
            </time>
          </header>

          {story.title && (
            <h2
              style={{
                margin: "0 0 18px",
                font: "500 18px/1.65 var(--font-mincho)",
                color: "var(--color-ink-800)",
                letterSpacing: "0.02em",
              }}
            >
              {story.title}
            </h2>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {SECTIONS.map(({ key, label }) => {
              const body = story[key];
              if (!body) return null;
              return (
                <section key={key}>
                  <h3
                    style={{
                      margin: "0 0 8px",
                      font: "400 12px/1.5 var(--font-jp)",
                      color: "var(--color-ink-500)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {label}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      font: "400 14px/1.85 var(--font-jp)",
                      color: "var(--color-ink-700)",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {body}
                  </p>
                </section>
              );
            })}
          </div>
        </article>

        <section style={{ marginTop: 24, textAlign: "center" }}>
          <p
            style={{
              font: "400 12px/1 var(--font-jp)",
              color: "var(--color-ink-500)",
              letterSpacing: "0.14em",
              marginBottom: 12,
            }}
          >
            そっと、こたえる
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            {REACTIONS.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => toggle(r.key)}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
                aria-pressed={selected === r.key}
              >
                <ReactionChip icon={r.icon} label={r.label} active={selected === r.key} />
              </button>
            ))}
          </div>
          {selected && (
            <p
              style={{
                font: "400 11px/1.6 var(--font-jp)",
                color: "var(--color-ink-300)",
                marginTop: 14,
                letterSpacing: "0.04em",
              }}
            >
              そっと、相手に 届きました。
            </p>
          )}
        </section>

        <section
          style={{
            marginTop: 32,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <h3
            style={{
              font: "500 12px/1 var(--font-jp)",
              color: "var(--color-ink-700)",
              letterSpacing: "0.14em",
              margin: 0,
            }}
          >
            ことば、寄せられて います
          </h3>
          <CommentList comments={comments} />
          <CommentComposer parentId={story.id} onPosted={handlePosted} />
        </section>

        <section style={{ marginTop: 28, paddingBottom: 8 }}>
          <button type="button" className="btn btn--primary btn--full" onClick={() => router.back()}>
            そっと 閉じる
          </button>
        </section>
      </main>
    </>
  );
}
