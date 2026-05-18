---
title: 声を残す（投稿） — 完成スクリーンショット風モックアップ
category: screen-mockup
output: assets/screens/03-post.png
size: 1170 × 2532（iPhone 14 Pro）
aspect: 9:19.5
style_tags: [ios-app-screenshot, mobile-ui, editorial, muji-aesthetic, muted-earth-tones, clean-typography, focused-writing-ui]
forbidden: [cartoon, children-book, saturated, neon, generic-template]
intent: 声を残す（投稿）画面。書くことに集中できる、余白の多い静かな入力画面。
---

# Subject

A high-fidelity iOS mobile app screenshot mockup for "よりそい つながる" —
the "**声を残す**" (post/write) screen.

This screen prioritizes **focused writing** — minimal distraction, generous
whitespace, the writer's thoughts are the only thing on the page.

# Screen layout (top to bottom)

## 1. iOS Status Bar (same as other screens)
- Time **9:41**, right: signal/WiFi/battery (~60%), color #2A2622, on cream BG

## 2. App Header (~112px)
- Left: small **X close icon** (thin sepia line, 22px) — to dismiss
- Center: title "**声を残す**" in Yu Gothic Medium 17px (#2A2622)
- Right: small bookmark icon (thin sepia, 22px) — for "save as draft"
- Background: cream paper (#FAF6EE), subtle bottom border line #ECE2D2

## 3. User row (just below header, ~88px)
- Left: small **rabbit avatar** (line drawing inside terra-50 circle, 48px)
- Right of avatar:
  - Username line 1: "**もり**" in Yu Gothic Medium 16px (#2A2622)
  - Username line 2: "**UC ルーム に いるよ**" in Yu Gothic 12px (#7A7068)

## 4. Visibility selector (~80px)
- Section label: "**どこに残す？**" in Yu Gothic 12px (#7A7068),
  letter-spacing wide (0.08em), padding-left 4px
- Horizontal scroll row of 4 pill chips (gap 8px):
  1. **みんな** — ACTIVE: solid terra-500 (#A47556), white text
  2. **お隣さんだけ** — inactive: cream BG (#FFFDF8), sepia text,
     thin border (#ECE2D2)
  3. **UC ルーム** — inactive
  4. **しずか（じぶんだけ）** — inactive, with a small moon icon prefix
- Pill padding: 10px horizontal, 8px vertical
- Font: Yu Gothic Medium 13px

## 5. Main text input area (~640px tall)
- Large, mostly empty white area
- Background: cream paper (#FAF6EE), no border
- Padding: 20px
- Placeholder text in faint gray (#A39B96), Yu Gothic 17px, line-height 1.95:
  "**今の気持ちを、ここに、そっと置いてみる。**
  ***( blank line )***
  **すべて書かなくても、構いません。**
  **ひとことでも、絶対に大丈夫です。**"

## 6. Tool toolbar (~60px, just below input area)
- Subtle top border line (#ECE2D2)
- Horizontal row of 4 pill-shaped tool buttons (gap 8px):
  1. Small camera/photo icon + "**写真**"
  2. Small microphone icon + "**声で**"
  3. Small sparkle icon + "**ことば手伝う**"
  4. Small flower icon + "**飾り**"
- Each pill: background soft cream (#F3EDE2), text #4F4843, padding 10px 14px
- Font: Yu Gothic Medium 13px

## 7. Hint card (below toolbar, ~96px)
- Soft lavender gradient background (#D8CFD9 → #FAF6EE)
- Rounded corners (12px)
- Padding: 14px 18px
- Margin: 16px from sides

Inside the card:
- Small icon: leaf (sepia line, 18px) on the left
- Text 2 lines:
  - Line 1 (Yu Gothic Medium 13px, color #6A5C6E):
    "**「しずか」を選ぶと…**"
  - Line 2 (Yu Gothic 12px, color #7A7068):
    "**誰にも見られない、あなただけの日記になります。**"

## 8. Bottom toolbar (~88px, fixed at bottom)
- Background: cream paper (#FAF6EE) with subtle top border
- Layout: 3 columns
  - Left: character count "**0 / 300**" in Inter 11px, faint (#A39B96)
  - Center: empty (flex space)
  - Right: two buttons inline:
    - "**あとで**" — ghost button (transparent, text #7A7068, 13px)
    - "**そっと残す**" — primary button (terra-500 #A47556, white text,
      pill shape, padding 10px 18px, font 13px)

## 9. iPhone home indicator (~34px)

# Composition
- Vertical iPhone screen.
- The text input area dominates the middle (lots of whitespace).
- All other UI is minimal so the writer focuses on writing.

# Color palette
(Same as other screens — cream / terra / moss / plum / sepia)

# Typography
- Headers / labels: Yu Gothic Medium
- Body input: Yu Gothic 17px line-height 1.95
- Buttons: Yu Gothic Medium 13-16px

# Style references
- Real apps: Stoic Journal write screen, Bear Notes editor, Day One,
  iA Writer
- AVOID: noisy social media compose screens (Twitter/X, Threads),
  feature-heavy editors

# Avoid
- Decorative elements in the text input area (must be very calm)
- Emoji-style icons (use thin line icons only)
- Bright/playful "post" button styling
- Cluttered toolbars
- AI-garbled Japanese (must be exact strings)

---

# 日本語End note

**意図**: 声を残す画面は「書く」ことに集中できることが最優先。GRAVITY のような明るい投稿画面でなく、**静かな日記帳のような佇まい**。

**チェック**:
- [ ] 入力エリアが画面の主役か（広い余白）
- [ ] 「しずか」モードの存在が分かるか
- [ ] ボタンが派手すぎないか
- [ ] 「そっと残す」のニュアンスが守られているか
