import { mockComments } from "@/lib/mock/comments";
import type { Comment, CommentSuggestion } from "./types";

/**
 * 投稿コメント（Phase 7C）の API スタブ。
 *
 * - getComments(parentId): その投稿に付いた全コメント
 * - postComment({parentId, body}): 自分のコメントを追加（メモリ保持）
 * - getCommentSuggestions(parentId): Gemini で候補 3 案を取得
 *
 * Promise キャッシュは parentId 単位。
 * postComment 後はキャッシュをクリアして再取得が走るようにする。
 */

const MY_ID = "u-mori";

// メモリ上に自分の追加コメントを保持（モック）
const myAddedComments = new Map<string, Comment[]>();

const commentsCache = new Map<string, Promise<Comment[]>>();
const suggestionsCache = new Map<string, Promise<CommentSuggestion[]>>();

export function getComments(parentId: string): Promise<Comment[]> {
  if (!commentsCache.has(parentId)) {
    commentsCache.set(
      parentId,
      Promise.resolve([
        ...(mockComments[parentId] ?? []),
        ...(myAddedComments.get(parentId) ?? []),
      ]),
    );
  }
  return commentsCache.get(parentId)!;
}

type PostInput = {
  parentId: string;
  body: string;
};

export async function postComment(input: PostInput): Promise<Comment> {
  const now = new Date();
  const comment: Comment = {
    id: `cm-mine-${now.getTime()}`,
    parentId: input.parentId,
    authorId: MY_ID,
    authorName: "もりさん",
    authorAvatar: "bear",
    authorAvatarSrc: "/assets/animals/bear.png",
    authorAvatarTone: "moss",
    body: input.body.trim(),
    createdAt: now.toISOString(),
    timeLabel: "たった今",
  };
  const list = myAddedComments.get(input.parentId) ?? [];
  myAddedComments.set(input.parentId, [...list, comment]);
  // キャッシュをクリアして次回 getComments で再構築させる
  commentsCache.delete(input.parentId);
  return comment;
}

/**
 * 投稿コメントの AI 候補を取得。
 * 内部実装：/api/comments/[voiceId]/suggestions で Gemini を呼ぶ。
 * voiceId に対する候補は呼出単位でキャッシュ。
 */
export function getCommentSuggestions(
  parentId: string,
): Promise<CommentSuggestion[]> {
  if (!suggestionsCache.has(parentId)) {
    suggestionsCache.set(
      parentId,
      fetch(`/api/comments/${parentId}/suggestions`, { cache: "no-store" })
        .then(async (r) => {
          if (!r.ok) {
            const err = await r.json().catch(() => ({}));
            throw new Error(err.error ?? `HTTP ${r.status}`);
          }
          return r.json();
        })
        .then(
          (d: { suggestions: CommentSuggestion[] }) => d.suggestions ?? [],
        )
        .catch((e) => {
          console.error("[comment-suggestions] fetch failed:", e);
          return [];
        }),
    );
  }
  return suggestionsCache.get(parentId)!;
}

export function invalidateCommentSuggestions(parentId: string) {
  suggestionsCache.delete(parentId);
}
