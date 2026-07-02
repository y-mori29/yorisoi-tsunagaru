import type { ReplySuggestion } from "./types";

const suggestionsCache = new Map<string, Promise<ReplySuggestion[]>>();

/**
 * 指定 conversation の最新メッセージに対する AI 返信候補 3 案を取得。
 *
 * 内部実装：Next.js の API Route `/api/replies/[conversationId]` を叩く。
 * サーバー側で Gemini 3.1 Flash Lite を呼び出して候補を生成する。
 *
 * 公式アカウントや、最新メッセージが自分の場合は空配列。
 *
 * conversationId 別に Promise をキャッシュするので、
 * 同じ会話画面の再レンダーで API を多重呼びしない。
 * 別のメッセージを送って候補をリフレッシュしたい場合は invalidateReplyCache を使う。
 */
export function getReplySuggestions(
  conversationId: string,
): Promise<ReplySuggestion[]> {
  if (!suggestionsCache.has(conversationId)) {
    suggestionsCache.set(
      conversationId,
      fetch(`/api/replies/${conversationId}`, { cache: "no-store" })
        .then(async (r) => {
          if (!r.ok) {
            const err = await r.json().catch(() => ({}));
            throw new Error(err.error ?? `HTTP ${r.status}`);
          }
          return r.json();
        })
        .then((d: { suggestions: ReplySuggestion[] }) => d.suggestions ?? [])
        .catch((e) => {
          console.error("[reply-suggestions] fetch failed:", e);
          return [];
        }),
    );
  }
  return suggestionsCache.get(conversationId)!;
}

/** 送信後など、新しい候補を取り直したいときに呼ぶ。 */
export function invalidateReplyCache(conversationId: string) {
  suggestionsCache.delete(conversationId);
}
