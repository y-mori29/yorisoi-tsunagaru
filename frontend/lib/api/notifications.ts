import { mockNotifications } from "@/lib/mock/notifications";
import type { Notification } from "./types";

const HOUR_MS = 60 * 60 * 1000;
const EXPIRE_AFTER_HOURS = 24;

/**
 * 24h 自然消滅組（expiresAfter24h=true）には、配列順に「N 時間前」を割り当てる。
 * モックの createdAt は固定文字列（過去の日付）なので、API スタブ層で
 * 現在時刻基準に置き換えて、残時間ラベルもその都度計算する。
 * 将来 API に差し替えるときは、サーバーから createdAt を貰って同じロジックを通す。
 */
const EXPIRING_HOURS_AGO = [3, 6, 15, 20] as const;

function withDynamicTime(n: Notification, hoursAgo: number, now: number): Notification {
  const remaining = Math.max(1, EXPIRE_AFTER_HOURS - hoursAgo);
  return {
    ...n,
    createdAt: new Date(now - hoursAgo * HOUR_MS).toISOString(),
    timeLabel: `あと ${remaining}時間`,
  };
}

/**
 * 24h 経過しているものは除外し、残時間ラベルを動的に算出して返す。
 * @param now テスト時に時刻を固定したい場合のみ渡す。通常は Date.now() を使う。
 */
function computeNotifications(now: number = Date.now()): Notification[] {
  const expiring = mockNotifications.filter((n) => n.expiresAfter24h);
  const persistent = mockNotifications.filter((n) => !n.expiresAfter24h);

  const live = expiring.flatMap((n, i) => {
    const hoursAgo = EXPIRING_HOURS_AGO[i] ?? EXPIRE_AFTER_HOURS - 1;
    if (hoursAgo >= EXPIRE_AFTER_HOURS) return [];
    return [withDynamicTime(n, hoursAgo, now)];
  });

  return [...live, ...persistent];
}

let cached: Promise<Notification[]> | null = null;

/**
 * お便り一覧を取得。
 * 24h 経過したものは静かに消える。
 * 将来 fetch('/api/notifications') に差し替え可能。
 */
export function getNotifications(): Promise<Notification[]> {
  cached ??= Promise.resolve(computeNotifications());
  return cached;
}

/** テストやストーリーで時刻を制御したい場合に使う（キャッシュを通さない）。 */
export function getNotificationsAt(now: number): Notification[] {
  return computeNotifications(now);
}
