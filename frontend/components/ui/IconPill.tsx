import { Icon } from "./Icon";
import type { IconName } from "@/lib/icons";

type IconPillTone = "terra" | "moss" | "plum" | "gold";

type IconPillProps = {
  icon: IconName;
  tone?: IconPillTone;
  className?: string;
};

/**
 * 設定行などで使う「色付きアイコン円」。40x40px。
 */
export function IconPill({ icon, tone = "terra", className = "" }: IconPillProps) {
  const toneClass = tone === "terra" ? "" : `icon-pill--${tone}`;
  return (
    <span className={`icon-pill ${toneClass} ${className}`.trim()}>
      <Icon name={icon} />
    </span>
  );
}
