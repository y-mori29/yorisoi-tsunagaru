---
title: 設定（いろいろ） — 完成スクリーンショット風モックアップ
category: screen-mockup
output: assets/screens/09-settings.png
size: 1170 × 2532
aspect: 9:19.5
style_tags: [ios-app-screenshot, mobile-ui, editorial, muji-aesthetic, organized-quiet, muted-earth-tones]
forbidden: [cartoon, children-book, saturated, neon, generic-iOS-settings]
intent: 設定画面。「おまもりレポート」を上部に置き、その他は穏やかなリスト構造。
---

# Subject

A high-fidelity iOS mockup of the settings screen "**設定**".

The vibe is **a clean, organized desk drawer** — everything has its
place, but nothing is shouting for attention.

# Screen layout

## 1. iOS Status Bar — standard

## 2. App Header (~112px)
- Left: back arrow (thin sepia)
- Center: "**設定**" Yu Gothic Medium 17px
- Background: cream paper

## 3. Section label "**あなたを守るために**"
- Padding-left 28px, font Yu Gothic Medium 11px, sepia (#7E5A40),
  wide letter-spacing (0.18em)
- Margin: 20px top, 12px bottom

## 4. "おまもりレポート" card (the showcase block, ~200px)
- Background: linear gradient (moss-50 → terra-50), rounded 18px
- Margin 24px sides, padding 22px 24px
- Position: overlapping bottom-right has a faint **bear silhouette** in
  very low opacity (15-20%) — representing "ぱお" (pao) gently watching over
- Inside the card:
  - Title: "**5月の おまもりレポート**" Yu Gothic Medium 16px (#2A2622)
  - Body: "**運営が今月、コミュニティを安全に保つために行ったことを、**
    **みなさまにお伝えします。**" Yu Gothic 13px line-height 1.85, #4F4843,
    max-width 280px
  - Large number: "**1,284**" Inter SemiBold 26px, moss-700 (#545C3C),
    with "**件**" appended in 12px sub
  - Number label: "**安心のための対応**" Yu Gothic 11px, #7A7068
- Below the card, very small caption (centered):
  "**ぱおが、静かに見守っています**" Yu Gothic 11px, faint #B0A89F

## 5. Section label "**アカウント**"
## 6. Account list (~120px)
Two list rows (each ~60px, white BG, rounded 12px, margin 8px between):
- Row 1: small profile icon (40px terra circle) + "**プロフィール**" Yu Gothic Medium 14px
  + sub "**名前・アバター・自己紹介**" Yu Gothic 12px #7A7068 + chevron-right
- Row 2: small flower icon in moss circle + "**案内（性格・暮らしのリズム）**"
  + sub "**となりさがしを、より近づけるために**" + chevron-right

## 7. Section label "**お便り**"
## 8. Notification list (~120px)
Two rows:
- Row 1: bell icon in plum circle + "**お便りを受け取る**" + sub
  "**そっと届く声・反応・となりさん**" + a **toggle switch on the right** (ON, terra-500)
- Row 2: moon icon in plum circle + "**夜は、静かにする**" + sub
  "**22:00 〜 7:00 はお便りをためる**" + toggle ON

## 9. Section label "**あなたを守る設定**"
## 10. Privacy list (~180px)
Three rows:
- Row 1: lock icon + "**声のデフォルト公開**" + sub "**みんな / となりさんだけ / しずか**"
  + small pill chip "**みんな**" on the right (terra-50 BG, sepia text)
- Row 2: search icon in moss + "**検索されないようにする**" + sub
  "**名前で探されても、出てこなくなる**" + toggle OFF (gray)
- Row 3: shield icon in plum + "**ブロックしている となりさん**" + sub
  "**今 2 人**" + chevron-right

## 11. Section label "**記録について**"
## 12. Data list (~120px)
Two rows:
- Row 1: bookmark icon in moss + "**声のデータを持ち出す**" + sub
  "**自分の声をダウンロード**" + chevron-right
- Row 2: microphone icon in terra + "**診察の記録（便利機能）**" + sub
  "**声で簡単に記録できる**" + chevron-right

## 13. Section label "**困ったとき**"
## 14. Support list (~140px)
Two rows:
- Row 1: chat icon in plum + "**ヘルプ・お問い合わせ**" + chevron-right
- Row 2: heart icon in gold + "**いのちを支える ホットライン**" + sub
  "**よりそいホットライン・いのちの電話 ほか**" + chevron-right

## 15. Footer
- Centered text, Yu Gothic 11px, faint #B0A89F:
  "**よりそい つながる v0.1.0**
   **© 2026 medicanvas**"
- Below: ghost button (transparent, gray text):
  "**いってきます（ログアウト）**" Yu Gothic 13px

## 16. iPhone home indicator (no bottom nav on this screen
  if it's pushed from profile — but if it's a tab, include nav)
  → Include bottom nav with **プロフィール tab active** (or NO nav if user
    pushed in from profile)

# Composition
- Hero "おまもりレポート" card sets a tone of trust at the top.
- Sections grouped with clear labels (アカウント / お便り / etc).
- Each list row is consistent in height and structure.

# Color palette
- Standard v2 palette
- Each icon circle uses a different muted color (terra / moss / plum / gold)
  for visual distinction without being noisy.

# Typography
- Section labels: Yu Gothic Medium 11px, wide letter-spacing (0.18em)
- List titles: Yu Gothic Medium 14px
- List subs: Yu Gothic 12px

# Style references
- Real apps: Things 3 settings, Day One settings, Bear settings,
  iOS Settings app (but warmer)
- AVOID: Facebook settings (too dense), generic SaaS settings panels

# Avoid
- Standard iOS gray settings appearance (must feel custom and warm)
- Red destructive buttons (use ghost button for logout)
- Toggle switches with bright iOS green (use terra-500 instead)
- Long disclaimer text walls

---

# 日本語End note

**意図**: 設定画面でも温度を保つ。**おまもりレポート**を最上部に置くことで、運営の透明性をアピール。各セクション見出しでカテゴリを明確化しつつ、全体は穏やか。

**チェック**:
- [ ] おまもりレポートが目立っているが派手すぎないか
- [ ] アイコン円の色が穏やかに識別できているか
- [ ] トグルの色がiOS純正の鮮やかな緑になっていないか（テラ系）
- [ ] ログアウトが過剰に強調されていないか
