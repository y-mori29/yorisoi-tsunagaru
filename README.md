# よりそい つながる

病気や症状のことを身近な人には話しにくいとき、自分に近い体験を読み、気持ちを残し、必要なときだけつながれるコミュニティアプリです。

SNSの盛り上がりを目的にするのではなく、同じ病名・症状・治療・暮らしの悩みを持つ人の声から、「自分だけではない」と思えるきっかけをつくります。読むだけでも利用でき、投稿や交流は自分のペースで始められます。

- 公開画面: <https://tsunagaru-frontend-450637239907.asia-northeast1.run.app>
- フロントエンド: Next.js 16 / React 19 / TypeScript
- 実行基盤: Google Cloud Run
- 認証: Firebase Authentication（メールアドレス・Googleアカウント）

> このサービスは、診断・治療の判断や緊急相談を行うものではありません。投稿は個人の体験や気持ちとして扱います。

## 現在の体験

### 登録しなくてもできること

- ホームの「新着」「近い声」から体験談を読む
- 病気・症状・暮らしや不安から近い声を探す
- テーマごとに、同じ状況の体験談を読む
- 投稿本文を書く
- 届け先と公開範囲を選ぶ
- 他の人からの見え方をプレビューする

### 登録後にできること

- 声を公開する、または自分だけに保存する
- 投稿へ反応する、あとで読むために保存する
- 1対1の「お便り」でゆっくり話す
- マイページで自分の投稿や設定を見直す

公開直前までは登録なしで試せます。投稿の本文・届け先・プレビュー内容はブラウザに下書きとして残り、登録後に投稿画面へ戻れます。

## 体験談データ

許諾済みの「うちあけ」体験談1,930件を、ホーム、検索、テーマ、投稿詳細で利用しています。

- データ: `frontend/lib/data/uchiake-posts.json`、`frontend/lib/data/uchiake-stories.json`
- ホームの「新着」は、最近の180件を訪問ごとに入れ替える
- 最初に表示する12件は、同じ投稿者やテーマに偏りすぎないよう調整する
- 病名だけでなく、症状、治療、仕事、家族、通院前などから検索できる

体験談は「人が多く見える演出」ではなく、自分に近い経験が存在することを知るための情報として扱います。

## 主な画面

| ルート | 役割 | 登録前 |
|---|---|---|
| `/` | `/home` へ移動 | 可 |
| `/home` | 新着・近い声を読む | 可 |
| `/find` | 病気・症状・暮らしや不安から探す | 可 |
| `/rooms` | テーマ一覧 | 可 |
| `/rooms/[id]` | テーマごとの体験談 | 可 |
| `/voice/[id]` | 体験談の詳細 | 可 |
| `/post` | 書く・届け先選択・プレビュー | プレビューまで可 |
| `/auth/register` | メール・Googleアカウントで登録 | 可 |
| `/auth/login` | ログイン | 可 |
| `/notifications` | 1対1のお便りとお知らせ | 登録後の利用を想定 |
| `/messages/[id]` | お便りの会話 | 登録後の利用を想定 |
| `/me` | 投稿・保存・安心設定の入口 | 登録後 |
| `/settings` | 公開範囲や通知などの設定 | 登録後 |
| `/onboarding` | 近い声を届けるための任意設定 | 可 |

`/home-v2`、`/record`、`/look-back`、`/share` などは、記録機能との接続を検討する並行ルートです。現在のコミュニティ入口は `/home` を本線としています。

## ローカル起動

前提:

- Node.js 22系
- pnpm 10.13.1

```bash
git clone https://github.com/y-mori29/yorisoi-tsunagaru.git
cd yorisoi-tsunagaru/frontend
pnpm install
pnpm dev
```

ブラウザで <http://localhost:3000> を開きます。画面は最大幅480pxのモバイル表示を基準にしているため、Chrome DevToolsなどでスマートフォン幅を確認してください。

### 確認コマンド

```bash
cd frontend
pnpm lint
pnpm build
```

## 認証と環境変数

Cloud RunではFirebase Authenticationを利用し、メールアドレスとGoogleアカウントで登録・ログインできます。

ローカルでは `secure/.env` を自動で読み込みます。Firebase設定がない場合は、画面確認用のローカル認証へフォールバックします。機密情報は `secure/` または環境変数で管理し、リポジトリへコミットしません。

主な環境変数:

- `FIREBASE_API_KEY`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_APP_ID`（任意）
- `FIREBASE_MESSAGING_SENDER_ID`（任意）
- `FIREBASE_STORAGE_BUCKET`（任意）
- `GEMINI_API_KEY`（返信・リアクション・コメント候補を使う場合）

## 現在のデータ実装と制約

- Firebaseはアカウント登録とログインに使用しています。
- うちあけ体験談は、リポジトリ内のJSONデータから表示します。
- 投稿下書き、オンボーディング設定、一部のセッション情報はブラウザの `localStorage` に保存します。
- 新規投稿、保存、会話、通知、プロフィールの永続化は、現在もモックまたはブラウザ内の状態を含みます。
- 返信・リアクション・コメント候補のAPIは、`GEMINI_API_KEY` がある環境でGoogle GenAIを利用します。

本番運用向けの投稿・会話データベース、通報・モデレーション、監査、削除フローは今後の実装範囲です。

## リポジトリ構成

```text
yorisoi-tsunagaru/
├── frontend/   Next.jsの本実装、Cloud Run用Dockerfile
├── docs/       現行の要件、画面整理、認証記録、デザイン資料
├── tools/      うちあけ体験談の抽出・整形パイプライン
├── prompts/    画像・UI素材の制作プロンプト
├── archive/    過去のモック、設計、検討経緯
├── secure/     ローカルの機密設定（Git対象外）
└── README.md
```

実装の中心は `frontend/` です。`archive/` は過去の検討経緯であり、現行仕様の正本ではありません。

## 技術スタック

| 項目 | 採用 |
|---|---|
| フレームワーク | Next.js 16.2.6（App Router・standalone出力） |
| UI | React 19.2.4 / TypeScript 5（strict） |
| スタイル | Tailwind CSS v4 + CSS変数 |
| 認証 | Firebase Authentication |
| AI補助 | Google GenAI（サーバー側API） |
| データ | うちあけJSON + モックデータ + localStorage |
| パッケージ管理 | pnpm 10.13.1 |
| 実行環境 | Node.js 22 / Google Cloud Run |

## 関連ドキュメント

- `docs/community-product-restructure-principles-20260623.md` — コミュニティ再設計の原則
- `docs/community-topic-data-design-20260623.md` — 病気・症状・悩み・テーマのデータ設計
- `docs/community-screen-feature-map-20260623.md` — 画面と機能の整理
- `docs/tsunagaru-google-auth-setup-20260623.md` — Firebase / Googleログインの設定記録
- `tools/uchiake-pipeline/EXTRACTION_SPEC.md` — うちあけ体験談の抽出仕様
