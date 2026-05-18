"use client";

import type { ReactNode } from "react";

type SegmentOption<T extends string> = {
  value: T;
  label: ReactNode;
};

type SegmentProps<T extends string> = {
  options: ReadonlyArray<SegmentOption<T>>;
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

/**
 * セグメント選択（みんな / お隣 等）。
 * 単一選択。active な項目には cream-card 背景＋terra テキスト。
 */
export function Segment<T extends string>({
  options,
  value,
  onChange,
  className = "",
}: SegmentProps<T>) {
  return (
    <div className={`segment ${className}`.trim()} role="tablist">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={opt.value === value}
          className={`segment__item ${opt.value === value ? "is-active" : ""}`.trim()}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
