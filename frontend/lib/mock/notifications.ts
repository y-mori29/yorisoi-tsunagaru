import type { Notification } from "@/lib/api/types";

/**
 * /notifications（お知らせ）のモック。
 * timeLabel・expiresAfter24h は UI 用の擬似値。
 */
export const mockNotifications: Notification[] = [
  {
    id: "nt-001",
    kind: "voice",
    icon: "whisper",
    iconTone: "plum",
    title: "そっと、声が 届いています",
    quote: "あなたの ことばに、ふと 救われました。\nありがとう。",
    timeLabel: "あと 21時間",
    unread: true,
    createdAt: "2026-05-17T22:30:00+09:00",
    expiresAfter24h: true,
  },
  {
    id: "nt-002",
    kind: "reaction",
    icon: "leaf",
    iconTone: "moss",
    title: "しずか さんが「わかる」を 添えました",
    timeLabel: "あと 18時間",
    unread: true,
    createdAt: "2026-05-17T19:12:00+09:00",
    expiresAfter24h: true,
  },
  {
    id: "nt-003",
    kind: "neighbor",
    icon: "flower",
    iconTone: "terra",
    title: "そら さんが、お隣に なりました",
    timeLabel: "あと 9時間",
    unread: false,
    createdAt: "2026-05-17T10:20:00+09:00",
    expiresAfter24h: true,
  },
  {
    id: "nt-004",
    kind: "comment",
    icon: "chat",
    iconTone: "gold",
    title: "ふらり さんから、ことばが 返りました",
    quote: "わたしも、同じ夜が ありました。",
    timeLabel: "あと 4時間",
    unread: false,
    createdAt: "2026-05-17T03:05:00+09:00",
    expiresAfter24h: true,
  },
  {
    id: "nt-005",
    kind: "official",
    icon: "shield",
    iconTone: "moss",
    title: "もか（運営）から、お知らせ",
    quote: "夜の 通知は、控えめに しています。",
    timeLabel: "—",
    unread: false,
    createdAt: "2026-05-14T09:00:00+09:00",
    expiresAfter24h: false,
  },
];
