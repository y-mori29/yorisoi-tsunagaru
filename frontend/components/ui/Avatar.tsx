import { AnimalAvatar } from "./AnimalAvatar";
import type { AnimalName } from "@/lib/icons";

export type AvatarSize = 28 | 36 | 40 | 44 | 56 | 80 | 100 | 112;
export type AvatarTone = "terra" | "moss" | "plum" | "cream" | "default";

type AvatarProps = {
  /** 動物の名前（線画アイコン） */
  animal?: AnimalName;
  /** 画像 URL を直接指定する場合 */
  src?: string;
  alt?: string;
  size?: AvatarSize;
  tone?: AvatarTone;
  className?: string;
};

/**
 * 円形アバター。動物線画 or 画像をラップする。
 * tone でアバター背景色（terra/moss/plum/cream）を指定可能。
 */
export function Avatar({
  animal,
  src,
  alt = "",
  size = 44,
  tone = "default",
  className = "",
}: AvatarProps) {
  const toneClass = tone !== "default" ? `avatar--${tone}` : "";
  const classes = `avatar avatar--${size} ${toneClass} ${className}`.trim();

  return (
    <span className={classes}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- 動的アバターは既存CSSの円形クロップを維持する
        <img src={src} alt={alt} />
      ) : animal ? (
        <AnimalAvatar animal={animal} />
      ) : null}
    </span>
  );
}
