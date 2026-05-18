# _icon-style-guide.md — アイコン共通スタイル

このフォルダ内の全アイコンプロンプトで **必ず踏襲** するスタイル指示。
画像生成ツールに渡す前に、このガイドを「冒頭の System message」または「Prefix prompt」として読み込ませてください。

---

## 0. アイコンの最終目標

- **UI コンポーネントとしてそのまま使える品質**
- すべて **同じ手の人が描いたように見える** 統一感
- **線の太さ・角の処理・余白の比率** が一貫
- **どのサイズで表示しても破綻しない**（16px〜64px）

## 1. 推奨：画像生成ではなく SVG ベクター

実は、UI アイコンは **画像生成より SVG手書きの方が品質・運用ともに優位** です：

- 拡大縮小しても綺麗
- 色をCSS変数で動的に変えられる
- ファイルサイズ小さい
- 既存の `mockups/assets/js/icons-v2.js` に v2 アイコン辞書あり

それでも画像生成でやる場合は、以下のスタイル指示を厳守。

---

## 2. 画像生成のスタイル指示（必ず冒頭に付与）

```
Style: minimalist line icon, thin line drawing only, no fill,
1.5px stroke weight, rounded line caps, rounded joins,
single color (warm sepia #7E5A40), perfectly centered,
512x512 PNG with transparent background,
24x24 grid system reference (icon occupies central 18-20px equivalent area),
Heroicons / Lucide / Phosphor style aesthetic,
hand-drawn quality (very slight imperfection) but consistent,
NO color fills, NO shadows, NO gradients, NO 3D effects,
NO drop shadows, NO outlines around the icon area.
```

## 3. テクニカル仕様

| 項目 | 値 |
|---|---|
| サイズ | 512 × 512 px（後で 24px に縮小して使う） |
| 線色 | `#7E5A40`（warm sepia） — CSS で currentColor に置き換え可 |
| 線幅 | 1.5px（512pxキャンバスでは換算32-40px相当） |
| ストロークキャップ | round |
| ストロークジョイン | round |
| 塗り | なし（線のみ） |
| 背景 | 完全透過（RGBA, alpha=0） |
| 角 | 鋭角禁止・常に round |

## 4. 参考スタイル

- **Heroicons**（outlined） https://heroicons.com/
- **Lucide** https://lucide.dev/
- **Phosphor Icons**（thin weight） https://phosphoricons.com/
- **iconoir** https://iconoir.com/

これらの outlined / thin スタイルを参考に。

## 5. 共通 AVOID

```
filled icons, color icons, multi-color icons,
gradient fills, drop shadows, 3D rendering, isometric style,
sticker style, cartoon faces on icons, anime style,
text labels on icons, multiple objects in one icon,
backgrounds (must be transparent), borders/frames around icons,
photographic textures, watercolor effects on UI icons
```

## 6. ネーミング規則（出力ファイル）

`assets/icons/<category>-<name>.png` 形式：
- `assets/icons/nav-home.png`
- `assets/icons/nav-stroll.png`
- `assets/icons/action-back.png`
- `assets/icons/reaction-thanks.png`
- `assets/icons/decoration-leaf.png`
- `assets/icons/animal-rabbit.png`

## 7. 生成バッチの組み立て方

同じスタイルで複数アイコンを連続生成するため、各カテゴリmdに以下の構造で記述：

```yaml
shared_style: |
  [§2 のスタイル指示をそのままコピペ]

icons:
  - name: home
    description: "A simple house silhouette with a triangular roof and rectangular body, one small square window in the center."
    output: assets/icons/nav-home.png

  - name: stroll
    description: "A small circle with three soft curved lines emanating outward, suggesting gentle exploration / radiating from a center."
    output: assets/icons/nav-stroll.png

  - name: ...
```

ツールに投げるときは：
1. `shared_style` をシステムプロンプト
2. 各 icon の description を user prompt
3. 1つずつ生成

---

## 8. 動物アバターについて

動物アバター（rabbit/bear/cat/bird など）は **線画アイコンよりも、塗りのある立体感のあるイラスト** が望ましいです。
そのため `animals/` 配下のプロンプトは、**マスコットと同じ詳細プロンプト形式**（Subject / Composition / Mood ...）で記述しています。
このスタイルガイドはアバター生成にも参考になりますが、アバターは線画アイコンより少しリッチ（淡い塗り、目鼻あり）です。
