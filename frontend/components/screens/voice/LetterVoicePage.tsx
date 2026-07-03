"use client";

import { use, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signInGateHref } from "@/lib/auth/require-sign-in";
import { AppHeader } from "@/components/layout/AppHeader";
import { BackButton } from "@/components/ui/BackButton";
import { IconButton } from "@/components/ui/IconButton";
import { HeroIllustration } from "@/components/ui/HeroIllustration";
import { Avatar } from "@/components/ui/Avatar";
import { WhisperCard } from "@/components/ui/WhisperCard";
import { ReactionChip } from "@/components/ui/ReactionChip";
import { CommentList } from "@/components/screens/voice/CommentList";
import { CommentComposer } from "@/components/screens/voice/CommentComposer";
import { getLetterById } from "@/lib/api/letters";
import { getComments } from "@/lib/api/comments";
import type { Comment } from "@/lib/api/types";

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

/**
 * /voice/[id] — 手紙（Letter）詳細表示。
 *
 * 構成：
 *   ヒーロー画像 → 本文カード（明朝） → リアクション → コメント
 */
export function LetterVoicePage({ id }: { id: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const letter = use(getLetterById(id));

  const [selected, setSelected] = useState<Reaction["key"] | null>(null);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (letter.id === "fallback") return;
    let cancelled = false;
    getComments(letter.id).then((list) => {
      if (!cancelled) setComments(list);
    });
    return () => {
      cancelled = true;
    };
  }, [letter.id]);

  const toggle = (key: Reaction["key"]) => {
    const gate = signInGateHref(pathname);
    if (gate) {
      router.push(gate);
      return;
    }
    setSelected((prev) => (prev === key ? null : key));
  };

  const handleSave = () => {
    const gate = signInGateHref(pathname);
    if (gate) {
      router.push(gate);
      return;
    }
    setSaved((v) => !v);
  };

  const handlePosted = (c: Comment) => {
    setComments((prev) => [...prev, c]);
  };

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
        <section style={{ marginBottom: 20 }}>
          <HeroIllustration
            src="/assets/heroes/voice-letter.png"
            alt="折り畳まれた 手紙と ラベンダー"
            aspect="4/3"
          />
        </section>

        <WhisperCard
          label={letter.label}
          body={letter.body}
          timer={letter.timer}
          from={
            <>
              <Avatar
                animal={letter.fromAvatar}
                src={letter.fromAvatarSrc}
                alt={letter.fromName}
                tone={letter.fromAvatarTone}
                size={28}
              />
              <span>
                {letter.fromName}
                {letter.fromMeta && (
                  <span style={{ color: "var(--color-ink-300)", marginLeft: 8 }}>
                    {letter.fromMeta}
                  </span>
                )}
              </span>
            </>
          }
        />

        {letter.id !== "fallback" && (
          <>
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
                    <ReactionChip
                      icon={r.icon}
                      label={r.label}
                      active={selected === r.key}
                    />
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
              <CommentComposer parentId={letter.id} onPosted={handlePosted} />
            </section>

            <section
              style={{
                marginTop: 28,
                display: "flex",
                gap: 10,
                paddingBottom: 8,
              }}
            >
              <button
                type="button"
                className="btn btn--ghost btn--full"
                onClick={handleSave}
              >
                {saved ? "あとで 読み返す（保存しました）" : "あとで 読み返す"}
              </button>
              <button
                type="button"
                className="btn btn--primary btn--full"
                onClick={() => router.back()}
              >
                そっと 閉じる
              </button>
            </section>
          </>
        )}
      </main>
    </>
  );
}
