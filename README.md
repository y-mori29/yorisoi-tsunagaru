# よりそい つながる

メディキャンバス案件の新規プロダクト。「**ただ、いていい**」場をつくる、病気を抱える方のための静かなコミュニティアプリ。

> 既存の `medicanvas/yorisoi/patient/yorisoi-phr/` とは別プロダクト。コードベース・GitHub リポジトリも分けています。

---

## クイックスタート（他の方が動かす場合）

前提：**Node.js 22 系**、**pnpm 10 系** が入っていること。

```bash
git clone https://github.com/y-mori29/yorisoi-tsunagaru.git
cd yorisoi-tsunagaru/frontend
pnpm install
pnpm dev
```

→ ブラウザで `http://localhost:3000` を開く。
モバイル幅（max-width 480px）想定なので、Chrome DevTools の **iPhone 14 Pro モード** で見るのが推奨です。

### 確認できる画面（10 ルート）

| Route | 画面 |
|---|---|
| `/onboarding` | ようこそ → 目的選択 → 病気/症状 → 暮らしのリズム → 考え方の癖 → 姿（アバター）→ 準備完了（全 7 ステップ）|
| `/home` | ホーム（「今日のひとこと」+ タイムライン）|
| `/post` | ことばを置く（公開範囲・ルーム選択あり）|
| `/find` | お隣さがし（3 つの質問に答えて候補表示）|
| `/stroll` | めぐる（今日 散歩中の お隣さん）|
| `/voice/[id]` | そっと届く声（手紙形式・例: `/voice/nt-001`）|
| `/notifications` | お便り（24時間で消える通知）|
| `/me` | プロフィール（姿・タグ・暮らしの傾向・置いたことば）|
| `/settings` | 設定（おまもりのしくみ・通知・記録 など）|
| `/` | `/onboarding` と同じ（welcome）|

---

## リポジトリ構成

```
yorisoi-tsunagaru/
├── frontend/        ← 本実装（Next.js 16 + React 19 + TS + Tailwind v4）
│                       他の方が動かすのは ここだけ で OK
├── archive/         ← 設計・モック・画像生成プロンプトなど 経緯資料
│   ├── docs/        ← コンセプト・デザインシステム・MTG議事録・トーン規範
│   ├── mockups/     ← v1/v2 の HTML モック（実装の参考）
│   ├── prompts/     ← 画像生成プロンプトと出力（output_v02/ が 9 画面の視覚スペック）
│   ├── assets/      ← 初期のマスコット・ヒーロー画像
│   ├── frontend-codex-prompts/    ← frontend 用に生成した動物アバター・ヒーロー線画のプロンプト
│   └── frontend-reference-images/ ← output_v02 を frontend に焼き直す際の参照画像
└── README.md        ← このファイル
```

`archive/` 配下は **過去の検討経緯** であり、現在の実装は `frontend/` だけで完結します。
frontend の詳細（ディレクトリ構成・設計トークン・トーン規範）は [`frontend/README.md`](frontend/README.md) を参照。

---

## コンセプト

- **コミュニティ × 患者記録のハイブリッド**：グラビティ風の優しい SNS で気軽につながりながら、診察・薬・体調が「気づけば残っている」状態をつくる
- **「ただ、いていい」**：入り口で症状を語らせない／患者を「しんどい人」とラベリングしない／カウンセラー型の迎え方
- **24 時間で消えるお便り**：通知に追われない、静かな滞在感
- **動物アバターと手書き線画**：MUJI／暮しの手帖トーン、セピア線画＋水彩のにじみ

設計の背景は `archive/docs/concept.md`・`archive/docs/value-proposition.md`・`archive/docs/tone-reset-2026-05-17.md` を参照。

---

## 技術スタック

| 項目 | 採用 |
|---|---|
| フレームワーク | Next.js 16.2.6（App Router・Turbopack） |
| UI | React 19.2 + TypeScript 5.9（strict） |
| スタイル | Tailwind CSS v4（`@theme` ベース）+ CSS 変数 |
| 状態管理 | React Context（オンボーディングのみ） |
| フォント | システムフォント（Yu Gothic / Yu Mincho）— Web フォント未使用 |
| アイコン | インライン SVG 辞書（`lib/icons.ts`） |
| パッケージ管理 | pnpm 10 |
| API | モック実装のみ（`lib/mock/` 配下）— 将来 REST/GraphQL に差し替え可能な型契約 |

---

## 注意事項

- このリポジトリは UI/UX のモックアップ段階で、**実バックエンドや認証は未実装**です
- ユーザーデータはすべてモック（`lib/mock/`）。実患者データは含みません
- 動物アバター・ヒーロー線画は Codex CLI（GPT-Image-2）で生成した素材
- 商用利用・転載・二次配布は行わないでください

---

担当: 森 祐哉（@y-mori29）／ medicanvas
