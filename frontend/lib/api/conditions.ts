import {
  conditionMetaList,
  conditionTopics,
  recentConditions,
} from "@/lib/mock/conditions";
import type {
  ConditionLevel,
  ConditionMeta,
  ConditionPost,
  ConditionTopic,
} from "./types";

/**
 * 体調投稿（Phase 7A）の API スタブ。
 * 5/20 冨澤 MTG「ワンタップで体調 → 任意で ひとこと」を実装するための取得・送信口。
 *
 * 将来 REST/GraphQL に切り替えても呼び出し側のコードを変えないよう、
 * Promise を返すインターフェイスで統一。
 *
 * 自分（MY_ID = "u-mori"）の今日の投稿があるかをメモリで持つので、
 * postCondition() のあとは hasPostedToday() が true を返す。
 * 再読み込みで状態は消える（モックのため）。
 */

const MY_ID = "u-mori";

/** メモリ上の「今日の自分の体調投稿」キャッシュ */
let myPostToday: ConditionPost | null = null;

/**
 * Promise キャッシュ。
 * use() の Suspense 仕様上、**毎回同じインスタンスの Promise** を返す必要がある。
 * `.then()` チェーンは新 Promise を作るため不可。
 * 状態が変わったとき（myPostToday の有無）にだけキャッシュを作り直す。
 */
let cachedKey: "empty" | "with-mine" | null = null;
let cachedRecentPromise: Promise<ConditionPost[]> | null = null;
let cachedTopicsPromise: Promise<ConditionTopic[]> | null = null;

export function getConditionMetaList(): readonly ConditionMeta[] {
  return conditionMetaList;
}

export function getConditionTopics(): Promise<ConditionTopic[]> {
  cachedTopicsPromise ??= Promise.resolve(conditionTopics);
  return cachedTopicsPromise;
}

/** ホームに表示する直近の体調投稿（自分の今日分があれば先頭に） */
export function getRecentConditions(): Promise<ConditionPost[]> {
  const key: "empty" | "with-mine" = myPostToday ? "with-mine" : "empty";
  if (cachedKey !== key || !cachedRecentPromise) {
    cachedKey = key;
    cachedRecentPromise = Promise.resolve(
      myPostToday ? [myPostToday, ...recentConditions] : recentConditions,
    );
  }
  return cachedRecentPromise;
}

/** 自分が今日すでに投稿したか */
export function hasPostedConditionToday(): boolean {
  return myPostToday !== null;
}

export function getMyConditionToday(): ConditionPost | null {
  return myPostToday;
}

type PostInput = {
  level: ConditionLevel;
  body?: string;
  topic?: string;
};

/**
 * 体調投稿を送る（モック実装）。
 * Promise.resolve でラップしておくことで、将来 fetch に差し替え可能。
 */
export function postCondition(input: PostInput): Promise<ConditionPost> {
  const now = new Date();
  const post: ConditionPost = {
    id: `cp-mine-${now.getTime()}`,
    authorId: MY_ID,
    authorName: "もり",
    authorAvatar: "rabbit",
    authorAvatarSrc: "/assets/animals/rabbit.png",
    authorAvatarTone: "terra",
    level: input.level,
    body: input.body?.trim() || undefined,
    topic: input.topic,
    createdAt: now.toISOString(),
    timeLabel: "たった今",
  };
  myPostToday = post;
  // キャッシュ無効化：次回 getRecentConditions で再生成される
  cachedKey = null;
  cachedRecentPromise = null;
  return Promise.resolve(post);
}

/** モック状態のリセット（テスト用） */
export function resetConditionCache() {
  myPostToday = null;
  cachedKey = null;
  cachedRecentPromise = null;
}
