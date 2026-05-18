import type { Neighbor } from "@/lib/api/types";

/**
 * /stroll（めぐる）で表示する お隣さん候補（モック）。
 * 「お隣さがし」とは別の、もう少しゆるい「散歩中の方」リスト。
 */
export const mockNeighbors: Neighbor[] = [
  {
    id: "n-001",
    name: "しずか",
    avatar: "rabbit",
    avatarTone: "terra",
    attributes: "UC ルーム ・ 朝型 ・ ゆるく",
  },
  {
    id: "n-002",
    name: "ふらり",
    avatar: "cat",
    avatarTone: "moss",
    attributes: "クローン ルーム ・ 夜型 ・ しずか派",
  },
  {
    id: "n-003",
    name: "そら",
    avatar: "bird",
    avatarTone: "plum",
    attributes: "SLE ルーム ・ 在宅多め ・ 深くは話さない",
  },
  {
    id: "n-004",
    name: "ぱお",
    avatar: "bear",
    avatarTone: "cream",
    attributes: "ベーチェット ルーム ・ 通院ペース 月1 ・ 散歩好き",
  },
];
