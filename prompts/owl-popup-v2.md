---
target_asset: frontend/public/assets/animals/owl-popup.png
size: 1024x1024
aspect: 1:1
use_case: home-popup-character
variant: owl-popup-v2-cuter
date: 2026-05-22
revision_of: prompts/owl-popup-v1.md
revision_note: v1はかわいさが足りないと森さんからフィードバック。水彩テイストは保ったまま、丸み・愛嬌・体型を絵本マスコット寄りに調整。
references:
  - frontend/public/assets/animals/owl.png    # 既存テイスト基準
  - frontend/public/assets/heroes/stroll-path.png # 水彩タッチ基準
---

# Subject

A single small **owl chick**, drawn in a quiet, warm, **storybook watercolor**
style — like an illustrated character from a Japanese children's book about
quiet woodland life.

This owl is a **gentle, slightly shy companion character** who appears in a
popup to ask one tiny question — like an old friend who quietly sits beside
you. The reader should think "ふっくらしてて、ちょっと かわいい" when they see it.

# Pose & Expression

- **Directly facing forward** (head and body both face the viewer head-on, no 3/4 turn)
- **Rounder, chubbier body silhouette** — chick-like, almost egg-shaped
- **Slightly larger, rounder head** (about 55–60% of body height) — more cuddly proportion
- Wings folded against the body, looking soft and tucked
- Eyes: **gently round dark eyes** with a tiny soft highlight (subtle, just one small bright dot per eye to add life) — **must NOT be extreme anime eyes that cover more than 30% of the face**
- A small triangular beak slightly tilted, with the body language suggesting a soft, kind expression
- Subtle ear tufts may be hinted (small, rounded)
- Expression: **warm, curious, listening** — gently leaning toward the viewer as if about to softly ask "ねぇ、ちょっと聞いてもいい？"

# Composition

- Single owl, centered
- Owl occupies about 70% of canvas height
- At least 12% margin all sides
- Fits well in a popup card with rounded corners
- NO branch, NO night sky, NO moon, NO background of any kind

# Color palette

- Body feathers: muted moss-green (#A2AB7D) with creamy highlights (#DCE0C8)
- Belly area: soft warm cream (#EFDCC9) — generous, plump belly visible
- Beak: warm brown (#9C7853), small
- Eye base: warm dark brown (#3A2E2A)
- **Eye highlight: a tiny white dot (1px equivalent) — adds gentle life, NOT a starry sparkle**
- Outline: sepia ink #7E5A40, ~1.5pt, slightly uneven hand-drawn line
- Cheek: very faint warm blush on the cheeks (almost invisible, just a hint of warmth)
- Background: **TRANSPARENT (PNG with alpha channel)**

# Texture

- Soft watercolor wash for the feathers (visible gentle color variation)
- Slight dry-brush texture at the edges
- Paper grain barely visible
- Hand-drawn outline (not perfectly clean)

# Style references (very important)

The illustrator's hand should match the same watercolor approach as these
existing assets in this project:
1. `frontend/public/assets/animals/owl.png` — the existing owl avatar (moss-green watercolor, gentle palette, transparent background)
2. `frontend/public/assets/heroes/stroll-path.png` — the existing hero illustration (soft watercolor trees and small house on kraft path, beige/cream/brown palette, hand-drawn outline)

Compared to the previous v1, push the silhouette **slightly more rounded** and
**slightly more chick-like** — about 20% chubbier proportion — while
preserving the muted watercolor palette and quiet adult mood.

# Reference of what "kawaii enough" looks like (Japanese sense)

Think of these references for the **proportion and warmth**:
- "ふっくらすずめ" Japanese watercolor sparrow illustrations
- 暮しの手帖 nature page round little birds
- Miroco Machiko's animal illustrations (slightly rounded, plump, gentle warmth)
- Picture-book chicks and quiet baby owls in soft watercolor

# Avoid (strict)

- **Extreme anime eyes** that take more than 30% of the face
- Cartoon hat, glasses, scarf, professor look
- Wide open smiling beak / surprised face / dramatic expression
- Spread wings, flying pose, perched on a branch
- Saturated colors (no bright orange, no bright yellow, no neon)
- Multiple owls
- Any background (sky, stars, moon, branch, tree)
- Any text, logo, signature, watermark
- The "kawaii sparkle blue background" look of `docs/hukurou.png` — that is the WRONG direction
- Heavy black outlines — keep outline soft sepia
- Very thin / lanky body — this owl must look **plump and cuddly**
- Mature / serious / observer-from-distance vibe — v1 was too distant, v2 should feel like a small friend who sits next to you

# Why

This character appears in a small popup on the home screen of "よりそい つながる"
(a patient peer-support web app). The owl says one short sentence at a time
("ひとつだけ聞いてもいい？" / "また今度でもいいよ"), so it must feel **soft, plump,
and slightly endearing — but never loud or overly cute**. The same illustrator
hand as the existing watercolor animals so it sits naturally in the world.

---

# 日本語End note

正面を向いた **ふっくらした 小さなふくろうのひな**、モスグリーン×クリーム水彩。
目は丸めの濃茶（ハイライト 1点のみ）。**大きすぎる アニメ目は NG**、けど v1 より
**気持ち丸めで愛嬌のある** 表情に。お腹はふっくら、頭はやや大きめ（雛らしい比率）。
背景なし、ただ静かに正面を見て、少しだけ前のめりに聞いてくれる雰囲気。
既存の `animals/owl.png`・`heroes/stroll-path.png` と同じ絵師の手で描かれた1枚に見えること。
透過 PNG、1024x1024、保存先は `frontend/public/assets/animals/owl-popup.png`。
