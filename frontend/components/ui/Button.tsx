import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "quiet"
  | "moss"
  | "plum";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size">;

/**
 * Button: v2 デザインシステムのボタン。
 * - primary: terra-500 BG / paper text （主要 CTA）
 * - secondary: cream BG / terra-700 text / 細線
 * - ghost: 透明 BG / ink-500 text
 * - quiet: paper-soft BG / ink-700 text
 * - moss: moss-500 BG（「そらと次へ」など）
 * - plum: plum-400 BG（お便り系）
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", full, leftIcon, rightIcon, children, className = "", ...rest },
  ref,
) {
  const variantClass = `btn--${variant}`;
  const sizeClass = size === "sm" ? "btn--sm" : size === "lg" ? "btn--lg" : "";
  const fullClass = full ? "btn--full" : "";
  const classes = `btn ${variantClass} ${sizeClass} ${fullClass} ${className}`.trim();

  return (
    <button ref={ref} className={classes} {...rest}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
});
