---
title: リアクションアイコン 5種（共感スタンプ）
category: icon
output: assets/icons/reaction-*.png
size: 512x512 each, transparent PNG
style: minimalist line icon, slightly softer / more organic than navigation
intent: 投稿への共感ボタン（そう / わかる / 読んだよ / 気にかけてる / ありがとう）
---

## 共通スタイル（毎回プロンプトに含める）

```
Style: minimalist line icon, thin line drawing,
1.6px stroke weight, rounded line caps and joins,
single warm sepia color (#7E5A40) for outline,
optional very subtle inner fill (10% opacity, same color) for character icons,
512x512 PNG with fully transparent background,
gentle hand-drawn feel (slight imperfection),
icon occupies central 70% of the canvas, perfectly centered,
Heroicons / Phosphor style.

NO emoji-style colors. NO bright fills. NO sparkles.
```

## アイコン 5種

### 1. reaction-acknowledge（そう / 共感）
**Output**: `assets/icons/reaction-acknowledge.png`

```
A simple line icon of a calm face: a circle (head outline),
two small dot eyes (filled), a small horizontal curve for a closed mouth (a slight smile).
Thin (1.6px), rounded caps, single sepia (#7E5A40),
transparent background, 512x512, centered.
Like a Phosphor "smiley" outlined icon — calm, not exuberant.
```

### 2. reaction-understand（わかる）
**Output**: `assets/icons/reaction-understand.png`

```
A simple line icon of an eye shape: an almond / leaf shape (two curves
meeting at points on the left and right), with a small circle in the center
(the iris, outline only, no fill).
Thin (1.6px), rounded caps and joins, single sepia (#7E5A40),
transparent background, 512x512, centered.
Heroicons "eye" outlined style.
```

### 3. reaction-acknowledged（読んだよ）
**Output**: `assets/icons/reaction-acknowledged.png`

```
A simple leaf icon: a teardrop shape with a single vein line down the center.
The leaf is oriented diagonally (lower-left to upper-right).
Thin (1.6px), rounded caps, single sepia (#7E5A40),
transparent background, 512x512, centered.
Simple botanical illustration style.
```

### 4. reaction-care（気にかけてる）
**Output**: `assets/icons/reaction-care.png`

```
A simple line icon of two hands gently cupping a small heart shape in the center.
The hands are simplified to two crescent / curved shapes from the lower-left
and lower-right, meeting under the heart. The heart is a simple small outline
shape (not filled).
Thin (1.6px), rounded caps and joins, single sepia (#7E5A40),
transparent background, 512x512, centered.
Phosphor "hands-praying" style, gentle and supportive.
```

### 5. reaction-thanks（ありがとう）
**Output**: `assets/icons/reaction-thanks.png`

```
A simple line icon of a small cup with rising steam:
a rectangular cup body with a small handle on the right side,
and 2-3 gentle wavy lines rising from the cup (steam).
Thin (1.6px), rounded line caps and joins, single sepia (#7E5A40),
transparent background, 512x512, centered.
The cup represents a small offering of tea — "thank you for being here."
Simple line style, NOT a coffee mug, NOT a martini glass.
```

---

## 生成後のチェック

- [ ] 5個のサイズ感が揃っているか
- [ ] 線幅 1.6px で統一されているか
- [ ] 透過 PNG か
- [ ] 表情系（acknowledge）が「過剰な笑顔」になっていないか
- [ ] 各アイコンが小さく（24px相当）表示しても判別できそうか
