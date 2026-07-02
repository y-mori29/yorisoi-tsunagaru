import type {
  ConditionMeta,
  ConditionPost,
  ConditionTopic,
} from "@/lib/api/types";

/**
 * 5 段階セレクタの並び順とラベル。
 * 数字（1-5）は出さない。「とてもよい〜とてもつらい」を 5 段階で。
 * 言葉はラベリングを避け、状態だけを表す柔らかい表現に。
 */
export const conditionMetaList: readonly ConditionMeta[] = [
  { level: "great", label: "とても よい", icon: "sun", tone: "gold" },
  { level: "good", label: "よい", icon: "leaf", tone: "moss" },
  { level: "ok", label: "ふつう", icon: "cloud", tone: "default" },
  { level: "tough", label: "つらい", icon: "drizzle", tone: "plum" },
  { level: "very-tough", label: "とても つらい", icon: "moon", tone: "terra" },
] as const;

/**
 * ひとことを書くときに提示するお題チップ。
 * 流れ星のお題（StarTopic）とは独立。体調文脈に寄せた問いに。
 */
export const conditionTopics: ConditionTopic[] = [
  {
    id: "ct-001",
    label: "今日のからだ",
    template: "今日のからだは、",
    tone: "terra",
  },
  {
    id: "ct-002",
    label: "ねむれた？",
    template: "昨夜は、",
    tone: "plum",
  },
  {
    id: "ct-003",
    label: "ごはん",
    template: "今日のごはんは、",
    tone: "moss",
  },
  {
    id: "ct-004",
    label: "気分",
    template: "気分は、",
    tone: "gold",
  },
  {
    id: "ct-005",
    label: "ひとこと",
    template: "",
    tone: "terra",
  },
];

/**
 * 直近の体調投稿モック（タイムラインに混ぜて表示する想定）。
 * 自分（u-mori）以外の数件 + 自分のは未投稿状態でスタートさせる。
 */
export const recentConditions: ConditionPost[] = [
  {
    id: "cp-001",
    authorId: "u-shizuka",
    authorName: "しずか",
    authorAvatar: "rabbit",
    authorAvatarSrc: "/assets/animals/rabbit.png",
    authorAvatarTone: "terra",
    level: "tough",
    body: "朝から、お腹の調子が なんだか そわそわ。\n横になって、ゆっくり 過ごしています。",
    topic: "今日のからだ",
    createdAt: "2026-05-20T08:10:00+09:00",
    timeLabel: "20分前",
  },
  {
    id: "cp-002",
    authorId: "u-furari",
    authorName: "ふらり",
    authorAvatar: "cat",
    authorAvatarSrc: "/assets/animals/cat.png",
    authorAvatarTone: "moss",
    level: "good",
    createdAt: "2026-05-20T07:42:00+09:00",
    timeLabel: "1時間前",
  },
  {
    id: "cp-003",
    authorId: "u-sora",
    authorName: "そら",
    authorAvatar: "bird",
    authorAvatarSrc: "/assets/animals/bird.png",
    authorAvatarTone: "plum",
    level: "ok",
    body: "ふつう、だけど、ふつうが いちばん。",
    createdAt: "2026-05-20T06:55:00+09:00",
    timeLabel: "2時間前",
  },
];
