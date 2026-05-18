import { Avatar, type AvatarTone } from "./Avatar";
import { Badge } from "./Badge";
import { Icon } from "./Icon";
import { ReactionChip } from "./ReactionChip";
import type { AnimalName, IconName } from "@/lib/icons";

export type ReactionItem = {
  icon: IconName;
  label: string;
  active?: boolean;
  count?: number;
};

type VoiceCardProps = {
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
  className?: string;
};

/**
 * 投稿カード（みんな のタイムラインで使用）。
 * voice-card / voice-card__header / voice-card__body /
 * voice-card__image / voice-card__reactions の構造を踏襲。
 */
export function VoiceCard({
  author,
  roomName,
  roomTone = "default",
  time,
  body,
  photoSrc,
  photoAlt = "",
  reactions,
  showChat,
  className = "",
}: VoiceCardProps) {
  return (
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
        <button type="button" className="voice-card__menu" aria-label="メニュー">
          <Icon name="more" size={18} />
        </button>
      </header>

      <div className="voice-card__body">{body}</div>

      {photoSrc && (
        <div className="voice-card__image">
          <img src={photoSrc} alt={photoAlt} />
        </div>
      )}

      {(reactions || showChat) && (
        <div className="voice-card__reactions">
          {reactions?.map((r) => (
            <ReactionChip key={r.label} icon={r.icon} label={r.label} active={r.active} count={r.count} />
          ))}
          {showChat && (
            <button
              type="button"
              aria-label="コメントを見る"
              style={{
                marginLeft: "auto",
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
