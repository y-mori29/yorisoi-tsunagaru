/**
 * 共通の型定義。
 * API スタブ (lib/api/) とモック (lib/mock/) で共有する。
 * 将来 REST/GraphQL API に切り替えるときも、この型が契約になる。
 */

import type { AnimalName } from "@/lib/icons";

export type RoomTone = "default" | "terra" | "plum" | "gold";
export type AvatarTone = "terra" | "moss" | "plum" | "cream" | "default";

export type User = {
  id: string;
  name: string;
  handle: string;
  /** 動物アバターの種類（SVG フォールバック用） */
  avatar: AnimalName;
  /** 透過 PNG 画像のパス（あれば画像優先で表示） */
  avatarSrc?: string;
  avatarTone: AvatarTone;
  bio?: string;
  roomName?: string;
  roomTone?: RoomTone;
  /** タグチップ（性格・暮らしのリズム） */
  tags?: Array<{ label: string; tone?: "terra" | "moss" | "plum" | "cream" }>;
  joinedAt: string; // ISO date
};

export type Reaction = {
  /** リアクションの種類（lib/icons.ts の IconName から選ぶ） */
  kind: "acknowledge" | "leaf" | "understand" | "thanks" | "hand";
  label: string;
  /** その投稿に対して自分が反応したか */
  mine?: boolean;
  /** 何人が反応したか（UI には表示しないが内部で持つ） */
  count: number;
};

export type Visibility = "all" | "neighbors" | "room" | "quiet";

export type Voice = {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: AnimalName;
  /** 透過 PNG 画像のパス（あれば画像優先で表示） */
  authorAvatarSrc?: string;
  authorAvatarTone: AvatarTone;
  roomName?: string;
  roomTone?: RoomTone;
  body: string;
  visibility: Visibility;
  /** インライン画像（任意） */
  photoSrc?: string;
  photoAlt?: string;
  reactions: Reaction[];
  /** コメント数（数値は UI では出さないが持っておく） */
  commentCount?: number;
  createdAt: string; // ISO
  /** UI 表示用の相対時間ラベル（"3分前" 等）。実装側で算出してもよい。 */
  timeLabel: string;
};

export type DailyVoice = {
  id: string;
  eyebrow: string;
  body: string;
  authorName: string;
  authorAvatar: AnimalName;
  authorAvatarSrc?: string;
  authorTone: AvatarTone;
  date: string;
};

/**
 * 通知（お便り）。24 時間経過で自然消滅する。
 */
export type Notification = {
  id: string;
  /** 種類で背景色を変える */
  kind: "voice" | "reaction" | "comment" | "neighbor" | "official" | "report";
  /** アイコン辞書のキー（lib/icons.ts の ICONS に存在するもの） */
  icon: "whisper" | "leaf" | "chat" | "hand" | "shield" | "thanks" | "flower";
  iconTone: "terra" | "moss" | "plum" | "gold";
  title: string;
  /** 引用文（あれば quote box で表示） */
  quote?: string;
  timeLabel: string;
  unread: boolean;
  createdAt: string; // ISO
  /** 自然消滅対象か（システム通知は false） */
  expiresAfter24h: boolean;
};

export type Neighbor = {
  id: string;
  name: string;
  avatar: AnimalName;
  avatarTone: AvatarTone;
  /** "SLE ルーム ・ 夜型 ・ しずか派" のような短い属性ライン */
  attributes: string;
};

export type Question = {
  id: string;
  /** "1 / 3" のような表示用 */
  step: string;
  title: string;
  options: string[];
  selectedIndex?: number;
};
