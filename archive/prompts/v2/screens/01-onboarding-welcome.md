---
title: オンボーディング ようこそ画面 — 完成スクリーンショット風モックアップ（v3 線画ヒーロー版）
category: screen-mockup
output: assets/screens/01-onboarding-welcome.png
size: 1170 × 2532（iPhone 14 Pro）
aspect: 9:19.5
style_tags: [ios-app-screenshot, mobile-ui, editorial, muji-aesthetic, line-illustration, single-line-ink, hand-drawn, adult-quiet]
forbidden: [cartoon, children-book, saturated, neon, generic-template, AI-text-garbage, illness-labeling, staged-still-life-photo, abstract-gradient-only, photorealistic-hero]
intent: アプリ起動直後のようこそ画面。ヒーローを線画イラスト（暮しの手帖の挿絵調）にして、アイコン・動物アバターと世界観を一貫させる。
related_design_doc: docs/tone-reset-2026-05-17.md
revision_note: |
  v1（窓辺の静物・写真風）→ 演出された広告写真感で却下
  v2（夜明けの抽象グラデのみ）→ 温度がない・空白に見えて却下
  v3（線画イラスト）→ アイコン・動物アバターと同じ「sepia inkの手描き」で世界観統一
---

# Subject

A high-fidelity iOS mobile app screenshot mockup for "よりそい つながる".
The first onboarding screen.

The hero image is a **hand-drawn editorial line illustration** (NOT a photo,
NOT an abstract gradient) — using the same sepia ink + subtle watercolor wash
aesthetic as the app's icons and animal avatars. This unifies the entire
visual language of the app.

The screen MUST NOT label the user as "sick", "struggling", or "suffering".
Instead, the screen thanks them for arriving and tells them they don't have
to do anything.

# Screen layout (top to bottom)

## 1. iOS Status Bar
- Time: **9:41** in SF Pro semibold, color #2A2622
- Right: signal bars (3/4), WiFi, battery (~60%)
- Background: cream paper (#FAF6EE)

## 2. Top right "スキップ" link
- Position: top-right corner, padding 16px
- Text: "**スキップ**" in Yu Gothic 12px, faint gray (#A39B96)
- No box, just text

## 3. Hero — LINE ILLUSTRATION (large, top half, ~45% of screen height)

**A hand-drawn editorial line illustration**, rendered in **sepia ink line
drawing** (stroke 1.5pt, warm sepia #7E5A40, round caps) with **very subtle
watercolor wash** inside the lines. Paper grain visible. Hand-drawn imperfection
(slightly trembling lines, not vector-perfect). The same artistic hand that
draws the app's animal avatars and bottom nav icons.

**Subject**:

> **A single soft floor cushion (zabuton, square, rounded corners) placed
> quietly on a wooden floor. Beside the cushion, a small low table (chabudai
> style) holding ONE simple ceramic teacup (no steam, no liquid shown). On the
> floor to the right of the cushion, a small closed book resting flat. Nothing
> else in the scene — just the prepared space, waiting.**

**Wordless message**: "Your seat has been prepared. Take your time. Stay as
long or as briefly as you want. No one will fuss."

**Absolute prohibitions in the hero**:
- NO person. NO face. NO hand. NO foot. NO body part. NO silhouette of human.
- NO window. NO curtain. NO landscape outside.
- NO medical / clinical items.
- NO photo. NO photorealistic rendering. NO 3D.
- NO pure abstract gradient (already tried, too empty).
- NO posed editorial photograph (already tried, too commercial).

**Style specs (CRITICAL)**:
- Line: sepia ink (#7E5A40), 1.5pt stroke, round caps, hand-drawn imperfection
- Wash: very pale, restrained — cream + faint terra inside cushion (#F3EDE2 / #EFDCC9),
  faint moss for the book (#DCE0C8), faint plum for the teacup (#D8CFD9)
- Background inside the card: warm cream paper (#FAF6EE) — paper grain visible
- NO photographic textures. NO 3D shading. NO drop shadows on the illustration objects.
- Reference works: 暮しの手帖 表紙挿絵 / MUJI catalog illustration / Yumi Kitagishi
  quiet still-life / Yoshitake Shinsuke adult-tone / Quentin Blake restrained
- Card containing the illustration: rounded 28px corners, margin 28px sides,
  ~24px from top, aspect ratio 4:5

## 4. Eyebrow text (below the hero)
- "**ようこそ**" in Yu Gothic Medium 11px, warm sepia (#7E5A40),
  letter-spacing very wide (0.24em), centered

## 5. Main title (Yu Mincho serif)
- "**よりそい つながる**" in Yu Mincho 30px Regular,
  color #2A2622, letter-spacing wide (0.08em), centered, padding-top 14px

## 6. Description text (Yu Gothic body)

Centered, color #4F4843, font 15px, line-height 1.95. Content (verbatim):

> "**ここまで、来てくださって、**
> **ありがとうございます。**
> ***( one blank line )***
> **何もしなくて、大丈夫です。**
> **ただ、いてください。**"

**Absolute prohibitions in body text**: NO "しんどさ", "病気", "つらさ",
"悩み", "苦しみ", "弱い", "闘病", "悲しい", "抱える".

## 7. Bottom area (fixed at bottom, ~140px)
- Top border (subtle #ECE2D2), padding 24px

### 7a. Progress dots
- 3 small dots, gap 8px, margin-bottom 20px
- First: filled rectangle 22×6 rounded, terra-500 (#A47556)
- Others: 6px circles, gray (#D6C8B2)

### 7b. CTA button
- Full-width terracotta pill (terra-500 #A47556)
- Text: "**そっと、開く**" Yu Gothic Medium 16px cream (#FAF6EE), letter-spacing 0.06em
- Padding 16px, rounded 999px, no shadow

## 8. iPhone home indicator (thin black bar)

# Composition

- Vertical iPhone screen (9:19.5)
- Line illustration dominates upper half
- Text content in lower-middle
- Single CTA at bottom
- Generous breathing room

# Color palette (strict)

- Background: cream paper #FAF6EE
- Illustration line: sepia #7E5A40
- Illustration washes: cream #F3EDE2, terra-light #EFDCC9, moss-light #DCE0C8, plum-light #D8CFD9
- Text primary: #2A2622
- Text secondary: #4F4843
- Text faint: #A39B96
- Eyebrow sepia: #7E5A40
- Primary terracotta: #A47556 (button only)

# Typography

- Welcome eyebrow: Yu Gothic Medium 11px, letter-spacing 0.24em
- Main title: Yu Mincho 30px Regular, letter-spacing 0.08em
- Description: Yu Gothic 15px, line-height 1.95
- Button: Yu Gothic Medium 16px
- Skip: Yu Gothic 12px

# Style references (for the line illustration)

- **暮しの手帖** magazine cover and inside-page illustrations
- **MUJI** Japanese catalog illustrations (interior / still-life series)
- **Yumi Kitagishi** quiet illustrations
- **Yoshitake Shinsuke** at his most adult tone (NOT children's book mode)
- **Quentin Blake** restrained line drawings
- **Naoko Stoop** quiet domestic scenes
- **Hayao Miyazaki**'s background sketch quality
- AVOID: Children's picture book art, Sanrio, Disney, Pixar 3D, anime,
  generic stock illustration, vector flat illustration, isometric design,
  Notion-style corporate editorial illustrations

# Avoid (strict)

- **Body text**: ANY illness-labeling words
- **Hero**: Photo / photorealistic rendering — must be hand-drawn line
- **Hero**: People, faces, hands, feet, body parts
- **Hero**: Anime / manga / Pixar 3D style
- **Hero**: Pure abstract gradient (already tried v2, too empty)
- **Hero**: Staged still-life photography (already tried v1, too commercial)
- **Hero**: Windows, curtains, landscapes outside (would re-trigger rejection)
- **Hero**: Medical equipment, hospital iconography
- **Colors**: Bright pinks, neon, saturated colors
- **Emoji**: ✨🌸🍃 decorations
- **CTA**: "Get started", "始めましょう", "登録する"

---

# 日本語End note

**意図**: アイコンとアバターで使っている線画スタイル（sepia ink + 控えめな水彩）を、ヒーロー画像に格上げ。世界観を貫く。ユーザーを「しんどい人」と一切定義せず、「来てくれた」事実だけに感謝する文言。

**経緯**: v1（静物写真）と v2（抽象グラデ）はどちらも却下された。v3 は **編集系の線画イラスト** で、暮しの手帖の挿絵のような温かみを目指す。

**チェック**:
- [ ] ヒーローが「写真」ではなく「線画」になっているか
- [ ] 線色が sepia (#7E5A40)・線幅 1.5pt 程度の手描き感か
- [ ] 内側の塗りが過剰でない（控えめな水彩 wash）か
- [ ] 人物・手足・顔・窓が一切写っていないか
- [ ] アイコン・動物アバターと「同じ手の人が描いた」感じか
- [ ] 本文に「しんどさ」「病気」等のラベル語がないか
- [ ] CTA が「そっと、開く」になっているか

**ヒーロー主題の代替案（A〜E のうち A を採用、B〜E は森さんが差し替えたい場合）**:

| 案 | 主題 | ニュアンス |
|---|---|---|
| **A** ← 採用 | 座布団 + 低い小卓 + 一杯のお茶 + 一冊の本 | 「あなたの席が用意されている」 |
| B | 玄関のスリッパ一足 + 小さな折り畳まれた羽織 | 「靴を脱いでお入りください」 |
| C | 庭に灯る小さな行灯（あんどん） | 「灯りはついています、いつでも」 |
| D | 二つの寄り添うような有機的形（座布団二枚 or 小石二つ） | 「並んでいるだけで、いい」 |
| E | 木のベンチ + 折り畳まれたブランケット | 「いつでも休めるように」 |

**ユーザー側のチェック・調整ポイント**:
- ヒーロー主題（A〜E どれを採用するか）
- 「ようこそ」を「おかえりなさい」に変える案あり
- スキップリンクは残すか削除するか
- ボタン文言代替案：「そっと、開く」「中に入る」「ここに、いる」「→」のみ
- 設計起点ドキュメント: `docs/tone-reset-2026-05-17.md`
