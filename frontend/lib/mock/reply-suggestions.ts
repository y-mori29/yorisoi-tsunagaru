import type { ReplySuggestion } from "@/lib/api/types";

/**
 * 各 conversation の最後の相手メッセージに対する AI 返信候補（モック）。
 * GRAVITY 画像 05 の「返信アシスト」に相当。
 *
 * 冨澤 MTG（2026-05-18）の指針：
 *   患者属性（同じルーム・夜型・しずか派など）を踏まえた共感型の文面にする。
 *   「今日の天気」のような無味乾燥な AI 文は出さない。
 *
 * 各候補は 3 案（共感 / 質問返し / ありがとう）の組で構成する。
 */
export const mockReplySuggestionsByConv: Record<string, ReplySuggestion[]> = {
  "c-001": [
    {
      id: "r-001-a",
      tone: "empathy",
      body: "いい時間 ですよね。\nわたしも、ベランダで 過ごす朝が、好きです。",
    },
    {
      id: "r-001-b",
      tone: "question",
      body: "今日は、どんな 風 でしたか。",
    },
    {
      id: "r-001-c",
      tone: "thanks",
      body: "そう 言って もらえて、こちらこそ。\nまた、ゆっくり 話せたら 嬉しいです。",
    },
  ],

  "c-002": [
    {
      id: "r-002-a",
      tone: "empathy",
      body: "毎晩の よう、しんどい ですよね。\nここで、ゆっくり しても 大丈夫ですよ。",
    },
    {
      id: "r-002-b",
      tone: "question",
      body: "眠れない 夜、何を して 過ごしますか。\nわたしも、よかったら 教えてください。",
    },
    {
      id: "r-002-c",
      tone: "thanks",
      body: "ことば、ありがとう。\n同じ 夜を 過ごしている人が いる、それだけで、少し 安心します。",
    },
  ],

  "c-003": [
    {
      id: "r-003-a",
      tone: "empathy",
      body: "深く 話さなくて、大丈夫です。\nここに、いてくれて、ありがとうございます。",
    },
    {
      id: "r-003-b",
      tone: "question",
      body: "そら さんは、全身性エリテマトーデスの部屋では、どう 過ごしていますか。",
    },
    {
      id: "r-003-c",
      tone: "thanks",
      body: "そう 言って もらえて、ほっと します。\nまた、いつでも、声を かけてください。",
    },
  ],

  // c-004 (運営) は AI 補助なし（公式アカウントには返信候補を出さない）
};
