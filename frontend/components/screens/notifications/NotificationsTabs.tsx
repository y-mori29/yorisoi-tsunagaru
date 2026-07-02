"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, type ReactNode } from "react";

type TabKey = "letters" | "messages";

type NotificationsTabsProps = {
  /** 「お便り」タブの中身（既存の 24h 通知リスト） */
  letters: ReactNode;
  /** 「やりとり」タブの中身（永続 DM スレッド一覧） */
  messages: ReactNode;
  /** 「やりとり」タブに未読がある場合に小さなドットを出す */
  hasUnreadMessages?: boolean;
};

/**
 * /notifications の上部タブ切替。
 *
 * 「お便り（24h）」と「やりとり（永続 DM）」の 2 タブ。
 *
 * タブ選択状態は **URL クエリパラメータ `?tab=letters|messages`** で持つ。
 * これにより：
 *  - メッセージ詳細から戻ったとき、やりとりタブが選ばれた状態で表示される
 *  - 直リンク（/notifications?tab=messages）でも特定タブから開始できる
 *  - useState ベースの揺り戻し（タブが letters に戻る）を防ぐ
 *
 * クリック時は router.replace() を使い、履歴を汚さない。
 */
function NotificationsTabsInner({
  letters,
  messages,
  hasUnreadMessages = false,
}: NotificationsTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const tab: TabKey = tabParam === "messages" ? "messages" : "letters";

  const switchTo = (next: TabKey) => {
    const q = new URLSearchParams(searchParams.toString());
    if (next === "letters") {
      q.delete("tab");
    } else {
      q.set("tab", next);
    }
    const qs = q.toString();
    router.replace(qs ? `/notifications?${qs}` : "/notifications", {
      scroll: false,
    });
  };

  return (
    <>
      <div className="noti-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "letters"}
          className={`noti-tabs__btn ${tab === "letters" ? "noti-tabs__btn--active" : ""}`}
          onClick={() => switchTo("letters")}
        >
          お便り
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "messages"}
          className={`noti-tabs__btn ${tab === "messages" ? "noti-tabs__btn--active" : ""}`}
          onClick={() => switchTo("messages")}
        >
          やりとり
          {hasUnreadMessages && <span className="noti-tabs__dot" aria-label="未読あり" />}
        </button>
      </div>

      <div className="noti-tabs__panel" role="tabpanel">
        {tab === "letters" ? letters : messages}
      </div>
    </>
  );
}

/**
 * useSearchParams は Suspense 境界が必要（Next.js 16）。
 * 親で Suspense ラップしてから NotificationsTabs を使う。
 */
export function NotificationsTabs(props: NotificationsTabsProps) {
  return (
    <Suspense fallback={<div className="noti-tabs__panel">{props.letters}</div>}>
      <NotificationsTabsInner {...props} />
    </Suspense>
  );
}
