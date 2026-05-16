# mockups/ — 「よりそい つながる」静的HTMLモック

2026-05-16 初版作成（5/18 20:00 冨澤さんMTG用）

## 使い方

```
index.html をブラウザで開く
```

→ 全画面に遷移できます。実機（スマホ）サイズ想定で `max-width: 480px` の枠内にレイアウトされます。

## 画面構成（10画面）

| # | ファイル | 画面名 | GRAVITYでの対応 |
|---|---|---|---|
| 00 | `index.html` | モックインデックス | (この説明ページ) |
| 01 | `onboarding.html` | はじめまして | オンボーディング |
| 02 | `home.html` | おうち（タイムライン） | 宇宙（ホーム） |
| 03 | `voice-received.html` | そっと届く声 | 流れ星受信 |
| 04 | `post.html` | こえを置く | 投稿 |
| 05 | `stroll.html` | おさんぽ | みつける（探索） |
| 06 | `neighbor-search.html` | となりさがし | 心友ノック（性格マッチ） |
| 07 | `profile.html` | わたし | プロフィール |
| 08 | `notifications.html` | おたより | 通知 |
| 09 | `settings.html` | いろいろ | 設定 |

## 設計の元ネタ

- `../docs/design-system-gravity.md` — GRAVITYのデザインシステム言語化
- `../docs/design-system-tsunagaru.md` — 医療版へのデザイン翻訳（カラー変数・コンポーネント仕様）

## ファイル構造

```
mockups/
├── index.html                      ← この説明ページ＝モックインデックス
├── *.html                          ← 各画面（9枚）
├── README.md                       ← このファイル
└── assets/
    ├── css/
    │   ├── style.css               ← CSS Variables・グローバル・タイポ・ナビ
    │   └── components.css          ← ボタン・カード・モーダル・入力等
    ├── js/
    │   ├── icons.js                ← SVGアイコン辞書（data-icon属性で参照）
    │   └── main.js                 ← bottom sheet・トースト・セグメント
    ├── icons/                      ← (現状未使用・将来用)
    └── images/                     ← (現状未使用・CodexCLI生成画像をここに)
```

## カラー・コンポーネントの確認

すべて CSS Variables で定義済み。`assets/css/style.css` の `:root` を参照：

- ピーチ系：`--peach-50` 〜 `--peach-700`
- 抹茶クリーム系：`--matcha-50` 〜 `--matcha-600`
- ラベンダー系：`--lavender-100` 〜 `--lavender-600`
- マスタード：`--mustard-400`（特別な通知のみ）
- テキスト：`--text-primary`（暖グレー・黒は使わない）

## 画像差し替えについて

現状はマスコットを **絵文字（🐰🐻🐱🐦）** で代用しています。
本物のキャラクター画像は CodexCLI で生成中（`../prompts/02-05` 参照）。
生成完了後は `assets/images/mascot-moka.png` などを各 HTML に `<img>` で差し込む予定。

差し込み箇所の例：
- `onboarding.html` の `.onb-mascot` の中
- `home.html` の各 `.avatar` の中
- `voice-received.html` の `.vr-hero__bird`
- `stroll.html` の `.stroll-hero__cat`
- `notifications.html` の `.otayori-hero__bird`

## 動作確認

- Chrome / Edge / Safari の最新版で動作確認
- モバイル幅（375px〜480px）想定
- デスクトップで開くと「縦長スマホ枠 + 周囲に背景グラデーション」になります（モックレビュー用デザイン）

## ライセンス・注意

- このモックは社内検討用です。プロダクション利用前にアクセシビリティ（コントラスト比・ARIA・キーボード操作）の追加実装が必要です。
- フォント（Zen Maru Gothic 等）は実環境にあれば適用、なければシステムフォントにフォールバック。
