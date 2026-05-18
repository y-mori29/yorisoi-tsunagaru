"use client";

import { Icon } from "@/components/ui/Icon";

type QuestionCardProps = {
  step: string; // "1 / 3"
  title: string;
  options: string[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
};

/**
 * お隣さがしの質問カード。
 * ステップ番号・問題文・選択肢（縦並びカード）。
 * 選択時：右端に塗りつぶしのチェック丸が出る + テラ枠線。
 */
export function QuestionCard({ step, title, options, selectedIndex, onSelect }: QuestionCardProps) {
  return (
    <div className="question-card">
      <div className="question-card__step">{step}</div>
      <div className="question-card__title">{title}</div>
      <div className="question-card__options">
        {options.map((opt, i) => (
          <button
            key={opt}
            type="button"
            className={`question-option ${selectedIndex === i ? "is-active" : ""}`.trim()}
            onClick={() => onSelect(i)}
            aria-pressed={selectedIndex === i}
          >
            <span>{opt}</span>
            <span className="question-option__check" aria-hidden>
              <Icon name="check" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
