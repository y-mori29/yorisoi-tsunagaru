import { mockConversations } from "@/lib/mock/conversations";
import { mockMessages } from "@/lib/mock/messages";
import type { Conversation, Message } from "./types";

let conversationsCached: Promise<Conversation[]> | null = null;
const conversationByIdCache = new Map<string, Promise<Conversation | undefined>>();
const messagesByConversationCache = new Map<string, Promise<Message[]>>();

/**
 * DM スレッド一覧を取得（lastMessageAt 降順）。
 * 将来 fetch('/api/conversations') に差し替え可能。
 */
export function getConversations(): Promise<Conversation[]> {
  conversationsCached ??= Promise.resolve(
    [...mockConversations].sort(
      (a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime(),
    ),
  );
  return conversationsCached;
}

/**
 * 個別スレッドのメタ情報を取得。
 * `use()` で安定して読めるよう id 別に Promise をキャッシュ。
 */
export function getConversationById(id: string): Promise<Conversation | undefined> {
  if (!conversationByIdCache.has(id)) {
    conversationByIdCache.set(
      id,
      getConversations().then((list) => list.find((c) => c.id === id)),
    );
  }
  return conversationByIdCache.get(id)!;
}

/**
 * スレッド内のメッセージ列を取得（古い → 新しい）。
 */
export function getMessages(conversationId: string): Promise<Message[]> {
  if (!messagesByConversationCache.has(conversationId)) {
    messagesByConversationCache.set(
      conversationId,
      Promise.resolve(mockMessages[conversationId] ?? []),
    );
  }
  return messagesByConversationCache.get(conversationId)!;
}
