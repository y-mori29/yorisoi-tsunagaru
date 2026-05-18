import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import type { User } from "@/lib/api/types";

type ProfileCoverProps = {
  user: User;
};

/**
 * /me 上部のカバーバンド。
 * - 大きめ動物アバター（80px）
 * - 表示名（明朝体）+ ハンドル
 * - ルームバッジ
 * - 一言（白文字感の柔らかい本文）
 * - タグチップ列
 */
export function ProfileCover({ user }: ProfileCoverProps) {
  return (
    <section className="profile-cover">
      <div className="profile-cover__avatar">
        <Avatar
          animal={user.avatar}
          src={user.avatarSrc}
          alt={user.name}
          tone={user.avatarTone}
          size={80}
        />
      </div>
      <h2 className="profile-cover__name">{user.name}</h2>
      {user.roomName && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <Badge tone={user.roomTone}>{user.roomName}</Badge>
        </div>
      )}
      {user.bio && <p className="profile-cover__bio">{user.bio}</p>}

      {user.tags && user.tags.length > 0 && (
        <div className="profile-cover__tags">
          {user.tags.map((t) => (
            <Chip key={t.label} tone={t.tone ?? "default"}>
              {t.label}
            </Chip>
          ))}
        </div>
      )}
    </section>
  );
}
