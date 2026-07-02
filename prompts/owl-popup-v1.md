---
target_asset: frontend/public/assets/animals/owl-popup.png
size: 1024x1024
aspect: 1:1
use_case: home-popup-character
variant: owl-popup-v1
date: 2026-05-21
references:
  - frontend/public/assets/animals/owl.png    # 既存テイストの基準（モスグリーン×クリーム水彩）
  - frontend/public/assets/heroes/stroll-path.png # ヒーロー水彩タッチの基準
  - docs/hukurou.png    # 元ネタのフクロウキャライメージ（NG例として参照・テイストは真逆）
---

# Subject

A single small **owl**, drawn in a quiet, mature, editorial watercolor style.

This owl is a **gentle companion character** that appears in a popup to ask
the user a tiny question — like an old friend who quietly sits beside you.
NOT a cartoon hooting owl. NOT Harry Potter Hedwig. NOT a kawaii anime mascot.

# Pose & Expression

- **Directly facing forward** (head and body both face the viewer head-on, no 3/4 turn)
- Head + chest + small belly visible, body grounded at the bottom
- Eyes: small dark dots inside very faint sepia eye rings — small dots, NOT big anime eyes
- Tiny beak in the middle, slightly tilted as if about to softly speak
- Expression: **calm, kind, listening** — as if it's about to ask a small question
- Wings folded against the body — no spread wings, no flying pose

# Composition

- Single owl, centered
- Owl occupies about 70% of canvas height
- At least 12% margin all sides
- Fits well in a popup card with rounded corners
- NO branch, NO night sky, NO moon, NO background of any kind

# Color palette

- Body feathers: muted moss-green (#A2AB7D) with creamy highlights (#DCE0C8)
- Belly area: warm cream (#EFDCC9)
- Beak: warm brown (#9C7853), small
- Eye dots: warm dark brown (#3A2E2A) — small dots inside faint sepia eye-ring
- Outline: sepia ink #7E5A40, ~1.5pt, slightly uneven hand-drawn line
- Background: **TRANSPARENT (PNG with alpha channel)**

# Texture

- Subtle watercolor wash for the feathers (visible color variation)
- Slight dry-brush texture at the edges
- Paper grain barely visible
- Hand-drawn outline (not perfectly clean)

# Style references (very important)

The illustrator's hand should match exactly these two existing assets in this project:
1. `frontend/public/assets/animals/owl.png` — the existing owl avatar (moss-green watercolor, point eyes, transparent background, MUJI-catalog quiet tone)
2. `frontend/public/assets/heroes/stroll-path.png` — the existing hero illustration (soft watercolor trees and small house on kraft path, beige/cream/brown palette, hand-drawn outline)

Both are by the same illustrator. This new owl must look like it came from the same hand.

# Avoid (strict)

- Big anime/kawaii eyes
- Cartoon hat, glasses, scarf, professor look
- Wide smile, surprised face, dramatic expression
- Spread wings, flying pose, perched on a branch
- Saturated colors (no bright orange, no bright yellow)
- Multiple owls
- Any background (sky, stars, moon, branch, tree)
- Any text, logo, signature, watermark
- The "kawaii sparkle blue background" look of `docs/hukurou.png` — that is the WRONG direction
- Big eye highlights (✦ or stars) — keep eyes plain small dots
- Heavy black outlines — keep outline soft sepia

# Why

This character appears in a small popup on the home screen of "よりそい つながる"
(a patient peer-support web app). The owl says one short sentence at a time
("ひとつだけ聞いてもいい？" / "また今度でもいいよ"), so the visual must feel
**quiet, patient, never demanding**. The same hand as the existing watercolor
animals so that it sits naturally in the world.

---

# 日本語End note

正面を向いた小さなふくろう、モスグリーン×クリーム水彩。
目は小さな点（大きなアニメ目は絶対 NG）。背景なし、ただ静かに正面を見ている。
既存の `animals/owl.png`・`heroes/stroll-path.png` と同じ絵師の手で描かれた1枚に見えること。
透過 PNG、1024x1024、保存先は `frontend/public/assets/animals/owl-popup.png`。
