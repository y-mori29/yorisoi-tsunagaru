# よりそい つながる 病名・症状・不安・部屋 データ設計

作成日: 2026-06-23
対象: `medicanvas/yorisoi-tsunagaru`

## 目的

病気・症状・不安・部屋が固定リストに見えてしまう問題を解消する。

患者さんには、自分の病名や症状で入りやすくする。

メディキャンバス側には、実際にどんな病気・症状・不安を持つ人が使っているかをデータとして残せるようにする。

## 設計の結論

病名、症状、不安、部屋、テンプレートを分けて扱う。

```text
患者さんが入力・選択したこと
  ├─ 病名
  ├─ 症状
  └─ 不安・暮らしの悩み

アプリ側で使うもの
  ├─ 表示用ラベル
  ├─ 検索用カタログ
  ├─ 部屋への案内
  └─ 汎用テンプレート
```

重要なのは、病名と部屋を1対1にしないこと。

病名が入力されたからといって、必ず専用部屋がある必要はない。

ただし、病名と部屋を分けることは、病名を選ばなくてよいという意味ではない。

コミュニティに参加する人は、部屋の有無に関係なく、自分の病気・症状・不安を選べる必要がある。

理由:

- 自分に近い声を出すため。
- 同じような人とつながるため。
- 投稿や反応の文脈を作るため。
- メディキャンバス側が、実際にどんな病気・症状・不安の方が来ているかを把握するため。

つまり、次の2つを分けて考える。

```text
探すための選択
  └─ 登録前でも使える。読むための入口。

自分の状態としての選択
  └─ 登録後・オンボーディング・プロフィールで保持する。つながりの土台。
```

## 用語定義

### Disease

患者さんが選ぶ・入力する病名。

例:

- 潰瘍性大腸炎
- クローン病
- ベーチェット病
- ファブリー病
- 乳がん
- 病名がまだ分からない

### Symptom

病名が分からなくても選べる症状。

例:

- 腹痛
- 強い疲れ
- 眠れない夜
- しびれ
- 息切れ
- 皮膚症状

### Concern

病気や症状に関係して起きる暮らしの不安。

例:

- 診断前・検査待ち
- 仕事との両立
- 家族に話す
- 医療費のこと
- 治療の不安
- 孤独・ひとりの時間

### Room

近い声をまとめて読む場所。

Room は Disease / Symptom / Concern のどれかに紐づくが、病名と完全一致しなくてよい。

### Template

アプリ側で使う汎用体験テンプレート。

病名そのものではなく、質問、投稿補助、初期表示、注意文などを少し変えるための内部分類。

## 全体データモデル

### DiseaseCatalogEntry

病気候補のマスター。

```ts
type DiseaseCatalogEntry = {
  id: string;
  displayName: string;
  aliases: string[];
  kana?: string;
  category: DiseaseCategory;
  templateKey: TemplateKey;
  featured?: boolean;
  roomId?: string;
  externalRefs?: {
    nanbyoId?: string;
    cancerTypeId?: string;
    icd10?: string;
    icd11?: string;
  };
};
```

### DiseaseCategory

```ts
type DiseaseCategory =
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
```

### TemplateKey

```ts
type TemplateKey =
  | "general"
  | "ibd"
  | "cancer"
  | "autoimmune"
  | "neurology";
```

最初は `general` を中心にする。

病気ごとにテンプレートを作り込みすぎない。

### PatientDiseaseSelection

患者さんが実際に選んだ/入力した病名。

```ts
type PatientDiseaseSelection = {
  selectedDiseaseName: string | null;
  selectedDiseaseId: string | null;
  selectionMethod: "catalog" | "free_text" | "status";
  templateKey: TemplateKey;
  diagnosisStatus: "diagnosed" | "suspected" | "pending" | "unknown";
  rawInput?: string;
  matchedAliases?: string[];
  createdAt: string;
};
```

例: 候補から選んだ場合

```json
{
  "selectedDiseaseName": "潰瘍性大腸炎",
  "selectedDiseaseId": "uc",
  "selectionMethod": "catalog",
  "templateKey": "ibd",
  "diagnosisStatus": "diagnosed",
  "createdAt": "2026-06-23T00:00:00+09:00"
}
```

例: 自由入力の場合

```json
{
  "selectedDiseaseName": "ベーチェット病",
  "selectedDiseaseId": null,
  "selectionMethod": "free_text",
  "templateKey": "general",
  "diagnosisStatus": "diagnosed",
  "rawInput": "ベーチェット病",
  "createdAt": "2026-06-23T00:00:00+09:00"
}
```

例: まだ診断名が決まっていない場合

```json
{
  "selectedDiseaseName": null,
  "selectedDiseaseId": "diagnosis_pending",
  "selectionMethod": "status",
  "templateKey": "general",
  "diagnosisStatus": "pending",
  "createdAt": "2026-06-23T00:00:00+09:00"
}
```

## 症状・不安のデータモデル

### TopicCatalogEntry

症状と不安は、病名よりもゆるく扱う。

```ts
type TopicCatalogEntry = {
  id: string;
  kind: "symptom" | "concern";
  displayName: string;
  aliases: string[];
  featured?: boolean;
  roomId?: string;
};
```

### PatientTopicSelection

```ts
type PatientTopicSelection = {
  topicName: string;
  topicId: string | null;
  kind: "symptom" | "concern";
  selectionMethod: "catalog" | "free_text";
  rawInput?: string;
};
```

症状や不安も、候補にない言葉を入力できる余地を残す。

ただし、病名ほど前面に自由入力を出しすぎない。

## 自分の状態として保持するデータ

病名・症状・不安は、単に検索するだけでなく、ユーザー自身の状態として保存する。

これを、部屋参加とは別に持つ。

### MemberHealthContext

```ts
type MemberHealthContext = {
  userId: string;
  primaryDisease: PatientDiseaseSelection | null;
  secondaryDiseases: PatientDiseaseSelection[];
  symptoms: PatientTopicSelection[];
  concerns: PatientTopicSelection[];
  diagnosisStatus: "diagnosed" | "suspected" | "pending" | "unknown";
  visibility: "private" | "room_members" | "matched_members";
  updatedAt: string;
};
```

### 重要な考え方

`MemberHealthContext` は、本人のプロフィール全体ではない。

「近い声を出す」「近い人とつながる」「投稿に文脈を付ける」ための最低限の状態。

保存するもの:

- 主な病名
- ほかに気になる病名
- 症状
- 不安・暮らしの悩み
- 診断前・疑い・診断済みなどの状態

保存しない、または最初は聞かないもの:

- 詳細な病歴
- 治療歴の細かい内容
- 検査値
- 医療機関名
- 本名や個人が特定される情報

### 例: 専用部屋がある病名

```json
{
  "userId": "u-001",
  "primaryDisease": {
    "selectedDiseaseName": "潰瘍性大腸炎",
    "selectedDiseaseId": "uc",
    "selectionMethod": "catalog",
    "templateKey": "ibd",
    "diagnosisStatus": "diagnosed",
    "createdAt": "2026-06-23T00:00:00+09:00"
  },
  "symptoms": [
    {
      "topicName": "下痢・便のトラブル",
      "topicId": "diarrhea",
      "kind": "symptom",
      "selectionMethod": "catalog"
    }
  ],
  "concerns": [
    {
      "topicName": "仕事との両立",
      "topicId": "work",
      "kind": "concern",
      "selectionMethod": "catalog"
    }
  ],
  "diagnosisStatus": "diagnosed",
  "visibility": "matched_members",
  "updatedAt": "2026-06-23T00:00:00+09:00"
}
```

### 例: 専用部屋がない病名

```json
{
  "userId": "u-002",
  "primaryDisease": {
    "selectedDiseaseName": "アラジール症候群",
    "selectedDiseaseId": null,
    "selectionMethod": "free_text",
    "templateKey": "general",
    "diagnosisStatus": "diagnosed",
    "rawInput": "アラジール症候群",
    "createdAt": "2026-06-23T00:00:00+09:00"
  },
  "symptoms": [],
  "concerns": [
    {
      "topicName": "家族に話す",
      "topicId": "family",
      "kind": "concern",
      "selectionMethod": "catalog"
    }
  ],
  "diagnosisStatus": "diagnosed",
  "visibility": "matched_members",
  "updatedAt": "2026-06-23T00:00:00+09:00"
}
```

この場合、`アラジール症候群の部屋` がなくても、本人の主な病名としては保存される。

部屋案内は別で、近い症状・不安・診断前・家族の部屋などへ案内する。

## Room の設計

### RoomCatalogEntry

```ts
type RoomCatalogEntry = {
  id: string;
  name: string;
  kind: "disease" | "symptom" | "concern" | "treatment";
  description: string;
  templateKey?: TemplateKey;
  linkedDiseaseIds?: string[];
  linkedSymptomIds?: string[];
  linkedConcernIds?: string[];
  fallbackFor?: Array<"unknown_disease" | "free_text_disease" | "diagnosis_pending">;
  visibleInExplore: boolean;
  featured?: boolean;
};
```

### 部屋の種類

| 種類 | 例 | 役割 |
|---|---|---|
| 病名部屋 | 潰瘍性大腸炎、クローン病、SLE | 参加者が多い病気の近い声を読む |
| 症状部屋 | 腹痛、強い疲れ、眠れない夜 | 病名がなくても入れる |
| 不安・暮らし部屋 | 診断前、仕事との両立、家族に話す | 病気を問わず共通する悩みを扱う |
| 汎用受け皿 | 病名について話す、診断前・検査待ち | 専用部屋がない時に案内する |

## 病名選択のUX

病気選択画面では、最初に検索を置く。

```text
病名を入力して探す
[ 病名・疑い病名を入力 ]
```

その下に、よく選ばれる病気を表示する。

```text
よく選ばれる病気
潰瘍性大腸炎 / クローン病 / 関節リウマチ / SLE / 1型糖尿病
```

さらに、診断前の入口を明確にする。

```text
まだ診断名が決まっていない
検査中・疑い病名・診療科だけ分かっている方はこちら
```

### 検索結果

候補に一致した場合:

```text
潰瘍性大腸炎
UC
```

候補にない場合:

```text
「ベーチェット病」で始める
```

候補に近いものがある場合:

```text
もしかして
ベーチェット病
ベーチェット症候群
```

### 画面状態

病名検索は、次の状態を用意する。

| 状態 | 画面に出すもの | 意図 |
|---|---|---|
| 未入力 | 検索欄、よく選ばれる病気、診断前カード | 探し始める前に迷わせない |
| 入力中 | 一致候補、近い候補、症状・不安の候補 | 病名が曖昧でも離脱させない |
| 完全一致 | 病名候補、近い部屋、関連する症状 | すぐ読める場所へつなぐ |
| 候補なし | 「この病名で始める」、近い症状・不安、診断前カード | リストにない病気でも受け止める |
| 診断前 | 検査待ち、疑い病名、症状、不安から探す導線 | 病名がなくても入れる |

特に重要なのは、候補なしの状態で「見つかりませんでした」で終わらせないこと。

```text
「ベーチェット病」で始める
この病名の専用部屋がまだなくても、近い症状や不安の声を読めます。
```

### 選択アクション

検索結果には、読むための導線だけでなく、自分の状態として選ぶ導線が必要。

例:

```text
潰瘍性大腸炎
[自分の病気として選ぶ] [この部屋を読む]
```

候補にない場合:

```text
「アラジール症候群」で始める
[自分の病気として選ぶ]
近い部屋も見られます
```

この時点で部屋があるかどうかは関係ない。

先に `primaryDisease` として保存し、その後に近い部屋へ案内する。

## 選択後の案内

病名を選んだ後に、必ず専用部屋へ行かせない。

選択後にやることは2つある。

1. 自分の状態として保存する。
2. 近い部屋、近い声、近い人へ案内する。

### 専用部屋がある場合

```text
潰瘍性大腸炎を、自分の病気として選びました
近い声を読めます
→ 潰瘍性大腸炎の部屋
```

### 専用部屋がない場合

```text
「アラジール症候群」を、自分の病気として選びました
近い症状や不安の部屋も見られます
→ 診断名・病名について話す部屋
→ 家族に話すことの部屋
→ 治療の不安の部屋
```

この方が、病名が少数派でも孤立しにくい。

## 画面ごとの使い方

### `/find`

主な役割:

- 病名、症状、不安から探す。
- 自由入力病名を受け止める。
- 専用部屋がない場合も近い部屋へ案内する。
- 登録後は、検索結果を自分の状態として保存できる。

必要な変更:

- 病気セクション上部に検索欄を置く。
- 完全一致しない場合に「この病名で始める」を出す。
- 「まだ診断名が決まっていない」を独立カードにする。
- 登録済みなら「自分の病気として選ぶ」を出す。
- 未登録なら、選択しようとしたタイミングで登録導線へつなぐ。

### `/onboarding/condition`

主な役割:

- 初回に、自分の病名・症状・不安を選ぶ。
- ここで選んだ内容が、近い声・近い人・部屋案内の土台になる。

必要な変更:

- 「病気や症状は？」ではなく「気になることはありますか？」に近づける。
- 病名検索を上に置く。
- 症状・不安は別カテゴリとして選ぶ。
- 個人情報ではなく、近い声を出すための任意入力として見せる。
- ただし、コミュニティにつながるための大事な設定であることは伝える。

推奨文言:

```text
あなたに近い声を届けるために、病気・症状・不安を選んでください。
病名がまだ決まっていなくても大丈夫です。
```

### `/me` / `/settings`

主な役割:

- 後から自分の病気・症状・不安を変更できる。
- 公開範囲を選べる。

必要な変更:

- `自分の病気・症状・不安` の設定セクションを作る。
- 病名はあとから追加・変更できる。
- 自由入力病名も保持する。
- 「近い人に見える」「自分だけ」「部屋参加者にだけ」など公開範囲を選べる。

### `/rooms`

主な役割:

- 近い部屋を探す。

必要な変更:

- 病名部屋だけを増やしすぎない。
- 症状部屋、不安・暮らし部屋を同等に扱う。
- 「専用部屋がなくても近い声を読める」ことを見せる。

### `/post`

主な役割:

- 投稿/体験談に、病名・症状・不安を紐づける。

必要な変更:

- 投稿本文と別に、任意で病名・症状・不安タグを持てるようにする。
- 自由入力病名を、投稿にも残せるようにする。
- 公開範囲とトピック紐づけを分ける。

## 初期カタログ案

最初から大量の病名を手入力する必要はない。

初期は次の3層でよい。

### 1. よく選ばれる病気

- 潰瘍性大腸炎
- クローン病
- 関節リウマチ
- 全身性エリテマトーデス
- 1型糖尿病
- ベーチェット病
- 多発性硬化症
- パーキンソン病
- ファブリー病
- 乳がん
- 血液がん

### 2. 代表的な症状

- 腹痛
- 下痢・便のトラブル
- 強い疲れ
- 痛み
- しびれ
- 眠れない夜
- 皮膚症状
- 息切れ
- 吐き気
- めまい

### 3. 代表的な不安

- 診断前・検査待ち
- 治療の不安
- 医療費のこと
- 仕事との両立
- 学校との両立
- 家族に話す
- 将来のこと
- 孤独・ひとりの時間
- 患者会に行く前

## 将来拡張

将来は、外部マスターと接続できるようにする。

候補:

- 難病情報センターの病名
- 小児慢性特定疾病
- がん種分類
- ICD-10 / ICD-11
- MedDRA

ただし、最初から外部マスターに依存しない。

最初は、自由入力を保存できることが重要。

## 実装ステップ案

### Step 1: データ分離

- `diseaseCatalog`
- `topicCatalog`
- `roomCatalog`
- `templateCatalog`

を分ける。

### Step 2: 検索ロジック

- 完全一致
- alias一致
- 部分一致
- 自由入力
- 診断前

を返せるようにする。

### Step 3: `/find` の病気検索UI

- 病名検索を上部へ移動。
- よく選ばれる病気。
- 自由入力で始める。
- 診断前カード。
- 登録後は「自分の病気として選ぶ」を表示。
- 未登録時は「選ぶには登録」へつなぐ。

### Step 4: `/onboarding/condition` の再設計

- コミュニティにつながる土台として分かりやすくする。
- 病名・症状・不安を分ける。
- 自由入力病名、診断前、症状、不安を選べるようにする。
- 個人情報ではなく、近い声・近い人のための設定として扱う。

### Step 5: 投稿・部屋への反映

- 投稿に選択病名・症状・不安を紐づける。
- 専用部屋がない病名でも投稿できる。
- 近い部屋へ案内できる。

### Step 6: 自分の状態設定

- `MemberHealthContext` を作る。
- オンボーディングで選んだ病名・症状・不安を保存する。
- `/me` または `/settings` から編集できるようにする。
- 近い人、近い投稿、部屋推薦に使う。

### Step 7: つながりの使い方

- 同じ病名の人。
- 同じ症状の人。
- 同じ不安を持つ人。
- 診断前・検査待ちの人。
- 病名は違うが、近い症状や不安を持つ人。

を出し分ける。

これにより、部屋がない病気でも「誰ともつながれない」状態を避ける。

## 最初の実装単位

最初から全画面を作り直さない。

まずは、次の小さな単位で進めるのがよい。

1. `diseaseCatalog` と `roomCatalog` を分ける。
2. `/find` の病気セクションだけ検索・自由入力・診断前に対応する。
3. 選択結果として、専用部屋または近い部屋への案内を表示する。
4. `MemberHealthContext` を追加し、自分の病気・症状・不安として保存できるようにする。
5. `/onboarding/condition` で最初に選べるようにする。
6. `/me` または `/settings` で後から変更できるようにする。
7. `/post` と `/rooms` に同じデータ構造を広げる。

この順番にすると、見た目の変化と裏側のデータ設計を同時に確認できる。

逆に、最初からオンボーディング全体や設定画面まで広げると、どこが価値改善だったのか分かりにくくなる。

## 実装メモ

2026-06-23 時点で、最初の実装単位として `/find` に反映した。

- `diseaseCatalog` を追加し、病名候補を `ExploreTopic` とは別に扱えるようにした。
- `searchDiseases` を追加し、候補一致、完全一致、自由入力、診断前を返せるようにした。
- `/find` の検索時に、候補病名、`「入力した病名」で始める`、診断前カード、近い部屋案内を表示するようにした。
- 候補なしでも `近いテーマが見つかりませんでした。` で終わらないようにした。

次は、このデータ構造を `/onboarding/condition` に広げる。

ただし、森さん確認により、単に「探す」だけでは足りない。

次の改善では、`自分の病気・症状・不安として選択済みにする` ことを中心に置く。

優先順:

1. `MemberHealthContext` の型とモック保存を追加する。
2. `/onboarding/condition` を「自分に近い声を届けるための設定」に作り直す。
3. `/find` の検索結果に「自分の病気として選ぶ」を追加する。
4. `/me` または `/settings` に「自分の病気・症状・不安」を編集する入口を作る。
5. その選択状態を、近い声・近い人・部屋推薦に使う。

## 判断ポイント

実装前に確認したいこと:

- 自由入力病名を、どの画面で主病名として保存するか。
- 自由入力病名で「部屋ができた」ように見せるか、本人の選択状態として保存して近い部屋へ案内するか。
- 診断前を病名カテゴリ内に置くか、独立カードにするか。
- 病名・症状・不安の公開範囲をどう選ばせるか。
- 自分の病気を複数持つ人をどう扱うか。
- 病名データをどの粒度でメディキャンバス側が集計したいか。
- 将来、病名マスターをどの外部データと接続するか。
