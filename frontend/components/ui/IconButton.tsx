import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Icon } from "./Icon";
import type { IconName } from "@/lib/icons";

type IconButtonProps = {
  icon: IconName;
  label: string; // a11y
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * 円形のアイコンのみボタン（ヘッダー右の bell / settings 等で使用）。
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ icon, label, className = "", ...rest }, ref) {
    return (
      <button
        ref={ref}
        className={`icon-btn ${className}`.trim()}
        aria-label={label}
        {...rest}
      >
        <Icon name={icon} />
      </button>
    );
  },
);
