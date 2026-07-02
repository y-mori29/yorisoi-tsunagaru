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
    avatarSrc: "/assets/animals/rabbit.png",
    avatarTone: "terra",
    attributes: "潰瘍性大腸炎 ・ 朝型 ・ ゆるく",
  },
  {
    id: "n-002",
    name: "ふらり",
    avatar: "cat",
    avatarSrc: "/assets/animals/cat.png",
    avatarTone: "moss",
    attributes: "クローン病 ・ 夜型 ・ しずか派",
  },
  {
    id: "n-003",
    name: "そら",
    avatar: "bird",
    avatarSrc: "/assets/animals/bird.png",
    avatarTone: "plum",
    attributes: "全身性エリテマトーデス ・ 在宅多め ・ 深くは話さない",
  },
  {
    id: "n-004",
    name: "ぱお",
    avatar: "bear",
    avatarSrc: "/assets/animals/bear.png",
    avatarTone: "cream",
    attributes: "ベーチェット病 ・ 通院ペース 月1 ・ 散歩好き",
  },
];
