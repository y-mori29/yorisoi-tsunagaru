import type { Comment } from "@/lib/api/types";

/**
 * 投稿に対するコメント（Phase 7C）のモック。
 * Voice id / Letter id をキーに持つ。
 *
 * 数件入れておくことで「他の人もコメントしている」状態を見せ、
 * 1 人目のコメント投稿ハードルを下げる演出を兼ねる（冨澤 MTG 5/20 の論点）。
 */
export const mockComments: Record<string, Comment[]> = {
  "v-001": [
    {
      id: "cm-v001-1",
      parentId: "v-001",
      authorId: "u-furari",
      authorName: "ふらり",
      authorAvatar: "cat",
      authorAvatarSrc: "/assets/animals/cat.png",
      authorAvatarTone: "moss",
      roomName: "クローン病",
      body: "わたしも、朝の そわそわ、あります。\n風に当たれる ベランダ、いいですね。",
      createdAt: "2026-05-20T08:50:00+09:00",
      timeLabel: "30分前",
    },
    {
      id: "cm-v001-2",
      parentId: "v-001",
      authorId: "u-soeda",
      authorName: "そえだ",
      authorAvatar: "owl",
      authorAvatarSrc: "/assets/animals/owl.png",
      authorAvatarTone: "plum",
      roomName: "見守り",
      roleBadge: "薬剤師",
      body: "ベランダで 深呼吸、いいですね。\nつらい 時は、また こちらで。",
      createdAt: "2026-05-20T09:05:00+09:00",
      timeLabel: "15分前",
    },
  ],
  "v-002": [
    {
      id: "cm-v002-1",
      parentId: "v-002",
      authorId: "u-sora",
      authorName: "そら",
      authorAvatar: "bird",
      authorAvatarSrc: "/assets/animals/bird.png",
      authorAvatarTone: "plum",
      roomName: "潰瘍性大腸炎",
      body: "ちいさな 花、見つけられる 朝、いいですね。",
      createdAt: "2026-05-20T08:35:00+09:00",
      timeLabel: "45分前",
    },
  ],
  "nt-001": [
    {
      id: "cm-nt001-1",
      parentId: "nt-001",
      authorId: "u-mori",
      authorName: "もりさん",
      authorAvatar: "bear",
      authorAvatarSrc: "/assets/animals/bear.png",
      authorAvatarTone: "moss",
      body: "こちらこそ、ことばを 受けとって くださって。",
      createdAt: "2026-05-20T07:40:00+09:00",
      timeLabel: "2時間前",
    },
  ],
};
