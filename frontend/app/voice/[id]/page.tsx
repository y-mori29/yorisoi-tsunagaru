"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { IconButton } from "@/components/ui/IconButton";
import { HeroIllustration } from "@/components/ui/HeroIllustration";
import { Avatar } from "@/components/ui/Avatar";
import { WhisperCard } from "@/components/ui/WhisperCard";
import { ReactionChip } from "@/components/ui/ReactionChip";
import { mockLetters, fallbackLetter } from "@/lib/mock/letters";

type Reaction = { key: "ack" | "leaf" | "thanks"; icon: "acknowledge" | "leaf" | "thanks"; label: string };

const REACTIONS: Reaction[] = [
  { key: "ack", icon: "acknowledge", label: "そう" },
  { key: "leaf", icon: "leaf", label: "わかる" },
  { key: "thanks", icon: "thanks", label: "ありがとう" },
];

/**
 * /voice/[id] — そっと届く声 1 篇の詳細。
 * 「お便りを 受け取る」体験を最重視：
 *   ヒーロー画像（手紙とラベンダー）→ 本文（明朝） → 差出人 → リアクション
 *
 * リアクションは選んでも「送信」ボタンを出さず、選んだ瞬間に そっと 残る。
 * 戻る・閉じる 双方を用意し、誤って 押した時に 抜けられる ようにしている。
 */
export default function VoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const letter = mockLetters[id] ?? fallbackLetter;

  const [selected, setSelected] = useState<Reaction["key"] | null>(null);
  const [saved, setSaved] = useState(false);

  const toggle = (key: Reaction["key"]) => {
    setSelected((prev) => (prev === key ? null : key));
  };

  return (
    <>
      <AppHeader
        title="そっと、届いた声"
        left={
          <Link href="/notifications" aria-label="戻る">
            <IconButton icon="back" label="戻る" />
          </Link>
        }
        right={
          <button
            type="button"
            aria-label="そっと閉じる"
            onClick={() => router.push("/notifications")}
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
              <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
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
                gap: 10,
                paddingBottom: 8,
              }}
            >
              <button
                type="button"
                className="btn btn--ghost btn--full"
                onClick={() => setSaved((v) => !v)}
              >
                {saved ? "あとで 読み返す（保存しました）" : "あとで 読み返す"}
              </button>
              <button
                type="button"
                className="btn btn--primary btn--full"
                onClick={() => router.push("/notifications")}
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
