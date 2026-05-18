# _shared-style-guide.md — 全プロンプト共通の絶対ルール

このファイルの内容を **すべての画像生成プロンプトで毎回意識** してください。
個別の md ファイルは、この共通ルールに **追加・上書き** する形で記述しています。

---

## 1. 絶対NGリスト（共通）

これらは **すべての画像生成で禁止**。プロンプトの Avoid セクションに必ず含めること。

### 医療要素
- 白衣・聴診器・カルテ・点滴・注射器・薬瓶
- 病院の建物・診察室・待合室
- 赤十字・救急車・救急隊

### 子供っぽさ
- 大きなアニメ目・キラキラハイライト
- 過剰な笑顔・歯を見せる笑い
- パステル原色（特に高彩度のピンク・水色）
- 絵本キャラ調（Sanrio・Disney・Pixar 3D）
- 角の丸すぎるバブルや吹き出し
- ハート・⭐︎・🌸 などの装飾シンボル

### 過剰演出
- 強い直射日光・ドラマチックなコントラスト
- 鮮やかなネオン色・グラデーション原色
- 3DCG レンダリング・写真風加工
- スパークル・キラキラ・パーティクル
- 「がんばろう」「諦めない」系の前向き誇張

### ジェネリック
- ストックフォト調・Adobe Stock 風
- Instagram フィルター加工
- コーポレートマスコット風
- 漫画的な吹き出し・効果線

---

## 2. 共通スタイル指示（全プロンプトで踏襲）

### Style tags（タグとして含める）
```
editorial, magazine-illustration, muted-earth-tones, hand-drawn,
subtle-watercolor, single-line-ink, adult-quiet, Kinfolk-aesthetic,
MUJI-catalog, Studio-Ghibli-quiet-moments, Japanese-essay-illustration
```

### Style references（毎回含める参考作品）
- **MUJI** Japanese catalog illustrations
- **Kinfolk** magazine photography & illustrations
- **Naoya Hatakeyama** photography（静かな日常）
- **Yumi Kitagishi** quiet animal illustrations
- **Hayao Miyazaki**'s restrained background sketches
- **Yoshitake Shinsuke** の最も大人寄りのトーン
- **Quentin Blake** at his most restrained
- **暮しの手帖** 表紙の挿絵

### Always AVOID（毎回必ず Avoid に含める）
```
anime style, manga, Sanrio, Pixar 3D, Disney, children's book cute,
saturated pastels, neon, pure white background, pure black ink,
sparkle highlights, big anime eyes, broad smile, exaggerated cuteness,
stock photography, Instagram aesthetic, corporate mascot,
medical equipment, hospital, clinical setting, white coats,
multiple subjects unless specified, watermarks, text, logos
```

---

## 3. 共通カラーパレット

すべての画像で **このパレット範囲内** に色を収めること。
範囲外（特に高彩度の青・赤・原色）は使わない。

```
# ベース
cream-paper          #FAF6EE
soft-cream           #F3EDE2
card-white           #FFFDF8

# テラコッタ系（プライマリ）
terra-light          #EFDCC9
terra-medium         #C99F7B
terra-deep           #A47556
terra-dark           #7E5A40

# モスグリーン系
moss-light           #DCE0C8
moss-medium          #A2AB7D
moss-deep            #757F55
moss-dark            #545C3C

# グレイッシュパープル系（夜・休息）
plum-light           #D8CFD9
plum-medium          #BAACBC
plum-deep            #8E7E92
plum-dark            #6A5C6E

# テキスト・線
ink-warm             #2A2622
ink-medium           #4F4843
ink-light            #7A7068
outline-sepia        #7E5A40  (線画の線色・1.5pt)
```

**禁止色**：
- 高彩度ピンク（#FF8FB5など）
- ピュアレッド（#FF0000系）
- 蛍光オレンジ・ライム
- ロイヤルブルー（#0040FFなど）
- ピュア白 #FFFFFF
- ピュア黒 #000000

---

## 4. 共通テクスチャ

すべての画像で **以下のテクスチャ感** を意識：

- **手描きの線**（1.5pt sepia ink、ラウンドキャップ）
- **わずかな水彩のにじみ**（線の内側で軽く層になる）
- **紙のグレイン**（背景に薄く）
- **完璧でない線**（少し震えた手描き感）
- **平塗りでない、淡い層構造**

---

## 5. 共通モード

「**静かなカフェ・大人の安らぎ・整った診療所の待合室**」を毎回イメージ。

避けるべき気分：
- 元気いっぱい
- 物語的（「冒険」「闘い」）
- ロマンチック
- 神秘的・スピリチュアル
- 童話的・夢っぽい

目指す気分：
- **平日の朝、誰もいない図書館の隅**
- **古い喫茶店で一人静かに座っている時間**
- **梅雨の合間の、静かな1時間**

---

## 6. 共通構図ガイド

- **必ず余白を取る**（被写体の周囲 20%以上）
- 中心からわずかに外して配置（三分割法）
- 上から見下ろさない（カメラは被写体と同じ高さ）
- 過剰な背景説明をしない（被写体に集中）

---

## 7. プロンプト統一テンプレ

各 md は以下のセクションを必ず含む：

```yaml
---
title: <名前>
category: mascot / hero / still-life / empty-state / icon
output: assets/images/<filename>.png
size: 1024x1024（または用途に応じて）
style_tags: [上記 §2 の Style tags を必ず含む]
forbidden: [上記 §1 + §2 の Always AVOID を必ず含む]
intent: <この画像の使いどころを日本語で1行>
---

# Subject
<被写体の詳細>

# Composition
<構図>

# Lighting
<光と影>

# Color palette
<§3 のパレット範囲で具体的に>

# Texture
<§4 のテクスチャ感を踏襲>

# Mood
<§5 のモードに沿って>

# Negative space
<余白の取り方>

# Style references
<§2 の Style references を必ず含む>

# Camera / Perspective
<カメラ位置と角度>

# Avoid
<§1 と §2 を必ず含む + 個別NG>

---

# 日本語End note
<意図と、生成後のチェック観点>
```
