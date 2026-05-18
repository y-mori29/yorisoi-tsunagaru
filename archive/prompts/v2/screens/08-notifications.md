---
title: お知らせ — 完成スクリーンショット風モックアップ
category: screen-mockup
output: assets/screens/08-notifications.png
size: 1170 × 2532
aspect: 9:19.5
style_tags: [ios-app-screenshot, mobile-ui, editorial, muji-aesthetic, gentle-mailbox-feel]
forbidden: [cartoon, children-book, saturated, neon, alarm-aesthetic]
intent: お知らせ一覧画面。「通知」というより「お便りボックス」のような穏やかさ。
---

# Subject

A high-fidelity iOS mockup of the "**お知らせ**" screen — a list of
recent notifications. The vibe is **opening your mailbox in a quiet
country house**, not a frantic notification feed.

# Screen layout

## 1. iOS Status Bar — standard

## 2. App Header (~112px)
- Center: "**お知らせ**" Yu Gothic Medium 17px
- Right: small gear/settings icon (faint sepia, 22px)
- Background: cream paper

## 3. Hero block (~220px)
- Background: linear gradient (plum-100 → terra-50), rounded 18px
- Margin 24px sides, padding 24px 28px
- Layout: small bird line-icon (60px) inside cream circle on the left,
  text on the right (or below on smaller screens):
  - Title: "**3つのお便りが、届いています**" Yu Gothic Medium 16px (#2A2622)
  - Sub: "**今朝までに、そっと届きました。**
    **読みおえたものは、24時間ほどで、そっと消えていきます。**"
    Yu Gothic 12px, line-height 1.7, #7A7068

## 4. Divider label "**今日**" (Yu Gothic Medium 11px, faint, wide letter-spacing,
   with thin lines on both sides)

## 5. Notification row #1 — そっと届く声（unread）
- Background: linear gradient (terra-50 → cream-white)
- Rounded 12px, padding 16px, margin 24px sides
- Tiny unread dot in upper-right corner (terra-500)
- Layout:
  - Small icon circle (44px) on the left: bird line-icon in plum-50 BG
  - Right of icon (vertical stack):
    - Title: "**新しい声が、ふうから届きました**" Yu Gothic Medium 14px
    - Quote box (background #F3EDE2, padding 8px 10px, rounded 6px,
      left border 2px plum-200): 
      "**「最近、ちゃんと眠れていますか…」**" Yu Gothic 12px line-height 1.6, #7A7068
    - Time: "**8 分前**" Inter 11px, faint #A39B96

## 6. Notification row #2 — 反応がついた（unread）
- Same structure (unread dot)
- Icon: flower line-icon in terra-50
- Title: "**あなたの声に、5人から「そう」が届きました**"
- Quote: "**「今日は朝から、なんだか落ち着かなくて…」**"
- Time: "**35 分前**"

## 7. Notification row #3 — コメント（unread）
- Icon: chat-bubble line-icon in moss-50
- Title: "**こもれびから、言葉が届きました**"
- Quote: "**「わたしも同じです。ベランダの風、わかります 🌿」**"
- Time: "**1 時間前**"

## 8. Divider label "**昨日**"

## 9. Notification row #4 — お隣さんになった（read）
- Same row structure, no unread dot, slightly faded background (cream-white)
- Icon: handshake-like line-icon in cream BG
- Title: "**そらまめが、お隣さんになりました**"
- No quote (just title)
- Time: "**昨日 ・ 夜**"

## 10. Notification row #5 — 医師コメント（read）
- Icon: small owl line-icon in moss-50
- Title: "**鈴木医師（公式）から、言葉が届きました**"
- Quote: "**「体調の波には、ある日と、ない日があります。両方、自然です。」**"
- Time: "**昨日 ・ 午後**"

## 11. Divider label "**お知らせ**"

## 12. Notification row #6 — おまもりレポート
- Icon: shield line-icon in soft gold (rgba(201,169,97,0.18) BG)
- Title: "**5月の おまもりレポート が 届きました**"
- Quote: "**運営が今月おこなった、安心のための取り組みを伝えます**"
- Time: "**5 月 1 日**"

## 12.5 Footer caption — 24時間で消えていく注記 (subtle, above bottom nav)
- Centered, very small, very faint
- Text: "**お便りは、24時間ほどで、自然に消えていきます**"
- Yu Gothic 10px, color #B0A89F, letter-spacing wide (0.1em), padding 16px 0
- Margin-bottom: 8px above bottom nav
- This caption is intentionally subtle so it doesn't feel like a "rule" —
  more like a quiet reassurance that nothing accumulates as pressure

## 13. Bottom Nav — same 5 tabs, **お知らせ tab is active**

## 14. iPhone home indicator

# Composition
- Hero at top sets the "mail arrives" mood.
- Today's notifications are highlighted (unread dot, slight bg gradient).
- Yesterday's are quieter (no dots, more muted).
- The official "おまもりレポート" lives at the bottom in a separate section.

# Color palette
- Standard v2 palette
- Each notification row uses subtle color coding by type:
  - Voice/letter received: plum
  - Reactions: terra
  - Comments: moss
  - System (おまもり): gold

# Style references
- Real apps: Things 3 daily review, Day One on-this-day card,
  Bear Notes notification list
- AVOID: Slack notification feed, Discord ping list, generic iOS notification UI

# Avoid
- Red dots / badges (use terra for unread)
- "Mark all as read" prominent button
- Threading / grouping that hides individual notifications
- Bright icon backgrounds (must be soft cream-tone backgrounds)

---

# 日本語End note

**意図**: 通知を「煩わしいもの」でなく「お便り」として再定義。色分けは控えめだが、種類別に微妙な背景色で識別できるようにする。さらに **お便りは 24 時間で自然消滅** することを初期設定にして、溜まりすぎる負担を回避する。

**チェック**:
- [ ] 「煽る」感じがないか（赤・点滅・大量の数字なし）
- [ ] 「ふう」（小鳥）の存在感がヒーローに出ているか
- [ ] 既読/未読の差が控えめに表現されているか
- [ ] 「お便りは 24 時間で自然に消えていく」旨が控えめに伝わっているか
- [ ] フッターのキャプションが目立ちすぎず、安心感として読めるか

**24 時間自然消滅の補足**:
- 対象: ユーザー通知（声・反応・コメント・お隣さんになった）
- 例外: 「おまもりレポート」など運営からのシステム通知 → 別ルール（手動で消すまで残る）
- ユーザー設定で延長・無効化可能（設定画面の「お便りを受け取る」内）
