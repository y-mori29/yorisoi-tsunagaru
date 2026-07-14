import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { NotificationRow } from "@/components/screens/notifications/NotificationRow";
import { ConversationRow } from "@/components/screens/notifications/ConversationRow";
import { NotificationsTabs } from "@/components/screens/notifications/NotificationsTabs";
import { getNotifications } from "@/lib/api/notifications";
import { getConversations } from "@/lib/api/conversations";

/**
 * /notifications — 1対1の「お便り」を主役にした会話一覧。
 * 反応・運営通知は「お知らせ」へ分離する。
 */
export default async function NotificationsPage() {
  const [notifications, conversations] = await Promise.all([
    getNotifications(),
    getConversations(),
  ]);

  const hasUnreadMessages = conversations.some((c) => c.unreadCount > 0);

  return (
    <>
      <AppHeader title="お便り" titleAlign="left" />

      <main className="app-main mail-main">
        <section className="mail-intro" aria-label="お便りについて">
          <div>
            <strong>1対1で、ゆっくり話せる場所です</strong>
            <span>返信を急がなくても大丈夫。会話はここに残ります。</span>
          </div>
        </section>

        <NotificationsTabs
          hasUnreadMessages={hasUnreadMessages}
          messages={
            <>
              <div className="mail-list-heading">
                <h2>会話</h2>
                <span>{conversations.length}人とやりとり中</span>
              </div>
              <div className="conversation-list">
                {conversations.map((c) => (
                  <ConversationRow key={c.id} conversation={c} />
                ))}
              </div>
            </>
          }
          notices={
            <>
              <p className="noti-intro">反応や、運営からのお知らせです。</p>
              <div className="noti-list">
                {notifications.map((n) => (
                  <NotificationRow key={n.id} notification={n} />
                ))}
              </div>
            </>
          }
        />
      </main>

      <BottomNav active="mail" />
    </>
  );
}
