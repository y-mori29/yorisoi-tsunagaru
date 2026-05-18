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
    fromMeta: "UC ルーム",
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
    fromMeta: "クローン ルーム",
    timer: "あと 4時間",
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
