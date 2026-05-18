---
title: めぐる（探索） — 完成スクリーンショット風モックアップ
category: screen-mockup
output: assets/screens/05-stroll.png
size: 1170 × 2532
aspect: 9:19.5
style_tags: [ios-app-screenshot, mobile-ui, editorial, muji-aesthetic, muted-earth-tones, exploration-mood]
forbidden: [cartoon, children-book, saturated, neon]
intent: 「めぐる」（探索）画面。気まぐれに他のお隣さんのページに迷い込む体験を表現。
---

# Subject

A high-fidelity iOS mockup of the "**めぐる**" (stroll / explore) screen.

The user can casually wander into other users' pages. The mood is **a quiet
walk through a small forest**, not aggressive social discovery.

# Screen layout

## 1. iOS Status Bar — standard

## 2. App Header (~112px)
- Center: "**めぐる**" in Yu Gothic Medium 17px
- Right: small search icon (thin sepia, 22px)
- Background: cream paper with subtle border

## 3. Hero illustration (~280px) — LINE DRAWING

A **hand-drawn editorial line illustration** (sepia ink #7E5A40, 1.5pt
stroke, round caps, subtle moss-green and cream watercolor wash inside,
paper grain visible). Same artistic hand as the app's icons and animal
avatars — the entire app reads as drawn by one person.

**Subject**: A small winding path that gently disappears into a few
simplified trees in the distance. The trees are minimal (3-5 trees total),
leaves suggested as soft cloud-like shapes rather than drawn in detail.
The path is suggested with two parallel gentle curves. Far in the
background (small, near the horizon), the silhouette of a tiny house with
a barely-visible warm light in its window.

**Absolute prohibitions for hero**:
- NO photograph, NO photorealistic rendering
- NO people, NO animals visible on the path
- NO detailed leaves or grass blades (must remain suggestion-level)
- NO dramatic light beams or god-rays

Style references: 暮しの手帖 cover illustration, Studio Ghibli quiet
background sketches, Yoshitake Shinsuke adult tone, Quentin Blake
landscape line drawings.

- Rounded corners (24px)
- Margin 24px from sides
- Background of card: warm cream paper (#FAF6EE) with subtle paper grain

## 4. Hero text block (centered below illustration, ~80px)
- Eyebrow: "**気の向くままに**" Yu Gothic Medium 11px, sepia, wide letter-spacing
- Main: "**お隣さんの場所へ**" Yu Mincho 22px, color #2A2622

## 5. First user card (~360px)
- Background: cream-white #FFFDF8, rounded 18px, soft shadow
- Margin 24px from sides
- Padding 0 (full-bleed cover image)

### Card structure:
- **Cover band** at top (~80px): subtle gradient (terra-100 → plum-100),
  with a few faint leaf icon decorations at low opacity
- **Avatar overlap**: a circular fox line-icon avatar (56px) on terra-100
  background, positioned half on the cover, half below
- **Main content** (padding 20px):
  - Name row: "**こもれび**" Yu Gothic Medium 16px,
    then small caption "SLE ルーム ・ 30代" in 12px gray
  - Bio (Yu Gothic 14px, line-height 1.85, #4F4843):
    "**苦手だった話も、ここでなら、少しずつ。**
    **音楽と、お茶の時間が、ずっと好きです。**"
  - Tag chips row (3 chips):
    "**同じ悩み**" / "**考え方近い**" / "**夜型**"
    (each: pill, soft cream BG, sepia text, 12px)
  - Subtle inset quote box (background #F3EDE2, padding 12px, rounded 8px):
    "**最近の声：**" small label, then
    "**体が重い日は、蟻を見ています。あの一所懸命さが好きです。**"
    in Yu Gothic 13px line-height 1.85
  - Two action buttons row (gap 10px):
    - "**お隣さんになる**" — secondary button (cream BG, sepia text, pill)
    - "**そらと次へ**" — moss button (moss-500 BG, cream text, pill)

## 6. Second user card (~320px)
- Same structure, but:
  - Avatar: turtle line-icon in plum-100 circle
  - Name: "**ゆっくり**", caption "クローン ルーム ・ 40代"
  - Bio: "**ゆっくり歩くのが、しっくりきます。家庭菜園と、葉書を書くこと。**"
  - Tags: "**ペース近い**" "**同じ薬**"
  - Quote: "**朝のお茶が、いちばん美味しいと気づきました。**"

## 7. Bottom Nav (~96px)
- Same 5 tabs, **めぐる tab is active** (terra-700)

## 8. iPhone home indicator

# Composition
- Hero illustration sets the "small walk" mood.
- User cards are spacious and personal, not list-y.
- Two cards visible above the bottom nav (scrollable for more).

# Color palette
- Standard v2 palette
- This screen uses **moss accents** more (the action button "そらと次へ"
  is moss green to differentiate from terra primary)

# Style references
- Real apps: Bumble's profile cards (but stripped of brightness),
  AirBnB host profile cards (but quieter)
- AVOID: dating app aggressive tinder-style, generic social discovery

# Avoid
- Tinder-style swipe gestures, swipe icons
- "Match!" celebrations or animations
- Photographic user avatars (must be illustrated line drawings)
- Excessive metadata (no follower counts, no "joined date")

---

# 日本語End note

**意図**: 「めぐる」は探索だが、出会い系のような攻撃性を排除し、**散歩のような穏やかさ**を出す。「そらと次へ」ボタンが気軽な遷移を示唆。

**チェック**:
- [ ] ヒーロー画像が小道の落ち着きを伝えるか
- [ ] ユーザーカードが温かく、急かさないか
- [ ] 「マッチ感」が過剰でないか（数値・スコアなし）
