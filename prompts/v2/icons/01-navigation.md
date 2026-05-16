---
title: ナビゲーションアイコン 5種
category: icon
output: assets/icons/nav-*.png
size: 512x512 each, transparent PNG
style: minimalist line icon (see _icon-style-guide.md §2)
intent: ボトムナビ5タブ（ホーム・めぐる・投稿・お知らせ・プロフィール）
---

## 共通スタイル（毎回プロンプトに含める）

```
Style: minimalist line icon, thin line drawing only,
1.5px stroke weight, rounded line caps and joins,
single warm sepia color (#7E5A40),
512x512 PNG with fully transparent background,
Heroicons / Lucide outlined style aesthetic,
NO fills, NO shadows, NO gradients, NO color, NO text,
icon occupies central 70% of the canvas, perfectly centered.
```

## アイコン 5種

### 1. nav-home（ホーム）

**Output**: `assets/icons/nav-home.png`

**Subject prompt**:
```
A simple minimalist line drawing of a house silhouette:
a triangular roof on top, a rectangular body below.
One small square window in the upper-center of the body.
A small door (rectangle with rounded top) in the lower-center.
All lines are thin (1.5px), rounded caps and joins, single sepia color (#7E5A40).
Transparent background. Icon occupies the central 70% of a 512x512 canvas.
Heroicons / Lucide outlined style.
```

### 2. nav-stroll（めぐる・探索）

**Output**: `assets/icons/nav-stroll.png`

**Subject prompt**:
```
A simple minimalist line icon: a circle in the center,
with three gentle curved arc lines emanating outward in different
directions (suggesting paths radiating). Inside the circle, a small
dot or footprint hint.
Thin lines (1.5px), rounded caps, single sepia color (#7E5A40).
Transparent background, 512x512, centered.
Heroicons / Lucide outlined style — NOT a magnifying glass,
NOT a compass, NOT a map.
```

### 3. nav-plus（投稿・声を残す）

**Output**: `assets/icons/nav-plus.png`

**Subject prompt**:
```
A simple thin plus sign (+) icon: two perpendicular lines crossing
in the center, both lines equal length, rounded line caps.
Thin (1.5px), single sepia color (#7E5A40).
Transparent background, 512x512, centered.
Minimal Heroicons / Lucide style. No frame, no circle around the plus.
```

### 4. nav-mail（お知らせ）

**Output**: `assets/icons/nav-mail.png`

**Subject prompt**:
```
A minimalist line drawing of an envelope:
a horizontal rectangle, with a triangular flap drawn on top
(creating a 'V' shape from the top center down to the lower corners).
Slightly rounded corners.
Thin (1.5px), rounded caps and joins, single sepia color (#7E5A40).
Transparent background, 512x512, centered.
Heroicons outlined style.
```

### 5. nav-profile（プロフィール・わたし）

**Output**: `assets/icons/nav-profile.png`

**Subject prompt**:
```
A minimalist line drawing of a person silhouette:
a small circle on top (head), and a soft U-shape below
(shoulders and torso, like a half-oval curve).
Thin (1.5px), rounded caps and joins, single sepia color (#7E5A40).
Transparent background, 512x512, centered.
Heroicons outlined "user" style — simple, no facial features.
```

---

## 生成後のチェック

- [ ] 5つの線幅が同じか
- [ ] 5つの全体サイズ感（占有面積）が揃っているか
- [ ] 単色（#7E5A40）か
- [ ] 背景が完全透過か
- [ ] フィル（塗り）が入っていないか
