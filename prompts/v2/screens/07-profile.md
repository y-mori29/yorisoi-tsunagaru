---
title: プロフィール — 完成スクリーンショット風モックアップ
category: screen-mockup
output: assets/screens/07-profile.png
size: 1170 × 2532
aspect: 9:19.5
style_tags: [ios-app-screenshot, mobile-ui, editorial, muji-aesthetic, personal-space, muted-earth-tones]
forbidden: [cartoon, children-book, saturated, neon, follower-count-prominent]
intent: 自分のプロフィール画面。声の履歴・性格バッジ・所属ルーム。数値で競わせない。
---

# Subject

A high-fidelity iOS mockup of the user's profile screen "**プロフィール**".

This is the user's own page. The vibe is **a small personal shelf in
a quiet room** — your belongings are here, but no one is judging or
counting them.

# Screen layout

## 1. iOS Status Bar — standard

## 2. App Header (~112px)
- Center: "**プロフィール**" Yu Gothic Medium 17px
- Right: gear/settings icon (thin sepia, 22px) → goes to settings
- Background: cream paper

## 3. Cover band (~160px)
- Hero-style background image: **a soft watercolor wash of warm earth tones**
  (terra → moss → plum gradient with subtle natural patterns)
- No text overlay
- Bottom corners are rounded into the next section (24px radius)

## 4. Avatar + name section (~180px)
- Avatar: large circular rabbit line-icon (100px) on terra-50 background,
  positioned overlapping the cover band (top -50px), with a 4px cream-paper
  border around the avatar (gives it a "framed" feel)
- Below avatar (left-aligned, padding 24px):
  - Name: "**もり**" Yu Gothic Medium 22px, color #2A2622
  - Handle: "**@mori_29**" Inter 13px, faint gray #A39B96
  - Bio (Yu Gothic 14px, line-height 1.85, #4F4843):
    "**ゆっくりだけれど、確かに生きていきたい。**
    **朝のお茶が、好きです。**"
  - Tag chips row (3 chips, gap 6px):
    "**🏠 UC ルーム**" (terra chip)
    "**🌙 夜型**" (cream chip)
    "**📖 読む派**" (plum chip)
    NOTE: emoji are part of the chip — but the rendering should make them
    look like small line-icon glyphs, NOT the full-color iOS emojis. If
    that's not possible, use line icons (home / moon / book) before the text.

## 5. Stats strip (~80px)
- Soft cream rectangle (#F3EDE2), rounded 12px, margin 24px sides, padding 14px
- 3 columns separated by faint vertical lines:
  - Column 1: large number "**42**" Inter SemiBold 20px (terra-700),
    below it "**残した声**" Yu Gothic 11px (#7A7068)
  - Column 2: "**128**" / "**返した声**"
  - Column 3: "**2026.04〜**" Inter 13px (terra-700) /
    "**いるようになって**"
- Caption below the strip (centered, very small):
  "**人数や「うん」の数は、誰にも見えません**"
  Yu Gothic 10px, faint #B0A89F, letter-spacing wide

## 6. "あなたの案内" badges (~200px)
- Divider label: "**あなたの案内**" Yu Gothic Medium 11px, faint, wide letter-spacing
- Grid (3 columns × 2 rows) of badge cards:
  Each badge: cream-white BG, rounded 12px, soft shadow, padding 14px
  - Large icon (32px) at top, label (Yu Gothic Medium 12px) below
  - Icons (line drawings):
    Row 1: teacup ("**静か派**"), moon ("**夜型**"), leaf ("**マイペース**")
    Row 2: book ("**読む派**"), morning-tea ("**朝お茶**"),
           plus-sign ("**もっと**") — last one is a dashed empty placeholder

## 7. "わたしの声" recent posts (~280px)
- Divider label: "**わたしの声**" Yu Gothic Medium 11px, wide letter-spacing
- Stack of 3 compact post rows:
  Each row: cream-white BG, rounded 12px, padding 14px 16px
  - Header line (small): date "**2026.05.16**" Inter 11px (#B0A89F),
    visibility tag right "**🌙 しずか**" Yu Gothic 11px (#7A7068)
  - Body (Yu Gothic 14px line-height 1.85, color #2A2622):
    Row 1: "**今日は、ベランダで風に当たって、深く呼吸してみた。少し楽になった。**"
    Row 2: "**朝のお茶、また飲んでしまった。これだけは譲れない。**"
    Row 3: "**薬を変えてから、夜中に目が覚める回数が減った気がする。気にとめておく。**"

## 8. Bottom Nav — same 5 tabs, **プロフィール tab is active**

## 9. iPhone home indicator

# Composition
- Cover band → avatar → name → stats → badges → posts (top to bottom flow)
- The page reads like a small personal magazine spread

# Color palette
- Standard v2 palette
- Cover band uses gradient (terra → moss → plum) for visual richness

# Typography
- Name large (22px), readable
- Bio in Yu Gothic for warmth
- Numbers in Inter for clarity

# Style references
- Real apps: Day One Journal profile, Stoic Journal, Pinterest profile
  (but stripped of bright colors)
- AVOID: Instagram profile aesthetic (no follower-count-dominant),
  LinkedIn profile (too corporate)

# Avoid
- Large follower / following counts prominently displayed
- Verification checkmarks, brand badges (this is a peer community)
- "Edit profile" CTA that dominates the screen
- Aggressive numbers / metrics
- Decorative emojis everywhere

---

# 日本語End note

**意図**: 自分のプロフィールでも **数を煽らない**。「人数や『うん』の数は、誰にも見えません」のキャプションで安心感を明示。

**チェック**:
- [ ] フォロワー数が前面に出ていないか
- [ ] バッジが「成績」風でないか（落ち着いた佇まい）
- [ ] 投稿履歴が「日記」のような穏やかさか
