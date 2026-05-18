"use client";

import { Icon } from "@/components/ui/Icon";

type Props = {
  label: string;
  sub?: string;
  checked: boolean;
  onChange: () => void;
};

/**
 * オンボーディングの複数選択チェック行。
 */
export function CheckOption({ label, sub, checked, onChange }: Props) {
  return (
    <button
      type="button"
      className={`check-option ${checked ? "is-active" : ""}`.trim()}
      onClick={onChange}
      aria-pressed={checked}
    >
      <span className="check-option__check" aria-hidden>
        {checked && <Icon name="check" />}
      </span>
      <div className="check-option__text">
        {label}
        {sub && <span className="check-option__sub">{sub}</span>}
      </div>
    </button>
  );
}
