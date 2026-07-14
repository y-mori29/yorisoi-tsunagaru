"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, type ReactNode } from "react";

type TabKey = "messages" | "notices";

type NotificationsTabsProps = {
  /** 「メッセージ」タブの中身（1対1の会話一覧） */
  messages: ReactNode;
  /** 「お知らせ」タブの中身（反応・運営通知） */
  notices: ReactNode;
  /** 「メッセージ」タブに未読がある場合に小さなドットを出す */
  hasUnreadMessages?: boolean;
};

/**
 * /notifications の上部タブ切替。
 *
 * 「メッセージ」を初期表示にし、「お知らせ」は補助タブとして扱う。
 * URL は `?tab=notices` のときだけ補助タブを選択する。
 */
function NotificationsTabsInner({
  messages,
  notices,
  hasUnreadMessages = false,
}: NotificationsTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const tab: TabKey = tabParam === "notices" ? "notices" : "messages";

  const switchTo = (next: TabKey) => {
    const q = new URLSearchParams(searchParams.toString());
    if (next === "messages") {
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
          aria-selected={tab === "messages"}
          className={`noti-tabs__btn ${tab === "messages" ? "noti-tabs__btn--active" : ""}`}
          onClick={() => switchTo("messages")}
        >
          メッセージ
          {hasUnreadMessages && <span className="noti-tabs__dot" aria-label="未読あり" />}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "notices"}
          className={`noti-tabs__btn ${tab === "notices" ? "noti-tabs__btn--active" : ""}`}
          onClick={() => switchTo("notices")}
        >
          お知らせ
        </button>
      </div>

      <div className="noti-tabs__panel" role="tabpanel">
        {tab === "messages" ? messages : notices}
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
    <Suspense fallback={<div className="noti-tabs__panel">{props.messages}</div>}>
      <NotificationsTabsInner {...props} />
    </Suspense>
  );
}
