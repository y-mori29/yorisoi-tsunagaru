"use client";

import type { StarTopic } from "@/lib/api/types";

type StarTopicChipsProps = {
  topics: StarTopic[];
  selectedId: string | null;
  onSelect: (topic: StarTopic) => void;
};

/**
 * 流れ星投稿で使う お題チップ列（GRAVITY 06 のチップ列に相当）。
 * 選ばれたチップは、その色で塗りつぶされる。
 */
export function StarTopicChips({ topics, selectedId, onSelect }: StarTopicChipsProps) {
  return (
    <div className="star-topic-chips">
      {topics.map((t) => {
        const active = t.id === selectedId;
        return (
          <button
            key={t.id}
            type="button"
            className={`star-topic-chip star-topic-chip--${t.tone} ${
              active ? "star-topic-chip--active" : ""
            }`}
            onClick={() => onSelect(t)}
            aria-pressed={active}
          >
            <span aria-hidden="true">✦</span>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
