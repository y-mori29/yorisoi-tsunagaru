import type { AnimalName } from "@/lib/icons";
import type { PatientDiseaseSelection, TemplateKey } from "@/lib/mock/explore";

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

export type HealthTopicKind = "symptom" | "concern";

export type PatientTopicSelection = {
  topicName: string;
  topicId: string | null;
  kind: HealthTopicKind;
  selectionMethod: "catalog" | "free_text";
  rawInput?: string;
};

export type MemberHealthContext = {
  userId: string;
  primaryDisease: PatientDiseaseSelection | null;
  secondaryDiseases: PatientDiseaseSelection[];
  symptoms: PatientTopicSelection[];
  concerns: PatientTopicSelection[];
  diagnosisStatus: "diagnosed" | "suspected" | "pending" | "unknown";
  visibility: "private" | "room_members" | "matched_members";
  updatedAt: string;
};

export type HealthTopicCatalogEntry = {
  id: string;
  label: string;
  kind: HealthTopicKind;
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

export const SYMPTOM_CATALOG: HealthTopicCatalogEntry[] = [
  { id: "abdominal-pain", label: "腹痛", kind: "symptom", kana: "ふくつう" },
  { id: "diarrhea", label: "下痢・便のトラブル", kind: "symptom", kana: "げり べん といれ" },
  { id: "fatigue", label: "強い疲れ・倦怠感", kind: "symptom", kana: "つよいつかれ けんたいかん" },
  { id: "pain", label: "痛み", kind: "symptom", kana: "いたみ" },
  { id: "numbness", label: "しびれ", kind: "symptom", kana: "しびれ" },
  { id: "insomnia", label: "眠れない夜", kind: "symptom", kana: "ねむれない よる" },
  { id: "skin", label: "皮膚症状", kind: "symptom", kana: "ひふしょうじょう" },
  { id: "breathless", label: "息切れ・息苦しさ", kind: "symptom", kana: "いきぎれ いきぐるしさ" },
  { id: "nausea", label: "吐き気", kind: "symptom", kana: "はきけ" },
  { id: "dizziness", label: "めまい", kind: "symptom", kana: "めまい" },
];

export const CONCERN_CATALOG: HealthTopicCatalogEntry[] = [
  { id: "before-diagnosis", label: "診断前・検査待ち", kind: "concern", kana: "しんだんまえ けんさまち" },
  { id: "treatment", label: "治療の不安", kind: "concern", kana: "ちりょう ふあん" },
  { id: "money", label: "医療費のこと", kind: "concern", kana: "いりょうひ おかね" },
  { id: "work", label: "仕事との両立", kind: "concern", kana: "しごと りょうりつ" },
  { id: "school", label: "学校・勉強との両立", kind: "concern", kana: "がっこう べんきょう" },
  { id: "family", label: "家族に話す", kind: "concern", kana: "かぞく はなす" },
  { id: "future", label: "将来のこと", kind: "concern", kana: "しょうらい" },
  { id: "lonely", label: "孤独・ひとりの時間", kind: "concern", kana: "こどく ひとり" },
  { id: "patient-group", label: "患者会に行く前", kind: "concern", kana: "かんじゃかい" },
];

export const createCatalogDiseaseSelection = (
  disease: {
    id: string;
    displayName: string;
    templateKey: TemplateKey;
  },
  diagnosisStatus: MemberHealthContext["diagnosisStatus"] = "diagnosed",
): PatientDiseaseSelection => ({
  selectedDiseaseName: disease.displayName,
  selectedDiseaseId: disease.id,
  selectionMethod: "catalog",
  templateKey: disease.templateKey,
  diagnosisStatus,
});

export const createFreeTextDiseaseSelection = (
  diseaseName: string,
  diagnosisStatus: MemberHealthContext["diagnosisStatus"] = "diagnosed",
): PatientDiseaseSelection => ({
  selectedDiseaseName: diseaseName,
  selectedDiseaseId: null,
  selectionMethod: "free_text",
  templateKey: "general",
  diagnosisStatus,
  rawInput: diseaseName,
});

export const createPendingDiseaseSelection = (): PatientDiseaseSelection => ({
  selectedDiseaseName: null,
  selectedDiseaseId: "diagnosis_pending",
  selectionMethod: "status",
  templateKey: "general",
  diagnosisStatus: "pending",
});

export const createTopicSelection = (topic: HealthTopicCatalogEntry): PatientTopicSelection => ({
  topicName: topic.label,
  topicId: topic.id,
  kind: topic.kind,
  selectionMethod: "catalog",
});

export const createInitialHealthContext = (): MemberHealthContext => ({
  userId: "local-onboarding",
  primaryDisease: null,
  secondaryDiseases: [],
  symptoms: [],
  concerns: [],
  diagnosisStatus: "unknown",
  visibility: "matched_members",
  updatedAt: new Date(0).toISOString(),
});

export const touchHealthContext = (context: MemberHealthContext): MemberHealthContext => ({
  ...context,
  updatedAt: new Date().toISOString(),
});

export type OnboardingState = {
  purposes: PurposeId[];
  conditions: string[];
  /** 病気・症状の質問に「答えたくない」と回答したかどうか */
  conditionDeclined: boolean;
  healthContext: MemberHealthContext;
  rhythm?: RhythmId;
  /** 質問キー(string) -> 選択肢 index */
  preferences: Record<string, number>;
  profile: {
    animal?: AnimalName;
    /** アバター背景色（terra/moss/plum/gold/default） */
    avatarTone?: "terra" | "moss" | "plum" | "gold" | "default";
    displayName?: string;
    /** 非公開の基本情報。回答しない選択も値として保持する。 */
    gender?: "male" | "female" | "other" | "undisclosed";
    /** 生年のみ。プロフィールには公開しない。 */
    birthYear?: number | "undisclosed";
    birthMonth?: number;
    birthDay?: number;
    /** QRや専用URLから受け取る患者会等の流入元。画面には表示しない。 */
    referralSource?: string;
    rooms?: string[];
  };
};

export const INITIAL_STATE: OnboardingState = {
  purposes: [],
  conditions: [],
  conditionDeclined: false,
  healthContext: createInitialHealthContext(),
  preferences: {},
  profile: {},
};
