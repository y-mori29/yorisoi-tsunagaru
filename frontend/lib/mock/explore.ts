import type { AvatarTone, RoomTone } from "@/lib/api/types";
import type { AnimalName } from "@/lib/icons";
import { mockRooms } from "@/lib/mock/rooms";
import uchiakeRaw from "@/lib/data/uchiake-posts.json";

export type ExploreTopicKind = "condition" | "symptom" | "concern";

export type ExploreTopic = {
  id: string;
  label: string;
  kind: ExploreTopicKind;
  aliases?: string[];
  tone: RoomTone;
  featured?: boolean;
  roomHref?: string;
};

export type DiseaseCategory =
  | "ibd"
  | "autoimmune"
  | "neurology"
  | "cancer"
  | "endocrine"
  | "kidney"
  | "respiratory"
  | "skin"
  | "rare"
  | "other";

export type TemplateKey = "general" | "ibd" | "cancer" | "autoimmune" | "neurology";

export type DiseaseCatalogEntry = {
  id: string;
  displayName: string;
  aliases?: string[];
  category: DiseaseCategory;
  templateKey: TemplateKey;
  tone: RoomTone;
  featured?: boolean;
  roomId?: string;
  relatedRoomIds?: string[];
};

export type PatientDiseaseSelection = {
  selectedDiseaseName: string | null;
  selectedDiseaseId: string | null;
  selectionMethod: "catalog" | "free_text" | "status";
  templateKey: TemplateKey;
  diagnosisStatus: "diagnosed" | "suspected" | "pending" | "unknown";
  rawInput?: string;
};

export type DiseaseSearchResult = {
  matches: DiseaseCatalogEntry[];
  exactMatch: DiseaseCatalogEntry | null;
  freeTextSelection: PatientDiseaseSelection | null;
  pendingSelection: PatientDiseaseSelection;
};

export type ExplorePost = {
  id: string;
  authorName: string;
  authorAvatar: AnimalName;
  authorAvatarSrc: string;
  authorAvatarTone: AvatarTone;
  topic: string;
  topicTone: RoomTone;
  topicKind: ExploreTopicKind;
  timeLabel: string;
  body: string;
  mood?: string;
  roomHref?: string;
  roomLabel?: string;
  reactions: Array<{ label: string; count?: number }>;
  viewCount?: string;
  saved?: boolean;
};

const animalSrc: Record<AnimalName, string> = {
  bear: "/assets/animals/bear.png",
  bird: "/assets/animals/bird.png",
  cat: "/assets/animals/cat.png",
  fox: "/assets/animals/fox.png",
  hedgehog: "/assets/animals/hedgehog.png",
  owl: "/assets/animals/owl.png",
  rabbit: "/assets/animals/rabbit.png",
  turtle: "/assets/animals/turtle.png",
};

type TopicSeed = [id: string, label: string, aliases: string[] | undefined, tone: RoomTone, roomHref: string];

export const diseaseCatalog: DiseaseCatalogEntry[] = [
  { id: "uc", displayName: "潰瘍性大腸炎", aliases: ["UC"], category: "ibd", templateKey: "ibd", tone: "terra", roomId: "room-uc", featured: true, relatedRoomIds: ["room-diarrhea", "room-abdominal-pain", "room-work-school"] },
  { id: "crohn", displayName: "クローン病", aliases: ["CD"], category: "ibd", templateKey: "ibd", tone: "plum", roomId: "room-crohn", featured: true, relatedRoomIds: ["room-food", "room-abdominal-pain", "room-diarrhea"] },
  { id: "ra", displayName: "関節リウマチ", category: "autoimmune", templateKey: "autoimmune", tone: "gold", roomId: "room-ra", featured: true, relatedRoomIds: ["room-joint-pain", "room-fatigue", "room-work-school"] },
  { id: "sle", displayName: "全身性エリテマトーデス", aliases: ["SLE"], category: "autoimmune", templateKey: "autoimmune", tone: "terra", roomId: "room-sle", featured: true, relatedRoomIds: ["room-fatigue", "room-skin", "room-treatment"] },
  { id: "t1d", displayName: "1型糖尿病", category: "endocrine", templateKey: "general", tone: "default", roomId: "room-t1d", featured: true, relatedRoomIds: ["room-school", "room-food", "room-family-talk"] },
  { id: "behcet", displayName: "ベーチェット病", aliases: ["ベーチェット症候群"], category: "rare", templateKey: "autoimmune", tone: "terra", roomId: "room-behcet", featured: true, relatedRoomIds: ["room-mouth-ulcer", "room-skin", "room-treatment"] },
  { id: "ms", displayName: "多発性硬化症", aliases: ["MS"], category: "neurology", templateKey: "neurology", tone: "plum", roomId: "room-ms", featured: true, relatedRoomIds: ["room-numbness", "room-vision", "room-fatigue"] },
  { id: "pd", displayName: "パーキンソン病", category: "neurology", templateKey: "neurology", tone: "gold", roomId: "room-pd", featured: true, relatedRoomIds: ["room-tremor", "room-going-out", "room-patient-group"] },
  { id: "fabry", displayName: "ファブリー病", category: "rare", templateKey: "general", tone: "default", roomId: "room-fabry", featured: true, relatedRoomIds: ["room-pain", "room-family-talk", "room-before-diagnosis"] },
  { id: "breast-cancer", displayName: "乳がん", category: "cancer", templateKey: "cancer", tone: "terra", roomId: "room-breast-cancer", featured: true, relatedRoomIds: ["room-treatment", "room-work-school", "room-family-talk"] },
  { id: "blood-cancer", displayName: "血液がん", category: "cancer", templateKey: "cancer", tone: "plum", roomId: "room-blood-cancer", featured: true, relatedRoomIds: ["room-treatment", "room-money", "room-family-talk"] },
  { id: "mg", displayName: "重症筋無力症", aliases: ["MG"], category: "neurology", templateKey: "neurology", tone: "plum", roomId: "room-mg", featured: true, relatedRoomIds: ["room-fatigue", "room-vision", "room-work-school"] },
  { id: "scleroderma", displayName: "強皮症", category: "autoimmune", templateKey: "autoimmune", tone: "terra", roomId: "room-scleroderma", featured: true, relatedRoomIds: ["room-skin", "room-breathless", "room-joint-pain"] },
  { id: "sjogren", displayName: "シェーグレン症候群", category: "autoimmune", templateKey: "autoimmune", tone: "default", roomId: "room-sjogren", featured: true, relatedRoomIds: ["room-dryness", "room-fatigue", "room-work-school"] },
  { id: "als", displayName: "ALS", aliases: ["筋萎縮性側索硬化症"], category: "neurology", templateKey: "neurology", tone: "default", roomId: "room-als", relatedRoomIds: ["room-family-talk", "room-future", "room-going-out"] },
  { id: "itp", displayName: "特発性血小板減少性紫斑病", aliases: ["ITP"], category: "rare", templateKey: "general", tone: "plum", roomId: "room-itp", relatedRoomIds: ["room-treatment", "room-before-visit", "room-money"] },
  { id: "pah", displayName: "肺高血圧症", aliases: ["PAH"], category: "respiratory", templateKey: "general", tone: "plum", roomId: "room-pah", relatedRoomIds: ["room-breathless", "room-going-out", "room-treatment"] },
  { id: "iga", displayName: "IgA腎症", category: "kidney", templateKey: "general", tone: "default", roomId: "room-iga", relatedRoomIds: ["room-before-visit", "room-treatment", "room-money"] },
  { id: "adpkd", displayName: "多発性嚢胞腎", aliases: ["ADPKD"], category: "kidney", templateKey: "general", tone: "default", relatedRoomIds: ["room-money", "room-family-talk", "room-before-visit"] },
  { id: "sarcoidosis", displayName: "サルコイドーシス", category: "rare", templateKey: "general", tone: "gold", roomId: "room-sarcoidosis", relatedRoomIds: ["room-vision", "room-breathless", "room-before-diagnosis"] },
  { id: "endometriosis", displayName: "子宮内膜症", category: "other", templateKey: "general", tone: "terra", relatedRoomIds: ["room-pain", "room-work-school", "room-family-talk"] },
  { id: "lung-cancer", displayName: "肺がん", category: "cancer", templateKey: "cancer", tone: "default", roomId: "room-lung-cancer", relatedRoomIds: ["room-breathless", "room-treatment", "room-family-talk"] },
  { id: "colon-cancer", displayName: "大腸がん", category: "cancer", templateKey: "cancer", tone: "gold", roomId: "room-colorectal-cancer", relatedRoomIds: ["room-treatment", "room-food", "room-family-talk"] },
  { id: "stomach-cancer", displayName: "胃がん", category: "cancer", templateKey: "cancer", tone: "gold", relatedRoomIds: ["room-nausea", "room-food", "room-treatment"] },
  { id: "lymphoma", displayName: "悪性リンパ腫", category: "cancer", templateKey: "cancer", tone: "plum", relatedRoomIds: ["room-treatment", "room-fatigue", "room-family-talk"] },
  { id: "ulcerative-colitis-suspected", displayName: "潰瘍性大腸炎の疑い", aliases: ["UC疑い"], category: "ibd", templateKey: "ibd", tone: "terra", relatedRoomIds: ["room-before-diagnosis", "room-diarrhea", "room-abdominal-pain"] },
  { id: "rare-disease", displayName: "希少疾患・難病", category: "rare", templateKey: "general", tone: "default", relatedRoomIds: ["room-before-diagnosis", "room-family-talk", "room-treatment"] },
];

const roomHref = (roomId?: string) => (roomId ? `/rooms/${roomId}` : undefined);

const conditions = diseaseCatalog.map((disease) => ({
  id: disease.id,
  label: disease.displayName,
  aliases: disease.aliases,
  tone: disease.tone,
  roomHref: roomHref(disease.roomId),
  featured: disease.featured,
}));

const symptoms = ([
  ["abdominal-pain", "腹痛", undefined, "terra", "/rooms/room-abdominal-pain"],
  ["diarrhea", "下痢・便のトラブル", undefined, "plum", "/rooms/room-diarrhea"],
  ["nausea", "吐き気", undefined, "gold", "/rooms/room-nausea"],
  ["fatigue", "強い疲れ", undefined, "default", "/rooms/room-fatigue"],
  ["pain", "痛み（全身）", undefined, "gold", "/rooms/room-pain"],
  ["headache", "頭痛", undefined, "terra", "/rooms/room-headache"],
  ["dizziness", "めまい", undefined, "terra", "/rooms/room-dizziness"],
  ["numbness", "しびれ", undefined, "plum", "/rooms/room-numbness"],
  ["breathless", "息切れ", undefined, "default", "/rooms/room-breathless"],
  ["insomnia", "眠れない夜", undefined, "plum", "/rooms/room-insomnia"],
  ["skin", "皮膚症状", undefined, "terra", "/rooms/room-skin"],
  ["swelling", "むくみ", undefined, "default", "/rooms/room-edema"],
  ["fever", "発熱", undefined, "terra", "/rooms/room-fever"],
  ["palpitation", "動悸", undefined, "gold", "/rooms/room-palpitation"],
  ["appetite", "食欲がない", undefined, "default", "/rooms/room-appetite"],
  ["hand-shake", "手のふるえ", undefined, "gold", "/rooms/room-tremor"],
  ["mouth-ulcer", "口内炎", undefined, "terra", "/rooms/room-mouth-ulcer"],
  ["dryness", "目や口の乾き", undefined, "default", "/rooms/room-dryness"],
  ["brain-fog", "考えがまとまらない", undefined, "plum", "/rooms/room-brain-fog"],
  ["side-effect", "副作用かもしれない", undefined, "gold", "/rooms/room-side-effect"],
] satisfies TopicSeed[]).map(([id, label, aliases, tone, roomHref], index) => ({
  id,
  label,
  aliases,
  tone,
  roomHref,
  featured: index < 14,
}));

const concerns = ([
  ["before-diagnosis", "診断前・検査待ち", undefined, "plum", "/rooms/room-before-diagnosis"],
  ["treatment", "治療の不安", undefined, "terra", "/rooms/room-treatment"],
  ["money", "医療費のこと", undefined, "gold", "/rooms/room-money"],
  ["work", "仕事との両立", undefined, "plum", "/rooms/room-work-school"],
  ["school", "学校・勉強との両立", undefined, "plum", "/rooms/room-work-school"],
  ["family", "家族に話す", undefined, "terra", "/rooms/room-family-talk"],
  ["future", "将来のこと", undefined, "gold", "/rooms/room-future"],
  ["relationship", "恋愛・結婚", undefined, "terra", "/rooms/room-relationship"],
  ["lonely", "孤独・ひとりの時間", undefined, "plum", "/rooms/room-night-anxiety"],
  ["outing", "外出・旅行の不安", undefined, "default", "/rooms/room-going-out"],
  ["food", "食事と楽しみ", undefined, "default", "/rooms/room-food"],
  ["patient-group", "患者会に行く前", undefined, "default", "/rooms/room-patient-group"],
  ["hospital", "通院前の不安", undefined, "terra", "/rooms/room-before-visit"],
  ["childcare", "育児との両立", undefined, "gold", "/rooms/room-childcare"],
  ["tell-friends", "友人に伝える", undefined, "plum", "/rooms/room-friends"],
] satisfies TopicSeed[]).map(([id, label, aliases, tone, roomHref], index) => ({
  id,
  label,
  aliases,
  tone,
  roomHref,
  featured: index < 12,
}));

export const exploreTopics: ExploreTopic[] = [
  ...conditions.map((topic) => ({ ...topic, kind: "condition" as const })),
  ...symptoms.map((topic) => ({ ...topic, kind: "symptom" as const })),
  ...concerns.map((topic) => ({ ...topic, kind: "concern" as const })),
];

type PostSeed = Omit<ExplorePost, "authorAvatarSrc" | "reactions"> & {
  reactions?: Array<{ label: string; count?: number }>;
};

const defaultReactions = [{ label: "共感" }, { label: "応援" }, { label: "ありがとう" }];

const postSeeds: PostSeed[] = [
  ["exp-001", "そらいろ", "rabbit", "terra", "潰瘍性大腸炎", "terra", "condition", "32分前", "今日は調子がよくて少し散歩できた。陽の光が気持ちよくて、涙が出そうになった。", "読めてよかった", "/rooms/room-uc", "潰瘍性大腸炎の声を読む"],
  ["exp-002", "はるかぜ", "bird", "cream", "強い疲れ", "default", "symptom", "45分前", "最近、強い疲れが続いていて何もできない日が多いです。同じような方いますか？", undefined, "/rooms/room-fatigue", "強い疲れの声を読む"],
  ["exp-003", "ゆい", "cat", "moss", "パーキンソン病", "gold", "condition", "1時間前", "手のふるえが出る日と出ない日の差が大きくて、心がついていかないことがあります。", undefined, "/rooms/room-pd", "パーキンソン病の声を読む"],
  ["exp-004", "まほ", "fox", "plum", "診断前・検査待ち", "plum", "concern", "1時間前", "検査の結果待ちで、考えすぎてしまいます。同じように待っている方いませんか？", undefined, "/rooms/room-before-diagnosis", "診断前・検査待ちの声を読む"],
  ["exp-005", "しほ", "turtle", "moss", "クローン病", "plum", "condition", "2時間前", "今日は少し食べられてうれしかった。小さな一歩を大事にしたいです。", undefined, "/rooms/room-crohn", "クローン病の声を読む"],
  ["exp-006", "みずき", "owl", "plum", "仕事との両立", "plum", "concern", "2時間前", "病気のことを職場にどこまで伝えるか、何度も文章を書き直しています。", undefined, "/rooms/room-work-school", "仕事・学校との両立の声を読む"],
  ["exp-007", "なつ", "bear", "cream", "乳がん", "terra", "condition", "3時間前", "治療の説明を受けたあと、家に帰ってから急に不安が来ました。ここで少し吐き出します。", undefined, "/rooms/room-breast-cancer", "乳がんの声を読む"],
  ["exp-008", "あかり", "hedgehog", "terra", "眠れない夜", "plum", "symptom", "3時間前", "夜になると検索が止まらなくなります。読むだけでいられる場所があるのは助かります。", undefined, "/rooms/room-insomnia", "眠れない夜の声を読む"],
  ["exp-009", "けい", "bird", "moss", "ファブリー病", "default", "condition", "4時間前", "子どもの頃からの痛みが、病気と分かった時に安心と不安が同時に来ました。", undefined, "/rooms/room-fabry", "ファブリー病の声を読む"],
  ["exp-010", "りつ", "rabbit", "cream", "医療費のこと", "gold", "concern", "5時間前", "治療のことだけでもいっぱいなのに、お金のことまで考えると頭が重くなります。", undefined, "/rooms/room-money", "医療費の不安の声を読む"],
  ["exp-011", "かな", "fox", "terra", "下痢・便のトラブル", "plum", "symptom", "6時間前", "初めて行く場所は、先にトイレの場所を見ます。それだけで予定を楽しめる日があります。", undefined, "/rooms/room-diarrhea", "下痢・トイレの不安の声を読む"],
  ["exp-012", "えみ", "cat", "plum", "家族に話す", "terra", "concern", "6時間前", "心配させたくなくて元気そうに話してしまうけど、本当は少し聞いてほしい日でした。", undefined, "/rooms/room-family-talk", "家族に話すことの声を読む"],
  ["exp-013", "こより", "owl", "moss", "重症筋無力症", "plum", "condition", "7時間前", "夕方になるとまぶたが重くなって、説明するのも疲れてしまう。分かってくれる声を読むだけで少し落ち着きます。", undefined, "/rooms/room-mg", "重症筋無力症の声を読む"],
  ["exp-014", "なお", "turtle", "cream", "治療の不安", "terra", "concern", "8時間前", "新しい薬の説明を受けました。前向きでいたいけど、副作用のことを考えると夜に何度も起きます。", undefined, "/rooms/room-treatment", "薬・治療との付き合いの声を読む"],
  ["exp-015", "あお", "bird", "plum", "全身性エリテマトーデス", "terra", "condition", "9時間前", "日差しを避けているだけなのに、怠けているみたいに見られるのがつらい日があります。", undefined, "/rooms/room-sle", "全身性エリテマトーデスの声を読む"],
  ["exp-016", "みのり", "rabbit", "moss", "腹痛", "terra", "symptom", "10時間前", "朝からお腹が不安で予定を変えました。キャンセルした後の罪悪感までセットでしんどいです。", undefined, "/rooms/room-abdominal-pain", "腹痛の声を読む"],
  ["exp-017", "さく", "hedgehog", "cream", "関節リウマチ", "gold", "condition", "11時間前", "朝、指が動くまでに時間がかかります。急かされない朝の作り方を少しずつ試しています。", undefined, "/rooms/room-ra", "関節リウマチの声を読む"],
  ["exp-018", "すず", "fox", "cream", "外出・旅行の不安", "default", "concern", "12時間前", "旅行に誘われたけど、体調が読めなくて返事を止めています。楽しみたい気持ちはちゃんとあるのに。", undefined, "/rooms/room-going-out", "外出・旅行の不安の声を読む"],
  ["exp-019", "とう", "bear", "moss", "1型糖尿病", "default", "condition", "昨日", "学校行事の日は楽しいけど、血糖のことを考える時間も増えます。準備リストを作ると少し安心します。", undefined, "/rooms/room-t1d", "1型糖尿病の声を読む"],
  ["exp-020", "ゆず", "cat", "terra", "息切れ", "default", "symptom", "昨日", "駅の階段を見ただけで不安になる日があります。遠回りでもエレベーターを選んでいい、と自分に言いたい。", undefined, "/rooms/room-breathless", "息切れ・息苦しさの声を読む"],
  ["exp-021", "まどか", "owl", "cream", "血液がん", "plum", "condition", "昨日", "入院の荷物を詰めながら、急に現実味が来ました。経験者の持ち物メモを読んで少し落ち着いた。", undefined, "/rooms/room-blood-cancer", "血液がんの声を読む"],
  ["exp-022", "はな", "rabbit", "plum", "しびれ", "plum", "symptom", "昨日", "手のしびれがある日は、スマホを持つだけでも気持ちが削られます。短く書ける場所があると助かる。", undefined, "/rooms/room-numbness", "しびれの声を読む"],
  ["exp-023", "いつき", "turtle", "default", "多発性硬化症", "plum", "condition", "昨日", "再発という言葉が頭から離れない時があります。今日は深呼吸して、読める投稿だけ読みました。", undefined, "/rooms/room-ms", "多発性硬化症の声を読む"],
  ["exp-024", "りお", "bird", "terra", "通院前の不安", "terra", "concern", "昨日", "診察で言いたいことをメモしたのに、待合室で全部飛びそうになります。みなさんどうしていますか。", undefined, "/rooms/room-before-visit", "通院前の不安の声を読む"],
  ["exp-025", "ひなた", "fox", "cream", "ベーチェット病", "terra", "condition", "2日前", "口内炎が続くと食事も会話もこわくなります。小さな不調でも生活全体に響くんだなと思う。", undefined, "/rooms/room-behcet", "ベーチェット病の声を読む"],
  ["exp-026", "めい", "hedgehog", "moss", "皮膚症状", "terra", "symptom", "2日前", "見た目に出る症状は、説明する前に見られてしまう感じがして疲れます。今日は長袖で安心できました。", undefined, "/rooms/room-skin", "皮膚症状の声を読む"],
  ["exp-027", "そう", "bear", "plum", "ALS", "default", "condition", "2日前", "家族にどう頼るかを考えるだけで胸が詰まります。近い人の言葉を読むと、少しだけ整理できます。", undefined, "/rooms/room-als", "ALSの声を読む"],
  ["exp-028", "かえで", "cat", "cream", "食事と楽しみ", "default", "concern", "2日前", "食べられるものが限られると、誰かとの食事が申し訳なくなります。無理しない選び方を知りたい。", undefined, "/rooms/room-food", "食事と楽しみの声を読む"],
  ["exp-029", "れん", "owl", "terra", "強皮症", "terra", "condition", "3日前", "寒い場所に行く予定があるだけで身構えます。手袋を持つことが、お守りみたいになっています。", undefined, "/rooms/room-scleroderma", "強皮症の声を読む"],
  ["exp-030", "みお", "rabbit", "default", "肺高血圧症", "plum", "condition", "3日前", "息が上がると、周りにどう見えているかまで気になってしまう。急がない予定に変える練習中です。", undefined, "/rooms/room-pah", "肺高血圧症の声を読む"],
  ["exp-031", "あまね", "bird", "cream", "患者会に行く前", "default", "concern", "3日前", "患者会に行ってみたいけど、うまく話せるか不安です。まずは読める場所から始めたい。", undefined, "/rooms/room-patient-group", "患者会に行く前の声を読む"],
  ["exp-032", "ゆう", "fox", "plum", "大腸がん", "gold", "condition", "3日前", "検査結果の言葉を何度も読み返しています。家族に説明する前に、自分の気持ちを置きたい。", undefined, "/rooms/room-colorectal-cancer", "大腸がんの声を読む"],
  ["exp-033", "こまち", "cat", "moss", "むくみ", "default", "symptom", "4日前", "靴がきついだけで一日中気持ちが沈む日があります。小さな変化を分かってもらえるとほっとする。", undefined, "/rooms/room-edema", "むくみの声を読む"],
  ["exp-034", "せな", "turtle", "terra", "育児との両立", "gold", "concern", "4日前", "子どもの予定と通院が重なるたびに、自分だけで抱えようとしてしまいます。頼る練習をしたい。", undefined, "/rooms/room-childcare", "育児との両立の声を読む"],
  ["exp-035", "りん", "hedgehog", "cream", "肺がん", "default", "condition", "4日前", "咳が続くと気持ちまでざわざわします。検索だけではなく、生活の声を読めるのがありがたい。", undefined, "/rooms/room-lung-cancer", "肺がんの声を読む"],
  ["exp-036", "ゆら", "bear", "cream", "孤独・ひとりの時間", "plum", "concern", "4日前", "夜だけ急に不安が大きくなります。返信しなくても読んでいられる場所があると、少し朝まで持ちます。", undefined, "/rooms/room-night-anxiety", "孤独・ひとりの時間の声を読む"],
  ["exp-037", "さよ", "rabbit", "terra", "副作用かもしれない", "gold", "symptom", "5日前", "これは副作用なのか、疲れなのか分からなくて迷います。次の診察で聞くことリストに入れました。", undefined, "/rooms/room-side-effect", "副作用かもしれない声を読む"],
  ["exp-038", "ほのか", "bird", "moss", "シェーグレン症候群", "default", "condition", "5日前", "目の乾きが強い日は、仕事の画面を見るだけで消耗します。休憩を入れることを許したい。", undefined, "/rooms/room-sjogren", "シェーグレン症候群の声を読む"],
  ["exp-039", "みく", "fox", "cream", "友人に伝える", "plum", "concern", "5日前", "友人の前でどこまで話すか迷います。重くしたくないけど、何もなかったことにもできない。", undefined, "/rooms/room-friends", "友人に伝える声を読む"],
  ["exp-040", "とうか", "owl", "plum", "悪性リンパ腫", "plum", "condition", "6日前", "治療予定が決まって少し安心したのに、急に怖くなる時間があります。波があってもいいと思いたい。", undefined, "/rooms/room-lymphoma", "悪性リンパ腫の声を読む"],
  ["exp-041", "なぎ", "cat", "terra", "吐き気", "gold", "symptom", "6日前", "匂いで急に気持ち悪くなる日があります。バッグに入れておく安心セットを見直しました。", undefined, "/rooms/room-nausea", "吐き気の声を読む"],
  ["exp-042", "いつは", "turtle", "moss", "将来のこと", "gold", "concern", "6日前", "先のことを考えすぎると動けなくなるので、今日は今週の予定だけ見ました。それで十分な日もある。", undefined, "/rooms/room-future", "将来のことの声を読む"],
  ["exp-043", "すみれ", "hedgehog", "plum", "発熱", "terra", "symptom", "1週間前", "熱が出るたびに予定が崩れて、申し訳なさが先に来ます。休むことを説明しなくてもいい場所がほしい。", undefined, "/rooms/room-fever", "発熱の声を読む"],
  ["exp-044", "ひより", "bear", "moss", "IgA腎症", "default", "condition", "1週間前", "数値を見るたびに一喜一憂してしまいます。前回より少し落ち着いて読めた自分を褒めたい。", undefined, "/rooms/room-iga", "IgA腎症の声を読む"],
  ["exp-045", "ましろ", "rabbit", "cream", "恋愛・結婚", "terra", "concern", "1週間前", "病気の話をいつ伝えるかで悩んでいます。正解がないからこそ、いろんな声を読みたいです。", undefined, "/rooms/room-relationship", "恋愛・結婚の声を読む"],
] .map(([id, authorName, authorAvatar, authorAvatarTone, topic, topicTone, topicKind, timeLabel, body, mood, roomHref, roomLabel], index) => ({
  id,
  authorName,
  authorAvatar,
  authorAvatarTone,
  topic,
  topicTone,
  topicKind,
  timeLabel,
  body,
  mood,
  roomHref,
  roomLabel,
  saved: index === 2 || index === 17,
})) as PostSeed[];

const mockViewCounts = [
  38, 52, 67, 45, 74, 58, 83, 61, 96, 71, 114, 88, 132, 109, 79,
  151, 124, 93, 168, 137, 106, 189, 143, 117, 202, 156, 128, 176, 211,
  149, 194, 235, 162, 207, 181, 254, 219, 173, 268, 231, 197, 286, 244,
  213, 301,
];

function getMockViewCount(id: string, index: number) {
  const numericId = Number(id.replace(/\D/g, "")) || index + 1;
  const base = mockViewCounts[index % mockViewCounts.length];
  const offset = (numericId * 11 + index * 5) % 9;
  return `${base + offset}`;
}

/* ============================================================
 * 体験談データの統合
 * ------------------------------------------------------------
 * tools/uchiake-pipeline で生成した静的JSON（1,900件超）を
 * 手書きシードと同じ ExplorePost として合流させる。
 * 通常投稿と同じウェイト・同じ見た目で流す（2026-07-03 森さん決定）。
 * ============================================================ */

type UchiakeRawPost = {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorAvatarTone: string;
  topic: string;
  topicKind: ExploreTopicKind;
  topicTone: string;
  timeLabel: string;
  minutesAgo: number;
  body: string;
  primaryDisease: string | null;
  symptoms: string[];
  topics: string[];
};

const roomNameById = new Map(mockRooms.map((room) => [room.id, room.name]));

/** 抽出時の悩みトピック → 既存の悩み部屋 */
const concernRoomByTopic: Record<string, string> = {
  "仕事・学校": "room-work-school",
  "家族・パートナー": "room-family-talk",
  "お金": "room-money",
  "通院・治療": "room-before-visit",
  "薬との付き合い": "room-treatment",
  "診断がつくまで": "room-before-diagnosis",
  "眠り": "room-insomnia",
  "食事": "room-food",
  "外出・移動": "room-going-out",
};

/** 抽出された症状表現 → 症状部屋（表記ゆれの主要どころのみ） */
const symptomRoomAliases: Array<[RegExp, string]> = [
  [/下痢|軟便|便/, "room-diarrhea"],
  [/腹痛|お腹の痛/, "room-abdominal-pain"],
  [/吐き気|嘔吐/, "room-nausea"],
  [/疲れ|倦怠感|だるさ/, "room-fatigue"],
  [/頭痛/, "room-headache"],
  [/めまい/, "room-dizziness"],
  [/しびれ/, "room-numbness"],
  [/息切れ|息苦し/, "room-breathless"],
  [/不眠|眠れ/, "room-insomnia"],
  [/皮膚|湿疹|かゆみ/, "room-skin"],
  [/むくみ/, "room-edema"],
  [/発熱|熱/, "room-fever"],
  [/動悸/, "room-palpitation"],
  [/食欲/, "room-appetite"],
  [/震え|ふるえ/, "room-tremor"],
  [/口内炎/, "room-mouth-ulcer"],
];

function resolveUchiakeRoom(post: UchiakeRawPost): { roomHref?: string; roomLabel?: string } {
  let roomId: string | undefined;
  if (post.topicKind === "condition" && post.primaryDisease) {
    const disease = diseaseCatalog.find(
      (entry) =>
        entry.displayName === post.primaryDisease || (entry.aliases ?? []).includes(post.primaryDisease ?? ""),
    );
    roomId = disease?.roomId;
  }
  if (!roomId && post.symptoms.length > 0) {
    for (const symptom of post.symptoms) {
      const hit = symptomRoomAliases.find(([pattern]) => pattern.test(symptom));
      if (hit) {
        roomId = hit[1];
        break;
      }
    }
  }
  if (!roomId) {
    for (const topic of post.topics) {
      if (concernRoomByTopic[topic]) {
        roomId = concernRoomByTopic[topic];
        break;
      }
    }
  }
  const roomName = roomId ? roomNameById.get(roomId) : undefined;
  if (!roomId || !roomName) return {};
  return { roomHref: `/rooms/${roomId}`, roomLabel: `${roomName}の声を読む` };
}

const uchiakePosts: Array<ExplorePost & { minutesAgo: number }> = (uchiakeRaw as UchiakeRawPost[]).map(
  (post, index) => ({
    id: post.id,
    authorName: post.authorName,
    authorAvatar: post.authorAvatar as AnimalName,
    authorAvatarSrc: animalSrc[post.authorAvatar as AnimalName],
    authorAvatarTone: post.authorAvatarTone as AvatarTone,
    topic: post.topic,
    topicTone: post.topicTone as RoomTone,
    topicKind: post.topicKind,
    timeLabel: post.timeLabel,
    minutesAgo: post.minutesAgo,
    body: post.body,
    ...resolveUchiakeRoom(post),
    reactions: defaultReactions,
    viewCount: getMockViewCount(post.id, index),
  }),
);

/** 手書きシードの相対時間ラベルを分に換算（統合フィードの並び順用） */
function timeLabelToMinutes(label: string): number {
  const num = Number(label.replace(/\D/g, "")) || 1;
  if (label.includes("分前")) return num;
  if (label.includes("時間前")) return num * 60;
  if (label.includes("昨日")) return 60 * 24;
  if (label.includes("日前")) return num * 60 * 24;
  if (label.includes("週間前")) return num * 60 * 24 * 7;
  if (label.includes("か月前")) return num * 60 * 24 * 30;
  return 60 * 24;
}

const seedPosts: Array<ExplorePost & { minutesAgo: number }> = postSeeds.map((post, index) => ({
  ...post,
  authorAvatarSrc: animalSrc[post.authorAvatar],
  reactions: post.reactions ?? defaultReactions,
  viewCount: post.viewCount ?? getMockViewCount(post.id, index),
  minutesAgo: timeLabelToMinutes(post.timeLabel),
}));

export const explorePosts: ExplorePost[] = [...seedPosts, ...uchiakePosts]
  .sort((a, b) => a.minutesAgo - b.minutesAgo)
  .map(({ minutesAgo: _minutesAgo, ...post }) => post);

export function getTopicsByKind(kind: ExploreTopicKind) {
  return exploreTopics.filter((topic) => topic.kind === kind);
}

export function searchTopics(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return exploreTopics;
  return exploreTopics.filter((topic) => {
    const haystack = [topic.label, ...(topic.aliases ?? [])].join(" ").toLowerCase();
    return haystack.includes(normalized);
  });
}

function normalizeSearchText(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

function diseaseSearchWords(disease: DiseaseCatalogEntry) {
  return [disease.displayName, ...(disease.aliases ?? [])].map(normalizeSearchText);
}

export const diagnosisPendingSelection: PatientDiseaseSelection = {
  selectedDiseaseName: null,
  selectedDiseaseId: "diagnosis_pending",
  selectionMethod: "status",
  templateKey: "general",
  diagnosisStatus: "pending",
};

export function searchDiseases(query: string): DiseaseSearchResult {
  const normalized = normalizeSearchText(query);

  if (!normalized) {
    return {
      matches: diseaseCatalog.filter((disease) => disease.featured).slice(0, 14),
      exactMatch: null,
      freeTextSelection: null,
      pendingSelection: diagnosisPendingSelection,
    };
  }

  const matches = diseaseCatalog.filter((disease) =>
    diseaseSearchWords(disease).some((word) => word.includes(normalized) || normalized.includes(word)),
  );
  const exactMatch = matches.find((disease) => diseaseSearchWords(disease).some((word) => word === normalized)) ?? null;

  return {
    matches,
    exactMatch,
    freeTextSelection: exactMatch
      ? null
      : {
          selectedDiseaseName: query.trim(),
          selectedDiseaseId: null,
          selectionMethod: "free_text",
          templateKey: "general",
          diagnosisStatus: "diagnosed",
          rawInput: query.trim(),
        },
    pendingSelection: diagnosisPendingSelection,
  };
}

function roomsToTopics(roomIds: string[], fallbackTone: RoomTone = "default"): ExploreTopic[] {
  return roomIds
    .map((roomId) => mockRooms.find((room) => room.id === roomId))
    .filter((room): room is NonNullable<typeof room> => Boolean(room))
    .map((room) => ({
      id: room.id,
      label: room.name,
      kind: room.kind === "disease" ? "condition" : room.kind === "symptom" ? "symptom" : "concern",
      tone: room.tone ?? fallbackTone,
      roomHref: `/rooms/${room.id}`,
    }));
}

export function getDiseaseGuideTopics(disease: DiseaseCatalogEntry) {
  return roomsToTopics([disease.roomId, ...(disease.relatedRoomIds ?? [])].filter(Boolean) as string[], disease.tone);
}

export function getFreeTextDiseaseGuideTopics() {
  return roomsToTopics(["room-before-diagnosis", "room-treatment", "room-family-talk", "room-night-anxiety"]);
}

export function getDiagnosisPendingGuideTopics() {
  return roomsToTopics(["room-before-diagnosis", "room-before-visit", "room-fatigue", "room-night-anxiety"]);
}
