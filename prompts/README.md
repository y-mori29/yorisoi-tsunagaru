# CodexCLI 画像生成プロンプト（canvas）

`/codex-image-gen` スキル（Codex CLI 内蔵 image_gen / GPT-Image-2）で画像生成する際の元プロンプトを置く場所。

## 運用

1. ここに `NN-<topic>-<variant>.md` 形式で構造化プロンプトmdを書く
2. Codex に投げて `../assets/images/` に PNG を出力
3. 生成結果を `../assets/images/_review.md` に並べて評価
4. 失敗パターンは `_lessons-learned.md` に蓄積し Avoid セクションに追記

## 制作優先順（明日5/16 MTG向け）

| # | アセット | ファイル名 | 用途 |
|---|---|---|---|
| 1 | キービジュアル（コンセプトイメージ） | `01-keyvisual-canvas-mood.md` | アプリ紹介・MTG提示・LP用 |
| 2 | キャラクター候補3案 | `02-character-rabbit.md` `03-character-bear.md` `04-character-cat.md` | 水先案内人キャラの方向性議論用 |
| 3 | アプリアイコン候補3案 | `05-app-icon-a.md` `06-app-icon-b.md` `07-app-icon-c.md` | iOS/Androidアイコン |
| 4 | ムードボード（朝・夜） | `08-mood-morning.md` `09-mood-night.md` | 世界観確認 |
| 5 | オンボーディング挿絵 | `10-onboarding-*.md` | アプリ初回起動時 |

## 共通NGリスト（全プロンプト共通でAvoidに入れる）

- medical, hospital, clinic, clinical, sterile
- syringe, IV drip, stethoscope, white coat, chart paper
- red cross, ambulance, prescription pad
- sharp lines, neon colors, glitch, 3D render, photorealism
- corporate, stock-photo style
- combat / fight / battle metaphors (闘病メタファー禁止)
- before/after composition
- young female face close-up（誤解を生むため）

## 共通スタイルリスト（全プロンプト共通でstyle_tagsに入れる）

- warm, soft, gentle
- watercolor, hand-drawn, slightly imperfect lines
- pastel palette (peach, matcha cream, dusty lavender)
- generous negative space
- low-contrast, airy
- storybook illustration
- Ghibli-inspired background warmth
