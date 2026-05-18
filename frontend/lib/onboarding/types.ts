import type { AnimalName } from "@/lib/icons";

/**
 * オンボーディングで尋ねる「ここで何をしたいか」の選択肢。
 * この選択に応じて、後続の質問画面が動的に出現/省略される。
 */
export type PurposeId =
  | "same-condition" //   同じ病気の方と、ことばを 交わしたい
  | "same-rhythm" //      似た 生活リズムの方と、つながりたい
  | "same-thinking" //    考え方が近い方と、ゆっくり 話したい
  | "consult-self" //     相談したい
  | "consult-others" //   相談に 乗りたい
  | "observe" //          他の方の 体験や工夫を、見たい
  | "drift"; //           決めずに、ふらっと 過ごしたい

export type RhythmId = "morning" | "night" | "varies";

/**
 * 病気・症状カタログ（検索＋chip 選択用）。
 * メディキャンバスの 11 疾患を含む、症状ベースも含めた幅広いリスト。
 * 確定診断のない方・症状だけの方も選べるように配慮。
 *
 * `kana` はひらがな検索用（label にないかな表記でも検索ヒットさせる）。
 */
export type ConditionEntry = {
  id: string;
  label: string;
  kana?: string;
};

export const CONDITION_CATALOG: ConditionEntry[] = [
  // 消化器（IBD）
  { id: "uc", label: "潰瘍性大腸炎 (UC)", kana: "かいようせいだいちょうえん" },
  { id: "crohn", label: "クローン病", kana: "くろーんびょう" },
  { id: "ibd-other", label: "そのほかの IBD", kana: "あいびーでぃー" },
  // 膠原病・自己免疫
  { id: "sle", label: "全身性エリテマトーデス (SLE)", kana: "ぜんしんせいえりてまとーです" },
  { id: "ra", label: "関節リウマチ", kana: "かんせつりうまち" },
  { id: "behcet", label: "ベーチェット病", kana: "べーちぇっとびょう" },
  { id: "ssc", label: "強皮症", kana: "きょうひしょう" },
  { id: "sjogren", label: "シェーグレン症候群", kana: "しぇーぐれんしょうこうぐん" },
  // 神経
  { id: "ms", label: "多発性硬化症 (MS)", kana: "たはつせいこうかしょう" },
  { id: "nmo", label: "視神経脊髄炎 (NMO)", kana: "ししんけいせきずいえん" },
  // 皮膚
  { id: "psoriasis", label: "乾癬", kana: "かんせん" },
  { id: "ad", label: "アトピー性皮膚炎", kana: "あとぴーせいひふえん" },
  // 内分泌
  { id: "addison", label: "副腎疾患", kana: "ふくじんしっかん" },
  { id: "hashimoto", label: "甲状腺疾患", kana: "こうじょうせんしっかん" },
  // 自己炎症
  { id: "fmf", label: "家族性地中海熱", kana: "かぞくせいちちゅうかいねつ" },
  // 症状ベース（診断名なくても選べる）
  { id: "fatigue", label: "強い 疲労感", kana: "ひろうかん" },
  { id: "joint-pain", label: "関節の 痛み", kana: "かんせつのいたみ" },
  { id: "skin-symptom", label: "皮膚の 症状", kana: "ひふのしょうじょう" },
  { id: "gut-symptom", label: "おなかの 症状", kana: "おなかのしょうじょう" },
  { id: "fever", label: "原因がわからない 発熱", kana: "げんいんふめいのはつねつ" },
  { id: "diagnosis-pending", label: "確定診断 待ち", kana: "かくていしんだんまち" },
];

export type OnboardingState = {
  purposes: PurposeId[];
  conditions: string[];
  /** 病気・症状の質問に「答えたくない」と回答したかどうか */
  conditionDeclined: boolean;
  rhythm?: RhythmId;
  /** 質問キー(string) -> 選択肢 index */
  preferences: Record<string, number>;
  profile: {
    animal?: AnimalName;
    displayName?: string;
    rooms?: string[];
  };
};

export const INITIAL_STATE: OnboardingState = {
  purposes: [],
  conditions: [],
  conditionDeclined: false,
  preferences: {},
  profile: {},
};
