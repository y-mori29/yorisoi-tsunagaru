import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import type { Conversation } from "@/lib/api/types";

type ConversationRowProps = {
  conversation: Conversation;
};

/**
 * /notifications の1対1メッセージ一覧の1行。
 */
export function ConversationRow({ conversation }: ConversationRowProps) {
  return (
    <Link href={`/messages/${conversation.id}`} className="conv-row">
      <Avatar
        animal={conversation.partner.avatar}
        src={conversation.partner.avatarSrc}
        alt={conversation.partner.name}
        tone={conversation.partner.avatarTone}
        size={44}
      />
      <div className="conv-row__body">
        <div className="conv-row__head">
          <span className="conv-row__name">
            {conversation.partner.name}
          </span>
          <span className="conv-row__time">{conversation.timeLabel}</span>
        </div>
        {(conversation.partner.roomName || conversation.startedFromStar) && (
          <p className="conv-row__context">
            {conversation.partner.roomName || "投稿から始まった会話"}
          </p>
        )}
        <p className="conv-row__preview">{conversation.lastMessage}</p>
      </div>
      {conversation.unreadCount > 0 && (
        <span className="conv-row__unread" aria-label={`未読${conversation.unreadCount}件`}>
          {conversation.unreadCount}
        </span>
      )}
    </Link>
  );
}
