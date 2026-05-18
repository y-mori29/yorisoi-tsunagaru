import Image from "next/image";

type HeroIllustrationProps = {
  src: string;
  alt: string;
  /** アスペクト比 — 4/5 (vertical) or 4/3 (horizontal) */
  aspect?: "4/5" | "4/3" | "16/9" | "1/1";
  /** 角丸 — default 24px */
  radius?: "lg" | "xl" | "2xl";
  className?: string;
};

/**
 * ヒーロー画像表示。
 * onboarding / voice-received / stroll で使う線画イラストを枠付きで表示する。
 */
export function HeroIllustration({
  src,
  alt,
  aspect = "4/5",
  radius = "xl",
  className = "",
}: HeroIllustrationProps) {
  const radiusMap: Record<string, string> = {
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
    "2xl": "var(--radius-2xl)",
  };

  return (
    <div
      className={`hero-illustration ${className}`.trim()}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: aspect,
        borderRadius: radiusMap[radius],
        overflow: "hidden",
        background: "var(--color-paper-soft)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 480px) 100vw, 480px"
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  );
}
