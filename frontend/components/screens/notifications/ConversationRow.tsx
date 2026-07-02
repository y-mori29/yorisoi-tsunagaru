import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import type { Conversation } from "@/lib/api/types";

type ConversationRowProps = {
  conversation: Conversation;
};

/**
 * /notifications の「やりとり」タブの 1 行。
 * GRAVITY 画像 11 の構造：アバター + 名前 + プレビュー + 時間 + 赤バッジ。
 *
 * ただし「よりそい」では未読数の数字は出さず、赤いドットだけで「あり/なし」を示す。
 * 流れ星から始まった会話には小さな ✦ マークを名前の横に出す。
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
            {conversation.startedFromStar && (
              <span className="conv-row__star" aria-label="流れ星から">
                ✦
              </span>
            )}
          </span>
          <span className="conv-row__time">{conversation.timeLabel}</span>
        </div>
        <p className="conv-row__preview">{conversation.lastMessage}</p>
      </div>
      {conversation.unreadCount > 0 && (
        <span className="conv-row__unread" aria-label="未読あり" />
      )}
    </Link>
  );
}
