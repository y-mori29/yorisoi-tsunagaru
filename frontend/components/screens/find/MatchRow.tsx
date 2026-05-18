import { Avatar, type AvatarTone } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import type { AnimalName } from "@/lib/icons";

type MatchRowProps = {
  name: string;
  animal: AnimalName;
  avatarSrc?: string;
  avatarTone?: AvatarTone;
  attrs: string;
  onKnock?: () => void;
};

/**
 * お隣さがし結果の1行：アバター + 名前/属性 + 「ノックする」ボタン。
 */
export function MatchRow({ name, animal, avatarSrc, avatarTone = "moss", attrs, onKnock }: MatchRowProps) {
  return (
    <div className="match-row">
      <Avatar animal={animal} src={avatarSrc} alt={name} tone={avatarTone} size={44} />
      <div className="match-row__text">
        <div className="match-row__name">{name}</div>
        <div className="match-row__attrs">{attrs}</div>
      </div>
      <button type="button" className="match-row__knock" onClick={onKnock}>
        <Icon name="knock" />
        ノックする
      </button>
    </div>
  );
}
