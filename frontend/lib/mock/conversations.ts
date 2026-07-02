import type { Conversation } from "@/lib/api/types";

/**
 * DM スレッド一覧のモック。
 * GRAVITY 画像 11 の構造（アイコン + 名前 + プレビュー + 時間 + 赤バッジ）に合わせている。
 *
 * 「流れ星」から始まったものは startedFromStar=true で、お題が初手メッセージに残る。
 */
export const mockConversations: Conversation[] = [
  {
    id: "c-001",
    partner: {
      id: "u-shizuka",
      name: "しずか",
      avatar: "rabbit",
      avatarSrc: "/assets/animals/rabbit.png",
      avatarTone: "terra",
      roomName: "潰瘍性大腸炎",
    },
    lastMessage: "ベランダで風に当たる、いい時間ですね。",
    lastMessageAt: "2026-05-20T18:42:00+09:00",
    timeLabel: "1分前",
    unreadCount: 1,
    category: "friend",
  },
  {
    id: "c-002",
    partner: {
      id: "u-furari",
      name: "ふらり",
      avatar: "cat",
      avatarSrc: "/assets/animals/cat.png",
      avatarTone: "moss",
      roomName: "クローン病",
    },
    lastMessage: "わたしも、同じ夜が ありました。",
    lastMessageAt: "2026-05-20T15:10:00+09:00",
    timeLabel: "4時間前",
    unreadCount: 0,
    category: "friend",
    startedFromStar: true,
  },
  {
    id: "c-003",
    partner: {
      id: "u-sora",
      name: "そら",
      avatar: "bird",
      avatarSrc: "/assets/animals/bird.png",
      avatarTone: "plum",
      roomName: "全身性エリテマトーデス",
    },
    lastMessage: "深く話さなくても、大丈夫ですよ。",
    lastMessageAt: "2026-05-19T22:08:00+09:00",
    timeLabel: "昨日",
    unreadCount: 2,
    category: "friend",
  },
  {
    id: "c-004",
    partner: {
      id: "u-moka",
      name: "もか（運営）",
      avatar: "rabbit",
      avatarSrc: "/assets/animals/rabbit.png",
      avatarTone: "cream",
    },
    lastMessage: "夜の通知は、控えめにしています。",
    lastMessageAt: "2026-05-14T09:00:00+09:00",
    timeLabel: "6日前",
    unreadCount: 0,
    category: "official",
  },
];
