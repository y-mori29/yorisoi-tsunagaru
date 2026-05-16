# prompts/v2/ — 画像生成プロンプト一式（v2・大人版）

`design-system-v2.md` のトーンに沿った、画像生成用プロンプトmd一式。
**森さん側で画面デザインを組みながら、必要な画像を選んで生成 → 配置** する想定。

## 使い方

1. 何を作るかを決める（マスコット／ヒーロー静物／空状態／アイコン）
2. 該当するmdを開く
3. プロンプト本文（英語の Subject 〜 Avoid）を生成ツール（Codex CLI / Gemini CLI / ChatGPT / Midjourney 等）にコピペ
4. 出力された画像を `assets/images/` 配下に配置

## 推奨ツール

| 種類 | 推奨 | 理由 |
|---|---|---|
| マスコット・ヒーロー静物 | **Codex CLI（GPT-Image-2）** or **Gemini Nano Banana 2** | 細部の描写・スタイル制御が安定 |
| 空状態イラスト | 同上 | |
| アイコン | **手描きSVG**（既存 `icons-v2.js` 流用） or 生成PNG（要 後処理） | UI用途は SVGが扱いやすい |
| 動物アバター | 個別生成PNG（透過） or 線画SVG | 顔の表現を統一しやすい |

## 共通の前提（毎回守ること）

→ `_shared-style-guide.md` を最初に読んで、各プロンプトに **共通指示** を踏襲してください。

## 命名規則

- 連番プレフィックス（01, 02...）で並びを固定
- ファイル名は kebab-case の英語
- 出力PNGは各 md の `output:` フィールドのパスへ

## カテゴリ一覧

### mascots/ — 公式マスコット 4種（v2トーン）

絵本キャラを廃止し、**編集系イラスト**寄り（MUJIカタログ・Kinfolk）に統一。
顔の表情は控えめ（小さな点目・閉口）。

- `01-moka-rabbit.md` — メイン・案内役
- `02-pao-bear.md` — 静かに隣にいる
- `03-sora-cat.md` — めぐる（探索）案内
- `04-fuu-bird.md` — お知らせ運び

### still-life/ — ヒーロー用静物画像 6枚

特定の画面に縛られない汎用の静物。**画面デザインに応じて自由に当てはめる**。

- `01-morning-window.md` — 朝の窓辺（茶器・布・葉）
- `02-afternoon-table.md` — 午後のテーブル（湯気のないカップ・本）
- `03-evening-shelf.md` — 夕方の本棚（本・カーテン）
- `04-night-light.md` — 夜の灯り（小さなランプ・ノート）
- `05-letter-on-wood.md` — 木目の上の封筒（お知らせ・そっと届く声に）
- `06-quiet-path.md` — 散歩道（小道・木漏れ日）

### empty-state/ — 空状態イラスト 3枚

「投稿なし」「お知らせなし」「検索結果なし」用。**静かで、寂しさを煽らない** イラスト。

- `01-no-voices.md` — まだ声がないとき
- `02-no-notifications.md` — お知らせがないとき
- `03-no-search-results.md` — 該当が見つからないとき

### icons/ — アイコンセット

UI で使う線画アイコン。**コンセプト＝1.5px細線・ラウンドキャップ・単色（currentColor）**。
共通指示は `_icon-style-guide.md` 参照。

- `01-navigation.md` — ナビ 5個
- `02-actions.md` — アクション 13個
- `03-reactions.md` — リアクション 5個
- `04-decorations.md` — 装飾 8個
- `animals/` — 動物アバター 8種（個別ファイル）

## 出力サイズの目安

| 用途 | サイズ | アスペクト比 |
|---|---|---|
| マスコット | 1024 × 1024 | 1:1 |
| ヒーロー（縦） | 1024 × 1280 | 4:5 |
| ヒーロー（横） | 1280 × 720 | 16:9 |
| 静物（汎用） | 1024 × 1024 | 1:1 |
| 空状態 | 1024 × 1024 | 1:1 |
| アイコン | 512 × 512（PNG）or SVG | 1:1 |
| 動物アバター | 1024 × 1024（透過） | 1:1 |

## 既存 v1 プロンプトとの関係

- `prompts/01-keyvisual-mood.md`（既存・v1）→ 参考。v2では基本不使用
- `prompts/02-mascot-moka-rabbit.md`（既存・v1）→ 子供っぽいので **使わない**
- `prompts/03-mascot-pao-bear.md` 他（v1）→ 同上、使わない
- `prompts/06-v2-mascot-moka.md`（既存・v2）→ `v2/mascots/01-moka-rabbit.md` と同内容
- `prompts/07-v2-hero-onboarding.md`（既存・v2）→ `v2/still-life/01-morning-window.md` と同内容
