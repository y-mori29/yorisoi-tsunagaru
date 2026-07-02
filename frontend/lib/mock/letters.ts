import type { AnimalName } from "@/lib/icons";
import type { AvatarTone } from "@/lib/api/types";

/**
 * 「そっと届く声」の手紙データ（モック）。
 * /voice/[id] で id を引いて表示する。
 */
export type Letter = {
  id: string;
  label: string;
  body: string;
  fromName: string;
  fromAvatar: AnimalName;
  fromAvatarSrc?: string;
  fromAvatarTone: AvatarTone;
  fromMeta?: string;
  /** 残り時間表示 */
  timer?: string;
};

export const mockLetters: Record<string, Letter> = {
  "nt-001": {
    id: "nt-001",
    label: "届いた声",
    body:
      "あなたの ことばに、ふと 救われました。\nまだ お礼を 言えないままだったので、\nここに 置いておきます。\n\nありがとう。",
    fromName: "あるお隣さん",
    fromAvatar: "rabbit",
    fromAvatarSrc: "/assets/animals/rabbit.png",
    fromAvatarTone: "terra",
    fromMeta: "潰瘍性大腸炎",
    timer: "あと 21時間",
  },
  "nt-004": {
    id: "nt-004",
    label: "返ってきた ことば",
    body:
      "わたしも、同じ夜が ありました。\n寝つけない 時に、あなたの 投稿を 読んで、\n少しだけ、肩の力が 抜けました。",
    fromName: "ふらり",
    fromAvatar: "cat",
    fromAvatarSrc: "/assets/animals/cat.png",
    fromAvatarTone: "moss",
    fromMeta: "クローン病",
    timer: "あと 4時間",
  },
  // タイムライン投稿（公開）— /home から開いたとき表示する用
  "v-001": {
    id: "v-001",
    label: "しずか さんの ことば",
    body:
      "今日は朝から、なんだか落ち着かなくて。\nベランダで風に当たって、深く呼吸をしてみました。\n同じような方、いますか。",
    fromName: "しずか",
    fromAvatar: "rabbit",
    fromAvatarSrc: "/assets/animals/rabbit.png",
    fromAvatarTone: "terra",
    fromMeta: "潰瘍性大腸炎 ・ 3分前",
  },
  "v-002": {
    id: "v-002",
    label: "ふらり さんの ことば",
    body:
      "散歩道で、小さな花が、開いていました。\nこういう、静かな時間が、いちばん好きです。",
    fromName: "ふらり",
    fromAvatar: "cat",
    fromAvatarSrc: "/assets/animals/cat.png",
    fromAvatarTone: "moss",
    fromMeta: "クローン病 ・ 15分前",
  },
  // 自分の置いた ことば — /me から開いたとき表示する用
  "mv-001": {
    id: "mv-001",
    label: "あなたの 置いた ことば",
    body:
      "今朝は、薬を 飲み忘れずに 起きられました。\nそれだけで、なんだか 嬉しい。",
    fromName: "もりさん",
    fromAvatar: "bear",
    fromAvatarSrc: "/assets/animals/bear.png",
    fromAvatarTone: "moss",
    fromMeta: "潰瘍性大腸炎 ・ 昨日",
  },
  "mv-002": {
    id: "mv-002",
    label: "あなたの 置いた ことば",
    body:
      "雨の音を 聞きながら、お茶を いれました。\n静かな 夜です。",
    fromName: "もりさん",
    fromAvatar: "bear",
    fromAvatarSrc: "/assets/animals/bear.png",
    fromAvatarTone: "moss",
    fromMeta: "潰瘍性大腸炎 ・ 3日前",
  },
};

/** 該当 id がない場合のフォールバック */
export const fallbackLetter: Letter = {
  id: "fallback",
  label: "届いた声",
  body: "この 声は、もう 静かに 消えました。\n読めなくて、ごめんなさい。",
  fromName: "—",
  fromAvatar: "owl",
  fromAvatarTone: "default",
};
