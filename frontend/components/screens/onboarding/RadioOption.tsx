"use client";

type Props = {
  label: string;
  checked: boolean;
  onClick: () => void;
};

/**
 * オンボーディングの単一選択ラジオ行（ラジオドット付き）。
 */
export function RadioOption({ label, checked, onClick }: Props) {
  return (
    <button
      type="button"
      className={`radio-option ${checked ? "is-active" : ""}`.trim()}
      onClick={onClick}
      aria-pressed={checked}
    >
      <span className="radio-option__check" aria-hidden />
      <span className="radio-option__text">{label}</span>
    </button>
  );
}
