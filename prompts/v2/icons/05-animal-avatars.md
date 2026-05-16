---
title: 動物アバター 8種（ユーザープリセット）
category: avatar
output: assets/icons/animal-*.png
size: 1024x1024 each, transparent PNG
style: minimalist animal portrait, line drawing with subtle wash
intent: オンボでユーザーが選ぶ動物プリセットアバター。8種類、すべて統一スタイルで描く。
---

## 共通スタイル（全8種で必ず守ること）

```
Style: minimalist editorial illustration of a small animal portrait,
hand-drawn line outline (1.8px) in warm sepia (#7E5A40),
with VERY subtle watercolor wash inside the outline
(only 2 colors max, each at 30-40% opacity),
hand-drawn paper quality (slight imperfection),
NOT a children's book character, NOT anime,
NOT a cute mascot, NOT a Sanrio character,
adult editorial illustration aesthetic (MUJI catalog / Kinfolk / 暮しの手帖),
1024x1024 PNG with fully transparent background,
the animal occupies the central 70% of the canvas (head-and-shoulders portrait),
centered, slightly 3/4 angle facing viewer,
calm closed-mouth expression, tiny dot eyes (NOT big anime eyes).
```

## 共通AVOID（毎回必ず）

```
big anime eyes, sparkle highlights, broad smile, exaggerated cute features,
clothing or accessories (no bows, no scarves, no glasses, no hats),
saturated pastels, neon colors, multi-color filling,
text or watermarks,
multiple animals in one image (ONE only),
photorealistic textures,
3D rendering, cartoon style, Disney/Pixar/Sanrio aesthetic,
backgrounds (must be transparent).
```

---

## 8キャラの個別指示

### 1. rabbit（うさぎ）
**Output**: `assets/icons/animal-rabbit.png`

```
A minimalist editorial portrait of a small rabbit (head and shoulders only,
3/4 angle facing viewer). Long, gently curved ears (one slightly forward,
one slightly back). Round soft face, small dot eyes, tiny soft mouth (closed).
Color wash inside outline: cream-beige body (#EFDCC9), pale pink-blush
inside ears (#E8C9C0, very low saturation).
Sepia outline (1.8px). Transparent background, 1024x1024, centered.
```

### 2. bear（くま）
**Output**: `assets/icons/animal-bear.png`

```
A minimalist editorial portrait of a small bear cub (head and shoulders, 3/4 angle).
Round head, small rounded ears on top, short snout with a small dot nose.
Tiny dot eyes (almost closed, drowsy), small simple mouth (closed).
Color wash: warm cream-beige body (#DCD2C0), slightly darker around the snout (#A88A6E).
Sepia outline (1.8px). Transparent background, 1024x1024, centered.
NOT aggressive, NOT roaring, NOT showing teeth.
```

### 3. cat（猫）
**Output**: `assets/icons/animal-cat.png`

```
A minimalist editorial portrait of a small cat (head and shoulders, 3/4 angle).
Triangular pointed ears on top, slim face shape, half-closed almond eyes
(calm and slightly aloof), small triangular nose.
Color wash: muted moss-cream body (#DCE0C8), darker moss tips on ears (#A2AB7D).
Sepia outline (1.8px). Transparent background, 1024x1024, centered.
NOT a kitten with big eyes, NOT a Hello Kitty style cat — quiet adult cat.
```

### 4. bird（小鳥）
**Output**: `assets/icons/animal-bird.png`

```
A minimalist editorial portrait of a small round bird (sparrow or finch style,
generic small songbird, 3/4 angle facing viewer).
Round body, small round head, small pointed beak, tiny dot eyes.
Color wash: muted lavender-gray body (#D8CFD9), slightly darker plum wing
hints (#A89BA8).
Sepia outline (1.8px). Transparent background, 1024x1024, centered.
NOT a parrot, NOT a colorful tropical bird — modest songbird.
```

### 5. hedgehog（ハリネズミ）
**Output**: `assets/icons/animal-hedgehog.png`

```
A minimalist editorial portrait of a small hedgehog (head and shoulder area, 3/4 angle).
Small pointed nose, tiny dot eyes, round body covered with small line marks
suggesting soft spines (NOT sharp, NOT spiky — drawn as gentle short lines).
Small rounded ears barely visible.
Color wash: warm beige body (#D6C8B2), slightly darker brown for spines hints (#A88A6E).
Sepia outline (1.8px). Transparent background, 1024x1024, centered.
```

### 6. fox（きつね）
**Output**: `assets/icons/animal-fox.png`

```
A minimalist editorial portrait of a small fox (head and shoulders, 3/4 angle).
Triangular pointed ears (slightly larger than cat's), narrow face tapering
to a small pointed nose, tiny calm dot eyes.
Color wash: muted terracotta body (#C99F7B), cream chest/cheek areas (#EFDCC9),
slightly darker brown for ear tips (#A47556).
Sepia outline (1.8px). Transparent background, 1024x1024, centered.
NOT cunning, NOT a Disney fox — calm and quiet.
```

### 7. owl（ふくろう）
**Output**: `assets/icons/animal-owl.png`

```
A minimalist editorial portrait of a small owl (head and upper body, frontal).
Round body, large round eye area (but eyes themselves are small dots — NOT
big anime eyes), small triangular beak, small ear tufts on top.
Color wash: muted plum-gray body (#BAACBC), slightly lighter chest (#D8CFD9),
small darker areas around the eyes (#8E7E92).
Sepia outline (1.8px). Transparent background, 1024x1024, centered.
NOT wise-old-wizard imagery, NOT spooky — quiet small owl.
```

### 8. turtle（かめ）
**Output**: `assets/icons/animal-turtle.png`

```
A minimalist editorial portrait of a small turtle (head and shell, 3/4 angle).
Small head emerging from a rounded shell, tiny dot eyes, small simple mouth (closed).
Shell with subtle hexagonal pattern (very faint lines, not dominant).
Color wash: muted moss-green shell (#9BA481), warm beige skin (#C9BAA4).
Sepia outline (1.8px). Transparent background, 1024x1024, centered.
NOT cartoonish, NOT a Ninja Turtle — quiet, contemplative small turtle.
```

---

## 統一感のためのチェック

8キャラを並べたときに：
- [ ] 線の太さ・色（sepia）が揃っているか
- [ ] 表情（calm closed mouth, dot eyes）が揃っているか
- [ ] サイズ感（キャンバス内占有率）が揃っているか
- [ ] 配色がアース系（テラコッタ・モス・プラム・ベージュ）の範囲内か
- [ ] 1つも anime / Sanrio / Disney に寄っていないか
- [ ] 背景が全て透過か
- [ ] 装飾物（リボン・帽子・眼鏡など）がついていないか

## 推奨：色のバリエーション

オンボの「アバター選択」画面では、同じ動物の色違いも用意するとユーザー選択肢が広がります。
例：
- うさぎ × cream / sand / sage / blush
- くま × beige / honey / mocha / cream

色違いを作るときは、上のプロンプトの「Color wash」の数値だけ変えて、他は同じスタイルで生成してください。
