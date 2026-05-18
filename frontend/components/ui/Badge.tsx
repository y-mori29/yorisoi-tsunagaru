import type { HTMLAttributes, ReactNode } from "react";

type BadgeTone = "default" | "terra" | "plum" | "gold";

type BadgeProps = {
  tone?: BadgeTone;
  children: ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

/**
 * Badge: ルーム名やステータスを示す小さな pill（moss がデフォルト）。
 */
export function Badge({ tone = "default", children, className = "", ...rest }: BadgeProps) {
  const toneClass = tone !== "default" ? `badge--${tone}` : "";
  return (
    <span className={`badge ${toneClass} ${className}`.trim()} {...rest}>
      {children}
    </span>
  );
}
