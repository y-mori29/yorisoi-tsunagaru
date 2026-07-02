import type { User, Voice } from "@/lib/api/types";

/**
 * 現在ログイン中のユーザー（モック）。
 */
export const currentUser: User = {
  id: "u-local",
  name: "よりそいユーザー",
  handle: "local",
  avatar: "bear",
  avatarSrc: "/assets/animals/bear.png",
  avatarTone: "moss",
  bio: "ゆっくり 歩きながら、ことばを 拾っています。",
  roomName: "潰瘍性大腸炎",
  roomTone: "terra",
  tags: [
    { label: "夜型", tone: "plum" },
    { label: "ゆるく つながりたい", tone: "moss" },
    { label: "静かな朝が 好き", tone: "cream" },
  ],
  joinedAt: "2026-02-14",
};

/**
 * 自分が置いた ことば（プロフィール画面の下部リスト用）。
 * 時系列降順。
 */
export const myVoices: Voice[] = [
  {
    id: "mv-001",
    authorId: "u-local",
    authorName: "よりそいユーザー",
    authorAvatar: "bear",
    authorAvatarSrc: "/assets/animals/bear.png",
    authorAvatarTone: "moss",
    roomName: "潰瘍性大腸炎",
    roomTone: "terra",
    body: "今朝は、薬を 飲み忘れずに 起きられました。\nそれだけで、なんだか 嬉しい。",
    visibility: "neighbors",
    reactions: [
      { kind: "acknowledge", label: "そう", count: 5 },
      { kind: "leaf", label: "わかる", count: 3 },
    ],
    commentCount: 1,
    createdAt: "2026-05-15T07:40:00+09:00",
    timeLabel: "昨日",
  },
  {
    id: "mv-002",
    authorId: "u-local",
    authorName: "よりそいユーザー",
    authorAvatar: "bear",
    authorAvatarSrc: "/assets/animals/bear.png",
    authorAvatarTone: "moss",
    roomName: "潰瘍性大腸炎",
    roomTone: "terra",
    body: "雨の音を 聞きながら、お茶を いれました。\n静かな 夜です。",
    visibility: "all",
    reactions: [
      { kind: "thanks", label: "ありがとう", count: 4 },
      { kind: "leaf", label: "わかる", count: 2 },
    ],
    createdAt: "2026-05-12T22:10:00+09:00",
    timeLabel: "3日前",
  },
];
