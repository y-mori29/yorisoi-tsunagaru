import type { Message } from "@/lib/api/types";

type MessageBubbleProps = {
  message: Message;
  /** 自分のユーザー ID（lib/mock/me.ts の currentUser.id と一致） */
  myId: string;
};

/**
 * チャットの 1 通分。自分の発言は右寄せ・terra 系、相手は左寄せ・cardBg。
 * 流れ星から始まったメッセージは、本文上部にお題ラベルを出す（一連の話の入り口を明示）。
 */
export function MessageBubble({ message, myId }: MessageBubbleProps) {
  const isMine = message.senderId === myId;
  return (
    <div className={`chat-bubble ${isMine ? "chat-bubble--mine" : "chat-bubble--theirs"}`}>
      {message.starTopic && (
        <p className="chat-bubble__star-topic">
          <span aria-hidden="true">✦ </span>
          流れ星：{message.starTopic}
        </p>
      )}
      <p className="chat-bubble__body">{message.body}</p>
      <p className="chat-bubble__time">{message.timeLabel}</p>
    </div>
  );
}
