"use client";

type ToggleProps = {
  on: boolean;
  onChange: (on: boolean) => void;
  label: string; // a11y
  className?: string;
};

/**
 * スイッチ（設定画面の ON/OFF）。terra-500 が ON 色。
 */
export function Toggle({ on, onChange, label, className = "" }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`switch ${on ? "is-on" : ""} ${className}`.trim()}
    />
  );
}
