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
  /** 透過 PNG 画像のパス（あれば画像優先で表示） */
  avatarSrc?: string;
  avatarTone: AvatarTone;
  /** "全身性エリテマトーデス ・ 夜型 ・ しずか派" のような短い属性ライン */
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

/* ============================================================
 * DM / メッセージ系（Phase 6A 〜）
 * ------------------------------------------------------------
 * 「お便り」（24h で消える Notification）とは別系統で、
 * 永続的に残るスレッド会話。GRAVITY 画像 11 の構造を踏襲。
 * ============================================================ */

export type ConversationCategory = "friend" | "group" | "official";

/** DM 相手の基本情報（プロフィール全体は別 API で取得） */
export type ConversationPartner = {
  id: string;
  name: string;
  avatar: AnimalName;
  avatarSrc?: string;
  avatarTone: AvatarTone;
  /** "潰瘍性大腸炎" のような所属ラベル（任意） */
  roomName?: string;
};

/** スレッド内の 1 通 */
export type Message = {
  id: string;
  conversationId: string;
  /** "u-mori"（自分） or partner.id */
  senderId: string;
  body: string;
  createdAt: string; // ISO
  /** "3 分前" など UI 表示用 */
  timeLabel: string;
  /** 流れ星から始まった最初のメッセージは、選ばれたお題を保持する */
  starTopic?: string;
};

/** スレッド一覧の 1 行（プレビュー） */
export type Conversation = {
  id: string;
  partner: ConversationPartner;
  lastMessage: string;
  lastMessageAt: string; // ISO
  timeLabel: string;
  /** 未読数。0 でもバッジは出さない（数字を強調しない方針） */
  unreadCount: number;
  category: ConversationCategory;
  /** 流れ星から始まった会話か */
  startedFromStar?: boolean;
};

/** AI が提示する返信候補（Phase 6C） */
export type ReplySuggestion = {
  id: string;
  body: string;
  /** 共感 / 質問返し / ありがとう */
  tone: "empathy" | "question" | "thanks";
};

/** 流れ星投稿のお題（Phase 6B） */
export type StarTopic = {
  id: string;
  /** チップ表示用の短い言葉（「眠れない夜は」） */
  label: string;
  /** 本文 textarea の初期テンプレ（編集可能） */
  template: string;
  /** チップの色味 */
  tone: "terra" | "moss" | "plum" | "gold";
};

/* ============================================================
 * 体調投稿（Phase 7A）
 * ------------------------------------------------------------
 * ワンタップで「きょうの 体調」を投稿する仕組み。
 * 任意で「ひとこと」を添えられる（AI お題チップで補助）。
 * GRAVITY 路線（数字を強調しない・ラベリングしない）を維持。
 * ============================================================ */

/** 体調の 5 段階。great → very-tough の順で下に下がる。 */
export type ConditionLevel = "great" | "good" | "ok" | "tough" | "very-tough";

/** 5 段階セレクタや表示に使う基本情報。UI 側で共有。 */
export type ConditionMeta = {
  level: ConditionLevel;
  /** 短いラベル（チップやセレクタ表示用） */
  label: string;
  /** アイコン辞書のキー（lib/icons.ts の ICONS から） */
  icon: "sun" | "leaf" | "cloud" | "drizzle" | "moon";
  /** トーン（カードの帯やセレクタの強調色） */
  tone: "gold" | "moss" | "default" | "plum" | "terra";
};

/** 体調投稿の 1 レコード */
export type ConditionPost = {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: AnimalName;
  authorAvatarSrc?: string;
  authorAvatarTone: AvatarTone;
  level: ConditionLevel;
  /** 任意の「ひとこと」 */
  body?: string;
  /** ひとことを書くときに選んだお題（任意） */
  topic?: string;
  createdAt: string; // ISO
  timeLabel: string;
};

/** ひとことを書くときに提案するお題（流れ星と独立して持つ） */
export type ConditionTopic = {
  id: string;
  /** チップ表示用の短い言葉 */
  label: string;
  /** textarea の初期テンプレ（編集可能） */
  template: string;
  tone: "terra" | "moss" | "plum" | "gold";
};

/* ============================================================
 * コメント（Phase 7C）
 * ------------------------------------------------------------
 * 投稿（Voice / Letter）に対する返信。
 * 5/20 冨澤 MTG「コメント機能は入れた方がいい」「言葉ある方が共感力が上がる」
 * を実装する。1 階層のみ（コメントへのコメントは出さない）。
 * 心ないコメント対策（Phase 7D）は別フェーズ。
 * ============================================================ */

export type Comment = {
  id: string;
  /** 紐づく Voice / Letter の id */
  parentId: string;
  authorId: string;
  authorName: string;
  authorAvatar: AnimalName;
  authorAvatarSrc?: string;
  authorAvatarTone: AvatarTone;
  /** 所属ルーム（"潰瘍性大腸炎" など） */
  roomName?: string;
  /** 医師バッジなど（"薬剤師" "看護師" "医師"） */
  roleBadge?: "医師" | "薬剤師" | "看護師";
  body: string;
  createdAt: string; // ISO
  timeLabel: string;
};

/** AI が提案する コメント候補（Phase 7C） */
export type CommentSuggestion = {
  id: string;
  body: string;
  /** 共感 / 質問返し / ありがとう */
  tone: "empathy" | "question" | "thanks";
};

/* ============================================================
 * ルーム（Phase 7B）
 * ------------------------------------------------------------
 * 「同じ病気・同じ薬・同じ治療」の人だけが集まる限定空間。
 * 5/20 冨澤 MTG「薬を入力させるよりルームに参加させる方が楽。
 * 裏でユーザーと薬を紐付ければよい」を実装。
 *
 * Voice.roomName と Room.name が一致するもので絞り込む（id ではなく名前マッチ）。
 * これは既存の Voice 型を改造せず、後付けで導入するための判定方法。
 * ============================================================ */

/** ルームの種別（裏側で属性として持つ） */
export type RoomKind = "disease" | "symptom" | "concern" | "treatment" | "medication";

export type Room = {
  id: string;
  /** 表示名（Voice.roomName と完全一致） */
  name: string;
  kind: RoomKind;
  /** 短い説明（1〜2 行） */
  description: string;
  /** リスト表示の色味（既存 RoomTone を流用） */
  tone: RoomTone;
  /** 静かなテーマか（投稿が少ない・運営が常駐など） */
  quiet?: boolean;
};

// RoomMembership（部屋への参加状態）は 2026-07-03 の
// 「入る/出る廃止・テーマ一本化」決定で削除した。
