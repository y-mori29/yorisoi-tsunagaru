import type { StarTopic } from "@/lib/api/types";

/**
 * 流れ星投稿のお題チップ（GRAVITY 画像 06 の「お題候補」に相当）。
 *
 * 冨澤 MTG（2026-05-18）の指針：
 *  - 「今日の天気」のような無味乾燥な AI 文ではなく、
 *    患者属性を踏まえた共感型のお題にする
 *  - 「答えたくない」を直接出さないが、本文テンプレを編集可能にして
 *    人それぞれのペースで答えられるようにする
 */
export const mockStarTopics: StarTopic[] = [
  {
    id: "t-sleep",
    label: "眠れない夜は",
    template: "眠れない夜が ありますか。\nわたしは、今夜、まだ起きています。",
    tone: "plum",
  },
  {
    id: "t-mood",
    label: "最近の 気分",
    template: "最近の 気分を、ひとこと だけ。\nわたしは、",
    tone: "terra",
  },
  {
    id: "t-meal",
    label: "今日の ごはん",
    template: "今日の ごはんは、なんでしたか。\nわたしは、",
    tone: "moss",
  },
  {
    id: "t-walk",
    label: "散歩道の 風景",
    template: "散歩道で、見つけた ことを。\nわたしは、",
    tone: "moss",
  },
  {
    id: "t-memory",
    label: "ふと 思い出すこと",
    template: "ふと、思い出すことが ありますか。\nわたしは、",
    tone: "plum",
  },
  {
    id: "t-hospital",
    label: "次の 通院日",
    template: "次の 通院は、いつごろですか。\nわたしは、",
    tone: "terra",
  },
  {
    id: "t-morning",
    label: "朝の 一杯",
    template: "朝の 一杯は、なんですか。\nわたしは、",
    tone: "gold",
  },
  {
    id: "t-weather",
    label: "今日の 空",
    template: "そちらの 空は、どんな 色ですか。\nこちらは、",
    tone: "gold",
  },
];
