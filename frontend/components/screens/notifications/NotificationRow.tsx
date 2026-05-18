import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Notification } from "@/lib/api/types";

type NotificationRowProps = {
  notification: Notification;
};

/**
 * /notifications の 1 行。
 * - 左：アイコン（iconTone で色を変える）
 * - 中：title + 引用（quote）
 * - 右：残り時間（小・控えめ）
 *
 * 投稿系（voice/comment）は /voice/[id] に遷移、それ以外は同ページ内で留まる。
 */
export function NotificationRow({ notification }: NotificationRowProps) {
  const isLink = notification.kind === "voice" || notification.kind === "comment";
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    isLink ? (
      <Link href={`/voice/${notification.id}`} className="notif-row" aria-label={notification.title}>
        {children}
      </Link>
    ) : (
      <div className="notif-row notif-row--static">{children}</div>
    );

  return (
    <Wrapper>
      <span className={`notif-row__icon notif-row__icon--${notification.iconTone}`}>
        <Icon name={notification.icon} size={20} />
      </span>
      <div className="notif-row__text">
        <div className="notif-row__head">
          <span className={`notif-row__title ${notification.unread ? "is-unread" : ""}`.trim()}>
            {notification.title}
          </span>
          <span className="notif-row__time">{notification.timeLabel}</span>
        </div>
        {notification.quote && (
          <p className="notif-row__quote">{notification.quote}</p>
        )}
      </div>
    </Wrapper>
  );
}
