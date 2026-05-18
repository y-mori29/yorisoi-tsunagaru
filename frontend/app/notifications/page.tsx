import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { NotificationRow } from "@/components/screens/notifications/NotificationRow";
import { mockNotifications } from "@/lib/mock/notifications";

/**
 * /notifications — お便り（お知らせ）一覧。
 *
 * 設計：
 * - 未読／既読は太さで弱く 区別（数字は出さない）
 * - 「あと N 時間」で 24 時間消滅を 静かに 示す
 * - 運営からのお知らせのみ 消滅しない（timeLabel = "—"）
 */
export default function NotificationsPage() {
  const expiring = mockNotifications.filter((n) => n.expiresAfter24h);
  const persistent = mockNotifications.filter((n) => !n.expiresAfter24h);

  return (
    <>
      <AppHeader title="お便り" titleAlign="left" />

      <main className="app-main">
        <p
          style={{
            font: "400 13px/1.85 var(--font-mincho)",
            color: "var(--color-ink-700)",
            letterSpacing: "0.04em",
            marginBottom: 22,
            textAlign: "center",
            whiteSpace: "pre-line",
          }}
        >
          そっと、いくつか 届いています。
        </p>

        {expiring.length > 0 && (
          <section style={{ marginBottom: 28 }}>
            <h3
              style={{
                font: "500 11px/1 var(--font-jp)",
                color: "var(--color-ink-500)",
                letterSpacing: "0.16em",
                marginBottom: 12,
                paddingLeft: 4,
              }}
            >
              今日のうちに
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {expiring.map((n) => (
                <NotificationRow key={n.id} notification={n} />
              ))}
            </div>
          </section>
        )}

        {persistent.length > 0 && (
          <section>
            <h3
              style={{
                font: "500 11px/1 var(--font-jp)",
                color: "var(--color-ink-500)",
                letterSpacing: "0.16em",
                marginBottom: 12,
                paddingLeft: 4,
              }}
            >
              運営から
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {persistent.map((n) => (
                <NotificationRow key={n.id} notification={n} />
              ))}
            </div>
          </section>
        )}

        <p
          style={{
            font: "400 11px/1.7 var(--font-jp)",
            color: "var(--color-ink-300)",
            letterSpacing: "0.06em",
            textAlign: "center",
            marginTop: 28,
            paddingBottom: 8,
          }}
        >
          お便りは、24時間で 静かに 消えます。
          <br />
          無理して、ぜんぶ 読まなくて 大丈夫です。
        </p>
      </main>

      <BottomNav active="mail" />
    </>
  );
}
