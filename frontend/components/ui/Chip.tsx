import type { HTMLAttributes, ReactNode } from "react";

type ChipTone = "default" | "terra" | "moss" | "plum" | "cream";

type ChipProps = {
  tone?: ChipTone;
  children: ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

export function Chip({ tone = "default", children, className = "", ...rest }: ChipProps) {
  const toneClass = tone !== "default" ? `chip--${tone}` : "";
  return (
    <span className={`chip ${toneClass} ${className}`.trim()} {...rest}>
      {children}
    </span>
  );
}
