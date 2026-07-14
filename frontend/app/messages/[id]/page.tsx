"use client";

import { use, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signInGateHref } from "@/lib/auth/require-sign-in";
import { AppHeader } from "@/components/layout/AppHeader";
import { Avatar } from "@/components/ui/Avatar";
import { BackButton } from "@/components/ui/BackButton";
import { MessageBubble } from "@/components/screens/messages/MessageBubble";
import { MessageComposer } from "@/components/screens/messages/MessageComposer";
import { ReplySuggestionBar } from "@/components/screens/messages/ReplySuggestionBar";
import { getConversationById, getMessages } from "@/lib/api/conversations";
import {
  getReplySuggestions,
  invalidateReplyCache,
} from "@/lib/api/replies";
import type { Message, ReplySuggestion } from "@/lib/api/types";

/**
 * /messages/[id] — DM スレッド詳細。
 *
 * 送信は擬似実装：ローカル state に追加するだけ（リロードで消える）。
 * AI 返信候補は Gemini 3.1 Flash Lite で実生成（API Route 経由）。
 */
const MY_ID = "u-mori";

export default function MessageThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = use(params);
  const conversation = use(getConversationById(id));
  const initialMessages = use(getMessages(id));

  const [draftMessages, setDraftMessages] = useState<Message[]>([]);
  const [composerValue, setComposerValue] = useState("");
  const allMessages = [...initialMessages, ...draftMessages];

  const lastMessage = allMessages[allMessages.length - 1];
  const showSuggestions = lastMessage && lastMessage.senderId !== MY_ID;

  // AI 返信候補（Gemini 経由・非同期）
  const [suggestions, setSuggestions] = useState<ReplySuggestion[]>([]);
  const [suggestionError, setSuggestionError] = useState<string | null>(null);
  const loadingSuggestions = Boolean(showSuggestions && suggestions.length === 0 && !suggestionError);

  useEffect(() => {
    if (!showSuggestions) return;
    let cancelled = false;
    getReplySuggestions(id)
      .then((list) => {
        if (cancelled) return;
        if (list.length === 0) {
          setSuggestionError("候補を 生成できませんでした。");
        }
        setSuggestions(list);
      })
      .catch((e) => {
        if (cancelled) return;
        setSuggestionError(e?.message ?? "エラーが 起きました。");
      });
    return () => {
      cancelled = true;
    };
  }, [id, showSuggestions, lastMessage?.id]);

  const handleSend = (body: string) => {
    const gate = signInGateHref(pathname);
    if (gate) {
      router.push(gate);
      return;
    }

    const next: Message = {
      id: `m-draft-${Date.now()}`,
      conversationId: id,
      senderId: MY_ID,
      body,
      createdAt: new Date().toISOString(),
      timeLabel: "いま",
    };
    setDraftMessages((prev) => [...prev, next]);
    // 自分が送った後は候補をリセット（次の相手メッセージで取り直し）
    invalidateReplyCache(id);
    setSuggestions([]);
  };

  if (!conversation) {
    return (
      <>
        <AppHeader
          title="やりとり"
          left={<BackButton fallbackHref="/notifications" />}
        />
        <main className="app-main">
          <p
            style={{
              font: "400 13px/1.85 var(--font-mincho)",
              color: "var(--color-ink-500)",
              textAlign: "center",
              marginTop: 40,
            }}
          >
            この やりとりは、もう 見つかりませんでした。
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <AppHeader
        title={
          <span className="chat-header__title">
            <Avatar
              animal={conversation.partner.avatar}
              src={conversation.partner.avatarSrc}
              alt={conversation.partner.name}
              tone={conversation.partner.avatarTone}
              size={28}
            />
            <span className="chat-header__name">
              {conversation.partner.name}
              {conversation.partner.roomName && (
                <span className="chat-header__room">{conversation.partner.roomName}</span>
              )}
            </span>
          </span>
        }
        left={<BackButton fallbackHref="/notifications" />}
      />

      <main className="chat-thread">
        {allMessages.map((m) => (
          <MessageBubble key={m.id} message={m} myId={MY_ID} />
        ))}
      </main>

      {showSuggestions && (
        <ReplySuggestionBar
          suggestions={suggestions}
          loading={loadingSuggestions}
          error={suggestionError}
          onPick={(s) => setComposerValue(s.body)}
        />
      )}

      <MessageComposer
        value={composerValue}
        onChange={setComposerValue}
        onSend={handleSend}
      />
    </>
  );
}
