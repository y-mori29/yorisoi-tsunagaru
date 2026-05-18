import { ICONS, type IconName } from "@/lib/icons";

type IconProps = {
  name: IconName;
  className?: string;
  size?: number | string;
  /** color via currentColor — set on parent */
  style?: React.CSSProperties;
};

/**
 * SVG アイコン表示。size は width/height 共通。
 * 色は親要素の color から currentColor で継承される。
 */
export function Icon({ name, className, size, style }: IconProps) {
  const svg = ICONS[name];
  if (!svg) {
    return null;
  }
  const sizeStyle = size
    ? { width: typeof size === "number" ? `${size}px` : size, height: typeof size === "number" ? `${size}px` : size }
    : undefined;
  return (
    <span
      className={className}
      style={{ display: "inline-flex", ...sizeStyle, ...style }}
      // SVG 文字列は信頼できる静的辞書由来
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
