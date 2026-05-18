import type { DailyVoice, Voice } from "@/lib/api/types";

/**
 * ホーム画面で表示する「今日のひとこと」。
 * もか（公式マスコット）からの 1 篇。
 */
export const todayVoice: DailyVoice = {
  id: "daily-2026-05-16",
  eyebrow: "今日のひとこと",
  body: "今日は、ふかぶかと、息をはいてみる日。\nあなたは、ちゃんと眠れていますか。",
  authorName: "もか（公式）から",
  authorAvatar: "rabbit",
  authorAvatarSrc: "/assets/animals/rabbit.png",
  authorTone: "terra",
  date: "2026-05-16",
};

/**
 * タイムラインのモック投稿（2 件）。
 * 02-home.png の構成に合わせている。
 */
export const mockVoices: Voice[] = [
  {
    id: "v-001",
    authorId: "u-shizuka",
    authorName: "しずか",
    authorAvatar: "rabbit",
    authorAvatarSrc: "/assets/animals/rabbit.png",
    authorAvatarTone: "terra",
    roomName: "UC ルーム",
    roomTone: "terra",
    body: "今日は朝から、なんだか落ち着かなくて。\nベランダで風に当たって、深く呼吸をしてみました。\n同じような方、いますか。",
    visibility: "all",
    reactions: [
      { kind: "acknowledge", label: "そう", mine: true, count: 12 },
      { kind: "leaf", label: "わかる", count: 8 },
      { kind: "understand", label: "読んだよ", count: 4 },
    ],
    commentCount: 3,
    createdAt: "2026-05-16T08:32:00+09:00",
    timeLabel: "3分前",
  },
  {
    id: "v-002",
    authorId: "u-furari",
    authorName: "ふらり",
    authorAvatar: "cat",
    authorAvatarSrc: "/assets/animals/cat.png",
    authorAvatarTone: "moss",
    roomName: "クローン ルーム",
    roomTone: "plum",
    body: "散歩道で、小さな花が、開いていました。\nこういう、静かな時間が、いちばん好きです。",
    visibility: "all",
    // TODO: photoSrc は output_v02/02-home.png から小花部分をクロップして配置
    // photoSrc: "/assets/heroes/voice-flower.png",
    // photoAlt: "散歩道に咲く小さな花",
    reactions: [
      { kind: "thanks", label: "ありがとう", count: 6 },
      { kind: "leaf", label: "わかる", count: 4 },
    ],
    commentCount: 1,
    createdAt: "2026-05-16T08:20:00+09:00",
    timeLabel: "15分前",
  },
];
