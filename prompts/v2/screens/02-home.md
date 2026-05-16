---
title: ホーム画面 — 完成スクリーンショット風モックアップ（試作 v0.1）
category: screen-mockup
output: assets/screens/02-home.png
size: 1170 × 2532（iPhone 14 Pro / 1170×2532px）または 1080 × 2400（汎用）
aspect: 9:19.5
style_tags: [ios-app-screenshot, mobile-ui, editorial, muji-aesthetic, muted-earth-tones, clean-typography, adult-quiet]
forbidden: [cartoon, children-book, saturated, neon, generic-template, AI-text-garbage]
intent: 「ホーム画面」をiOSスクショ風1枚絵で生成する。これが森さんの画面デザインの叩き台になる。
---

# Subject

A high-fidelity iOS mobile app screenshot mockup for an app called
"よりそい つながる" (yorisoi tsunagaru / a quiet social app for people
living with chronic illness).

This is a full-screen mockup of the "ホーム" (Home / timeline) screen,
shown as if captured on an iPhone 14 Pro (1170 × 2532px, 9:19.5 ratio).

The aesthetic is **editorial Japanese magazine** (Kinfolk / 暮しの手帖 /
MUJI catalog) applied to a mobile app. NOT children-book, NOT cartoonish,
NOT bright SNS aesthetic. The overall feel is **a quiet, dignified
social space for adult patients**.

# Screen layout (top to bottom)

## 1. iOS Status Bar (very top, ~44px tall)
- Time on the left: **9:41** in SF Pro semibold, color #2A2622
- Right side: signal bars (3 of 4), WiFi icon, battery icon (about 60%)
- Background: the cream paper color of the app, no separation line
- Color: warm dark sepia (#2A2622) for icons and text
- All icons very small, subtle, NOT modern colorful iOS icons

## 2. App Header (~112px tall)
- Background: warm cream paper (#FAF6EE) with very subtle bottom border line
- Title on the left: "**ホーム**" in Yu Gothic Medium, 17px, color #2A2622
- Right side: a small **bell icon** (thin sepia line drawing, 22px),
  with a tiny terracotta dot (notification badge) at its upper-right corner

## 3. Greeting Block (~120px)
- Small date label: "2026 . 05 . 16" in Inter Regular 11px, very faint
  (#B0A89F), letter-spacing wide
- Greeting line in Yu Mincho (serif): "**おはようございます、もりさん。**"
  in 22px, color #2A2622, generous letter-spacing
- No avatar in this block, just text

## 4. Segment tab (~60px)
- Centered pill-shaped segment control with two options:
  - "**みんな**" (active — cream white pill with terracotta text #7E5A40)
  - "**となり**" (inactive — gray text #7A7068, no background)
- Background pill: muted cream (#F3EDE2)

## 5. "今日のひとこと" card (~280px tall, full width minus 24px margins)
A featured card at the top with a warm gradient background.

- Background: linear gradient from terra-50 (#F8EFE7) at top to cream
  (#FFFDF8) at bottom
- Thin border in terra-100 (#EFDCC9)
- Rounded corners (18px radius)
- Padding: 24px

Inside the card:
- Small label at top: "**今日のひとこと**" in Yu Gothic Medium 10px,
  warm sepia (#7E5A40), letter-spacing very wide, with a tiny horizontal
  line ornament before the text
- Main body (Yu Mincho serif, 17px, color #2A2622, line-height 1.95):
  "**今日は、ふかぶかと、息をはいてみる日。**
  **あなたは、ちゃんと眠れていますか。**"
- Footer (small): a tiny **rabbit avatar** (line drawing inside a small
  terra-50 circle, 28px) on the left, then text "**もか（公式）から**"
  in 12px gray (#7A7068)

## 6. Voice card #1 (~340px tall)
A regular post card.

- Background: pure white-cream (#FFFDF8)
- Very soft shadow underneath
- Rounded corners (18px)
- Padding: 22px 24px

Header row:
- A small circular **rabbit avatar** (line drawing on terra-50 background, 36px)
- Username: "**しずか**" in Yu Gothic 14px
- A small badge next to the name: "**UC ルーム**" in tiny terracotta pill
  (background terra-50, text terra-700, padding 3px 10px, font 10px)
- Time on the right: "**3分前**" in Inter 11px, very faint (#A39B96)
- Three-dot menu icon at the far right (sepia)

Body text (Yu Gothic 16px, line-height 1.95):
"**今日は朝から、なんだか落ち着かなくて。**
**ベランダで風に当たって、深く呼吸をしてみました。**
**同じような方、いますか。**"

Reaction row (at the bottom):
- 5 small pill-shaped reaction chips, horizontal row, with gentle gap (6px between)
- First chip is "active": background terra-50, text terra-700, with a small
  line icon (calm-face) and text "**そう**" — count is NOT shown
- Other chips: gray bg (#F3EDE2), gray text (#4F4843), with line icons:
  - leaf icon + "**わかる**"
  - eye icon + "**読んだよ**"
- On the far right: a small chat bubble icon (#7A7068)

## 7. Voice card #2 (~340px tall)
Same structure as card #1, but:
- Avatar: a small **cat** line drawing inside a moss-cream (#DCE0C8) circle
- Username: "**ふらり**", badge "**クローン ルーム**" in muted plum pill
- Time: "**15分前**"
- Body text:
  "**散歩道で、小さな花が、開いていました。**
  **こういう、静かな時間が、いちばん好きです。**"
- Below the text, an inline **photo placeholder image**:
  a soft watercolor-style still life of a single small wildflower on
  warm wooden surface (matches the still-life aesthetic of the rest of
  the app). Rounded corners, fills 100% of the card's inner width.
- Reactions: cup-of-tea icon + "**ありがとう**", eye icon + "**わかる**"

## 8. Bottom Nav (~96px tall, fixed at bottom)
- Background: cream paper (#FAF6EE) with very subtle blur and top border
- 5 evenly-spaced tab items, all line icons in sepia (#7E5A40 active / #B0A89F inactive)
- From left to right:
  1. House icon + "**ホーム**" (ACTIVE — slightly larger, terra-700 color)
  2. Compass/path icon + "**めぐる**"
  3. **CENTER: floating circular button** — solid terracotta (#A47556),
     50px diameter, with a thin white plus (+) inside, soft drop shadow.
     This is the "post" / 投稿 button.
  4. Envelope icon + "**お知らせ**"
  5. Person silhouette icon + "**プロフィール**"
- All labels in Yu Gothic 10px, generous letter-spacing

## 9. iPhone home indicator (very bottom, ~34px)
- A thin horizontal black bar in the center, about 134px wide, slightly rounded.

# Composition
- Full vertical iPhone screen aspect ratio (9:19.5).
- Generous left/right margins on content (24px equivalent).
- Vertical breathing space between sections (16-24px equivalent).
- No floating decorations, no shapes, no clutter.

# Lighting / Rendering
- Render as a CRISP MOBILE APP UI SCREENSHOT — not as an illustration.
- All UI elements should look like real iOS app design (geometric shapes,
  precise rounded corners, accurate typography).
- Typography MUST be legible Japanese text (Yu Gothic / Yu Mincho).
- All Japanese text must be rendered correctly and clearly readable.

# Color palette (strict)
- Background: cream paper #FAF6EE
- Card background: #FFFDF8
- Soft section background: #F3EDE2
- Primary terracotta accent: #A47556 (buttons, active states)
- Light terracotta: #EFDCC9 (badges, gradients)
- Moss green accents: #A2AB7D, #DCE0C8
- Plum / lavender accents: #BAACBC, #D8CFD9
- Text primary: #2A2622
- Text secondary: #4F4843
- Text faint: #7A7068
- Lines / borders: #ECE2D2

# Typography (must be accurate)
- Main body Japanese: Yu Gothic Medium (游ゴシック Medium)
- Special headings: Yu Mincho (游明朝)
- Numbers / English: Inter
- DO NOT use rounded gothic (丸ゴシック) — too childish for v2
- DO NOT use bold weights heavier than Medium (500)

# Style references
- Real iOS apps with editorial aesthetic: Day One Journal, Things 3,
  Reeder, Stoic Journal, Bear Notes
- Magazine layouts: Kinfolk, 暮しの手帖, Brutus's Japan specials
- AVOID: Sanrio-aesthetic apps, kids' education apps, dating apps,
  generic SaaS templates

# Avoid
- ANY cartoonish characters or mascots that look like children's book
- Any glitter, sparkles, hearts, ✨🌸 emoji decorations
- Saturated colors, bright pinks, neon highlights
- Generic Material Design or Apple stock UI components (must feel custom)
- Garbled / AI-generated nonsense text (all Japanese text must be the
  EXACT strings specified above, NO substitution, NO hallucinated text)
- Photographic textures inside UI elements (only the inline photo in
  card #2 should be photographic/illustrative; all other elements are
  clean UI)
- Status bar with battery exactly 100% (should look slightly used: ~60%)
- Overly stylized fonts, decorative scripts

---

# 日本語End note（試作版なので必ず読んでください）

**このプロンプトは試作版（v0.1）**です。森さんの確認が取れたら、以下9画面分を同フォーマットで一斉に書きます：

1. オンボーディング（6ステップ展開 or 代表1ステップ）
2. ホーム ← **これ**
3. 声を残す（投稿モーダル）
4. そっと届く声
5. めぐる（探索）
6. となりさがし（性格マッチ）
7. プロフィール
8. お知らせ
9. 設定

**画像生成AI の限界**：
- 日本語テキストの完璧な描画は AI によってばらつきあり。**nano BANANA 2** または **Codex CLI（GPT-Image-2）** が比較的得意。
- それでも誤字・崩れが出る場合は、生成画像を Figma/Photoshop で部分的に手修正する前提で運用するのが現実的。
- 「Text (verbatim)」として書いてある日本語は、可能な限り完全一致を狙うが、ズレた場合の修正コストは織り込み済み。

**生成後にチェックしたい点**：
- [ ] iOSスクショとして違和感ない（ステータスバー・ボトムナビが正しい）
- [ ] カラーが指定通り（くすみテラコッタ・モス・プラム）
- [ ] テキストが指定通りに表示されている（崩れていない）
- [ ] アバター・アイコンが線画スタイルで統一されている
- [ ] 子供っぽい要素・絵文字装飾が混入していない
- [ ] レイアウトのバランス（マージン・余白）が美しい

**ユーザー側のチェック・調整ポイント**：
- 文言：「今日のひとこと」「もりさん」など → ご自由に変更可
- ルーム名（UCルーム・クローンルーム）→ ご自由に
- アバターの動物 → 変更可（うさぎ・くま・猫・小鳥・きつね・ふくろうなど）
- 投稿数・配置 → 変更可

OK か NG か、または「ここをこう変えて」をいただければ、残り 8 画面分のプロンプトを同フォーマットで一気に書きます。
