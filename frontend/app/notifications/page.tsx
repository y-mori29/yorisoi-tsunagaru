import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { NotificationRow } from "@/components/screens/notifications/NotificationRow";
import { ConversationRow } from "@/components/screens/notifications/ConversationRow";
import { NotificationsTabs } from "@/components/screens/notifications/NotificationsTabs";
import { getNotifications } from "@/lib/api/notifications";
import { getConversations } from "@/lib/api/conversations";

/**
 * /notifications — お便り（24h 自然消滅）+ やりとり（永続 DM）の統合画面。
 *
 * 構造（冨澤 MTG 由来 [[feedback-tomizawa-gravity-alignment]] 項 5/10）：
 *   上部：4 つのクイックアイコン（うなずき/ことば/お隣/気配）
 *   中部：タブ「お便り / やりとり」
 *   下部：選択中タブの内容
 */
export default async function NotificationsPage() {
  const [notifications, conversations] = await Promise.all([
    getNotifications(),
    getConversations(),
  ]);

  const expiring = notifications.filter((n) => n.expiresAfter24h);
  const persistent = notifications.filter((n) => !n.expiresAfter24h);
  const hasUnreadMessages = conversations.some((c) => c.unreadCount > 0);

  return (
    <>
      <AppHeader title="お便り" titleAlign="left" />

      <main className="app-main">
        <NotificationsTabs
          hasUnreadMessages={hasUnreadMessages}
          letters={
            <>
              <p className="noti-intro">そっと、いくつか 届いています。</p>

              {expiring.length > 0 && (
                <section className="noti-section">
                  <h3 className="noti-section__title">今日のうちに</h3>
                  <div className="noti-list">
                    {expiring.map((n) => (
                      <NotificationRow key={n.id} notification={n} />
                    ))}
                  </div>
                </section>
              )}

              {persistent.length > 0 && (
                <section className="noti-section">
                  <h3 className="noti-section__title">運営から</h3>
                  <div className="noti-list">
                    {persistent.map((n) => (
                      <NotificationRow key={n.id} notification={n} />
                    ))}
                  </div>
                </section>
              )}

              <p className="noti-footnote">
                お便りは、24時間で 静かに 消えます。
                <br />
                無理して、ぜんぶ 読まなくて 大丈夫です。
              </p>
            </>
          }
          messages={
            <>
              <p className="noti-intro">続けて 話している、お隣さん。</p>

              <div className="noti-list">
                {conversations.map((c) => (
                  <ConversationRow key={c.id} conversation={c} />
                ))}
              </div>

              <p className="noti-footnote">
                やりとりは、消えません。
                <br />
                自分の ペースで、続けて 大丈夫です。
              </p>
            </>
          }
        />
      </main>

      <BottomNav active="mail" />
    </>
  );
}
