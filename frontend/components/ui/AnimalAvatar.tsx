import { ANIMAL_ICONS, type AnimalName } from "@/lib/icons";

type AnimalAvatarProps = {
  animal: AnimalName;
  className?: string;
  size?: number | string;
};

/**
 * 動物の線画 SVG（8 種類）。
 * Avatar コンポーネント内で使用するか、単体で使う。
 * 色は親要素の color から currentColor で継承される。
 */
export function AnimalAvatar({ animal, className, size }: AnimalAvatarProps) {
  const svg = ANIMAL_ICONS[animal];
  if (!svg) {
    return null;
  }
  const sizeStyle = size
    ? { width: typeof size === "number" ? `${size}px` : size, height: typeof size === "number" ? `${size}px` : size }
    : undefined;
  return (
    <span
      className={className}
      style={{ display: "inline-flex", ...sizeStyle }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
