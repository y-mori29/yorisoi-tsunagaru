import type { Message } from "@/lib/api/types";

/**
 * conversationId → メッセージ列のモック。
 * 自分は "u-mori" 固定（lib/mock/me.ts の currentUser と一致）。
 *
 * 時系列昇順（古い → 新しい）。最後のメッセージが Conversation.lastMessage と整合する。
 */
export const mockMessages: Record<string, Message[]> = {
  "c-001": [
    {
      id: "m-001-1",
      conversationId: "c-001",
      senderId: "u-shizuka",
      body: "今日は朝から、なんだか落ち着かなくて。同じような方、いますか。",
      createdAt: "2026-05-20T08:32:00+09:00",
      timeLabel: "10時間前",
    },
    {
      id: "m-001-2",
      conversationId: "c-001",
      senderId: "u-mori",
      body: "わたしも、朝の落ち着かなさ、よく ありました。\nベランダで風に当たるの、いいですよね。",
      createdAt: "2026-05-20T09:15:00+09:00",
      timeLabel: "9時間前",
    },
    {
      id: "m-001-3",
      conversationId: "c-001",
      senderId: "u-shizuka",
      body: "そう言ってもらえると、ほっとします。",
      createdAt: "2026-05-20T18:30:00+09:00",
      timeLabel: "13分前",
    },
    {
      id: "m-001-4",
      conversationId: "c-001",
      senderId: "u-shizuka",
      body: "ベランダで風に当たる、いい時間ですね。",
      createdAt: "2026-05-20T18:42:00+09:00",
      timeLabel: "1分前",
    },
  ],

  "c-002": [
    {
      id: "m-002-1",
      conversationId: "c-002",
      senderId: "u-mori",
      body: "眠れない夜が ありますか。",
      createdAt: "2026-05-19T23:48:00+09:00",
      timeLabel: "昨日",
      starTopic: "眠れない夜は",
    },
    {
      id: "m-002-2",
      conversationId: "c-002",
      senderId: "u-furari",
      body: "あります。最近は、毎晩のように。",
      createdAt: "2026-05-20T00:12:00+09:00",
      timeLabel: "19時間前",
    },
    {
      id: "m-002-3",
      conversationId: "c-002",
      senderId: "u-mori",
      body: "わたしもです。今夜は、お互い、ゆっくりできますように。",
      createdAt: "2026-05-20T00:20:00+09:00",
      timeLabel: "19時間前",
    },
    {
      id: "m-002-4",
      conversationId: "c-002",
      senderId: "u-furari",
      body: "わたしも、同じ夜が ありました。",
      createdAt: "2026-05-20T15:10:00+09:00",
      timeLabel: "4時間前",
    },
  ],

  "c-003": [
    {
      id: "m-003-1",
      conversationId: "c-003",
      senderId: "u-sora",
      body: "はじめまして。\n全身性エリテマトーデスの部屋から、ふらっと、来ました。",
      createdAt: "2026-05-19T20:00:00+09:00",
      timeLabel: "昨日",
    },
    {
      id: "m-003-2",
      conversationId: "c-003",
      senderId: "u-mori",
      body: "ようこそ。\nここは、ゆっくりで、大丈夫な場所です。",
      createdAt: "2026-05-19T21:30:00+09:00",
      timeLabel: "昨日",
    },
    {
      id: "m-003-3",
      conversationId: "c-003",
      senderId: "u-sora",
      body: "ありがとうございます。\nまだ、何を話していいか わからないのですが…",
      createdAt: "2026-05-19T21:55:00+09:00",
      timeLabel: "昨日",
    },
    {
      id: "m-003-4",
      conversationId: "c-003",
      senderId: "u-sora",
      body: "深く話さなくても、大丈夫ですよ。",
      createdAt: "2026-05-19T22:08:00+09:00",
      timeLabel: "昨日",
    },
  ],

  "c-004": [
    {
      id: "m-004-1",
      conversationId: "c-004",
      senderId: "u-moka",
      body: "よりそい つながる へ ようこそ。\nここは、ゆっくり 暮らしを 持ち寄る 場所です。",
      createdAt: "2026-05-14T09:00:00+09:00",
      timeLabel: "6日前",
    },
    {
      id: "m-004-2",
      conversationId: "c-004",
      senderId: "u-moka",
      body: "夜の通知は、控えめにしています。",
      createdAt: "2026-05-14T09:00:00+09:00",
      timeLabel: "6日前",
    },
  ],
};
