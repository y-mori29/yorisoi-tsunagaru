---
title: そっと届く声 — 完成スクリーンショット風モックアップ
category: screen-mockup
output: assets/screens/04-voice-received.png
size: 1170 × 2532
aspect: 9:19.5
style_tags: [ios-app-screenshot, mobile-ui, editorial, muji-aesthetic, muted-earth-tones, intimate-letter-feel]
forbidden: [cartoon, children-book, saturated, neon, generic-notification-UI]
intent: 誰かから声が届いた瞬間の画面。手紙を受け取った静かな喜びを演出。
---

# Subject

A high-fidelity iOS mockup of the "**そっと届く声**" screen — the moment
the user opens a quietly delivered message from another user.

This screen feels like opening a handwritten letter on a quiet morning.
Intimate, calm, no urgency.

# Screen layout

## 1. iOS Status Bar — same as other screens

## 2. App Header (~112px)
- Left: back arrow icon (thin sepia, 22px)
- Center: title "**そっと届く声**" in Yu Gothic Medium 17px
- Right: empty (or three-dot menu, faint sepia)
- Background: cream paper, subtle border line

## 3. Hero illustration (top, ~360px tall) — LINE DRAWING

A **hand-drawn editorial line illustration** (sepia ink #7E5A40, 1.5pt
stroke, round caps, very subtle cream watercolor wash inside, paper grain
visible). Same artistic hand as the app's icons and animal avatars — the
entire app reads as drawn by one person.

**Subject**: A simple folded letter (envelope-style fold) with one small
wax seal in the center, lying gently on a wooden surface (the wood is
suggested with a few minimal grain lines, not detailed). Beside the letter,
a single sprig of dried lavender (line drawing, sepia ink, very faint
moss-green wash inside the leaves). Nothing else in the scene.

**Absolute prohibitions for hero**:
- NO photograph, NO photorealistic shading, NO drop shadow on objects
- NO people, NO hands holding the letter
- NO ribbons or decorative flourishes beyond the single lavender sprig

Style references: 暮しの手帖 cover illustration, MUJI catalog still-life
illustration, Yumi Kitagishi quiet objects, Quentin Blake restrained line.

- Padding: 24px from sides
- Background of card: warm cream paper (#FAF6EE) with subtle paper grain
- Card containing the illustration: rounded 24px corners, soft shadow
  underneath very subtle (offset y:6px, blur 18px, opacity 5%)

## 4. Eyebrow text (below illustration)
- "**ある お隣さんから**" in Yu Gothic 11px, sepia (#7E5A40),
  letter-spacing wide
- Centered

## 5. Letter card (the main content, ~520px tall)
- White-cream card background (#FFFDF8)
- Left border: 3px solid plum-200 (#BAACBC) — like an accent stripe
- Rounded corners (18px) except left border
- Padding: 28px

Inside the card:
- Small label at top-left: "**届いた声**" in Yu Gothic Medium 11px,
  plum-600 (#6A5C6E), letter-spacing wide
- Timer at top-right: "**あと 21時間**" in Inter 11px, faint #A39B96

- Main letter body (Yu Mincho serif, 17px, line-height 2.0, color #2A2622):
  "**最近、ちゃんと眠れていますか。**
  ***( blank line )***
  **わたしは、あまり眠れなくて、**
  **夜中に、天井をぼんやり見つめていました。**
  ***( blank line )***
  **同じような方は、いますか。**"

- Bottom-left small detail: a tiny **turtle line-icon avatar** inside a
  cream circle (28px), with "**あるお隣さん**" in 12px gray (#7A7068)
- Bottom: dashed thin separator line (very subtle)

- Two action buttons (full-width row, gap 10px):
  - Left: "**そっと閉じる**" — secondary button (cream BG, sepia text,
    thin border, pill, font 14px, padding 13px)
  - Right: "**そっと返す**" — primary button (terra-500 BG, white text,
    pill, font 14px, padding 13px)

## 6. Reply section (below the letter, ~360px)
- Subtle top margin (28px)
- Section title: small icon (leaf) + "**返事を書く**" in Yu Gothic Medium 14px
- Text input area (cream BG #F3EDE2, rounded 12px, padding 14px, min-height 90px):
  Placeholder in faint gray: "**言葉が出なくても、大丈夫です。**
  **スタンプだけでも、ちゃんと届きます。**"

- Below the input: row of 5 small reaction chips
  (line icons + text like home screen):
  そう / わかる / 読んだよ / 気にかけてる / ありがとう

- Below reactions: "**そっと届ける**" button (full-width terra-500 pill)

## 7. Bottom Nav (~96px)
- Same as home screen, but **お知らせ tab is active** (terra-700 color)

## 8. iPhone home indicator

# Composition
- Hero illustration at top sets the mood (received-a-letter feeling).
- Letter card is the visual center of gravity.
- Reply section below is calm and accessible but secondary.

# Color palette
- Strong lavender/plum accents (this screen uses plum more than others
  because the "received voice" feature uses plum branding)
- Otherwise same cream / terra / moss / sepia palette

# Typography
- Letter body: **Yu Mincho** 17px (serif) — gives the letter a handwritten,
  thoughtful feel
- Other text: Yu Gothic Medium / Regular

# Style references
- Real apps: Day One Journal entry view, Quill diary apps
- AVOID: generic notification screens, popup-style modals,
  instant messaging apps

# Avoid
- Speech bubbles or chat-like UI (this is a letter, not a chat)
- Heart icons, romantic letter aesthetics (this is friendship/peer support,
  not romance)
- Generic envelope icons
- Cluttered metadata (only the timer and "あるお隣さん" are shown)

---

# 日本語End note

**意図**: GRAVITYの「流れ星」を医療版に翻訳した画面。**手紙を受け取った瞬間**の静かな喜びを再現する。本文を明朝体にすることで「手書きの手紙感」を出す。

**チェック**:
- [ ] 手紙のメタファーが伝わるか
- [ ] 本文が明朝体になっているか
- [ ] プラム系の色が「そっと届く声」の世界観として効いているか
- [ ] 「24時間で消える」緊急感より「ゆっくり読める」安心感が出ているか
