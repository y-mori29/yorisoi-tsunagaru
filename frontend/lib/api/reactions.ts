import type { IconName } from "@/lib/icons";

export type SuggestedReaction = {
  id: string;
  icon: IconName;
  label: string;
};

const cache = new Map<string, Promise<SuggestedReaction[]>>();

/**
 * 指定 voiceId の投稿に対する AI リアクション候補を取得。
 * 内部実装：Next.js の API Route `/api/reactions/[voiceId]` を叩く。
 * サーバー側で Gemini 3.1 Flash Lite を呼び出す。
 *
 * voiceId 別に Promise をキャッシュ → 同じ投稿の再描画で API を多重呼びしない。
 */
export function getReactionSuggestions(
  voiceId: string,
): Promise<SuggestedReaction[]> {
  if (!cache.has(voiceId)) {
    cache.set(
      voiceId,
      fetch(`/api/reactions/${voiceId}`, { cache: "no-store" })
        .then(async (r) => {
          if (!r.ok) {
            const err = await r.json().catch(() => ({}));
            throw new Error(err.error ?? `HTTP ${r.status}`);
          }
          return r.json();
        })
        .then((d: { suggestions: SuggestedReaction[] }) => d.suggestions ?? [])
        .catch((e) => {
          console.error("[reaction-suggestions] fetch failed:", e);
          return [];
        }),
    );
  }
  return cache.get(voiceId)!;
}

export function invalidateReactionCache(voiceId: string) {
  cache.delete(voiceId);
}
