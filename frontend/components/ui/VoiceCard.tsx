"use client";

import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { Avatar, type AvatarTone } from "./Avatar";
import { Badge } from "./Badge";
import { Icon } from "./Icon";
import { ReactionChip } from "./ReactionChip";
import type { AnimalName, IconName } from "@/lib/icons";
import {
  getReactionSuggestions,
  type SuggestedReaction,
} from "@/lib/api/reactions";

export type ReactionItem = {
  icon: IconName;
  label: string;
  active?: boolean;
  count?: number;
};

type VoiceCardProps = {
  /** AI リアクション候補取得用の投稿 ID。指定すると「✦」ボタンが出る。 */
  voiceId?: string;
  author: {
    name: string;
    avatar: AnimalName;
    /** 透過 PNG 画像のパス（あれば画像優先で表示） */
    avatarSrc?: string;
    tone?: AvatarTone;
  };
  roomName?: string;
  roomTone?: "default" | "terra" | "plum" | "gold";
  time: string;
  body: string;
  /** インライン画像（しずか散歩などで埋め込む） */
  photoSrc?: string;
  photoAlt?: string;
  reactions?: ReactionItem[];
  /** チャットアイコン（コメント数）を右端に */
  showChat?: boolean;
  /** カード全体のクリックで遷移する先（指定時は Link でラップ） */
  href?: string;
  className?: string;
};

/** Link 内のボタンクリックで遷移しないようイベントを止める */
const stopNav = (e: MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

export function VoiceCard({
  voiceId,
  author,
  roomName,
  roomTone = "default",
  time,
  body,
  photoSrc,
  photoAlt = "",
  reactions,
  showChat,
  href,
  className = "",
}: VoiceCardProps) {
  // AI リアクション候補のローカル状態
  const [aiOpen, setAiOpen] = useState(false);
  const [aiList, setAiList] = useState<SuggestedReaction[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  /** ラベル単位で「自分が押したか」を持つ。既存 active と OR で合成。 */
  const [pickedLabels, setPickedLabels] = useState<Set<string>>(new Set());

  const handleToggleAI = async (e: MouseEvent<HTMLButtonElement>) => {
    stopNav(e);
    if (!voiceId) return;
    const next = !aiOpen;
    setAiOpen(next);
    if (next && aiList.length === 0 && !aiLoading) {
      setAiLoading(true);
      setAiError(null);
      try {
        const list = await getReactionSuggestions(voiceId);
        setAiList(list);
        if (list.length === 0) setAiError("候補を 出せませんでした。");
      } catch (e) {
        setAiError(e instanceof Error ? e.message : "エラーが 起きました。");
      } finally {
        setAiLoading(false);
      }
    }
  };

  const handlePick = (e: MouseEvent<HTMLButtonElement>, label: string) => {
    stopNav(e);
    setPickedLabels((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const card = (
    <article className={`voice-card ${className}`.trim()}>
      <header className="voice-card__header">
        <Avatar
          animal={author.avatar}
          src={author.avatarSrc}
          alt={author.name}
          tone={author.tone ?? "terra"}
          size={36}
        />
        <span className="voice-card__name">{author.name}</span>
        {roomName && <Badge tone={roomTone}>{roomName}</Badge>}
        <span className="voice-card__time">{time}</span>
        <button type="button" className="voice-card__menu" aria-label="メニュー" onClick={stopNav}>
          <Icon name="more" size={18} />
        </button>
      </header>

      <div className="voice-card__body">{body}</div>

      {photoSrc && (
        <div className="voice-card__image">
          <img src={photoSrc} alt={photoAlt} />
        </div>
      )}

      {(reactions || showChat || voiceId) && (
        <div className="voice-card__reactions">
          {reactions?.map((r) => {
            const isActive = (r.active ?? false) || pickedLabels.has(r.label);
            return (
              <ReactionChip
                key={r.label}
                icon={r.icon}
                label={r.label}
                active={isActive}
                count={r.count}
                onClick={(e) => handlePick(e, r.label)}
              />
            );
          })}

          {/* AI 候補表示中の追加チップ */}
          {aiOpen &&
            aiList.map((s) => {
              const isActive = pickedLabels.has(s.label);
              return (
                <ReactionChip
                  key={s.id}
                  icon={s.icon}
                  label={s.label}
                  active={isActive}
                  accent
                  onClick={(e) => handlePick(e, s.label)}
                />
              );
            })}

          {aiOpen && aiLoading && (
            <span
              style={{
                font: "400 11px/1 var(--font-jp)",
                color: "var(--color-ink-300)",
                letterSpacing: "0.04em",
                alignSelf: "center",
                marginLeft: 4,
              }}
            >
              ✦ 考えています…
            </span>
          )}

          {aiOpen && !aiLoading && aiError && (
            <span
              style={{
                font: "400 11px/1 var(--font-jp)",
                color: "var(--color-ink-500)",
                letterSpacing: "0.04em",
                alignSelf: "center",
                marginLeft: 4,
              }}
            >
              {aiError}
            </span>
          )}

          {/* AI 候補トグルボタン */}
          {voiceId && (
            <button
              type="button"
              onClick={handleToggleAI}
              aria-label={aiOpen ? "AI 候補を 閉じる" : "AI 候補を 出す"}
              aria-pressed={aiOpen}
              style={{
                marginLeft: showChat ? 0 : "auto",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "4px 10px",
                borderRadius: 999,
                background: aiOpen ? "var(--color-plum-50)" : "transparent",
                border: `1px solid ${
                  aiOpen
                    ? "var(--color-plum-500, var(--color-plum-600))"
                    : "var(--color-line-soft)"
                }`,
                color: "var(--color-plum-600)",
                cursor: "pointer",
                font: "400 11px/1 var(--font-jp)",
                letterSpacing: "0.06em",
                height: 26,
              }}
            >
              <span aria-hidden="true">✦</span>
              {aiOpen ? "閉じる" : "もう ひとつ"}
            </button>
          )}

          {showChat && (
            <button
              type="button"
              aria-label="コメントを見る"
              onClick={stopNav}
              style={{
                marginLeft: voiceId ? 0 : "auto",
                display: "grid",
                placeItems: "center",
                width: 28,
                height: 28,
                color: "var(--color-ink-300)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Icon name="chat" size={18} />
            </button>
          )}
        </div>
      )}

    </article>
  );

  if (href) {
    return (
      <Link href={href} className="voice-card-link" aria-label={`${author.name}の ことばを 開く`}>
        {card}
      </Link>
    );
  }
  return card;
}

/**
 * 「今日のひとこと」用の特別カード（明朝体・グラデ背景）。
 */
type SpecialVoiceCardProps = {
  eyebrow: string;
  body: string;
  authorName: string;
  authorAvatar: AnimalName;
  authorAvatarSrc?: string;
  authorTone?: AvatarTone;
};

export function SpecialVoiceCard({
  eyebrow,
  body,
  authorName,
  authorAvatar,
  authorAvatarSrc,
  authorTone = "terra",
}: SpecialVoiceCardProps) {
  return (
    <article className="voice-card voice-card--special">
      <div
        style={{
          font: "500 10px/1 var(--font-jp)",
          letterSpacing: "0.18em",
          color: "var(--color-terra-700)",
          marginBottom: 14,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 16,
            height: 1,
            background: "var(--color-terra-300)",
          }}
        />
        {eyebrow}
      </div>
      <p
        style={{
          font: "400 17px/1.95 var(--font-mincho)",
          color: "var(--color-ink-900)",
          letterSpacing: "0.04em",
          whiteSpace: "pre-line",
          marginBottom: 16,
        }}
      >
        {body}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Avatar animal={authorAvatar} src={authorAvatarSrc} alt={authorName} tone={authorTone} size={28} />
        <span
          style={{
            font: "400 12px/1 var(--font-jp)",
            color: "var(--color-ink-500)",
            letterSpacing: "0.04em",
          }}
        >
          {authorName}
        </span>
      </div>
    </article>
  );
}
