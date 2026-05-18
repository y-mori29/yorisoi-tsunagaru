"use client";

import { Avatar } from "@/components/ui/Avatar";
import type { Neighbor } from "@/lib/api/types";

type NeighborCardProps = {
  neighbor: Neighbor;
  onKnock?: () => void;
  onPass?: () => void;
};

/**
 * /stroll に並ぶ お隣さんカード。
 * - 動物アバター + 名前 + 属性ライン
 * - 「そっと、ことばを 置く」「すれ違う」の 2 アクション
 *
 * カード自体は遷移しない（押す＝コミット感）。誤タップで知らない人と
 * 接続される事故を避けるための設計。
 */
export function NeighborCard({ neighbor, onKnock, onPass }: NeighborCardProps) {
  return (
    <article className="neighbor-card">
      <div className="neighbor-card__main">
        <Avatar animal={neighbor.avatar} tone={neighbor.avatarTone} size={56} />
        <div className="neighbor-card__text">
          <p className="neighbor-card__name">{neighbor.name}</p>
          <p className="neighbor-card__attr">{neighbor.attributes}</p>
        </div>
      </div>

      <div className="neighbor-card__actions">
        <button type="button" className="btn btn--quiet btn--sm" onClick={onPass}>
          すれ違う
        </button>
        <button type="button" className="btn btn--primary btn--sm" onClick={onKnock}>
          そっと、ことばを 置く
        </button>
      </div>
    </article>
  );
}
