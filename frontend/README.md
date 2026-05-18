# よりそい つながる — Frontend

Next.js 16 (App Router) + React 19.2 + TypeScript + Tailwind v4 で構築した、「よりそい つながる」アプリのフロントエンド。

設計起点ドキュメント（リポジトリ整理に伴い `archive/` 配下に移動済み）:
- `../archive/docs/tone-reset-2026-05-17.md` — トーン・原理（必読）
- `../archive/docs/design-system-v2.md` — デザインシステム
- `../archive/prompts/v2/screens/output_v02/*.png` — 全画面の視覚スペック（参考画像）

## 起動方法

```bash
cd frontend
pnpm install     # 初回のみ
pnpm dev         # http://localhost:3000
```

ブラウザでアクセスして、Chrome DevTools の iPhone 14 Pro モードで表示確認するのを推奨。

## ディレクトリ構成

```
frontend/
├── app/                       Next.js App Router
│   ├── layout.tsx             ルートレイアウト
│   ├── page.tsx               / (オンボーディング)
│   ├── globals.css            CSS変数 + @theme トークン
│   ├── home/                  /home
│   ├── post/                  /post
│   ├── voice/[id]/            /voice/:id
│   ├── stroll/                /stroll
│   ├── find/                  /find (お隣さがし)
│   ├── me/                    /me (プロフィール)
│   ├── notifications/         /notifications
│   └── settings/              /settings
├── components/
│   ├── layout/                MobileFrame, StatusBar, AppHeader, BottomNav 等
│   ├── ui/                    Button, Card, Avatar, Chip 等
│   └── screens/               画面固有ブロック
├── lib/
│   ├── api/                   TypeScript型 + モック実装
│   ├── mock/                  サンプルデータ
│   ├── context/               React Context（最小限）
│   └── design-tokens.ts       TypeScript化したトークン
├── public/
│   └── assets/
│       ├── animals/           動物アバター 8 種（Codex CLI で生成）
│       └── heroes/            ヒーロー線画 3 種（onboarding/voice/stroll）
└── package.json
```

## 設計トークン使い方

### Tailwind ユーティリティとして
```tsx
<div className="bg-paper text-ink-900 rounded-xl">
  <span className="bg-terra-50 text-terra-700">terra chip</span>
</div>
```

### CSS 変数として（インラインスタイル）
```tsx
<h1 style={{ fontFamily: "var(--font-mincho)", color: "var(--color-ink-900)" }}>
```

### 共通カスタムプロパティ
- `var(--shadow-card)` カード用シャドウ（控えめ）
- `var(--shadow-floating)` フローティング要素用
- `var(--ease-soft)` イージング（260ms）
- `var(--max-width)` モバイル最大幅（480px）
- `var(--nav-height)` ボトムナビ高さ（68px）
- `var(--safe-bottom)` iOS safe-area-inset-bottom

## トーンの絶対 NG

入り口・空状態・通知の文言で **以下の語は使わない**（`../archive/docs/tone-reset-2026-05-17.md` 参照）：

しんどい / つらい / 苦しい / 悲しい / 病気 / 病人 / 闘病 / 戦う / 戦士 / 弱い / 落ち込んだ / 「悩みを抱える」

代わりに：来てくれた / ここにいる / ゆっくり / そっと / ただ / おかえりなさい / ありがとう

## Phase 進捗

- [x] **Phase 0**: プロジェクト初期化、トークン適用、開発サーバー起動確認
- [x] **Phase 1**: レイアウト土台 + UI プリミティブ（18 種）
- [x] **Phase 2**: ホーム画面で精度確認
- [x] **Phase 3**: 残り 8 画面 + オンボーディング 7 画面実装
- [ ] **Phase 4**: ナビゲーション + ルーティング（一部済み）
- [ ] **Phase 5**: API スタブ整備（モックのみ・実 API 未接続）

## Next.js 16 補足

- `params` と `searchParams` は Promise なので `await` 必要
- Turbopack がデフォルト（明示不要）
- middleware → proxy にリネームされた（このプロジェクトでは未使用）
- 詳細: `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`
