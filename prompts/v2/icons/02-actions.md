---
title: アクションアイコン 13種
category: icon
output: assets/icons/action-*.png
size: 512x512 each, transparent PNG
style: minimalist line icon (see _icon-style-guide.md §2)
intent: 戻る・閉じる・メニュー・検索・ベル・チャット・画像・送信・ブックマーク・設定・シェブロン右・シェブロン下・チェック
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

## アイコン 13種

### 1. action-back（戻る）
**Output**: `assets/icons/action-back.png`
```
A simple left-pointing arrow (chevron-left shape):
a single angle bracket "<" formed by two thin lines meeting at a point on the left,
opening to the right. Rounded line caps and join.
Thin (1.5px), single sepia (#7E5A40), transparent background, 512x512, centered.
```

### 2. action-close（閉じる）
**Output**: `assets/icons/action-close.png`
```
A simple X shape: two diagonal lines crossing in the center,
each line equal length, rounded caps.
Thin (1.5px), single sepia (#7E5A40), transparent background, 512x512, centered.
```

### 3. action-more（メニュー / 3点）
**Output**: `assets/icons/action-more.png`
```
Three small horizontal dots in a row, evenly spaced, all the same size.
Each dot is a small filled circle (the only filled element among these icons),
single sepia color (#7E5A40). Transparent background, 512x512, horizontally centered.
```

### 4. action-search（検索）
**Output**: `assets/icons/action-search.png`
```
A magnifying glass icon: a circle with a thin diagonal handle line
extending from the lower-right of the circle outward.
Thin (1.5px), rounded line caps, single sepia (#7E5A40),
transparent background, 512x512, centered.
```

### 5. action-bell（通知ベル）
**Output**: `assets/icons/action-bell.png`
```
A simple bell silhouette: a rounded-top shape (like a dome) with a horizontal
line at the bottom and a tiny dot/clapper hanging just below the dome edge.
Thin (1.5px), rounded caps and joins, single sepia (#7E5A40),
transparent background, 512x512, centered.
Heroicons "bell" outlined style.
```

### 6. action-chat（コメント / 吹き出し）
**Output**: `assets/icons/action-chat.png`
```
A simple speech bubble: a rounded rectangle with a small triangular tail
extending downward from the lower-left.
Thin (1.5px), rounded corners, single sepia (#7E5A40),
transparent background, 512x512, centered.
```

### 7. action-image（画像 / 写真追加）
**Output**: `assets/icons/action-image.png`
```
A simple line icon: a rectangle frame (slightly rounded corners),
with a small circle in the upper-left (representing sun/moon)
and a triangular mountain shape in the lower portion.
Thin (1.5px), rounded line caps, single sepia (#7E5A40),
transparent background, 512x512, centered.
Heroicons "photo" outlined style.
```

### 8. action-send（送信）
**Output**: `assets/icons/action-send.png`
```
A simple paper airplane silhouette: a triangle shape pointing diagonally
to the upper-right, with one thin line dividing the body (showing the fold).
Thin (1.5px), rounded caps, single sepia (#7E5A40),
transparent background, 512x512, centered.
Heroicons "paper airplane" outlined style.
```

### 9. action-bookmark（ブックマーク・保存）
**Output**: `assets/icons/action-bookmark.png`
```
A simple bookmark silhouette: a vertical rectangle with a V-shaped notch
cut out of the bottom edge.
Thin (1.5px), rounded line caps and joins, single sepia (#7E5A40),
transparent background, 512x512, centered.
```

### 10. action-settings（設定）
**Output**: `assets/icons/action-settings.png`
```
A simple gear / cog icon: a circle in the center with 8 small notches
or teeth around the circumference, evenly spaced. Inside the circle,
a smaller concentric circle (representing the gear hole).
Thin (1.5px), rounded caps, single sepia (#7E5A40),
transparent background, 512x512, centered.
Heroicons "cog" outlined style.
```

### 11. action-chevron-right（>）
**Output**: `assets/icons/action-chevron-right.png`
```
A simple right-pointing chevron: two thin lines meeting at a point on the right,
opening to the left, forming a ">" shape. Rounded caps and joins.
Thin (1.5px), single sepia (#7E5A40), transparent background, 512x512, centered.
```

### 12. action-chevron-down（v）
**Output**: `assets/icons/action-chevron-down.png`
```
A simple down-pointing chevron: two thin lines meeting at a point at the bottom,
opening upward, forming a "v" shape. Rounded caps and joins.
Thin (1.5px), single sepia (#7E5A40), transparent background, 512x512, centered.
```

### 13. action-check（チェック）
**Output**: `assets/icons/action-check.png`
```
A simple checkmark: a short diagonal line going up-right from the lower-left,
meeting a longer diagonal line going up-right to the upper-right.
Rounded line caps and join.
Thin (1.8px — slightly thicker than other icons for confidence),
single sepia (#7E5A40), transparent background, 512x512, centered.
```

---

## 生成後のチェック

- [ ] 13個の線幅が同じか（check のみ若干太め）
- [ ] サイズ感（キャンバス占有率）が揃っているか
- [ ] 単色か
- [ ] 透過か
- [ ] 装飾（影・グラデ）が入っていないか
