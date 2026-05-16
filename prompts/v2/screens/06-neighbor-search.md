---
title: となりさがし（性格マッチ） — 完成スクリーンショット風モックアップ
category: screen-mockup
output: assets/screens/06-neighbor-search.png
size: 1170 × 2532
aspect: 9:19.5
style_tags: [ios-app-screenshot, mobile-ui, editorial, muji-aesthetic, gentle-quiz, muted-earth-tones]
forbidden: [cartoon, children-book, saturated, neon, MBTI-flashy]
intent: 3つの簡単な質問で「考え方の近い人」を探す画面。クイズ的だが押し付けない。
---

# Subject

A high-fidelity iOS mockup of the "**となりさがし**" (find similar people)
screen — the user answers a few short questions to be matched with people
who have a similar way of thinking.

The mood is **a quiet questionnaire from a thoughtful friend**, not a
gamified personality test.

# Screen layout

## 1. iOS Status Bar — standard

## 2. App Header (~112px)
- Left: back arrow (thin sepia)
- Center: "**となりさがし**" Yu Gothic Medium 17px
- Right: empty
- Background: cream paper

## 3. Intro card (~120px)
- Background: linear gradient (moss-50 → terra-50), rounded 18px
- Margin 24px from sides, padding 18px
- Layout: small rabbit-line-avatar (40px) on the left + text on right:
  - Title: "**3つの質問だけ**" Yu Gothic Medium 16px
  - Sub: "**考え方の癖が近い、となりさんを そっと さがします。**"
    in Yu Gothic 12px line-height 1.6, color #7A7068

## 4. Question card #1 (~280px)
- Background: cream-white #FFFDF8, rounded 18px, soft shadow
- Padding 24px 22px
- Top: small label "**1 / 3**" Inter 11px, faint #B0A89F, wide letter-spacing
- Question title (centered): "**しんどい日は、どうしたいですか。**"
  Yu Gothic Medium 17px, line-height 1.6, color #2A2622
- 4 answer options below (vertical stack, gap 10px):
  Each option is a left-aligned card:
  - Background: cream soft (#F3EDE2)
  - Padding: 14px 16px
  - Border: 1.5px transparent (active state: solid terra-300)
  - Text in Yu Gothic 14px, color #2A2622
  - Options (top to bottom):
    1. "**誰とも話さず、静かに過ごしたい**" — ACTIVE (highlighted with
       terra border, subtle terra-50 background)
    2. "**誰かと、少しだけ話したい**"
    3. "**同じ気持ちの人を、読みたい**"
    4. "**散歩に出たい**"

## 5. Question card #2 (~220px)
- Same structure
- Label: "2 / 3"
- Question: "**一日のなかで、動きやすい時間は？**"
- 3 options:
  - "**朝、動きやすい**"
  - "**夜、動きやすい**" — ACTIVE
  - "**日によって、変わる**"

## 6. Matches preview section (below cards, ~280px)
- Divider label: "**あなたのとなりさん候補**" Yu Gothic Medium 14px (#2A2622),
  with thin horizontal lines on both sides
- Sub caption: "**考え方が近い 3人を 見つけました**" Yu Gothic 12px, #7A7068

### 3 match rows (stack, gap 12px):
Each row is a horizontal card (padding 16px):
- Avatar: small line-icon animal (44px) on colored bg
- Right of avatar: name + sub
- Far right: small terra pill button "**ノックする**" with small knock icon

Row 1: fox avatar, "**こもれび**", "SLE ルーム ・ 夜型 ・ しずか派"
Row 2: bird avatar, "**そらまめ**", "UC ルーム ・ 朝型 ・ 読む派"
Row 3: turtle avatar, "**ゆっくり**", "クローン ルーム ・ ペース近い"

## 7. Bottom Nav — same 5 tabs (no specific tab active for this sub-screen)

## 8. iPhone home indicator

# Composition
- Intro at top sets the gentle tone.
- 2 visible questions (more on scroll).
- Match preview at bottom previews results.

# Color palette
- Standard v2 palette
- Moss accents in the intro card (gentle, supportive)

# Typography
- Question titles slightly larger (17px) for readability
- Answer options at 14px (compact)

# Style references
- Real apps: Stoic Journal questionnaire,
  Calm app onboarding questions,
  Headspace mood check-in
- AVOID: BuzzFeed quiz aesthetic, gamified MBTI test apps,
  bright dating app personality tests

# Avoid
- Progress bars with percentages (too clinical)
- Animated checkmarks, confetti on selection
- "Personality types" labels ("INFP" style — too MBTI/flashy)
- Score numbers, compatibility percentages

---

# 日本語End note

**意図**: GRAVITY の「心友ノック」を医療翻訳。**16性格診断**でなく **疾患×ステージ×闘病スタンス** の軸でマッチさせる方針（前回MTGで決定）。

**チェック**:
- [ ] 質問が押し付けがましくないか（敬体・選択肢のニュアンス）
- [ ] マッチ結果が「ランキング」「スコア」に見えないか
- [ ] 「ノックする」が攻撃的でないか（控えめなテラ色）
